import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrWrsService } from 'src/app/core/services/api/err-wrs.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  formGroup: FormGroup;
  plans;
  fileToUpload;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    private formBuilder: FormBuilder,
    private errWrsService: ErrWrsService) { }

  ngOnInit(): void {
    console.log('edit dialog component: ', this.data);
    this.formGroup = this.formBuilder.group({
      file: ['', Validators.required]
    });
  }



  drawing() {
    let formData = new FormData();
    if (this.formGroup.invalid) {
      return;
    }

    if (this.plans == '') {
      return;
    }
    // console.log('Plans: ', this.plans);
    const files: File = this.formGroup.value.file;

    formData.append('plans', this.fileToUpload);

    // formData.append('id', this.data.id);
    formData.append('error', JSON.stringify(this.data));
    console.log('Plans: ', formData.get('plans'));
    this.errWrsService.editErrWrs(this.data.id, formData).subscribe(res => {
      console.log('Res: ', res);
      this.dialogRef.close();
    });
  }

  onChange(files: FileList) {
    // console.log('Event: ', file);

    if (files.length === 0)
      return;

    this.fileToUpload = files.item(0);

    var reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = (e) => {
      this.plans = reader.result;
      console.log(reader.result);
    }


  }
}
