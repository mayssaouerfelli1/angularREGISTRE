import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddChansonComponent } from './add-chanson/add-chanson.component';
import { ChansonsComponent } from './chansons/chansons.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { UpdateChansonComponent } from './update-chanson/update-chanson.component';
import { RechercheParArtisteComponent } from './recherche-par-artiste/recherche-par-artiste.component'; // Remplacez RechercheParAlbumComponent
import { ListeArtistesComponent } from './liste-artistes/liste-artistes.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ChansonGuard } from './chanson.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';

const routes: Routes = [
  { path: 'chansons', component: ChansonsComponent },
  { path: 'add-chanson', component: AddChansonComponent ,canActivate:[ChansonGuard]},
  { path: 'updateChanson/:id', component: UpdateChansonComponent },
  { path: 'rechercheParArtiste', component: RechercheParArtisteComponent }, // Remplacez RechercheParAlbumComponent
  { path: 'rechercheParNom', component: RechercheParNomComponent },
  {path: "listeArtistes", component : ListeArtistesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path:'register',component:RegisterComponent},
  { path: 'verifEmail', component: VerifEmailComponent },
  { path: '', redirectTo: 'chansons', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
