import { Foto } from "./foto.interface";
import { Obra } from "./obra.interface";

export interface Visita {
    id?:Number,
    fecha:Date,
    header:String,
    nota:String,
    obra:Obra,
    fotos:Foto[]
} 