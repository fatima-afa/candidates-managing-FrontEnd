import {Departement} from "./Departement.model";

export interface Filiere {
  id: number;
  intitule: string;
  typeFormation: string;
  typeDiplomeAObtenir: string;
  departementDto: Departement;
}
