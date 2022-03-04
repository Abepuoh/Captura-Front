import { Obra } from "./obra.interface";

export interface Usuario {
    id?:Number,
    datos:String,
    email:String,
    foto:String,
    key:any,
    nombre:String,
    obras:Array<Obra>,
    emailVerified:Boolean
} 