import { Obra } from "./obra.interface";

export interface Usuario {
    id?:Number,
    datos:String,
    email:String,
    foto:String,
    key_logueo:String,
    nombre:String,
    obras:Array<Obra>

} 