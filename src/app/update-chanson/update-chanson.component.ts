import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chanson } from '../model/chanson.model';
import { Artiste } from '../model/artiste.model';
import { ChansonService } from '../services/chanson.service';
import { Image } from "../model/image.model";

@Component({
  selector: 'app-update-chanson',
  templateUrl: './update-chanson.component.html',
  styleUrls: []
})
export class UpdateChansonComponent implements OnInit {
  currentChanson = new Chanson();
  artistes: Artiste[] = [];
  updatedArtisteId: number | undefined;
  myImage!: string;

  uploadedImage!: File;
  isImageUpdated: Boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private chansonService: ChansonService
  ) { }

  /*ngOnInit(): void {
    this.chansonService.listeArtiste().subscribe((arts: Artiste[]) => {
      this.artistes = arts;
    });

    const id = this.activatedRoute.snapshot.params['id'];
    this.chansonService.consulterChanson(id).subscribe((chan: Chanson) => {
      this.currentChanson = chan;
      this.updatedArtisteId = chan.artiste?.idArtiste;

      this.chansonService
        .loadImage(this.currentChanson.image.idImage)
        .subscribe((img: Image) => {
          this.myImage = 'data:' + img.type + ';base64,' + img.image;
        });
    });
  }*/


  ngOnInit(): void {
    this.chansonService.listeArtiste().
    subscribe((arts) => {this.artistes = arts;
    console.log(arts);
    });

    this.chansonService.consulterChanson(this.activatedRoute.snapshot.params['id'])
    .subscribe( (chan) =>{ this.currentChanson = chan;
    this.updatedArtisteId = this.currentChanson.artiste.idArtiste;
    } ) ;
    }
    






  /*updateChanson() {
    this.currentChanson.artiste = this.artistes.find(art => art.idArtiste ==
      this.updatedArtisteId)!;
    //tester si l'image du produit a été modifiée
    if (this.isImageUpdated) {
      this.chansonService
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Image) => {
          this.currentChanson.image = img;
          this.chansonService
            .updateChanson(this.currentChanson)
            .subscribe((chan) => {
              this.router.navigate(['chansons']);
            });
        });
    }
    else {
      this.chansonService
        .updateChanson(this.currentChanson)
        .subscribe((chan) => {
          this.router.navigate(['chansons']);
        });
    }
  }*/


  updateChanson() {
    this.currentChanson.artiste = this.artistes.find(art => art.idArtiste == 
    this.updatedArtisteId)!; 
    this.chansonService
    .updateChanson(this.currentChanson)
    .subscribe((chan) => {
    this.router.navigate(['chansons']);
    });
    }
    


  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
    }
  }


  onAddImageChanson() {
    this.chansonService
    .uploadImageChan(this.uploadedImage, 
    this.uploadedImage.name,this.currentChanson.idChanson)
    .subscribe( (img : Image) => {
    this.currentChanson.images.push(img);
    });
    }


    supprimerImage(img: Image){
      let conf = confirm("Etes-vous sûr ?");
      if (conf)
      this.chansonService.supprimerImage(img.idImage).subscribe(() => { 
      const index = this.currentChanson.images.indexOf(img, 0);
      if (index > -1) {
      this.currentChanson.images.splice(index, 1);
      }
      });
      }
      


}
