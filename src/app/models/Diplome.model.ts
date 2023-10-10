import {Candidat} from "./Candidat.model";
import {Fichier} from "./Fichier.model";
import {Filiere} from "./Filiere.model";

export interface Diplome {
  id: number;
  typeDiplome: string;
  specialiteDiplome: string;
  anneeObtention: Date;
  etablissement: string;
  candidatDto: Candidat;
  // filieresDto: FiliereDto[];
  fichierDto: Fichier;
  filiereDto : Filiere;
  universite : string;
  // notesSemesterDto: NotesSemesterDto[];
}
