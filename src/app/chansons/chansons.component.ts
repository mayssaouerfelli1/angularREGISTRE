import { Component, OnInit } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { ChansonService } from '../services/chanson.service';
import { Image } from "../model/image.model";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chansons',
  templateUrl: './chansons.component.html'
})
export class ChansonsComponent implements OnInit {

    chansons? : Chanson[]; 
    apiurl:string='http://localhost:8080/chansons/api';

    
  constructor(private chansonService: ChansonService,public authService: AuthService) {
   
     }

  ngOnInit(): void {

    this.chargerChansons();
  }

  chargerChansons(){
    this.chansonService.listeChanson().subscribe(chans => {
      this.chansons = chans;

      this.chansons.forEach((chan) => {
        
        chan.imageStr = 'data:' + chan.images[0].type + ';base64,' + chan.images[0].image;
        
        });
      
        }); 
      };
  

supprimerChanson(p: Chanson)
{
let conf = confirm("Etes-vous sûr ?");
if (conf)
  this.chansonService.supprimerChanson(p.idChanson).subscribe(() => {
        console.log("chanson supprimée");
        this.chargerChansons();     
      
});
}
 
 

}
