import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import {Departement} from "../models/Departement.model";

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private baseUrl = 'http://localhost:8085/departement';

  constructor(private http: HttpClient) { }

  getAllDepartements(): Observable<Departement[]> {
    return this.http.get<Departement[]>(`${this.baseUrl}/all`);
  }

  getDepartementById(id: number): Observable<Departement> {
    return this.http.get<Departement>(`${this.baseUrl}/find/${id}`);
  }

  addDepartement(departement: Departement): Observable<Departement> {
    return this.http.post<Departement>(`${this.baseUrl}/add`, departement);
  }

  updateDepartement(departement: Departement): Observable<Departement> {
    return this.http.put<Departement>(`${this.baseUrl}/update`, departement);
  }

  deleteDepartement(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }
}
