import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EditDialogComponent } from 'src/app/dialogs/edit-dialog/edit-dialog.component';
import { ErrWrsService } from '../../../core/services/api/err-wrs.service';

@Component({
  selector: 'app-not-reported',
  templateUrl: './not-reported.component.html',
  styleUrls: ['./not-reported.component.scss']
})
export class NotReportedComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['checkCode', 'swsPN', 'operationName',
    'classFlag1', 'classFlag2', 'classFlag3', 'classFlag4', 'classFlag5', 'classFlag6',
    'dateError', 'drawing'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private errWrsService: ErrWrsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    // this.errWrsService.sendEmail().subscribe(res => console.log('Email: ', res));
    this.errWrsService.getNotReported().subscribe((res: any) => {
      console.log('Not reported: ', res);
      this.dataSource.data = res;
    });
  }

  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    this.dataSource.paginator = this.paginator;
  }

  openEdit(row) {
    console.log('Row: ', row);
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '50%',
      //disableClose: true,
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      this.getData();
      console.log(result);
    })
  }

  getData() {
    this.errWrsService.getNotReported().toPromise().then((res: any) => {
      console.log('refresh: ', res);
      this.dataSource.data = res;
    });
  }
}
