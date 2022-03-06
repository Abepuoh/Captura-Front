
import { Usuario } from "./usuario.interface";
import { Visita } from "./visita.interface";

export interface Obra {
    id?:Number,
    datos:string,
    latitud:any,
    longitud:any,
    nombre:string,
    usuario:Array<Usuario>,
    visitas:Array<Visita>
} 
