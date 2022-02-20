import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ResultCharacter } from 'src/app/interfaces/interfaces';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { DataLocalService } from '../../services/data-local.service';
import { toastController } from '@ionic/core';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {

  @Input() characters: ResultCharacter[] = [];

  favCharacters = [];

  constructor(private modalCtrl: ModalController, private dataLocal: DataLocalService) { }

  ngOnInit() {}

  /*
  Abre el modal del personaje
  */
  async openCharacterDetails(id){
    const modal = await this.modalCtrl.create({
      component: CharacterDetailComponent,
      componentProps: {id}
    })
    modal.present()
  }

  /*
  Devuelve una ruta con la imagen del personaje
  */
  getCharacterImage(character){
    return character.thumbnail.path + '/standard_medium.' + character.thumbnail.extension;
  }

  /*
  Comprueba si ya es favorito y llama a la función que guarda el personaje en el local storage
  */
  async storeFavCharacter(character){
    var favourite = false;
    await this.dataLocal.getFavCharacters().then(data =>{
      for(let favcharacter of data){
        if(character.id == favcharacter.id){
          favourite = true;
        }
      }
    })
    if(favourite){
      this.showToast('El personaje ya está en favoritos', true)
    }else{
      this.showToast('Personaje añadido a favoritos', false)
      this.dataLocal.setFavCharacter(character)
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
      icon: exists ? 'alert-outline' : 'person-add-outline',
      cssClass: 'toast',
    });

    await toast.present();
  }
}
