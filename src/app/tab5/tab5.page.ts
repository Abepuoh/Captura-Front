import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Event} from '@angular/router';
import { CameraSource, CameraPlugin, Camera, CameraResultType } from '@capacitor/camera';
import { Share } from '@capacitor/share';
import { base64 } from '@firebase/util';
import { ActionSheetController, AlertController, Platform } from '@ionic/angular'; 
import { FotoService } from 'src/services/foto-service.service';
import { IonLoaderService } from 'src/services/ion-loader.service';
import { ToastServiceService } from 'src/services/toast-service.service';
import { Foto } from 'src/shared/foto.interface';



@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page{

  public foto:Foto;
  public fotos:Foto[];
  @ViewChild('fileInput', {static:false})fileInput:ElementRef;

  constructor(public fotoService:FotoService, public toast:ToastServiceService, private plt:Platform,
    private actionSheetCtrl:ActionSheetController, private route:ActivatedRoute, private loading:IonLoaderService,
    private alertController:AlertController,private router: ActivatedRoute) { }

  async ionViewDidEnter() {
    await this.cargarFotos();
  }

    /**
   * Metodo que devuelve las visitas de una obra por su id
   * @param event 
   * @param id 
   */
     public async cargarFotos(event?) {
      let idString = this.route.snapshot.paramMap.get('id');
      let id = Number(idString);
      if(!event){
        await this.loading.customLoader("Espere...");
      }
      if(id!=null){
        try {
          await this.fotoService.getFotoPorVisita(id).then(fotos => {
            this.fotos = fotos;
            if (event) {
                event.target.complete();
              }else{
                this.loading.dismissLoader();
            }
          });
        } catch (error) {
          await this.toast.showToast("Error al cargar las fotos", "danger");
          this.loading.dismissLoader();
        }
      }else{
        await this.toast.showToast("Error al cargar las fotos", "danger");
        this.loading.dismissLoader();
      }
   
    }
    
  public async loadImage(){
    this.fotoService.getAllFotos().then(images=>{
      this.fotos = images;
    })
  }


  /**
   * Metodo que borra una visita
   * @param visita 
   */
   public async borraFoto(foto: Foto) {
    this.alertController.create({
      header: 'ALERTA',
      subHeader: 'Va a borrar una foto',
      message: '¿Quiere eliminar la foto?',
      buttons: [
        {
          text: 'Si',
          handler:async () => {
            try {
              await this.loading.customLoader("Eliminando...");
              await this.fotoService.deleteFoto(foto.id);
              await this.toast.showToast("Foto borrada con éxito", "sucess");
              await this.loading.dismissLoader();
              await this.cargarFotos();
            } catch (error) {
              await this.toast.showToast("La foto no se ha podido borrar", "danger");
            }
          }
        },
        {
          text: 'NO',
          handler: () => {
            this.cargarFotos();
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
  
  /**
   * Metodo que nos permite seleccionar entre diferentes opciones para subir una foto a la aplicación
   */
  public async selectImagenSource(){
    const buttons = [
      {
        text: 'Hacer Foto',
        icon: 'camera',
        handler: () => {
          this.addFoto(CameraSource.Camera);
        }
      },
      {
        text:'Selecciona desde Biblioteca',
        icon:'image',
        handler: () =>{
          this.addFoto(CameraSource.Photos);
        }
      }
    ];
    if(!this.plt.is('hybrid')){
      buttons.push({
        text:'Selecciona foto',
        icon:'attach',
        handler: () => {
          this.fileInput.nativeElement.click();
        }
      });
    }
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Selecciona Imagen',
      buttons
    });
    await actionSheet.present();
  }

  /**
   * Método para cargar una foto en la visita seleccionada
   * @param event 
   */
  uploadFile(event : any){
    let idString = this.route.snapshot.paramMap.get('id');
    let id = Number(idString);
    const eventObj:any = event as any;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file:File = target.files[0];
    this.fotoService.uploadImagenFile(file,id).then((newFoto:Foto)=>{
      console.log(newFoto);
      this.fotos.push(newFoto);
    });
  } 
  /**
   * Método para subir una foto desde la camara del dispositivo
   * @param source 
   */
  async addFoto(source:CameraSource){
    let idString = this.route.snapshot.paramMap.get('id');
    let id = Number(idString);
    const image = await Camera.getPhoto({
      quality:60,
      allowEditing:true,
      resultType: CameraResultType.DataUrl
    });
    const url = image.dataUrl;
    fetch(url)
    .then(res => res.blob())
    .then(async blob => {
      console.log(blob)
      const file = new File([blob], (new Date()).getTime()+".png",{ type: "image/png" })
      await this.fotoService.uploadImage(file,id);
      
      await this.cargarFotos();
    })/**
    const blobData = this.b64toBlob(image.dataUrl, `image/${image.format}`);
    const imageFile = new File([blobData], `foto.${image.format}`, {type:`image/${image.format}`}); */
  }
  /**
   * Metodo de ayuda para transformar un Base64 en Blob
   * @param b64Data 
   * @param contentType 
   * @param sliceSize 
   * @returns 
   */
  b64toBlob(b64Data, contentType='', sliceSize=512){
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for(let offset = 0; offset<byteCharacters.length;offset+=sliceSize){
      const slice = byteCharacters.slice(offset,offset+sliceSize);

      const byteNumbers = new Array(slice.length);
      for(let i = 0; i < slice.length; i++){
        byteNumbers[i]= slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob (byteArrays, {type:contentType});
    return blob;
  }


  public async getOneFoto(id:Number){
    await this.fotoService.getFotoById(id);
  }

  public async crearFoto(foto: Foto) {
    await this.fotoService.createFoto(foto);
  }
  /**
   * Metodo que nos permite compartir la url de la foto desde la aplicacion
   * @param foto 
   */
  public async share(foto:Foto){
    await Share.share({
      title:'Compartir la foto de la visita '+foto.visita,
      text: 'Esta compartiendo una foto',
      url: foto.url,
      dialogTitle: 'Compartiendo foto',
    });
  }


}
