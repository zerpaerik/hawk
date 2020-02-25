import { Filter } from './filter.model'
import { FilterCost } from './filter-cost.model';

export class SystemFilter {
    additional_costs: number;
    airflow:any;
    annual_cost: number;
    average_pressure_drop: number;
    case_study: any;
    change_rate_annual_cost: number;
    change_rate_cycle_time: number;
    change_rate_dp: number;
    co2_lb_year: number;
    filter_cost: number;
    filter_extra_cost: Array<FilterCost>;
    filter_type: any;
    id: number;
    is_current: boolean;
    model_filter: Filter
    name: string;
    optimize_change_rate_annual_cost: number;
    optimize_change_rate_cycle_time: number;
    optimize_change_rate_dp: number;
    optimize_co2_lb_year: number;
    replace_cost: number;
    ul_compliant: boolean;

    constructor(){
        this.additional_costs = 0;
        this.airflow = 0;
        this.annual_cost = 0;
        this.average_pressure_drop = 0;
        this.case_study = '';
        this.change_rate_annual_cost = 0;
        this.change_rate_cycle_time = 0;
        this.change_rate_dp = 0;
        this.co2_lb_year = 0;
        this.filter_cost = 10;
        this.filter_extra_cost = [];
        this.filter_type = 'null';
        this.id = 0;
        this.is_current = true;
        this.model_filter = new Filter()
        this.name = '';
        this.optimize_change_rate_annual_cost = 0;
        this.optimize_change_rate_cycle_time = 0;
        this.optimize_change_rate_dp = 0;
        this.optimize_co2_lb_year = 0;
        this.replace_cost = 0;
        this.ul_compliant = false;
    }
}