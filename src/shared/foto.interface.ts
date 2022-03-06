import { Visita } from "./visita.interface";

export interface Foto {
    id?:Number,
    comentario:String,
    url:string,
    visita:Visita
}