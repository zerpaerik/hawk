import {
    Directive,
    HostBinding,
    HostListener,
    Output,
    EventEmitter
  } from "@angular/core";
  import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
  
  export interface FileHandle {
    file: File,
    url: SafeUrl,
    imgURL:string | ArrayBuffer;
  }
  
  @Directive({
    selector: "[appDrag]"
  })
  export class DragDirective {
    @Output() files: EventEmitter<FileHandle[]> = new EventEmitter();
  
    @HostBinding("style.background") private background = "#fff";

    @HostBinding("style.border") private border = "1px solid  #979797";

    @HostBinding("style.border-style") private border_style = "dashed";
  
    constructor(private sanitizer: DomSanitizer) { }
  
    @HostListener("dragover", ["$event"]) public onDragOver(evt: DragEvent) {
      evt.preventDefault();
      evt.stopPropagation();
      this.background = "#f4f1ff";
      this.border = "2px dashed #2C0A9E";
      this.border_style = 'dashed';
    }
  
    @HostListener("dragleave", ["$event"]) public onDragLeave(evt: DragEvent) {
      evt.preventDefault();
      evt.stopPropagation();
      this.background = "#fff";
      this.border = "1px dashed #979797";
      this.border_style = 'dashed';
    }
  
    @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
      evt.preventDefault();
      evt.stopPropagation();
      this.background = '#fff';
      this.border = "1px solid #979797";
      this.border_style = 'dashed';
    
      let files: FileHandle[] = [];
      for (let i = 0; i < evt.dataTransfer.files.length; i++) {
        const file = evt.dataTransfer.files[i];
        const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
        var reader = new FileReader();
        reader.readAsDataURL(file); 
        reader.onload = (_event) => { 
            var imgURL = reader.result;
            files.push({ file, url, imgURL });
            if (files.length > 0) {
              this.files.emit(files);
            }
        }
      }
    }
  }
  