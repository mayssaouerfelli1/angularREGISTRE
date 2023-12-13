import { Component, OnInit } from '@angular/core';
import { Artiste } from '../model/artiste.model';
import { ChansonService } from '../services/chanson.service';

@Component({
  selector: 'app-liste-artistes',
  templateUrl: './liste-artistes.component.html',
  styleUrls: []
})
export class ListeArtistesComponent implements OnInit {
  artistes: Artiste[] = [];
  ajout:boolean=true;
  updatedArt: Artiste = { "idArtiste": 0, "nomArtiste": "", "nationaliteArtiste": "" };

  constructor(private chansonService: ChansonService) { }

  ngOnInit(): void {
    this.chargerArtistes();
  }

  chargerArtistes() {
    this.chansonService.listeArtiste().subscribe(arts => {
      this.artistes = arts;
    });
  }

  updateArt(art: Artiste) {
    this.updatedArt = art;
    this.ajout=false;
  }

  // Ajout d'un artiste après édition
  ajouterArtiste(artiste: Artiste) {
    this.chansonService.ajouterArtiste(artiste).subscribe(() => {
      this.chargerArtistes(); // Mettre à jour la liste après l'ajout de l'artiste
    });
  }
}
