import { Component, OnInit } from '@angular/core';
import {Diplome} from "../../models/Diplome.model";
import {DiplomeService} from "../../services/diplome.service";
import {PassParamService} from "../../services/pass-param.service";

@Component({
  selector: 'app-mes-candidatures',
  templateUrl: './mes-candidatures.component.html',
  styleUrls: ['./mes-candidatures.component.css']
})
export class MesCandidaturesComponent implements OnInit {
  cin: string="";


  diplomes: Diplome[] = [];

  constructor(private diplomeService: DiplomeService,
              private passparam : PassParamService
  ) { }

  ngOnInit() {
   // this.getAllCandidatures();
   // this.cin = 'JA186844'; // Remplacez 'votre_cin' par le CIN approprié
    this.cin = this.passparam.getCin();
    this.diplomeService.getAllCandidatures(this.cin).subscribe(
      (data: Diplome[]) => {
        this.diplomes = data;
        console.log("mes candida ", data);
        console.log("hahaeeeze ", this.diplomes[0].candidatDto.cin);

      },
      (error) => {
        console.log(error);
        console.log("hahaeeeze frm error ", this.diplomes[0].candidatDto.cin);

      }
    );

  }

  getAllCandidatures() {
    this.diplomeService.getAllCandidatures(this.cin).subscribe(
      (data: Diplome[]) => {
        this.diplomes = data;
        console.log("mes candidats ", data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  supprimerDiplome(id: number) {
    // Code pour supprimer le diplôme avec l'ID spécifié
  }
}
