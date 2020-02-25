import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { FilterProvider } from 'src/app/providers/filter.service';
import * as Objects from '../../../mocks/mocks.objects';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MetaDataProvider } from 'src/app/providers/metadata.service';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { MatSnackBar, MatDialogRef } from '@angular/material';
const moment =  _moment;



@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss'],
})
export class AdvancedSearchComponent implements OnInit {
  
  public date = new FormControl(moment());
  public search_data:any= Objects.search_data;
  public options:any={};
  public norms:any=[];
  public labs:any=[];
  public currentCheckedValue:any=null;
  public currentValueFaceScreen:any=null;
  public currentValueTypeOfReport:any=null;
  public isIncinerable: string;
  public hasFaceScreen: string;
  public isPrivate:string;

  constructor(
    public filterProvider:FilterProvider, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<AdvancedSearchComponent>,
    public metaDataProvider:MetaDataProvider,
    private ren: Renderer2) { }

  ngOnInit() {

    this.search_data = this.data;

    this.metaDataProvider.getFilterTypes()
    .subscribe((filter_types)=>{
      this.options.FILTER_TYPE = filter_types;
    });

    this.metaDataProvider.getFrameMaterial()
    .subscribe((frame_materials)=>{
      this.options.FRAME_MATERIAL = frame_materials;
    });

    this.metaDataProvider.getFrameTypes()
    .subscribe((frame_types)=>{
      this.options.FRAME_TYPE = frame_types;
    });

    this.metaDataProvider.getMediaTypes()
    .subscribe((media_types)=>{
      this.options.MEDIA_MATERIAL = media_types;
    });

    this.metaDataProvider.getDustType()
    .subscribe((dust_types)=>{
      this.options.DUST_TYPE = dust_types;
    });

    this.metaDataProvider.getAllNorms()
    .subscribe((norms)=>{
      this.norms = norms;
    });

    this.metaDataProvider.getAllTestLaboratories()
    .subscribe((labs)=>{
      this.labs = labs;
    })

    this.metaDataProvider.getFilterTypes()
    .subscribe((filter_types)=>{
      this.options.FILTER_TYPE = filter_types;
    });

    this.metaDataProvider.getAllManufacturers()
    .subscribe((manufacturers)=>{
      this.options.MANUFACTURERS = manufacturers;
    });

    this.metaDataProvider.getProviderType()
    .subscribe((providers)=>{
      this.options.PROVIDERS = providers;
    });

  }

  checkState(el) {
    setTimeout(() => {
      if (this.currentCheckedValue && this.currentCheckedValue === el.value) {
        el.checked = false;
        this.ren.removeClass(el['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(el['_elementRef'].nativeElement, 'cdk-program-focused');
        this.currentCheckedValue = null;
        this.isIncinerable = null;
      } else {
        this.currentCheckedValue = el.value;
      }
    });
  }

  checkStateFaceScreen(el) {
    setTimeout(() => {
      if (this.currentValueFaceScreen && this.currentValueFaceScreen === el.value) {
        el.checked = false;
        this.ren.removeClass(el['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(el['_elementRef'].nativeElement, 'cdk-program-focused');
        this.currentValueFaceScreen = null;
        this.hasFaceScreen = null;
      } else {
        this.currentValueFaceScreen = el.value;
      }
    });
  }

  checkStateTypeOfReport(el){
    setTimeout(() => {
      if (this.currentValueTypeOfReport && this.currentValueTypeOfReport === el.value) {
        el.checked = false;
        this.ren.removeClass(el['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(el['_elementRef'].nativeElement, 'cdk-program-focused');
        this.currentValueTypeOfReport = null;
        this.isPrivate = null;
      } else {
        this.currentValueTypeOfReport = el.value;
      }
    });
  }

  async prepareUrl(){
    let filter_type = "";
    let frame_type = "";
    let dust_type = "";
    let frame_material ="";
    let manufacturer = "";
    let media_type = "";
    let provider = "";
    let standard = "";
    let lab = "";
    let is_private = "";
    for (let index = 0; index < this.search_data.filter_type.length; index++) {
      filter_type = filter_type + "filter_type="+this.search_data.filter_type[index];
      if(this.search_data.filter_type.length > 1 && index < this.search_data.filter_type.length-1){
        filter_type = filter_type + "&";
      }
    }

    for (let index = 0; index < this.search_data.frame_type.length; index++) {
      frame_type = frame_type + "frame_type="+this.search_data.frame_type[index];
      if(this.search_data.frame_type.length > 1 && index < this.search_data.frame_type.length-1){
        frame_type = frame_type + "&";
      }
    }

    for (let index = 0; index < this.search_data.dust_type.length; index++) {
      dust_type = dust_type + "dust_type="+this.search_data.dust_type[index];
      if(this.search_data.dust_type.length > 1 && index < this.search_data.dust_type.length-1){
        dust_type = dust_type + "&";
      }
    }

    for (let index = 0; index < this.search_data.frame_material.length; index++) {
      frame_material = frame_material + "frame_material="+this.search_data.frame_material[index];
      if(this.search_data.frame_material.length > 1 && index < this.search_data.frame_material.length-1){
        frame_material = frame_material + "&";
      }
    }

    for (let index = 0; index < this.search_data.manufacturers.length; index++) {
      manufacturer = manufacturer + "manufacturer="+this.search_data.manufacturers[index];
      if(this.search_data.manufacturers.length > 1 && index < this.search_data.manufacturers.length-1){
        manufacturer = manufacturer + "&";
      }
    }

    for (let index = 0; index < this.search_data.media_type.length; index++) {
      media_type = media_type + "media_type="+  this.search_data.media_type[index];
      if(this.search_data.media_type.length > 1 && index < this.search_data.media_type.length-1){
        media_type = media_type + "&";
      }
    }

    for (let index = 0; index < this.search_data.provider.length; index++) {
      provider = provider + "provider="+this.search_data.provider[index];
      if(this.search_data.provider.length > 1 && index < this.search_data.provider.length-1){
        provider = provider + "&";
      }
    }

    for (let index = 0; index < this.search_data.standard.length; index++) {
      standard = standard + "standard="+this.search_data.standard[index];
      if(this.search_data.standard.length > 1 && index < this.search_data.standard.length-1){
        standard = standard + "&";
      }
    }

    for (let index = 0; index < this.search_data.labs.length; index++) {
      lab = lab + "lab="+this.search_data.labs[index];
      if(this.search_data.labs.length > 1 && index < this.search_data.labs.length-1){
        lab = lab + "&";
      }
    }

    let url_list = "";
    if(this.search_data.filter_type.length > 0){
      url_list = filter_type 
    }
    if(this.search_data.frame_type.length > 0){
      url_list = url_list + "&" + frame_type 
    }
    if(this.search_data.dust_type.length > 0){
      url_list = url_list + "&" + dust_type;
    }
    if(this.search_data.manufacturers.length > 0){
      url_list = url_list + "&"+ manufacturer;
    }
    if(this.search_data.media_type.length > 0){
      url_list = url_list + "&" + media_type;
    }
    if(this.search_data.provider.length > 0){
      url_list = url_list + "&" + provider;
    }
    if(this.search_data.standard.length > 0){
      url_list = url_list + "&" + standard;
    }
    if(this.search_data.labs.length > 0){
      url_list = url_list + "&" + lab;
    }

    
    if(this.isIncinerable || this.isIncinerable === 'false'){
      url_list = url_list + '&' + "is_incinerable=" + this.isIncinerable
    }
    
    if(this.hasFaceScreen || this.hasFaceScreen === 'false'){
      url_list = url_list + '&' + "has_face_screen=" + this.hasFaceScreen
    }
    
    if(this.isPrivate || this.isPrivate === 'false'){
      url_list = url_list + '&' + "is_private=" + this.isPrivate
    }
    
    if(url_list[0] === "&"){
      url_list =  url_list.substr(1);
    }
    return url_list
  }

  async formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  async _searchFilter(){
    var url = await this.prepareUrl();
    if(this.search_data.pdf_date_min){
      this.search_data.pdf_date_min = await this.formatDate(this.search_data.pdf_date_min)
    }
    if(this.search_data.pdf_date_max){
      this.search_data.pdf_date_max = await this.formatDate(this.search_data.pdf_date_max)
    }
    this.filterProvider.searchFilters(this.search_data,url).subscribe((filters)=>{
      let return_data = {
        filters : filters,
        data: this.search_data,
      }
      this.dialogRef.close(return_data);
    },error=>{
      console.log(error);
    })
  }

}
