import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Artiste } from '../model/artiste.model';

@Component({
  selector: 'app-update-artiste',
  templateUrl: './update-artiste.component.html',
  styleUrls: []
})
export class UpdateArtisteComponent implements OnInit {
  @Input() 
  artiste: Artiste = { "idArtiste": 0, "nomArtiste": "", "nationaliteArtiste": "" };

  
  @Output
  () artisteUpdated = new EventEmitter<Artiste>();


  @Input()
  ajout!:boolean;


  constructor() {}

  ngOnInit(): void {}

  saveArtiste() {
    this.artisteUpdated.emit(this.artiste);
  }
}
