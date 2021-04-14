import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ErrWrsService } from './../../../core/services/api/err-wrs.service';

@Component({
  selector: 'app-already-reported',
  templateUrl: './already-reported.component.html',
  styleUrls: ['./already-reported.component.scss']
})
export class AlreadyReportedComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['checkCode', 'swsPN', 'operationName',
    'classFlag1', 'classFlag2', 'classFlag3', 'classFlag4', 'classFlag5', 'classFlag6',
    'dateError', 'dateReported']; //, 'drawing'];

  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private errWrsService: ErrWrsService) { }

  ngOnInit(): void {
    this.errWrsService.getAlreadyReported().subscribe((res: any) => {
      console.log('Already Reported: ', res);
      this.dataSource.data = res;
    });
  }

  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    this.dataSource.paginator = this.paginator;
  }

}
