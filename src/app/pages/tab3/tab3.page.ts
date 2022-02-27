import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CharacterDetailComponent } from 'src/app/components/character-detail/character-detail.component';
import { ComicDetailComponent } from 'src/app/components/comic-detail/comic-detail.component';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  characters = [];
  comics = [];

  constructor(private dataLocal: DataLocalService, private modalCtrl: ModalController) {}

  ngOnInit(){
    this.getCharactersFromStorage()
    this.getComicsFromStorage()
  }

  /*
  Devuelve una url con la imagen del personaje
  */
  getCharacterImage(character){
    return character.thumbnail.path + '/standard_large.' + character.thumbnail.extension;
  }

  /*
  Devuelve una url con la carátula del comic
  */
  getComicImage(comic){
    return comic.thumbnail.path + '/portrait_xlarge.' + comic.thumbnail.extension;
  }

  /*
  Carga los personajes y comics al entrar a la página
  */
  ionViewWillEnter(){
    this.getCharactersFromStorage()
    this.getComicsFromStorage()
  }

  /*
  Recoge la lista de personajes del storage
  */
  getCharactersFromStorage(){
    this.dataLocal.getFavCharacters().then(data =>{
      this.characters = data
    })
  }

  /*
  Recoge la lista de comics del storage
  */
  getComicsFromStorage(){
    this.dataLocal.getFavComics().then(data =>{
      this.comics = data
    })
  }

  /*
  Crea un model para mostrar los detalles de un personaje
  */
  async openCharacterDetails(id){
    const modal = await this.modalCtrl.create({
      component: CharacterDetailComponent,
      componentProps: {id}
    })
    modal.onDidDismiss().then(data =>{
      this.reloadArrays()
    })
    modal.present()
  }

  /*
  Crea un model para mostrar los detalles de un comic
  */
  async openComicDetails(id){
    const modal = await this.modalCtrl.create({
      component: ComicDetailComponent,
      componentProps: {id}
    })
    modal.onDidDismiss().then(data =>{
      this.reloadArrays()
    })
    modal.present()
  }

  /*
  Crea un model para mostrar los detalles de un personaje
  */
  reloadArrays(){
    this.characters = [];
    this.comics = [];
    this.getCharactersFromStorage()
    this.getComicsFromStorage()
  }
}
