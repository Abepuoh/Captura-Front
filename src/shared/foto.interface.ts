import { Visita } from "./visita.interface";

export interface Foto {
    foto: Number;
    id?:Number,
    comentario:String,
    url:string,
    visita:Visita
}