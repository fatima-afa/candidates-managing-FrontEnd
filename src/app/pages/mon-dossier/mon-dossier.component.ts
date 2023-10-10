import {Component, ElementRef, Renderer2, OnInit, NgModule} from '@angular/core';
import {
  FormControl,
  FormGroup,

  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Candidat } from "../../models/Candidat.model";
import {DiplomeService} from "../../services/diplome.service";
import {Observable} from "rxjs";
import {CandidatService} from "../../services/candidat.service";
import {Diplome} from "../../models/Diplome.model";
import {Fichier} from "../../models/Fichier.model";
import {FichierService} from "../../services/fichier.service";
import { ActivatedRoute } from '@angular/router';
import {FiliereService} from "../../services/filiere.service";
import {Filiere} from "../../models/Filiere.model";
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {NoteSemester} from "../../models/notesSemester.model";
import {NotesSemesterService} from "../../services/notes-semester.service";
import {PassParamService} from "../../services/pass-param.service";
import {countries, Country} from "countries-list";




//import {diplome} from "../../models/diplome.model"


@Component({
  selector: 'app-mon-dossier',
  templateUrl: './mon-dossier.component.html',
  styleUrls: ['./mon-dossier.component.css'],
})
export class MonDossierComponent implements OnInit{
  siteKey:string;

  countriesList: Country[] = [];
  bacOptions = [
    { value: 'Sciences Mathématiques A', label: 'Sciences Mathématiques A' },
    { value: 'Sciences Mathématiques B', label: 'Sciences Mathématiques B' },
    { value: 'Sciences de la Vie et de la Terre', label: 'Sciences de la Vie et de la Terre' },
    { value: 'Sciences Physiques et Chimiques', label: 'Sciences Physiques et Chimiques' },
    { value: 'Sciences Économiques', label: 'Sciences Économiques' },
    { value: 'Bac Technique', label: 'Bac Technique' }
  ];
  showBacAutre = false;
  onBacChange(event: any) {
    const value = event.target.value;
    this.showBacAutre = (value === 'Autre');
  }
  constructor(

    private router: Router,
    private messageService: MessageService,
    private http: HttpClient,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private diplomeService: DiplomeService,
    private candidatService : CandidatService,
    private fichierService : FichierService,
    private route: ActivatedRoute,
    private filierService : FiliereService,
    private notesService : NotesSemesterService,
    private passparamService  : PassParamService,
  ) { this.siteKey="6Ldm74smAAAAAHuGUUMeGicZKZ6oIpQCrhLm5Djp" }

  step1: boolean = true;
  step2: boolean = false;
  progress: number = 0;
  selectedFile: File | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  typeDiplomeAObtenir : string="";
//accountObservable! : Observable<diplome>

//candida: candidat = new candidat();
public diplome1 : Diplome={
  id: 6,
  typeDiplome: "DUT",
  specialiteDiplome: "string",
  anneeObtention: new Date("2023-06-11"),
  etablissement: "string",
  universite: "string",
  candidatDto: {
    id: "vava",
    cin: "string",
    nom: "string",
    prenom: "string",
    addresse: "string",
    email: "string",
    dateNaissance: new Date("2023-06-11"),
    telephone: "string",
    mdp: "string",
    cne: "string",
    ville: "string",
    admis: true,
    pays: "string",
    bac: "string",
    paysObtentionBac: "string",
    bacAnneObtention: new Date("2023-06-11")
  },
  filiereDto: {
    id: 1,
    intitule: "string",
    typeFormation: "Formation_Continue",
    typeDiplomeAObtenir: "License",
    departementDto: {
      id: 1,
      intitule: "string",
    }
  },
  fichierDto: {
    id: "va",
    chemin: "string"
  }
}
  public candidat: Candidat={
    id: '',
    cin: '',
    nom: '',
    prenom: '',
    addresse: '',
    email: '',
    dateNaissance: new Date(),
    telephone: '',
    mdp: '',
    cne: '',
    ville: '',
    admis: false,
    pays: '',
    bac: '',
    paysObtentionBac: '',
    bacAnneObtention: new Date()
  };
  public candidats: Candidat[] = [];
  public diplomesC : Diplome[] = [];
 public diplomeCandidat : Diplome | any= {};
public note1 : NoteSemester | any;
public note2 : NoteSemester | any;
public note3 : NoteSemester | any ;
public note4 : NoteSemester | any;
public note5 : NoteSemester | any;
public note6 : NoteSemester | any;
  public noteSemester! : NoteSemester;
public candidatTest!:Candidat;
  public filier! : Filiere;
 // public id!:string;

  public fichier : Fichier={
    id:"aa",
    chemin:"chemin"
  };
  candidatFormGroup: FormGroup = new FormGroup({
    nom: new FormControl("", [Validators.required]),
    prenom: new FormControl("", [Validators.required]),
    cin: new FormControl("", [Validators.required]),
    cne: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    telephone: new FormControl("", [Validators.required]),
    adresse: new FormControl("", [Validators.required]),
    ville: new FormControl("", [Validators.required]),
    ville2: new FormControl(""),
    dateNaissance: new FormControl("", [Validators.required]),
    bac: new FormControl("", [Validators.required]),
    bac2: new FormControl(""),
    bacAnne: new FormControl("", [Validators.required]),
    pays: new FormControl("", [Validators.required]),
    pays2: new FormControl(""),
    paysObtentionBac: new FormControl("", [Validators.required]),
    paysObtentionBac2: new FormControl("")
   // diplome: new FormArray([this.getDiplomeFields()])
  });

  NotesFormGroup: FormGroup = new FormGroup({
    note1: new FormControl('', [Validators.required, Validators.min(0), Validators.max(20)]),
    note2: new FormControl("", [Validators.required, Validators.min(0), Validators.max(20)]),
    note3: new FormControl("", [Validators.required, Validators.min(0), Validators.max(20)]),
    note4: new FormControl("", [Validators.required, Validators.min(0), Validators.max(20)]),
    note5: new FormControl("", [Validators.required, Validators.min(0), Validators.max(20)]),
    note6: new FormControl("", [Validators.required, Validators.min(0), Validators.max(20)]),
  });
  /*public getCandidats(): void {
    this.candidatService.getAllCandidats().subscribe(
      (response: Candidat[]) => {
        this.candidats = response;
        console.log(this.candidats);
      },
      (error: HttpErrorResponse) => {

      }

    );

  }*/


  handleSuivant(){
    this.candidat.nom = this.candidatFormGroup.get('nom')?.value;
    this.candidat.prenom = this.candidatFormGroup.get('prenom')?.value;
    this.candidat.cin = this.candidatFormGroup.get('cin')?.value;
    this.candidat.cne = this.candidatFormGroup.get('cne')?.value;
    this.candidat.email = this.candidatFormGroup.get('email')?.value;
    this.candidat.telephone = this.candidatFormGroup.get('telephone')?.value;
    this.candidat.addresse = this.candidatFormGroup.get('adresse')?.value;
    this.candidat.dateNaissance = this.candidatFormGroup.get('dateNaissance')?.value;
    this.candidat.bac = this.candidatFormGroup.get('bac')?.value;
    if(this.candidatFormGroup.get('bac')?.value=="Autre"){
      this.candidat.bac = this.candidatFormGroup.get('bac2')?.value;
    }
    this.candidat.bacAnneObtention = this.candidatFormGroup.get('bacAnne')?.value;
    if(this.candidatFormGroup.get('pays')?.value=="Autre"){
      this.candidat.pays = this.candidatFormGroup.get('pays2')?.value;
    }
    this.candidat.pays = this.candidatFormGroup.get('pays')?.value;
    this.candidat.paysObtentionBac = this.candidatFormGroup.get('paysObtentionBac')?.value;
    if(this.candidatFormGroup.get('paysObtentionBac')?.value=="Autre"){
      this.candidat.paysObtentionBac = this.candidatFormGroup.get('paysObtentionBac2')?.value;
    }

    this.candidat.mdp = '111';
    this.candidat.ville = this.candidatFormGroup.get('ville')?.value;
    if(this.candidatFormGroup.get('ville')?.value=="Autre"){
      this.candidat.ville = this.candidatFormGroup.get('ville2')?.value;
    }
    this.candidat.admis = false;
    console.log('hey log:', this.candidat);


      this.candidatService.saveCandidat(this.candidat).subscribe(
        (newCandidat) => {
          console.log('Candidat enregistré:', newCandidat);
          this.candidat = { ...newCandidat };
          //this.diplomeCandidat.candidatDto = { ...newCandidat };
          // Traiter la réponse après l'enregistrement réussi (par exemple, afficher un message de succès)
          console.log("candiat hahowa " , newCandidat);
          this.passparamService.setCin(newCandidat.cin)
          this.enregisterCandidature();
        },
        (error) => {
          console.error('Erreur lors de l\'enregistrement du candidat:', error);
          // Traiter l'erreur (par exemple, afficher un message d'erreur)
        }
      );
    //return this.candidatService.saveCandidat(this.candidat);

  }

  diplomeFormGroup: FormGroup = new FormGroup({
    typeDiplome: new FormControl("", [Validators.required]),
    specialite: new FormControl("", [Validators.required]),
    anneeObtention: new FormControl("", [Validators.required]),
    etablissement: new FormControl("", [Validators.required]),
    fichier: new FormControl("", [Validators.required]),
    universite: new FormControl("", [Validators.required]),

  })

  //dipArr() {
    //return this.candidatFormGroup.get('diplome') as FormArray;
  //}
  showVilleAutre = false;
  onVilleChange(event: any) {
    const value = event.target.value;
    this.showVilleAutre = (value === 'Autre');
  }
  Suivant() {
    if (this.candidatFormGroup.valid) {
      this.step1 = false;
      this.step2 = true;
      const progressBar = this.elementRef.nativeElement.querySelector('.progress-bar');
      this.renderer.setStyle(progressBar, 'width', '100%');
      const st2 = this.elementRef.nativeElement.querySelector('#st2');
      this.renderer.removeClass(st2, 'btn-secondary');
      this.renderer.addClass(st2, 'btn-info');
      console.log('hey log:', this.candidat);
      console.log(this.diplome1);
      // this.enregistrerDiplome();
    } else {
      this.candidatFormGroup.markAllAsTouched();
      const firstInvalidControl = document.querySelector('.is-invalid');
      if (firstInvalidControl) {
        firstInvalidControl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }


  Back() {
    this.step1 = true;
    this.step2 = false;
    const progressBar = this.elementRef.nativeElement.querySelector('.progress-bar');
    this.renderer.setStyle(progressBar, 'width', '0%');
    const st2 = this.elementRef.nativeElement.querySelector('#st2');
    this.renderer.removeClass(st2, 'btn-info');
    this.renderer.addClass(st2, 'btn-secondary');
  }
  visible!: boolean;

  showDialog() {
    this.visible = true;
  }

  /*getDiplomeFields(): FormGroup {
    return new FormGroup({
      typeDiplome: new FormControl("", [Validators.required]),
      specialite: new FormControl("", [Validators.required]),
      anneeObtention: new FormControl("", [Validators.required]),
      etablissement: new FormControl("", [Validators.required]),
      fichier: new FormControl("", [Validators.required])

    });

  }*/
  /*addDiploma() {

    this.dipArr().push(this.getDiplomeFields());
    console.log(this.candidatFormGroup);

  }


  removeDiploma(i: number) {
    this.dipArr().removeAt(i);
    // const control=<FormArray>this.candidatFormGroup.controls['diplome'];
    // control.removeAt(i);

  }*/

  private subscription! : Subscription;


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const filiereId = params['filiereId'];
      this.countriesList = Object.values<Country>(countries);
      this.subscription = this.filierService.getFiliereById(filiereId)
        .subscribe(filiere => {
          this.filier = filiere;
          this.typeDiplomeAObtenir = filiere.typeDiplomeAObtenir;
        });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  enregisterCandidature() {

    //this.handleSuivant();

    if (this.selectedFile) {
      this.fichierService.upload(this.selectedFile)
        .then(uploadFile => {

          this.successMessage = 'hani Fichier téléchargé avec succès';
          console.log(this.successMessage + " : " ,uploadFile);
          this.fichier= {...uploadFile};
          console.log(this.diplomeCandidat)
          console.log(this.fichier)
          this.diplomeCandidat.fichierDto= this.fichier
          console.log('file data', this.diplomeCandidat.fichierDto)
          console.log(this.candidat)

          this.diplomeCandidat.candidatDto= this.candidat;

          this.diplomeCandidat.typeDiplome =this.diplomeFormGroup.get('typeDiplome')?.value
          this.diplomeCandidat.specialiteDiplome= this.diplomeFormGroup.get("specialite")?.value
          this.diplomeCandidat.universite= this.diplomeFormGroup.get("universite")?.value
          this.diplomeCandidat.anneeObtention= this.diplomeFormGroup.get("anneeObtention")?.value
          this.diplomeCandidat.etablissement=this.diplomeFormGroup.get("etablissement")?.value
          this.diplomeCandidat.filiereDto = this.filier


          console.log('file diplomeCandidat', this.diplomeCandidat);
          this.enregistrerDiplome(this.diplomeCandidat);
          // Traitez le message de succès ici, par exemple, mettez à jour l'affichage avec l'emplacement du fichier téléchargé
        })
        .catch(error => {
          console.error('Une erreur s\'est produite lors du téléchargement du fichier:', error);
          if (error === 'La taille du fichier dépasse 4 Mo') {
            this.errorMessage = 'La taille du fichier dépasse 4 Mo. Veuillez uploader un nouveau fichier!';
          } else {
            this.errorMessage = 'Une erreur s\'est produite lors du téléchargement du fichier';
          }
          // Gérez les erreurs ici, par exemple, affichez un message d'erreur à l'utilisateur
        });
    }

  }

  private idDip : number=1;
  private enregistrerDiplome(data: Diplome ) {


    /// console.log("file diplomeCandidat:", this.diplomeCandidat);

    this.diplomeService.addDiplome(data).subscribe(
      (diplome) => {
        console.log('file save dipole ', diplome);
        this.idDip=diplome.id;
        this.noteSemester = {
          id: 1,
          note: this.NotesFormGroup.get('note1')?.value,
          diplomeDto: diplome,
        };
        console.log(this.NotesFormGroup.get('note1')?.value)
        console.log('1->note semestre : ', this.noteSemester);
        if (this.typeDiplomeAObtenir === 'Ingenieur_Etat') {
          const notesPromises: Promise<any>[] = [];

          for (let i = 1; i <= 4; i++) {
            this.noteSemester = {
              id: 1,
              note: this.NotesFormGroup.get('note' + i)?.value,
              diplomeDto: diplome,
            };
            console.log('2->note semestre : ', this.noteSemester);

            const promise = this.notesService.addNotesSemester(this.noteSemester, this.idDip).toPromise();
            notesPromises.push(promise);
          }

          Promise.all(notesPromises)
              .then((responses) => {
                console.log(responses);
                // Continuez ici avec la logique après l'enregistrement des notes
                this.router.navigateByUrl('/candidat/mesCandidatures');
              })
              .catch((error) => {
                console.error(error);
              });
        }

        if (this.typeDiplomeAObtenir === 'Master') {
          const notesPromises: Promise<any>[] = [];

          for (let i = 1; i <= 6; i++) {
            this.noteSemester = {
              id: 1,
              note: this.NotesFormGroup.get('note' + i)?.value,
              diplomeDto: diplome,
            };
            console.log('2->note semestre : ', this.noteSemester);

            const promise = this.notesService.addNotesSemester(this.noteSemester, this.idDip).toPromise();
            notesPromises.push(promise);
          }

          Promise.all(notesPromises)
              .then((responses) => {
                console.log(responses);
                // Continuez ici avec la logique après l'enregistrement des notes
                this.router.navigateByUrl('/candidat/mesCandidatures');
              })
              .catch((error) => {
                console.error(error);
              });
        }

        //this.enrigetrerNotes(this.idDip ,diplome);
        this.router.navigateByUrl('/candidat/mesCandidatures')
      },
      (error) => {

        console.error('file Erreur lors de l\'enregistrement du diplome:', error);
      }
    );
  }
}
