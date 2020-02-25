import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CaseProvider } from 'src/app/providers/case.service';
import { MatDialog } from '@angular/material/dialog';
import { NavigationProvider } from 'src/app/providers/navigation.provider';
import { FormControl, Validators } from '@angular/forms';
import { ErrorDialogComponent } from 'src/app/components/modal-dialogs/error-dialog/error-dialog.component';
import { ReplaceCostDialogComponent } from 'src/app/components/modal-dialogs/replace-cost-dialog/replace-cost-dialog.component';
import * as Objects from '../../../../mocks/mocks.objects';
import { AirFlowDialogComponent } from 'src/app/components/modal-dialogs/airflow-dialog/air-flow-dialog.component';
import { UtilsFunctions } from 'src/app/providers/utils.functions';
import { System } from 'src/app/models/system.model';
import { NotificationService } from 'src/app/providers/notifications.service';
export interface DialogData { }


@Component({
  selector: 'app-new-case',
  templateUrl: './new-case.component.html',
  styleUrls: ['./new-case.component.scss']
})
export class NewCaseComponent implements OnInit {
  @Input('filter') filter: any;
  @Input('edition') is_edit: any;
  @Input('case_data') case_to_edit: any;
  @Output() created = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<boolean>();
  @ViewChild('systemForm', { static: true }) systemForm;

  public requiredFields = {
    case_name: new FormControl('', [Validators.required]),
    airflows_per_filter: new FormControl('', [Validators.required]),
    total_total_hours_per_year: new FormControl('', [Validators.required]),
    average_pressure_drop: new FormControl('', [Validators.required]),
    carbon_footprint: new FormControl('', [Validators.required]),
    energy_cost: new FormControl('', [Validators.required]),
    maximum_operational_dp: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    replacement_cycle: new FormControl('', [Validators.required]),
    filter_width: new FormControl('', [Validators.required]),
    filter_height: new FormControl('', [Validators.required]),
    filter_depth: new FormControl('', [Validators.required]),
    cost_per_filter: new FormControl('', [Validators.required]),
    filters_number: new FormControl('', [Validators.required]),
  }

  public efficienciesError = [false, false, false];
  public months: any = Array.from(Array(12), (x, index) => index + 1);
  public days: any = Array.from(Array(30), (x, index) => index + 1);
  public hours: any = Array.from(Array(24), (x, index) => index + 1);
  public filters_qty: any = Array.from(Array(4), (x, index) => index + 1);
  public system: System = null;
  public airflow_variable_values: any = [];
  public no_filter_selected: boolean = false;
  public attempt_to_change_filter: boolean;

  constructor(
    private caseProvider: CaseProvider,
    public dialog: MatDialog,
    public utils: UtilsFunctions,
    public notificationProvider: NotificationService,
    private navigator: NavigationProvider) { }

  ngOnInit() {
    //CHECK IF IS A NEW CASE OR EDIT CASE

    if (this.case_to_edit != null) {

      //CASE IS BEING EDITTING 

      this.system = new System(this.case_to_edit);
      this.system.current_model_filter = this.filter;
      this.system.cost_per_filter = this.case_to_edit.current_filter.filter_cost;
      this.system.avg_dp_filter_change = this.case_to_edit.current_filter.average_pressure_drop;
      this.system.variable_airflow ? this.system.variable_airflow = 2 : this.system.variable_airflow = 1;
      this.airflow_variable_values = this.system.airflows_per_filter;
      this.system.zip_code = this.case_to_edit.client_zip_code;
      this.system.calculateAverageAirflow(this.system,this.airflow_variable_values);
      if (this.case_to_edit.current_filter.filter_extra_cost.length > 0) {
        this.retrieveExtraCosts();
      } else {
        this.initExtraCosts();
      }
    } else {
      //CHECK IF A CASE ALREADY EXIST IN MEMORY
      var case_data = localStorage.getItem('new_case_data');
      if (case_data) {
        this.system = new System(JSON.parse(case_data));
        this.system.current_model_filter = this.filter;
        this.airflow_variable_values = this.system.airflows_per_filter;
      } else {

        //HOLE NEW CASE
        this.system = new System();
        this.system.current_model_filter = this.filter
        this.airflow_variable_values = [
          { 'flow': parseFloat('0').toFixed(2), 'percent': 0 },
          { 'flow': parseFloat('0').toFixed(2), 'percent': 0 },
          { 'flow': parseFloat('0').toFixed(2), 'percent': 0 },
          { 'flow': parseFloat('0').toFixed(2), 'percent': 0 },
        ];
        this.initExtraCosts();
      }
      this._updateHoursOfUse();
      this._updateTotalAirflow();
    }

    if (this.filter) {
      this.system.report = this.filter.reports[0].id;
      this.no_filter_selected = false;
    }

    this.listenForChanges();
  }

  ngOnDestroy() {
    if (!this.attempt_to_change_filter) {
      localStorage.removeItem('new_case_data');
    }
  }

  listenForChanges() {
    this.getDisabledExpresion();
  }

  getDisabledExpresion() {
    return this.system.systemIsValid(this.system, this.efficienciesError);
  }

  setAmountDecimal(ev) {
    this.utils.transformAmount(ev);
  }

  //Given an array of costs separate them in annual and additional per cycle

  retrieveExtraCosts() {
    this.system.separateCosts(this.system);
  }

  // If a new case is on the go then extra costs must be set by default

  initExtraCosts() {
    this.system.initializeExtraCosts(this.system);
  }

  _changeFilterTestReport() {
    localStorage.setItem('new_case_data', JSON.stringify(this.system));
    this.navigator._goFilterList();
    this.attempt_to_change_filter = true;
  }

  _updateHoursOfUse() {
    this.system.calculateHoursOfUse(this.system);
  }

  _updateTotalAirflow() {
    this.system.calculateTotalAirflow(this.system);
  }

  _setMotorEfficiency(val) {
    this.system.setMotorEfficiency(this.system, val);
    val == '' || val == null || val < 0 || val > 100 ? this.efficienciesError[0] = true : this.efficienciesError[0] = false;
  }

  _setDriverEfficiency(val) {
    this.system.setDriverEfficiency(this.system, val);
    val == '' || val == null || val < 0 || val > 100 ? this.efficienciesError[1] = true : this.efficienciesError[1] = false;
  }
  _setFanEfficiency(val) {
    this.system.setFanEfficiency(this.system, val);
    val == '' || val == null || val < 0 || val > 100 ? this.efficienciesError[2] = true : this.efficienciesError[2] = false;
  }

  _calculateEnergyCosts() {
    if (this.system.zip_code !== '' && this.system.industry_type) {
      this.caseProvider.getEnergyCosts(this.system).subscribe((response) => {
        this.system.energy_cost = response.energy_cost;
        this.system.carbon_footprint = response.carbon_footprint;
      }, error => {
        if (error.status == 404) {
          this.system.energy_cost = '';
          this.system.carbon_footprint = '';
        }
      })
    }
  }

  updateTotalCostsPerCycle() {
    this.system.calculateTotalCostsPerCycle(this.system);
  }

  /******************************************************************
  *                                                                 *
  *                     OPTIMIZATION PROCESS                        * 
  *                                                                 *
  *******************************************************************/

  _attemptToOptimizeCase(optimize: boolean) {
    if (!this.filter) {
      this.scrollToTop(0);
    } else {
      this.system.completeNewCaseData(this.system);
      if (this.is_edit) {
        this._saveCase(optimize);
      } else {
        this._createCase(optimize);
      }
    }
  }

  _createCase(optimize: boolean) {
    this.caseProvider.createNewCase(this.system).subscribe(
      (response) => {
        this.notificationProvider.showNotification(
          'New case created succesfully',
          'OK',
          5000
        );
        this.completeNavigationCaseDone(optimize, response);
      }, error => {
        this.system.variable_airflow ?
          this.system.variable_airflow = 2 :
          this.system.variable_airflow = 1;
        this.handlePostCaseError(error);
      })
  }

  _saveCase(optimize: boolean) {
    this.caseProvider.updateCase(this.system).subscribe(
      (response) => {
      this.notificationProvider.showNotification(
        'Case updated succesfully', 
        'OK', 
        5000
      );
      this.completeNavigationCaseDone(optimize, response);
    }, error => {
      this.handlePostCaseError(error);
    })
  }

  completeNavigationCaseDone(show_optimization, optimization_data) {
    if (show_optimization) {
      this.navigator._goOptimizationsResults(optimization_data);
    } else {
      this.created.emit(true);
    }
  }

  /******************************************************************
  *                                                                 *
  *            END OF CASE CREATION OR OPTIMIZATION                 * 
  *                                                                 *
  *******************************************************************/

  /* ERROR SAVING OR CREATING CASE */

  handlePostCaseError(error) {
    var min_dp_suggested: number;
    if (error.status == 400) {
      if (error.error.min_average_pressure_drop) {
        min_dp_suggested = parseFloat(error.error.min_average_pressure_drop) + parseFloat('0.001');
        this._openModalError('dp', min_dp_suggested.toFixed(3), 400);
      }
    }
  }

  _openModalError(error_type, error_message, error_code) {
    var data_error = {
      type: error_type,
      message: error_message,
      code: error_code
    }
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '50%',
      height: '60%',
      data: data_error
    });

    dialogRef.afterClosed().subscribe(result => {
      this.system.variable_airflow ? this.system.variable_airflow = 2 : this.system.variable_airflow = 1;
      if (result.optimize) {
        this.system.current_filter.average_pressure_drop = result.value;
        this._attemptToOptimizeCase(true);
      }
    });
  }

  // Modal for AIRFLOW

  _openModalAirflow(): void {
    if (this.system.variable_airflow == '2') {
      const dialogRef = this.dialog.open(AirFlowDialogComponent, {
        width: '50%',
        height: '75%',
        data: this.airflow_variable_values
      });

      dialogRef.afterClosed().subscribe(result => {
        this.airflow_variable_values = result.flows;
        this.system.airflows_per_filter = this.airflow_variable_values;
        if (result) {
          this.system.airflow_per_filter = result.average;
          this._updateTotalAirflow();
        }
      });
    }
  }

  // Modal for COST PER CYCLE

  addMoreCostPerCycle() {
    let costs_data = {
      costs: this.system.additional_costs,
      type: 'cycle'
    }
    const dialogRef = this.dialog.open(ReplaceCostDialogComponent, {
      width: '50%',
      height: '70%',
      data: costs_data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.system.updateCostPerCycle(this.system, result);
      }
    });
  }

  // Modal for ANNUAL COST

  addAnnualCosts() {
    let costs_data = {
      costs: this.system.annual_cost,
      type: 'annual'
    }
    const dialogRef = this.dialog.open(ReplaceCostDialogComponent, {
      width: '50%',
      height: '70%',
      data: costs_data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.system.updateAnnualCosts(this.system, result);
      }
    });
  }

  // CANCEL EDITING OR NEW CASE

  cancelCase() {
    localStorage.removeItem('new_case_data');
    this.cancel.emit(true);
  }

  // WINDOW SCROLL 
  scrollToTop(el) {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 50) {
        window.scrollTo(el, pos - 20); // how far to scroll on each step
      } else {
        this.no_filter_selected = true;
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

}




