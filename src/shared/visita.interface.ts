import { Obra } from "./obra.interface";

export interface Visita {
    id?:Number,
    fecha:Date,
    header:String,
    nota:String,
    obra:Obra
} 