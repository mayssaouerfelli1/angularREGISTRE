import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chanson } from '../model/chanson.model';
import { Artiste } from '../model/artiste.model';
import { ChansonService } from '../services/chanson.service';
import { Image } from "../model/image.model";

@Component({
  selector: 'app-add-chanson',
  templateUrl: './add-chanson.component.html',
})
export class AddChansonComponent implements OnInit {
  newChanson = new Chanson();
  artistes: Artiste[] = [];

  newArtiste! : Artiste;
  newIdArtiste!: number ;

  uploadedImage!: File;
  imagePath: any;


  constructor(private chansonService: ChansonService, private router: Router) {}

  
  ngOnInit(): void {
    this.chansonService.listeArtiste().subscribe((arts) => {
      this.artistes = arts;
      console.log(arts);
    });
  }
  

  addChanson() {
    this.newChanson.artiste=this.artistes.find((v:any)=>this.newIdArtiste)!;
    this.chansonService.ajouterChanson(this.newChanson).subscribe((createChanson:Chanson)=>{
      this.newChanson=createChanson;
      this.chansonService.uploadImageChan(this.uploadedImage,this.uploadedImage.name,this.newChanson.idChanson)
      .subscribe((img:Image)=>{
        this.newChanson.image=img;
        this.chansonService.updateChanson(this.newChanson).subscribe(()=>{
          this.router.navigate(['chansons']);
        })
      })
    })

    }

    onImageUpload(event: any) {
      this.uploadedImage = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = (_event) => { this.imagePath = reader.result; }
      }
      
  }

