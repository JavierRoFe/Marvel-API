import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { toastController } from '@ionic/core';
import { ResultComic } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { ComicDetailComponent } from '../comic-detail/comic-detail.component';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss'],
})
export class ComicsComponent implements OnInit {

  @Input() comics: ResultComic[] = [];

  constructor(private modalCtrl: ModalController, private dataLocal: DataLocalService) { }

  ngOnInit() {}

  /*
  Abre el modal del comic
  */
  async openComicDetails(id){
    const modal = await this.modalCtrl.create({
      component: ComicDetailComponent,
      componentProps: {id}
    })
    modal.present()
  }

  /*
  Devuelve una ruta con la imagen del comic
  */
  getComicImage(comic){
    return comic.thumbnail.path + '/standard_medium.' + comic.thumbnail.extension;
  }

  /*
  Comprueba si ya es favorito y llama a la función que guarda el comic en el local storage
  */
  async storeFavComic(comic){
    var favourite = false;
    await this.dataLocal.getFavComics().then(data =>{
      for(let favcomic of data){
        if(comic.id == favcomic.id){
          favourite = true;
        }
      }
    })
    if(favourite){
      this.showToast('El comic ya está en favoritos', true)
    }else{
      this.showToast('Comic añadido a favoritos', false)
      this.dataLocal.setFavComics(comic)
    }
  }

  /*
  Muestra un toast con el mensaje por parámetro
  */
  async showToast(customMessage, exists){
    const toast =  await toastController.create({
      color: 'dark',
      duration: 2000,
      message: customMessage,
      icon: exists ? 'alert-outline' : 'bookmarks-outline',
      cssClass: 'toast',
    });

    await toast.present();
  }

}
