import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url:string = String("http://localhost:8095/api/v1/library/");
  constructor(private httpClient: HttpClient) {
  }

  sendFile(file: any, selectedField: string) {
    var f = new FormData();
    f.append("file",file);
    return this.httpClient.post(this.url+selectedField+"s/excel",f);
  }

}