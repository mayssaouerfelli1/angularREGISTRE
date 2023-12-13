import { Artiste } from "./artiste.model";
import { Image } from "./image.model";

export class Chanson {
    idChanson!: number;
    nom!: string;
    dateCreation!: Date;
    artiste!: Artiste;
    image! : Image;
    imageStr!:string;

    images!: Image[];

}
