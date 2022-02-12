import { Usuario } from "./usuario.interface";
import { Visita } from "./visita.interface";

export interface Obra {
    id?:Number,
    datos:String,
    latitud:Number,
    longitud:Number,
    nombre:Number,
    usuarios:Array<Usuario>,
    visitas:Array<Visita>
} 