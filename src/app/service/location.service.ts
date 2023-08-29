import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../model/location';
import { Section } from '../model/section';
import { Shelf } from '../model/shelf';
import { Author } from '../model/author';
import { Floor } from '../model/floor';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  url: string = String("http://localhost:8091/library/api/v1");

  constructor(private httpClient : HttpClient){ }

  updateFloor(floor:any, id:number) {
    return this.httpClient.put(`${this.url}/floors/floor/${id}`,floor);
  }
  addFloor(floor: any) {
    return this.httpClient.post( `${this.url}/floors`,floor);
  }
  addFloorAuto(floor: Floor) {
    return this.httpClient.put( `${this.url}/floors/autodelete`,floor);
  }
  getFloors(currentPage: number, pageSize: number, search: string) {
    return this.httpClient.get(`${this.url}/floors`, {params:new HttpParams().set( "search",search).set("pageSize",pageSize).set("pageNumber",currentPage)});
  }

  getAllFloors(){
    return this.httpClient.get(`${this.url}/floors`,{params:new HttpParams().set( "search","").set("pageSize",163).set("pageNumber",0)}); 
  }
  getFloor(id: any) {
   return this.httpClient.get(`${this.url}/floors/floor/${id}`);
  }

  updateSection(section:any, id:number) {
    return this.httpClient.put(`${this.url}/sections/section/${id}`,section);
  }
  addSection(section: Section) {

    return this.httpClient.post( `${this.url}/sections`,section);
  }
  addSectionAuto(section: Section) {
    return this.httpClient.put( `${this.url}/sections/autodelete`,section);
  }

  getSections(currentPage: number, pageSize: number, search: string) {
    return this.httpClient.get(`${this.url}/sections`, {params:new HttpParams().set( "search",search).set("pageSize",pageSize).set("pageNumber",currentPage)});
  }
  getSection(id: any) {
   return this.httpClient.get(`${this.url}/sections/section/${id}`);
  }


  updateShelf(shelf:any, id:number) {
    return this.httpClient.put(`${this.url}/shelfs/shelf/${id}`,shelf);
  }
  addShelf(shelf: Shelf) {

    return this.httpClient.post( `${this.url}/shelfs`,shelf);
  }
  addShelfAuto(shelf: Shelf) {
    return this.httpClient.put( `${this.url}/shelfs/autodelete`,shelf);
  }
  getShelfs(currentPage: number, pageSize: number, search: string) {
    return this.httpClient.get(`${this.url}/shelfs`, {params:new HttpParams().set( "search",search).set("pageSize",pageSize).set("pageNumber",currentPage)});
  }
  getShelf(id: any) {
   return this.httpClient.get(`${this.url}/shelfs/shelf/${id}`);
  }

  updateLocation(location:any, id:number) {
    return this.httpClient.put(`${this.url}/locations/location/${id}`,location);
  }
  addLocation(location: Location) {
    return this.httpClient.post( `${this.url}/locations`,location);
  }

  addLocationAuto(location: Location) {
    
    return this.httpClient.put( `${this.url}/locations/autodelete`,location);
  }


  deleteLocation(locationId: number) {
    return this.httpClient.delete(`${this.url}/locations/location/${locationId}`);
  }


  deleteShelf(shelfId: any) {
    return this.httpClient.delete(`${this.url}/shelfs/shelf/${shelfId}`);
  }

  deleteSection(sectionId: any) {
    return this.httpClient.delete(`${this.url}/sections/section/${sectionId}`);
  }

  deleteFloor(floorId: any) {
    return this.httpClient.delete(`${this.url}/floors/floor/${floorId}`);
  }
  getLocations(currentPage: number, pageSize: number, search: string) {
    return this.httpClient.get(`${this.url}/locations`, {params:new HttpParams().set( "search",search).set("pageSize",pageSize).set("pageNumber",currentPage)});
  }
  getLocation(id: any) {
   return this.httpClient.get(`${this.url}/locations/location/${id}`);
  }

  getAuthors(currentPage: number, pageSize: number, search: string) {
    return this.httpClient.get(`${this.url}/authors`, {params:new HttpParams().set( "search",search).set("pageSize",pageSize).set("pageNumber",currentPage)});
  }

  getAllAuthors(){
    return this.httpClient.get(`${this.url}/authors`,{params:new HttpParams().set( "search","").set("pageSize",10000).set("pageNumber",0)}); 
  }

  getAuthor(id: any) {
    return this.httpClient.get(`${this.url}/authors/author/${id}`);
  }
  deleteAuthor(id: any) {
    return this.httpClient.delete(`${this.url}/authors/author/${id}`);
  }
  
  getAllShelfs(sectionName: any) {
    return this.httpClient.get(`${this.url}/shelfs/sections/${sectionName}`); 
  }
  getAllPositions(shelfNo:number){
    return this.httpClient.get(`${this.url}/locations/shelfs/${shelfNo}`);
  }
  getAllSections(floorNo: any) {
    return this.httpClient.get(`${this.url}/sections/floors/${floorNo}`); 

  }
  addAuthor(author: Author) {
    return this.httpClient.post( `${this.url}/authors`,author);
  }

  updateAuthor(author: Author, id: any) {
    return this.httpClient.put(`${this.url}/authors/author/${id}`,author);
  }
}
