import { Injectable, Injector, ReflectiveInjector } from '@angular/core';
import { Order, Address, FromAddress, ToAddress, GeoLocation, Location } from '../../shared/order-service/order'

declare var XLSX: any;
declare var $: any;

@Injectable()
export class FileService {
  private injector: Injector = ReflectiveInjector.resolveAndCreate([Order, FromAddress, ToAddress, GeoLocation, Location]);

  private template: any;

  constructor() { }
  /* Read File Methods */
  uploadFile(oEvent, callback) {
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
        callback(XL_row_object);
      })
    };
    reader.onerror = function (ex) {
      console.log(ex);
    };
    reader.readAsBinaryString(oFile);
  };

  processFileData(data, callback) {
    this.createFileTemplate();
    var template = this.template
    console.log(data);
    let temp = [];
    let faultyEntries = [];

    // 0. Add excel row number to data
    for (var i = 0; i < data.length; i++) {
      data[i]["EXCEL_ROW"] = i + 2;
    }
    // 1. Check if columns are the same as template and required fields are filled    
    for (let i in template) {
      this.fillDefaultValue(template[i], data);
      temp = data.filter((item) => template[i].required && item[template[i].column] === undefined);
      if (temp.length > 0) {
        for (let j in temp) {
          temp[j]["DETAIL"] = (temp[j]["DETAIL"] === undefined) ? (template[i].column + " is required") : (temp[j]["DETAIL"] + "; " + template[i].column + " is required");
          faultyEntries.push(temp[j]);
        }
      }
    }
    faultyEntries = this.removeDuplicates(faultyEntries);

    if (faultyEntries.length === 0) {
      // 2a. Once all data are successfully entered then format the orders in the right data type    
      callback({
        code: 200,
        data: this.formatObjects(data)
      })
    } else {
      // 2b. if failed then return faulty entries for display   
      console.log(faultyEntries);
      callback({
        code: 400,
        message: "Please check your excel file and complete all required entries before upload.",
        data: faultyEntries
      })
    }
  }

  private fillDefaultValue(templateItem, data: any[]) {
    if (!templateItem.required && templateItem.default !== undefined) {
      data.forEach(item => {
        item[templateItem.column] = item[templateItem.column] === undefined ? templateItem.default : item[templateItem.column];
      })
    }
  }

  private removeDuplicates(entries) {
    var uniqueEntries = [];
    $.each(entries, function (i, el) {
      if ($.inArray(el, uniqueEntries) === -1) uniqueEntries.push(el);
    });
    return uniqueEntries;
  }

  private formatObjects(data) {
    var template = this.template
    var output = [];

    for (let i in data) {
      // ERROR: injector was not working properly
      // var orderObj = this.injector.get(Order);
      var orderObj = new Order(new FromAddress(new GeoLocation()), new ToAddress(new GeoLocation()), new Location())
      for (let j in template) {
        switch (template[j].dataType) {
          case "number":
            orderObj[template[j].name] = parseInt(data[i][template[j].column]); break;
          case "FromAddress:number":
            orderObj.fromAddress[template[j].name] = parseInt(data[i][template[j].column]); break;
          case "FromAddress:string":
            orderObj.fromAddress[template[j].name] = data[i][template[j].column]; break;
          case "ToAddress:number":
            orderObj.toAddress[template[j].name] = parseInt(data[i][template[j].column]); break;
          case "ToAddress:string":
            orderObj.toAddress[template[j].name] = data[i][template[j].column]; break;
          default:
            orderObj[template[j].name] = data[i][template[j].column];
        }
      }
      output.push(orderObj);
    }
    // console.log(output);
    return output;
  }

  // TODO: this should be changed to a public set method and call it outside of the service
  private createFileTemplate() {
    this.template = [
      { column: "PACKAGE_TYPE", required: true, dataType: "number", name: "orderType" },
      { column: "SENDER_NAME", required: true, dataType: "string", name: "contactName" },
      { column: "SENDER_CONTACT", required: true, dataType: "string", name: "contactNumber" },
      { column: "RECIPIENT_NAME", required: true, dataType: "string", name: "recipientName" },
      { column: "RECIPIENT_CONTACT", required: true, dataType: "number", name: "recipientContact" },
      { column: "REMARKS", required: false, dataType: "string", name: "comments", default: "" },
      { column: "FROM_POSTAL", required: true, dataType: "FromAddress:number", name: "postal" },
      { column: "FROM_ADDRESS", required: false, dataType: "FromAddress:string", name: "street", default: "" },
      { column: "FROM_EXTRA", required: false, dataType: "FromAddress:string", name: "extra", default: "" },
      { column: "TO_POSTAL", required: true, dataType: "ToAddress:number", name: "postal" },
      { column: "TO_ADDRESS", required: false, dataType: "ToAddress:string", name: "street", default: "" },
      { column: "TO_EXTRA", required: false, dataType: "ToAddress:string", name: "extra", default: "" },
      { column: "FARE", required: true, dataType: "number", name: "amount" }
    ];
  }

  downloadFileTemplate() {
    var data = [
      [1, 2, 3],
      [true, false, null, "sheetjs"],
      ["foo", "bar", new Date("2014-02-19T14:30Z"), "0.3"],
      ["baz", null, "qux"]
    ];

    var ws_name = "SheetJS";

    var wscols = [
      { wch: 6 },
      { wch: 7 },
      { wch: 10 },
      { wch: 20 }
    ];

    var ws = this.sheet_from_array_of_arrays(data);

    console.log("Sheet Name: " + ws_name);
    console.log("Data: "); for (var i = 0; i != data.length; ++i) console.log(data[i]);
    console.log("Columns :"); for (i = 0; i != wscols.length; ++i) console.log(wscols[i]);

    // TODO: construct a workbook 
    /* dummy workbook constructor */
    // function Workbook() {
    //   if (!(this instanceof Workbook)) return new Workbook();
    //   this.SheetNames = [];
    //   this.Sheets = {};
    // }
    var wb: any;

    /* TEST: add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;

    /* TEST: column widths */
    ws['!cols'] = wscols;

    /* write file */
    XLSX.writeFile(wb, 'sheetjs.xlsx');
  }

  /* TODO: date1904 logic */
  private datenum(v, date1904?) {
    if (date1904) v += 1462;
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30)).getTime()) / (24 * 60 * 60 * 1000);
  }

  /* convert an array of arrays in JS to a CSF spreadsheet */
  private sheet_from_array_of_arrays(data, opts?) {
    var ws = {};
    var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
    for (var R = 0; R != data.length; ++R) {
      for (var C = 0; C != data[R].length; ++C) {
        if (range.s.r > R) range.s.r = R;
        if (range.s.c > C) range.s.c = C;
        if (range.e.r < R) range.e.r = R;
        if (range.e.c < C) range.e.c = C;
        var cell = { v: data[R][C], t: '', z: '' };
        if (cell.v == null) continue;
        var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

        /* TEST: proper cell types and value handling */
        if (typeof cell.v === 'number') cell.t = 'n';
        else if (typeof cell.v === 'boolean') cell.t = 'b';
        else if (cell.v instanceof Date) {
          cell.t = 'n'; cell.z = XLSX.SSF._table[14];
          cell.v = this.datenum(cell.v);
        }
        else cell.t = 's';
        ws[cell_ref] = cell;
      }
    }
    /* TEST: proper range */
    if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
    return ws;
  }
}
