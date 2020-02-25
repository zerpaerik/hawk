import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { System } from 'src/app/models/system.model';
import { NavigationProvider } from 'src/app/providers/navigation.provider';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-optimization-pdf',
  templateUrl: './optimization-pdf.component.html',
  styleUrls: ['./optimization-pdf.component.scss']
})
export class OptimizationPdfComponent implements OnInit {
  public pdf_data: System = new System();
  public chart_data: System = new System();
  constructor( private routeActivated:ActivatedRoute, private navigator : NavigationProvider, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.routeActivated.queryParams.subscribe(async params  => {
      this.pdf_data = JSON.parse(params.pdf_data);
      this.chart_data = JSON.parse(params.chart_data);
      console.log(this.pdf_data);
      console.log(this.chart_data);
    })

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = this.pdf_data.model_filter_image;
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
}

  public _backToResults():void{
    this.navigator._goOptimizationsResults(this.pdf_data);
  }

  public _downloadReport(){
    var doc:any = new jsPDF("p", "mm", "a4");
    // let element = document.querySelector("#content1");
    // (html2canvas as any)(document.querySelector("#content1"),{}).then(canvas  => {
    //     // Convert the canvas to blob
    //     canvas.toBlob(function(blob){
    //       var ctx = this.getContext('2d');
    //       var img = new Image();

    //       img.onload = function(){
    //         ctx.drawImage(img, 0, 0)
    //       }

    //       img.src = URL.createObjectURL(blob);
          
    //       let link = document.createElement("a");
    //       link.download = "image.png";
    //       link.href = img.src;
    //       link.click();
    //     },'image/png');

        
    // });

    // (html2canvas as any)(document.querySelector("#content1"), {
    //   "logging": true, //Enable log (use Web Console for get Errors and Warings)
    //   useCORS: false,
    //   taintTest: false,
    //   onrendered: function(canvas) {
    //     var img = new Image();
    //     img.onload = function() {
    //       document.body.appendChild(img);
    //     };
    //     img.src = canvas.toDataURL("image/png");
    //     console.log(img);
    //   }
    // });

    // (html2canvas as any)(document.querySelector("#content1"), {
    //   "logging": true, //Enable log (use Web Console for get Errors and Warings)
    //   useCORS: true,
    //   taintTest: false,
    //   "onrendered": function(canvas) {
    //       console.log('holaaaaaaaaaa');
    //       console.log(canvas);
    //       var url = canvas.toDataURL("image/png");
    //       console.log(url);
    //       window.open(url, "_blank");
    //   }
    // });
    
    (html2canvas as any)(document.querySelector("#content1"),{ logging: true, allowTaint:true, useCORS: true }).then(canvas  => {
      var imgData = canvas.toDataURL("image/png");
      const imgProps= doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(imgData, 'PNG', 5, 5, pdfWidth-7.5, pdfHeight);
      
      (html2canvas as any)(document.querySelector("#content2")).then(canvas2 => {
        var imgData2 = canvas2.toDataURL("image/png");
        const imgProps= doc.getImageProperties(imgData2);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addPage();
        doc.addImage(imgData2, 'PNG', 5, 10, pdfWidth-7.5, pdfHeight);
        return doc;
      }).then((doc)=>{
        doc.save(this.pdf_data.name);
      });
    });
  }

}
