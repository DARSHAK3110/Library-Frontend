import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url: string = String("http://localhost:8091/api/v1/library");
  constructor(private httpClient: HttpClient) {
  }

  sendFile(file: any, selectedField: string) {
    var f = new FormData();
    f.append("file", file);
    return this.httpClient.post(this.url+"/" + selectedField + "s/excel", f).pipe(catchError(this.handleError));
  }

  fetchData(table: string, pageSize: number, pageNumber: number, uploadId: number) {
    return this.httpClient.get(this.url+"/"+ table + "s/upload/" + uploadId, { params: new HttpParams().set("pageNumber", pageNumber).set("pageSize", pageSize) }).pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error);
  }
}