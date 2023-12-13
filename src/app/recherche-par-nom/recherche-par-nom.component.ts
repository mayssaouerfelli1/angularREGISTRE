import { Component, OnInit } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { ChansonService } from '../services/chanson.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: []
})
export class RechercheParNomComponent implements OnInit {
  nomChanson: string = '';
  chansons: Chanson[] = [];
  allChansons: Chanson[] = [];

  constructor(private chansonService: ChansonService) { }

  ngOnInit(): void {
    this.chargerChansons();
  }

  chargerChansons() {
    this.chansonService.listeChanson().subscribe(chans => {
      console.log(chans);
      this.chansons = chans;
      this.allChansons = chans;
    });
  }

  rechercherChansons() {
    this.chansonService.rechercherParNom(this.nomChanson).subscribe(chans => {
      console.log(chans);
      this.chansons = chans;
    });
  }

  onKeyUp(filterText: string) {
    this.chansons = this.allChansons.filter(item =>
      item.nom.toLowerCase().includes(filterText.toLowerCase())
    );
  }
}
