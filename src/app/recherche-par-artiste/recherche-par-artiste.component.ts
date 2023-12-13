import { Component, OnInit } from '@angular/core';
import { Artiste } from '../model/artiste.model';
import { Chanson } from '../model/chanson.model';
import { ChansonService } from '../services/chanson.service';

@Component({
  selector: 'app-recherche-par-artiste',
  templateUrl: './recherche-par-artiste.component.html',
  styles: []
})
export class RechercheParArtisteComponent implements OnInit {
  IdArtiste!: number;
  artistes!: Artiste[];
  chansons!: Chanson[];

  constructor(private chansonService: ChansonService) { }

  ngOnInit(): void {
    this.chansonService.listeArtiste().subscribe(arts => {
      this.artistes = arts;
      console.log(arts);
    });
    this.chansons = [];
  }

  onChange() {
    this.chansonService.rechercherParArtiste(this.IdArtiste).subscribe((chans: any) => {
      this.chansons = chans;
    });
  }
}
