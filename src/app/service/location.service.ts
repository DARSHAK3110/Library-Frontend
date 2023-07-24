import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Section } from '../model/section';
import { Shelf } from '../model/shelf';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  getAllSections(floorNo: any) {
    return this.httpClient.get(`${this.url}sections/floors/${floorNo}`); 

  }
  url: string = String("http://localhost:8095/library/api/v1/");

  constructor(private httpClient : HttpClient){
    }
  updateFloor(floor:any, id:number) {
    return this.httpClient.put(`${this.url}floors/floor/${id}`,floor);
  }
  addFloor(floor: any) {
    return this.httpClient.post( `${this.url}floors`,floor);
  }

  getFloors(currentPage: number, pageSize: number, search: string) {
    return this.httpClient.get(`${this.url}floors`, {params:new HttpParams().set( "search",search).set("pageSize",pageSize).set("pageNumber",currentPage)});
  }

  getAllFloors(){
    return this.httpClient.get(`${this.url}floors`,{params:new HttpParams().set( "search","").set("pageSize",163).set("pageNumber",0)}); 
  }
  getFloor(id: any) {
   return this.httpClient.get(`${this.url}floors/floor/${id}`);
  }

  updateSection(section:any, id:number) {
    return this.httpClient.put(`${this.url}sections/section/${id}`,section);
  }
  addSection(section: Section) {

    return this.httpClient.post( `${this.url}sections`,section);
  }

  getSections(currentPage: number, pageSize: number, search: string) {
    return this.httpClient.get(`${this.url}sections`, {params:new HttpParams().set( "search",search).set("pageSize",pageSize).set("pageNumber",currentPage)});
  }
  getSection(id: any) {
   return this.httpClient.get(`${this.url}sections/section/${id}`);
  }


  updateShelf(shelf:any, id:number) {
    return this.httpClient.put(`${this.url}shelfs/shelf/${id}`,shelf);
  }
  addShelf(shelf: Shelf) {

    return this.httpClient.post( `${this.url}shelfs`,shelf);
  }

  getShelfs(currentPage: number, pageSize: number, search: string) {
    return this.httpClient.get(`${this.url}shelfs`, {params:new HttpParams().set( "search",search).set("pageSize",pageSize).set("pageNumber",currentPage)});
  }
  getShelf(id: any) {
   return this.httpClient.get(`${this.url}shelfs/shelf/${id}`);
  }
}
