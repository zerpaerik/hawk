import { Airflow } from './airflow.model'
import { SystemFilter } from './system-filter.model';

export class System {
  airflows_per_filter: Array<Airflow>;
  backward_fan: boolean;
  carbon_footprint: any;
  client_address: string;
  client_case_name: string;
  client_company_name: string;
  client_contact_name: string;
  client_email: string;
  client_phone: string;
  client_type_of_consumer: any;
  client_user_case: string;
  client_zip_code: null
  created: Date;
  current_filter: SystemFilter;
  days_per_month: number;
  drive_efficiency: number;
  energy_cost: string;
  fan_efficiency: number;
  filters_number: number;
  forward_fan: boolean;
  height: number;
  hours_per_day: number;
  hours_per_year: number;
  id: number;
  industry_type: number;
  is_draft: boolean;
  length: number;
  maximum_operational_dp: number;
  model_filter_image: string;
  model_filter_name: string;
  months_per_year: number;
  motor_efficiency: number;
  name: string;
  radial_fan: boolean;
  replacement_cycle: number;
  report: number;
  standard: number;
  total_airflow: any;
  unit_system: string;
  updated: Date;
  user: string;
  savings: number;
  savings_percent: number;
  variable_airflow: any;
  width: number;
  zip_code: any;
  current_model_filter: any;
  cost_per_filter: number;
  avg_dp_filter_change: number;
  airflow_per_filter: number;
  additional_costs: any;
  annual_cost: any;
  additional_costs_per_cycle: any;
  total_annual_cost: any;
  freight_cost: any;
  labor_cost: any;
  disposal_cost: any;
  case_number: string;
  other_annual_cost: any;
  toggle_chart:boolean;

  constructor(private case_data?: System) {
    if (case_data) {
      this.airflows_per_filter = this.case_data.airflows_per_filter;
      this.backward_fan = this.case_data.backward_fan;
      this.carbon_footprint = this.case_data.carbon_footprint;
      this.client_address = this.case_data.client_address;
      this.client_case_name = this.case_data.client_case_name;
      this.client_company_name = this.case_data.client_company_name;
      this.client_contact_name = this.case_data.client_contact_name;
      this.client_email = this.case_data.client_email;
      this.client_phone = this.case_data.client_phone;
      this.client_type_of_consumer = this.case_data.client_type_of_consumer;
      this.client_user_case = this.case_data.client_user_case;
      this.client_zip_code = this.case_data.client_zip_code;
      this.created = this.case_data.created;
      this.current_filter = this.case_data.current_filter;
      this.days_per_month = this.case_data.days_per_month;
      this.drive_efficiency = this.case_data.drive_efficiency;
      this.energy_cost = this.case_data.energy_cost;
      this.fan_efficiency = this.case_data.fan_efficiency;
      this.filters_number = this.case_data.filters_number;
      this.forward_fan = this.case_data.forward_fan;
      this.height = this.case_data.height;
      this.hours_per_day = this.case_data.hours_per_day;
      this.hours_per_year = this.case_data.hours_per_year;
      this.id = this.case_data.id;
      this.industry_type = this.case_data.industry_type;
      this.is_draft = this.case_data.is_draft;
      this.length = this.case_data.length;
      this.maximum_operational_dp = this.case_data.maximum_operational_dp;
      this.model_filter_image = this.case_data.model_filter_image;
      this.model_filter_name = this.case_data.model_filter_name;
      this.months_per_year = this.case_data.months_per_year;
      this.motor_efficiency = this.case_data.motor_efficiency;
      this.name = this.case_data.name;
      this.radial_fan = this.case_data.radial_fan;
      this.replacement_cycle = this.case_data.replacement_cycle;
      this.report = this.case_data.report;
      this.standard = this.case_data.standard;
      this.total_airflow = this.case_data.total_airflow;
      this.unit_system = this.case_data.unit_system;
      this.updated = this.case_data.updated;
      this.user = this.case_data.user;
      this.savings = this.case_data.savings;
      this.savings_percent = this.case_data.savings_percent;
      this.variable_airflow = this.case_data.variable_airflow;
      this.width = this.case_data.width;
      this.zip_code = this.case_data.zip_code;
      this.current_model_filter = this.case_data.current_model_filter;
      this.cost_per_filter = this.case_data.cost_per_filter;
      this.avg_dp_filter_change = this.case_data.avg_dp_filter_change;
      this.airflow_per_filter = this.case_data.airflow_per_filter;
      this.additional_costs = this.case_data.additional_costs;
      this.annual_cost = this.case_data.annual_cost;
      this.additional_costs_per_cycle = this.case_data.additional_costs_per_cycle;
      this.total_annual_cost = this.case_data.total_annual_cost;
      this.freight_cost = this.case_data.freight_cost;
      this.labor_cost = this.case_data.labor_cost;
      this.disposal_cost = this.case_data.disposal_cost;
      this.case_number = this.case_data.case_number;
      this.other_annual_cost = this.case_data.other_annual_cost;
      this.toggle_chart = false;
    } else {
      this.airflows_per_filter = [
        { 'id': 0, 'flow': 0.00, 'percent': 0 },
        { 'id': 1, 'flow': 0.00, 'percent': 0 },
        { 'id': 2, 'flow': 0.00, 'percent': 0 },
        { 'id': 3, 'flow': 0.00, 'percent': 0 },
      ];
      this.backward_fan = false;
      this.carbon_footprint = 0;
      this.client_address = '';
      this.client_case_name = '';
      this.client_company_name = '';
      this.client_contact_name = '';
      this.client_email = '';
      this.client_phone = '';
      this.client_type_of_consumer = 1;
      this.client_user_case = '';
      this.client_zip_code = null
      this.created = new Date();
      this.current_filter = new SystemFilter();
      this.days_per_month = 30;
      this.drive_efficiency = 90;
      this.energy_cost = '';
      this.fan_efficiency = 90;
      this.filters_number = 1;
      this.forward_fan = false;
      this.height = 0;
      this.hours_per_day = 24;
      this.hours_per_year = 0;
      this.id = 0;
      this.industry_type = 1;
      this.is_draft = false;
      this.length = 0;
      this.maximum_operational_dp = 0;
      this.model_filter_image = '';
      this.model_filter_name = '';
      this.months_per_year = 12;
      this.motor_efficiency = 80;
      this.name = '';
      this.radial_fan = false;
      this.replacement_cycle = 0;
      this.report = 0;
      this.standard = 0;
      this.total_airflow = 0;
      this.unit_system = 'i';
      this.updated = new Date();
      this.user = '';
      this.savings = 0;
      this.savings_percent = 0;
      this.variable_airflow = 1;
      this.width = 0;
      this.zip_code = '';
      this.current_model_filter = new SystemFilter;
      this.cost_per_filter = 0;
      this.avg_dp_filter_change = 0;
      this.airflow_per_filter = 0;
      this.additional_costs = [];
      this.annual_cost = [];
      this.additional_costs_per_cycle = [];
      this.total_annual_cost = 0;
      this.freight_cost = 0;
      this.labor_cost = 0;
      this.disposal_cost = 0;
      this.case_number = '';
      this.other_annual_cost = 0;
      this.toggle_chart = false;
    }
  }

  calculateHoursOfUse(system: System): System {
    system.hours_per_year = system.months_per_year * system.days_per_month * system.hours_per_day;
    return system
  }

  calculateTotalAirflow(system: System): System {
    system.total_airflow = (system.airflow_per_filter * system.filters_number).toFixed(2);
    return system
  }

  calculateAverageAirflow(system: System, airflows:Array<Airflow>){
    var average_airflow:any = airflows.reduce((a, b) => +a + +(b.flow * (b.percent/100)), 0).toFixed(2);
    system.airflow_per_filter = average_airflow;
    return system
  }

  calculateTotalCostsPerCycle(system: System): System {
    system.additional_costs[0].value = system.labor_cost;
    system.additional_costs[1].value = system.disposal_cost;
    system.additional_costs[2].value = system.freight_cost;
    system.additional_costs_per_cycle = system.additional_costs.reduce((a, b) => +a + +b.value, 0).toFixed(2);
    return system
  }

  updateCostPerCycle(system: System, cost_array: Array<any>): System {
    system.additional_costs = cost_array;
    system.additional_costs_per_cycle = cost_array.reduce((a, b) => +a + +b.value, 0).toFixed(2);
    if (system.annual_cost.length > 0) {
      system.current_filter.filter_extra_cost = system.additional_costs.concat(system.annual_cost);
    } else {
      system.current_filter.filter_extra_cost = system.additional_costs;
    }
    return system
  }

  updateAnnualCosts(system: System, cost_array: Array<any>): System {
    system.annual_cost = cost_array;
    system.total_annual_cost = cost_array.reduce((a, b) => +a + +b.value, 0).toFixed(2);
    system.current_filter.filter_extra_cost = system.annual_cost.concat(system.additional_costs);
    return system
  }

  setMotorEfficiency(system: System, value: number): System {
    system.motor_efficiency = value;
    return system

  }
  setDriverEfficiency(system: System, value: number): System {
    system.drive_efficiency = value;
    return system

  }
  setFanEfficiency(system: System, value: number): System {
    system.fan_efficiency = value;
    return system

  }

  systemIsValid(system: System, efficienciesError: Array<boolean>): boolean {
    var is_valid =
      system.name == '' ||
      !system.width || !system.height || !system.length ||
      system.width < 12 || system.height < 12 || system.length < 1 ||
      system.width > 24 || system.height > 24 || system.length > 24 ||
      system.width < 0 || system.height < 0 || system.length < 0 ||
      !system.replacement_cycle || system.replacement_cycle < 0 ||
      !system.maximum_operational_dp || system.maximum_operational_dp < 0 ||
      !system.current_filter.average_pressure_drop || system.current_filter.average_pressure_drop < 0 ||
      !system.airflow_per_filter || !system.energy_cost || !system.carbon_footprint ||
      efficienciesError[0] || efficienciesError[1] || efficienciesError[2] ||
      system.cost_per_filter == 0 || !system.cost_per_filter || system.cost_per_filter < 0 ||
      system.filters_number == 0 || !system.filters_number || system.filters_number < 0;
    return is_valid
  }

  separateCosts(system: System): System {
    system.additional_costs = system.current_filter.filter_extra_cost.filter(cost => cost.is_annual == false);
    system.annual_cost = system.current_filter.filter_extra_cost.filter(cost => cost.is_annual == true);
    system.additional_costs_per_cycle = system.additional_costs.reduce((a, b) => +a + +b.value, 0).toFixed(2);
    system.total_annual_cost = system.annual_cost.reduce((a, b) => +a + +b.value, 0);

    var freight_cost = system.additional_costs.find(cost => cost.name === "FREIGHT COST");
    freight_cost ? system.freight_cost = freight_cost.value : system.freight_cost = parseFloat('0').toFixed(2);

    var labor_cost = system.additional_costs.find(cost => cost.name === "LABOR COST");
    labor_cost ? system.labor_cost = labor_cost.value : system.labor_cost = parseFloat('0').toFixed(2);

    var disposal_cost = system.additional_costs.find(cost => cost.name === "DISPOSAL COST");
    disposal_cost ? system.disposal_cost = disposal_cost.value : system.disposal_cost = parseFloat('0').toFixed(2);
    return system
  }

  initializeExtraCosts(system:System):System{
    system.additional_costs = [
      {'name':'LABOR COST','value':system.labor_cost ? system.labor_cost:system.labor_cost = parseFloat('0').toFixed(2),'is_annual':false},
      {'name':'DISPOSAL COST','value':system.disposal_cost ? system.disposal_cost : system.disposal_cost= parseFloat('0').toFixed(2) ,'is_annual':false},
      {'name':'FREIGHT COST','value':system.freight_cost ? system.freight_cost : system.freight_cost =parseFloat('0').toFixed(2),'is_annual':false},
    ];
    system.additional_costs_per_cycle = system.additional_costs.reduce((a, b) => +a + +b.value, parseFloat('0').toFixed(2)).toFixed(2);
    system.annual_cost = [{'name':'','value':parseFloat('0').toFixed(2), 'is_annual':true}];
    system.total_annual_cost = system.annual_cost.reduce((a, b) => +a + +b.value, 0);
    return system;
  }

  completeNewCaseData(system:System):System{
    system.client_case_name = system.name;
    system.case_number = system.client_user_case;
    system.client_type_of_consumer = system.industry_type;
    system.client_zip_code = system.zip_code;
    system.model_filter_image ? system.model_filter_image = system.current_model_filter.picture : null;
    system.model_filter_image ? system.model_filter_name = system.current_model_filter.name : null;
    system.standard = system.current_model_filter.reports[0].standard.id;
    system.report = system.current_model_filter.reports[0].id;
    
    system.current_filter.airflow = system.airflow_per_filter;
    system.current_filter.name = system.current_model_filter.name;
    system.current_filter.annual_cost = system.other_annual_cost;
    system.current_filter.filter_cost = system.cost_per_filter;
    system.current_filter.replace_cost = system.disposal_cost;
    system.current_filter.model_filter = system.current_model_filter.id;
    
    if(system.annual_cost.length == 1 && 
      system.annual_cost[0].name == "" && 
      system.annual_cost[0].value == 0){
        system.current_filter.filter_extra_cost.splice(system.current_filter.filter_extra_cost.length - 1,1);
    }
    
    if(system.variable_airflow == 1){
      system.airflows_per_filter = [{
        'id':0,'flow':system.airflow_per_filter, 'percent':100,
      }]
    }

    system.variable_airflow == 2 ? system.variable_airflow = true : system.variable_airflow = false
    return system
  }
}