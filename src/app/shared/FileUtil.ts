import { Injectable } from '@angular/core';

@Injectable()
export class FileUtil {

  isCSVFile(file: File) {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr, tokenDelimeter) {
    const headers = csvRecordsArr[0].split(tokenDelimeter);
    const headerArray = [];
    for (let j = 0; j < headers.length; j++) {
        headerArray.push(headers[j]);
    }
    return headerArray;
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray, headerArray, tokenDelimeter) {
    const dataArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
        const data = csvRecordsArray[i].split(tokenDelimeter);

        const col = [];
        for (let j = 0; j < data.length; j++) {
          const header = headerArray[j];
          col[header] = data[j];
        }
        dataArr.push(col);
    }

    return dataArr;
  }
}
