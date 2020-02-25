// FILTERS TYPE
export const FILTER_TYPE = [
    "Box", 
    "Bag", 
    "Panel", 
    "Rectangular Cartridge", 
    "Round Cartridge", 
    "Pad", 
    "Die Cut"
];

export const FRAME_TYPE = [
    "Box", 
    "Header", 
];

export const FRAME_MATERIAL = [
    "Plastic", 
    "Galv. Steel", 
    "Wood",
    "Cardboard",
    "No frame", 
];

export const MEDIA_MATERIAL = [
    "Glass Fiber", 
    "Synthetic", 
    "Viscose",
    "Other" 
];

export const TEST_DUST = [
    "ASHRAE", 
    "A/C Fine", 
    "A/C Coarse", 
    "Other", 
];

export const MANUFACTURERS = [
    "TURPIAL", 
    "Oterca", 
];

export const search_data = {
    filter_type:[],
    frame_type:[],
    dust_type:[],
    frame_material:[],
    manufacturers:[],
    media_type:[],
    provider:[],
    standard:[],
    labs:[],
    has_face_screen:false,
    is_incinerable:false,
    name:'',
    part_number:'',
    size_depth_min:'',
    size_depth_max:'',
    size_width_min:'',
    size_width_max:'',
    size_height_min:'',
    size_height_max:'',
    max_press_drop_min:'',
    max_press_drop_max:'',
    efficiency_max:'',
    efficiency_min:'',
    test_airflow_max:'',
    test_airflow_min:'',
    pdf_date_max:'',
    pdf_date_min:'',
    e1_max:'',
    e1_min:'',
    e2_max:'',
    e2_min:'',
    e3_max:'',
    e3_min:'',
    is_private:[],
}


export const SYSTEM_OBJECT = {
    airflow_per_filter:'',
    airflows_per_filter:[],
    avg_dp_filter_change:'',
    annual_cost:[
      {'name':'','value':0, 'is_annual':true},
    ],
    backward_fan:false,
    carbon_footprint:'',
    client_address:'',
    case_name:'',
    case_number:'',
    client_case_name: '',
    client_company_name: "",
    client_contact_name: "",
    client_email: '',
    client_phone:'',
    client_type_of_consumer:'',
    client_zip_code: '',
    client_user_case: '',
    current_model_filter:{},
    current_filter:{
      airflow:'',
      annual_cost:'',
      model_filter:'',
      name:'',
      filter_cost:'',
      replace_cost:'',
      average_pressure_drop:'',
      filter_extra_cost:[],
    },
    drive_efficiency:'',
    energy_cost:'',
    fan_efficiency:'',
    filters_number:1,
    forward_fan: false,
    total_hours_per_year: '',
    is_draft: false,
    industry_type: '1',
    maximum_operational_dp:'',
    model_filter_image: "",
    model_filter_name: "",
    months_per_year:12,
    motor_efficiency:'',
    name:'',
    cost_per_filter:parseFloat('10').toFixed(2),
    disposal_cost:0.00,
    labor_cost:0.00,
    freight_cost:0.00,
    admin_cost:0.00,
    other_annual_cost:0.00,
    days_per_month:30,
    hours_per_day:24,
    proposed_filter: null,
    replacement_cycle: '',
    report: 1,
    radial_fan: false,
    unit_system: "i",
    variable_airflow:1,
    standard: '',
    total_airflow:'',
    time_operation_at_change_out:'',
    user: "",
    zip_code:'',
}
