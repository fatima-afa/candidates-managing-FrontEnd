export interface Candidat{
  id: string;
  cin: string;
  nom: string;
  prenom: string;
  addresse: string;
  email: string;
  dateNaissance: Date;
  telephone: string;
  mdp: string;
  cne: string;
  ville: string;
  admis: boolean;
    pays : string;
    bac : string;
   paysObtentionBac : string;
    bacAnneObtention : Date;
  // filieresDto: FiliereDto[];
  // diplomesDto: DiplomeDto[];
}
