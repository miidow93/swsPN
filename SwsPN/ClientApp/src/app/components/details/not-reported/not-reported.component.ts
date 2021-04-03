import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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

  constructor(private errWrsService: ErrWrsService) { }

  ngOnInit(): void {
    this.errWrsService.getNotReported().subscribe((res: any) => {
      console.log('Not reported: ', res);
      this.dataSource.data = res;
    });
  }

  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    this.dataSource.paginator = this.paginator;
  }

  edit(row) {

  }
}
