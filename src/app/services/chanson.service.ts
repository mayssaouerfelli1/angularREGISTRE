import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chanson } from '../model/chanson.model';
import { ArtisteWrapper } from '../model/artisteWrapped.model';
import { Artiste } from '../model/artiste.model'; 
import { Image } from "../model/image.model";
import { AuthService } from './auth.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ChansonService {
  apiURL: string = 'http://localhost:8080/chansons/api';
  apiURLArt: string = 'http://localhost:8080/chansons/art';

  chansons! : Chanson[];
  artistes! : Artiste[]


  constructor(private http: HttpClient, private authService: AuthService) { }

  listeChanson(): Observable<Chanson[]>{
    return this.http.get<Chanson[]>(this.apiURL+"/all");
  }

    ajouterChanson(chan: Chanson): Observable<Chanson> {
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({ "Authorization": jwt })
      return this.http.post<Chanson>(this.apiURL + "/addchan", chan, { headers: httpHeaders });
    }
  
  
    supprimerChanson(id: number) {
      const url = `${this.apiURL}/delchan/${id}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({ "Authorization": jwt })
      return this.http.delete(url, { headers: httpHeaders });
    }
  
  
    consulterChanson(id: number): Observable<Chanson> {
      const url = `${this.apiURL}/getbyid/${id}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({ "Authorization": jwt })
      return this.http.get<Chanson>(url, { headers: httpHeaders });
    }
  
  
    updateChanson(chan: Chanson): Observable<Chanson> {
      let jwt = this.authService.getToken();
      jwt = "Bearer " + jwt;
      let httpHeaders = new HttpHeaders({ "Authorization": jwt })
      return this.http.put<Chanson>(this.apiURL + "/updatechan", chan, { headers: httpHeaders });
    }
      


  

    listeArtistes():Observable<ArtisteWrapper>{
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.get<ArtisteWrapper>(this.apiURLArt,{headers:httpHeaders}
      );
      } 

      rechercherParArtiste(idArtiste: number): Observable<Chanson[]> {
      const url = `${this.apiURL}/chArtiste/${idArtiste}`;
      return this.http.get<Chanson[]>(url);
      } 
      rechercherParNom(nom: string):Observable< Chanson[]> {
      const url = `${this.apiURL}/chansByName/${nom}`;
      return this.http.get<Chanson[]>(url);
      }
      ajouterArtiste( art: Artiste):Observable<Artiste>{
      return this.http.post<Artiste>(this.apiURLArt, art, httpOptions);}
      


  listeArtiste(): Observable<Artiste[]> {
    return this.http.get<Artiste[]>(this.apiURL + "/art");
  }

  uploadImage(file: File, filename: string): Observable<any>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
    }
    loadImage(id: number): Observable<Image> {
    const url = `${this.apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
    }


    uploadImageChan(file: File, filename: string, idProd:number): Observable<any>{
      const imageFormData = new FormData();
      imageFormData.append('image', file, filename);
      const url = `${this.apiURL + '/image/uplaodImageChan'}/${idProd}`;
      return this.http.post(url, imageFormData);
      }

      supprimerImage(id : number) {
        const url = `${this.apiURL}/image/delete/${id}`;
        return this.http.delete(url, httpOptions);
        }

        updateArtiste(artiste: Artiste): Observable<Artiste> {
          const url = `${this.apiURLArt}/${artiste.idArtiste}`;
          return this.http.put<Artiste>(url, artiste, httpOptions);
        }
        
    
}
