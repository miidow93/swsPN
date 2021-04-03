import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataSharedService } from './../../core/services/data-shared.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['checkCode', 'swsPN', 'operationName',
    'classFlag1', 'classFlag2', 'classFlag3', 'classFlag4', 'classFlag5', 'classFlag6',
    'dateError', 'drawing'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  // public forecasts: WeatherForecast[];

  /*constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }*/


  constructor(private sharedService: DataSharedService) {

  }

  ngOnInit(): void {
    this.sharedService.reported$.subscribe(res => {
      console.log('Reported: ', res);
      this.dataSource.data = res;
    });
  }

  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    this.dataSource.paginator = this.paginator;
  }
}
