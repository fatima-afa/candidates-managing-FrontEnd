import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import {Diplome} from "../models/Diplome.model";
import {Candidat} from "../models/Candidat.model";
import {Fichier} from "../models/Fichier.model";

@Injectable({
  providedIn: 'root'
})
export class DiplomeService {
  private baseUrl = 'http://localhost:8085/diplome';

  constructor(private http: HttpClient) { }

  getAllDiplomes(): Observable<Diplome[]> {
    return this.http.get<Diplome[]>(`${this.baseUrl}/all`);
  }

  getDiplomeById(id: number): Observable<Diplome> {
    return this.http.get<Diplome>(`${this.baseUrl}/find/${id}`);
  }

  addDiplome(diplome: Diplome): Observable<Diplome> {
    return this.http.post<Diplome>(`${this.baseUrl}/add`, diplome);
  }

  updateDiplome(diplome: Diplome, candidat: Candidat, fichier: Fichier): Observable<Diplome> {
    return this.http.put<Diplome>(`${this.baseUrl}/update`, { diplome, candidat, fichier });
  }

  deleteDiplome(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }
  getAllCandidatures(cin: string): Observable<Diplome[]> {
    return this.http.get<Diplome[]>(`${this.baseUrl}/allCandidatures/${cin}`);
  }
  getDiplomeByCandidat(idCandidat: string): Observable<Diplome> {
    const url = `${this.baseUrl}/diplomes/${idCandidat}`;
    return this.http.get<Diplome>(url);
  }
}
