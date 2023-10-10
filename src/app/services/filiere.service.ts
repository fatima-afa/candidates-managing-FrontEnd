import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import {Filiere} from "../models/Filiere.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FiliereService {
  private baseUrl = 'http://localhost:8085/filiere';

  constructor(private http: HttpClient) { }

  getAllFilieres(): Observable<Filiere[]> {
    return this.http.get<Filiere[]>(`${this.baseUrl}/all`);
  }

  getFiliereById(id: number): Observable<Filiere> {
    return this.http.get<Filiere>(`${this.baseUrl}/findId/${id}`);
  }
  searchFiliere(keyword: string): Observable<Array<Filiere>> {
    return this.http.get<Array<Filiere>>(`${this.baseUrl}/searchfil/${keyword}`);
  }

//  http://localhost:8085/filiere/findFormation/Formation_Continue

  getFiliereByFormation(formation: string): Observable<Filiere[]> {
    return this.http.get<Filiere[]>(`${this.baseUrl}/findFormation/${formation}`);
  }

  addFiliere(filiere: Filiere): Observable<Filiere> {
    return this.http.post<Filiere>(`${this.baseUrl}/add`, filiere);
  }

  deleteFiliere(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

  getFiliereByDepartement(departementId: number): Observable<Filiere[]> {
    const url = `${this.baseUrl}/departement?departementId=${departementId}`;
    return this.http.get<Filiere[]>(url);
  }
}
