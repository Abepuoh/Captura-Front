
import { Usuario } from "./usuario.interface";
import { Visita } from "./visita.interface";

export interface Obra {
    id?:Number,
    datos:String,
    latitud:any,
    longitud:any,
    nombre:String,
    usuario:Usuario,
    visitas:Array<Visita>
} 
