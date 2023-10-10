import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Candidat} from "../models/Candidat.model";
import {Filiere} from "../models/Filiere.model";

@Injectable({
  providedIn: 'root'
})
export class CandidatService {


  private apiUrl = 'http://localhost:8085/candidat';

  constructor(private http: HttpClient) {}
  searchCandidat(keyword: string): Observable<Array<Candidat>> {
    return this.http.get<Array<Candidat>>(`${this.apiUrl}/searchcandid/${keyword}`);
  }
  saveCandidat(candidat: Candidat): Observable<Candidat> {
    return this.http.post<Candidat>(`${this.apiUrl}/add`, candidat);
  }
/*  getCandidatByCin(cin: string): Observable<Candidat> {
    return this.http.get<Candidat>(`${this.apiUrl}/find/${cin}`);
  }*/
  getCandidatsByFiliere(filiereId: number): Observable<Candidat[]> {
    const url = `${this.apiUrl}/filiere/${filiereId}`;
    return this.http.get<Candidat[]>(url);
  }
}
