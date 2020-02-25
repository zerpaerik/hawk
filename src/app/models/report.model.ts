import { Standard } from './standard.model';
import { Manufacturer } from './manufacturer.model';

export class Report {
    created: Date;
    dust_type: string;
    frame_type: string;
    id: number;
    lab_test_efficiency: number;
    laboratory: string;
    manufacturer: Manufacturer;
    merv_rating: number;
    model_filter: string;
    number: string;
    pdf_date: Date;
    pdf_file: string;
    points_count: number;
    provider_type: string;
    standard: Standard;
    status: string;
    user: any;
}