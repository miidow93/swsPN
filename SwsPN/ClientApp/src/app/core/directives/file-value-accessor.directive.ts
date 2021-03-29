import { Directive, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSharedService } from './../services/data-shared.service';

@Directive({
  selector: '[appFileValueAccessor]',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: FileValueAccessorDirective, multi: true }
  ]
})
export class FileValueAccessorDirective implements ControlValueAccessor {

  onChange: Function;
  files: File[] = [];


  extensions = ['xlsm', 'jh1'];
  checkJH1: boolean = false;
  checkXLSM: boolean = false;
  class_flag: any;

  prdLevelFromFile: string = '';
  prdNumFromFile: string = '';

  prdLevelFromWorkbook: string = '';
  prdNumFromWorkbook: string = '';
  checkCode: string = '';
  areaC: string = '';

  constructor(private sharedService: DataSharedService, private snackBar: MatSnackBar) {
  }

  @HostListener('change', ['$event.target.files']) emitFiles = (event: FileList) => {
    // this.sharedService.prdLevelFromFile$.subscribe(code => this.prdLevelFromFile = code);
    this.sharedService.changeFiles(event);
    for (let i = 0; i < event.length; i++) {
      switch (event.item(i).name.split('.').pop().toLowerCase()) {
        case 'xlsm': {
          this.files.push(event.item(i));
          this.checkXLSM = true;
        }; break;
        case 'jh1': {
          this.files.push(event.item(i));
          this.checkJH1 = true;
        }; break;
      }

      this.onChange(this.files)
    }

    if (!this.checkXLSM && !this.checkJH1) {
      this.openSnackBar('You need to upload both files JH1 and XLSM');
    }

    if (!this.checkJH1) {
      this.openSnackBar('You need to upload JH1 file');
    }

    if (!this.checkXLSM) {
      this.openSnackBar('You need to upload XLSM file');
    }

  }

  @HostListener('blur') onTouched = () => {

  }
  
  writeValue(obj: any): void {
    // throw new Error('Method not implemented.');
    // console.log('Obj: ', obj);

  }
  registerOnChange(fn: any): void {
    // throw new Error('Method not implemented.');
    // console.log('Fn: ', fn);
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
    // console.log('Fn: ', fn);
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
    // console.log('isDisabled: ', isDisabled);
  }

  openSnackBar(message) {
    this.snackBar.open(message);
  }
}

