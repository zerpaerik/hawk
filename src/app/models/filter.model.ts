import { Report } from './report.model';
import { Manufacturer } from './manufacturer.model';
import { Injectable } from '@angular/core';

@Injectable()
export class Filter {
    efficiency: number;
    face_screen: boolean;
    frame_material: string;
    frame_type: string;
    id: any;
    incinerable: boolean;
    manufacturer: Manufacturer;
    max_press_drop: number;
    media_type: string;
    merv_rating: number;
    name: string;
    part_number: string;
    picture: string;
    reports: Array<Report>;
    short_name: string;
    size_depth: number;
    size_height: number;
    size_width: number;
    ul_rating: any;

    constructor(){
        this.efficiency = 0;
        this.face_screen = false;
        this.frame_material = '';
        this.frame_type = 'null';
        this.id = '';
        this.incinerable = false;
        this.manufacturer = new Manufacturer();
        this.max_press_drop = 0;
        this.media_type = '';
        this.merv_rating = 0;
        this.name = '';
        this.part_number = '';
        this.picture = '';
        this.reports = [];
        this.short_name = '';
        this.size_depth = 2;
        this.size_height = 24;
        this.size_width = 24;
        this.ul_rating = '';
    }
} 
