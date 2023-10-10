import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CondidatTemplateComponent } from "./candidat-template/condidat-template.component";
import { AccueilComponent } from "./pages/accueil/accueil.component";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MonDossierComponent } from './pages/mon-dossier/mon-dossier.component';
import { AddDirectionPedagogiqueComponent } from './pages/add-direction-pedagogique/add-direction-pedagogique.component';
import {AddChefDepartementComponent} from "./add-chef-departement/add-chef-departement.component";
import {MesCandidaturesComponent} from "./pages/mes-candidatures/mes-candidatures.component";
import {DirectionPedagogiqueComponent} from "./pages/direction-pedagogique/direction-pedagogique.component";
import { LoginComponent } from './pages/login/login.component';
const routes: Routes = [


  //{path : "login", component : LoginComponent},
  { path: '', redirectTo: 'admin/Dashboard', pathMatch: 'full' },
 {
    path: "admin", children: [
      { path: "Dashboard", component: DashboardComponent },
      { path: "AddDirectionPedagogique", component: AddDirectionPedagogiqueComponent },
      {path: "AddChefDepartement", component: AddChefDepartementComponent},
    ]
  },
  {
    path: "candidat", children: [
      { path: "acceuil", component: AccueilComponent },
      { path: "MonDossier", component: MonDossierComponent },
       { path: "mesCandidatures", component: MesCandidaturesComponent  }
    ]
  },
    {
        path: "direction", component: DirectionPedagogiqueComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
