import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Departement } from "../../models/Departement.model";
import { Filiere } from "../../models/Filiere.model";
import { Candidat } from "../../models/Candidat.model";
import { DepartementService } from "../../services/departement.service";
import { FiliereService } from "../../services/filiere.service";
import { CandidatService } from "../../services/candidat.service";

import * as XLSX from 'xlsx';
import {DiplomeService} from "../../services/diplome.service";
import {Diplome} from "../../models/Diplome.model";



@Component({
    selector: 'app-direction-pedagogique',
    templateUrl: './direction-pedagogique.component.html',
    styleUrls: ['./direction-pedagogique.component.css']
})
export class DirectionPedagogiqueComponent implements OnInit {
    departements: Departement[] = [];
    searchResults: Filiere[]= [];
    searchResults2: Candidat[]= [];

    filieresByDepartement: { [key: number]: Filiere[] } = {};
    candidatsByFiliere: { [key: number]: Candidat[] } = {};
    diplome!: Diplome;
    typeDiplome : string = '';
    diplomesByCandidat: { [key: string]: Diplome } = {};


    constructor(
        private departementService: DepartementService,
        private filiereService: FiliereService,
        private candidatService: CandidatService,
        private diplomeService: DiplomeService
    ) {}

    ngOnInit(): void {
        this.getAllDepartements();
    }

    getAllDepartements(): void {
        this.departementService.getAllDepartements().subscribe(
            (departements: Departement[]) => {
                this.departements = departements;
                for (const departement of departements) {
                    this.getFilieresAndCandidatsByDepartement(departement.id);
                }
            },
            (error: any) => {
                console.error('Une erreur s\'est produite lors de la récupération des départements :', error);
            }
        );
    }

    getFilieresAndCandidatsByDepartement(departementId: number): void {
        this.filiereService.getFiliereByDepartement(departementId).subscribe(
            (filieres: Filiere[]) => {
                this.filieresByDepartement[departementId] = filieres;

                for (const filiere of filieres) {
                    this.getCandidatsByFiliere(filiere.id);
                }
            },
            (error: any) => {
                console.error('Une erreur s\'est produite lors de la récupération des filières :', error);
            }
        );
    }

    getCandidatsByFiliere(filiereId: number): void {
        this.candidatService.getCandidatsByFiliere(filiereId).subscribe(
            (candidats: Candidat[]) => {
                this.candidatsByFiliere[filiereId] = candidats;
                for (const candidat of candidats) {
                    this.obtenirDiplome(candidat.id);
                }
            },
            (error: any) => {
                console.error('Une erreur s\'est produite lors de la récupération des candidats :', error);
            }
        );
    }

    formatDate(date: Date): string {
        const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        return formattedDate.replace(/\//g, '-'); // Replace slashes with dashes for Excel compatibility
    }

    exportToExcel(filiere: Filiere) {
        const candidats = this.candidatsByFiliere[filiere.id];

        // Prepare the data for export
        const data = [
            [
                'CIN',
                'Nom',
                'Prénom',
                'Adresse',
                'Email',
                'Date de Naissance',
                'Téléphone',
                'CNE',
                "Pays",
                'Ville',
                'Diplome',
                'Baccalauréat',
                "Année d'Obtention du Bac",
                "Pays d'Obtention du Bac"
            ],
            ...candidats.map(candidat => [
                candidat.cin,
                candidat.nom,
                candidat.prenom,
                candidat.addresse,
                candidat.email,
                this.formatDate(candidat.dateNaissance),
                candidat.telephone,
                candidat.cne,
                candidat.pays,
                candidat.ville,
                this.diplomesByCandidat[candidat.id]?.typeDiplome,
                candidat.bac,
                candidat.bacAnneObtention ? new Date(candidat.bacAnneObtention).getFullYear() : '',
                candidat.paysObtentionBac
            ])
        ];

        // Create a new workbook
        const workbook: XLSX.WorkBook = XLSX.utils.book_new();
        const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidats');

        // Generate the Excel file
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Download the file
        const link: HTMLAnchorElement = document.createElement('a');
        link.href = URL.createObjectURL(excelData);
        link.download = 'candidats de la '+filiere.intitule;
        link.click();
    }


    searchFiliere(keyword: string) {
        console.log('Mot-clé de recherche de filière:', keyword);

        this.filiereService.searchFiliere(keyword).subscribe(
            (filieres: Filiere[]) => {
                // Filtrer les filières selon le mot-clé
                const filieresFiltrees = filieres.filter(filiere =>
                    filiere.intitule.toLowerCase().includes(keyword.toLowerCase())
                );

                // Affecter les filières filtrées à la variable searchResults
                this.searchResults = filieresFiltrees;
                console.log('Résultats de recherche de filière:', filieresFiltrees);


            },
            (error: any) => {
                // Gérer les erreurs de recherche
                console.error('Erreur lors de la recherche de filière:', error);
            }
        );
    }   searchCandidat(keyword: string) {
        console.log('Mot-clé de recherche de filière:', keyword);

        this.candidatService.searchCandidat(keyword).subscribe(
            (candidats: Candidat[]) => {
                // Filtrer les filières selon le mot-clé
                const candidatsFiltrees = candidats.filter(candidat =>
                    candidat.nom.toLowerCase().includes(keyword.toLowerCase())
                );

                // Affecter les filières filtrées à la variable searchResults
                this.searchResults2 = candidatsFiltrees;
                console.log('Résultats de recherche de candidat:', candidatsFiltrees);


            },
            (error: any) => {
                // Gérer les erreurs de recherche
                console.error('Erreur lors de la recherche de candidat:', error);
            }
        );
    }

    obtenirDiplome(idCandidat: string): void {
            this.diplomeService.getDiplomeByCandidat(idCandidat).subscribe(
                (diplome: Diplome) => {
                    this.diplomesByCandidat[idCandidat] = diplome;
                },
                (error: any) => {
                    console.error('Une erreur s\'est produite lors de la récupération du diplôme :', error);
                }
            );
        }
        }

