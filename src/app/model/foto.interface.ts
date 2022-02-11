import { Visita } from "./visita.interface";

export interface Foto{
    id?:Number,
    comentario:String,
    url:String,
    visita:Visita
}