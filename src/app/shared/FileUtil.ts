import { Column } from './Column';
import { Injectable } from '@angular/core';

@Injectable()
export class FileUtil {

  isCSVFile(file: File) {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr, tokenDelimeter) {
    const headers = csvRecordsArr[0].split(tokenDelimeter);
    const headerArray: Column[] = [];
    for (let j = 0; j < headers.length; j++) {
        headerArray.push(new Column(headers[j], false));
    }
    return headerArray;
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray, headerArray: Column[], tokenDelimeter) {
    const dataArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
        const data = csvRecordsArray[i].split(tokenDelimeter);

        const col = [];
        for (let j = 0; j < data.length; j++) {
          const header = headerArray[j];
          col[header.value] = data[j];
        }
        dataArr.push(col);
    }

    console.log(dataArr);

    return dataArr;
  }
}
