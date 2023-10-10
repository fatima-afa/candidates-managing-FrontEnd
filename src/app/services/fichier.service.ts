import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Fichier} from "../models/Fichier.model";

@Injectable({
  providedIn: 'root'
})
export class FichierService {
  private apiUrl = 'http://localhost:8085/fichier';

  constructor(private http: HttpClient) {}
  /*addFichier(fichier: Fichier): Observable<Fichier> {
    return this.http.post<Fichier>(`${this.apiUrl}/add`, fichier);
  }*/
  /*upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('fichier', file);

    const req = new HttpRequest('POST', `${this.apiUrl}/addFile`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }*/
  getFichierById(id: string): Observable<Fichier> {
    const url = `${this.apiUrl}/find/${id}`;
    return this.http.get<Fichier>(url);
  }
  upload(file: File): Promise<any> {
    const formData: FormData = new FormData();
    formData.append('fichier', file);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    if (file.size > 4 * 1024 * 1024) {
      console.error('La taille du fichier dépasse 4 Mo');
      return Promise.reject('La taille du fichier dépasse 4 Mo');
    }

    return this.http.post(`${this.apiUrl}/addFile`, formData, { headers: headers})
      .toPromise()
      .then(response => {
        console.log('Fichier téléchargé avec succès:', response);
        // Traitez la réponse du serveur ici, par exemple, mettez à jour l'affichage avec l'emplacement du fichier téléchargé
        return response;
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors du téléchargement du fichier:', error);
        // Gérez les erreurs ici, par exemple, affichez un message d'erreur à l'utilisateur
        throw error;
      });
  }




  private handleError(error: any): Promise<any> {
    console.error('Une erreur s\'est produite lors du téléchargement du fichier', error);
    return Promise.reject(error.message || error);
  }


}
