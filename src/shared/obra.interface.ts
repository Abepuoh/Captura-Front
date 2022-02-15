
import { Usuario } from "./usuario.interface";
import { Visita } from "./visita.interface";

export interface Obra {
    [x: string]: any;
    id?:Number,
    datos:String,
    latitud:any,
    longitud:any,
    nombre:String,
    usuarios:Array<Usuario>,
    visitas:Array<Visita>
} 
