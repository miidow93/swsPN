import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Errors } from '../models/errors';

import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class DataSharedService {

  
  // File
  private prdLevelFromFile: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private prdNumFromFile: BehaviorSubject<string> = new BehaviorSubject<string>('');

  // Workbook
  private prdLevelFromWorkbook: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private prdNumFromWorkbook: BehaviorSubject<string> = new BehaviorSubject<string>('');


  // Exists Code
  private checkPrdLvl: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  private checkPrdNum: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  // 
  private files: BehaviorSubject<File[]> = new BehaviorSubject<File[]>(null);
  private errors: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private reported: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  prdLevelFromFile$ = this.prdLevelFromFile.asObservable();
  prdNumFromFile$ = this.prdNumFromFile.asObservable();

  prdLevelFromWorkbook$ = this.prdLevelFromWorkbook.asObservable();
  prdNumFromWorkbook$ = this.prdNumFromWorkbook.asObservable();

  checkPrdLvl$ = this.checkPrdLvl.asObservable();
  checkPrdNum$ = this.checkPrdNum.asObservable();

  files$ = this.files.asObservable();
  errors$ = this.errors.asObservable();
  reported$ = this.reported.asObservable();

  public firstJH1 = true;

  constructor() { }


  changeFiles(value: FileList) {
    console.log('Files change: ', value);
    if (value !== null) {
      let fileArray = Array.from(value);
      // for (let i = 0; i < fileArray.length; i++) {
      const xlsm = fileArray.filter(x => x.name.split('.').pop().toLowerCase() == 'xlsm');
      const jh1 = fileArray.filter(x => x.name.split('.').pop().toLowerCase() == 'jh1');
      console.log('Inside File Array');
      if (xlsm.length > 0) {
        // var reader = new FileReader();
        // reader.readAsArrayBuffer(xlsm[0]);
        console.log('Inside XLSM Array');
        let xlsmReader = new FileReader();
        xlsmReader.readAsArrayBuffer(xlsm[0]);
        xlsmReader.onload = (e) => {
          var arrayBuffer = xlsmReader.result;
          var data = new Uint8Array(arrayBuffer as ArrayBuffer);
          var arr = new Array();

          for (var i = 0; i != data.length; ++i) {
            arr[i] = String.fromCharCode(data[i]);
          }
          var bstr = arr.join("");
          var workbook = XLSX.read(bstr, { type: 'binary' });
          var first_sheet_name = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[first_sheet_name];
          var prdNum = worksheet['E8'];
          var prdLvl = worksheet['L8'];
          var cust = worksheet['B8'];
          var area = worksheet['O8'];

          this.changePrdNumFromWorkbook(this.removeSpacesBetweenWords(prdNum.v));
          this.changePrdLvlFromWorkbook(this.removeSpacesBetweenWords(prdLvl.v));

          var worksheet_class_flag = workbook.Sheets['Class Flag, Mass Unregist List'];
          var class_flag_data: Errors[] = XLSX.utils.sheet_to_json(worksheet_class_flag, { raw: true })
            .filter(x => x['__EMPTY'] == '23' || x['__EMPTY'] == '24')
            .map(el => {
              return {
                swsPn: el['__EMPTY_4'] ? el['__EMPTY_4'] : '',
                swsName: el['__EMPTY_5'] ? el['__EMPTY_5'] : '',
                partType: el['__EMPTY_7'] ? el['__EMPTY_7'] : '',
                classFlag1: el['__EMPTY_8'] ? el['__EMPTY_8'] : '',
                classFlag2: el['__EMPTY_9'] ? el['__EMPTY_9'] : '',
                classFlag3: el['__EMPTY_10'] ? el['__EMPTY_10'] : '',
                classFlag4: el['__EMPTY_11'] ? el['__EMPTY_11'] : '',
                classFlag5: el['__EMPTY_12'] ? el['__EMPTY_12'] : '',
                classFlag6: el['__EMPTY_13'] ? el['__EMPTY_13'] : '',
                tempMh: el['__EMPTY_14'] ? el['__EMPTY_14'].trim() : '',
                checkCode: el['__EMPTY'] ? el['__EMPTY'] : '',
                prdNum: prdNum.v,
                prdLevel: prdLvl.v,
                areaC: area.v,
                custC: cust.v
              };
            });
          console.log('Class Flag Data: ', class_flag_data);
          // if (class_flag_data.length > 0) {
            if (jh1.length > 0) {
              console.log('Inside JH1 Array');
              let i = 0;
              let cf: Errors[] = [];
              for (let j = 0; j < jh1.length; j++) {
                let index = 0;

                while (i < class_flag_data.length) {
                  console.log('Inside While loop');
                  let jh1Reader = new FileReader();
                  jh1Reader.onload = (e) => {
                    var arr = (jh1Reader.result as string).split('\n');
                    if (this.firstJH1) {
                      /*console.log('Index J: ', this.firstJH1);
                      console.log('Index J Prd Num: ', this.removeSpacesBetweenWords(arr[7].split(";")[8]));
                      console.log('Index J Prd Lvl: ', this.removeSpacesBetweenWords(arr[8].split(";")[8]));
                      console.log('Index J: ', j);*/
                      this.changePrdNumFromFile(this.removeSpacesBetweenWords(arr[7].split(";")[8]));
                      this.changePrdLvlFromFile(this.removeSpacesBetweenWords(arr[8].split(";")[8]));
                      this.firstJH1 = false;
                      // return;
                    }
                    // console.log('Inside JH1 Reader', class_flag_data[index].swsPn);
                    if (arr.find(x => x.includes(class_flag_data[index].swsPn))) {
                      // console.log('Inside Search');
                      let getIndexOfSwsPartNo = arr.find(x => x.includes(class_flag_data[index].swsPn)).split(';').indexOf(class_flag_data[index].swsPn);
                      let codeOperation = arr.find(x => x.includes(class_flag_data[index].swsPn)).split(';')[getIndexOfSwsPartNo + 2];
                      class_flag_data[index].operationNum = codeOperation;
                      // console.log('OpNum: ', class_flag_data[index].operationNum);
                      const error: Errors = new Errors();
                      error.swsPn = class_flag_data[index].swsPn;
                      error.swsName = class_flag_data[index].swsName;
                      error.partType = class_flag_data[index].partType;
                      error.classFlag1 = class_flag_data[index].classFlag1;
                      error.classFlag2 = class_flag_data[index].classFlag2;
                      error.classFlag3 = class_flag_data[index].classFlag3;
                      error.classFlag4 = class_flag_data[index].classFlag4;
                      error.classFlag5 = class_flag_data[index].classFlag5;
                      error.classFlag6 = class_flag_data[index].classFlag6;
                      error.tempMh = class_flag_data[index].tempMh;
                      error.operationNum = codeOperation;
                      error.prdNum = class_flag_data[index].prdNum;
                      error.prdLevel = class_flag_data[index].prdLevel;
                      error.checkCode = class_flag_data[index].checkCode;
                      error.areaC = class_flag_data[index].areaC;
                      error.custC = class_flag_data[index].custC;
                      if (localStorage.getItem('username') != '') {
                        error.winUserID = localStorage.getItem('username');
                      }
                      cf.push(error);
                    }
                    index++;
                    this.errors.next(cf);
                  }
                  jh1Reader.readAsText(jh1[j]);
                  i++;
                }
              }
            }
          // }

        }
      }
      //}
      this.files.next(fileArray);
    } else {
      this.changePrdLvlFromFile('');
      this.changePrdNumFromFile('');
      this.changePrdLvlFromWorkbook('');
      this.changePrdNumFromWorkbook('');
      this.files.next(null);
    }

  }

  changePrdLvlFromFile(value: string) {
    console.log('PrdLvl from File: ', value);
    this.prdLevelFromFile.next(value);
  }

  changePrdNumFromFile(value: string) {
    console.log('Prd Num from File: ', value);

    this.prdNumFromFile.next(value);
  }

  changePrdLvlFromWorkbook(value: string) {
    console.log('Prd Lvl from Workbook: ', value);
    if (this.prdLevelFromFile.getValue() === value) {
      // console.log('Matched');
      this.checkPrdLvl.next(true);
    } else this.checkPrdLvl.next(false);
    this.prdLevelFromWorkbook.next(value);
  }

  changePrdNumFromWorkbook(value: string) {
    console.log('Prd Num from Workbook: ', value);
    if (this.prdNumFromFile.getValue() === value) {
      // console.log('Matched');
      this.checkPrdNum.next(true);
    } else this.checkPrdNum.next(false);
    this.prdNumFromWorkbook.next(value);
  }

  checked() {
    // return (this.checkPrdNum.getValue() && this.checkPrdLvl.getValue()) === true;
    console.log('Prd Lvl F: ', this.prdLevelFromFile.getValue());
    console.log('Prd Lvl W: ', this.prdLevelFromWorkbook.getValue());
    console.log('Prd Num F: ', this.prdNumFromFile.getValue());
    console.log('Prd Num W: ', this.prdNumFromWorkbook.getValue());

    if (this.prdLevelFromFile.getValue() === '') return false;


    return (this.prdNumFromFile.getValue() === this.prdNumFromWorkbook.getValue()) && (this.prdLevelFromFile.getValue() === this.prdLevelFromWorkbook.getValue());
  }

  changeReported(value: any) {
    this.reported.next(value);
  }

  removeSpacesBetweenWords(s: string) {
    // console.log('Space ', s);
    return s.replace(/ +/g, '');
  }

}
