import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { FileUtil } from './shared/FileUtil';

@Component({
  selector: 'ct-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<object>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fileUtil: FileUtil) { }

  fileChanged(e) {
    const file = e.target.files[0];
    if (!this.fileUtil.isCSVFile(file)) {
      alert('Please import valid .csv file.');
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = (data) => {
      const csvData = fileReader.result;
      const csvRecordsArray = csvData.split(/\r\n|\n/);

      this.displayedColumns = this.fileUtil.getHeaderArray(csvRecordsArray, ',');
      this.dataSource = new MatTableDataSource(this.fileUtil.getDataRecordsArrayFromCSVFile(csvRecordsArray, this.displayedColumns, ','));

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    };
  }
}
