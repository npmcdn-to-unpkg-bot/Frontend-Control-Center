import { Component, OnInit } from '@angular/core';

declare var XLSX: any;
declare var $: any;


@Component({
  moduleId: module.id,
  selector: 'app-batch-order-upload',
  templateUrl: 'batch-order-upload.component.html',
  styleUrls: ['batch-order-upload.component.css']
})
export class BatchOrderUploadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  outputObject: string;

  // fileupload(oEvent:ProgressEvent){
  //   this.filePicked(oEvent);
  // }

  filePicked(oEvent) {
    //read the file
    var oFile = oEvent.target.files[0];
    var sFilename = oFile.name;
    var reader = new FileReader();

    reader.onload = function (e) {
      var fileReader = e.target as FileReader;
      var data = fileReader.result;
      var workbook = XLSX.read(data, { type: 'binary' });

      workbook.SheetNames.forEach(function (sheetName) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        var json_object = JSON.stringify(XL_row_object);
        $("#my_file_output").html(json_object);
      })
    };
    reader.onerror = function (ex) {
      console.log(ex);
    };
    reader.readAsBinaryString(oFile);

  };
}
