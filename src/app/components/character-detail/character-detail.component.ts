import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit {

  @Input() id

  character;
  comics = [];
  btn_text = ['Añadir a favoritos', 'Eliminar de favoritos']
  favourite = false;

  constructor(private modalCtrl: ModalController, private data: DataService, private dataLocal: DataLocalService) { }

  ngOnInit() {
    this.data.getCharacterDetails(this.id).subscribe(
      resp =>{
        this.character = resp.data.results[0];
        this.comics = resp.data.results[0].comics.items;
      }
    )
    this.dataLocal.getFavCharacters().then(data =>{
      for(let character of data){
        if(this.id == character.id){
          this.favourite = true;
        }
      }
    })
  }

  /*
  Cierra el modal
  */
  goBack(){
    this.modalCtrl.dismiss()
  }

  /*
  Devuelve la ruta de la imagen del personaje
  */
  getCharacterImage(character){
    return character.thumbnail.path + '/landscape_xlarge.' + character.thumbnail.extension;
  }

  /*
  Llama a la función que guarda el personaje en el local storage
  */
  storeFavCharacter(character){
    this.favourite = true;
    this.dataLocal.setFavCharacter(character)
  }

  /*
  Cambia el icono del botón dependiendo de si el personaje está en favoritos o no
  */
  getFavButtonIcon(){
    var icon = ''
    this.favourite ? icon = 'heart-dislike-outline' : icon = 'heart-outline';
    return icon;
  }

  /*
  Llama a la función que elimina a un personaje de favoritos en el local storage
  */
  unsetFavCharacter(character){
    this.dataLocal.unsetFavCharacters(character);
    this.favourite = false;
  }

}
