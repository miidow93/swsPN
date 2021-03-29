import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ErrWrsService } from '../../core/services/api/err-wrs.service';
import { FileValueAccessorDirective } from '../../core/directives/file-value-accessor.directive';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Errors } from '../../core/models/errors';
import { DataSharedService } from '../../core/services/data-shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'size', 'lastModified'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(FileValueAccessorDirective, { static: false }) fvad: FileValueAccessorDirective;

  file: File;

  formGroup: FormGroup;

  class_flag;
  errors: Errors[] = [];
  postedErrors: Errors[] = [];
  files: File[] = [];


  swsPnFromDB = [];
  // errWrs;

  constructor(private sharedService: DataSharedService,
    private errWrsService: ErrWrsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // this.errWrsService.getTest().subscribe(res => console.log(res));

    // var WinNetwork = new Window.ActiveXObject("WScript.Network");
    // alert(WinNetwork.UserName); 

    this.sharedService.errors$.subscribe((res: Errors[]) => this.errors = res);
    // this.errWrsService.getAllErrWrs().subscribe((res: string[]) => this.swsPnFromDB = res);

    this.formGroup = this.formBuilder.group({
      file: ['', Validators.required]
    });

    this.formGroup.controls['file'].valueChanges.subscribe((value: File[]) => {
      console.log('Values: ', value);
      this.dataSource.data = value;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  compare() {
    console.log('This Errors: ', this.errors);
    console.log('This Checked: ', this.sharedService.checked());
    if (this.formGroup.invalid) {
      this.openSnackBar('You need to upload files');
      return;
    }
    if (this.errors && this.errors.length > 0) {
      if (this.sharedService.checked()) {

        console.log('Posted Errors: ', this.errors);
        let formData = new FormData();
        console.log(this.formGroup.value.file);
        const files: File[] = this.formGroup.value.file;
        if (files && files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
          }
          console.log('FormData: ', formData);
        }
        // formData.append('files', files[0]);
        const data = {
          errors: this.errors,
          files: files
        };
        let checkOpNum = true;
        // this.errors[0].operationNum = '';
        for (let i = 0; this.errors && i < this.errors.length; i++) {
          if (this.errors[i].operationNum === '' || this.errors[i].operationNum === null) {
            checkOpNum = false;
            break;
          }
        }

        if (checkOpNum) {
          // alert('All Op Num is set');
          formData.append('errors', JSON.stringify(this.errors));
          this.errWrsService.postErrWrs(formData).subscribe(res => {
            console.log('Post: ', res);
            this.sharedService.changeReported(res);
            this.fvad.files = [];
            this.dataSource.data = [];
            this.sharedService.changeFiles(null);

            // this.formGroup.controls['file'].patchValue(null);
            this.router.navigate(['/reported']);
          });
        } else {
          this.openSnackBar('Not all operation numbers are set, JH1 file is missing');
          // alert('Num Op Is empty');
        }

        // 

        // console.log('Data: ', data);
        // 
      } else {
        this.openSnackBar('Is not matched');
        this.fvad.files = [];
        this.dataSource.data = [];
        this.sharedService.changeFiles(null);
        // this.formGroup.controls['file'].setValue(null);
      }
    } else {
      this.openSnackBar('Error 23 and 24 not found');
      this.fvad.files = [];
      this.dataSource.data = [];
      this.sharedService.changeFiles(null);
    }

  }

  openSnackBar(message) {
    this.snackBar.open(message);
  }

  bytesToSize(bytes) {
    // var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 0;

    var totalSizeKB = bytes / Math.pow(1024, 1);
    // var totalSizeMB = totalsize / Math.pow(1024, 2)
    // var totalSizeGB = totalsize / Math.pow(1024, 3)
    // var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return totalSizeKB; // Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }
}
