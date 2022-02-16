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

  getCharacterImage(character){
    return character.thumbnail.path + '/standard_large.' + character.thumbnail.extension;
  }

  getComicImage(comic){
    return comic.thumbnail.path + '/portrait_xlarge.' + comic.thumbnail.extension;
  }

  ionViewWillEnter(){
    this.getCharactersFromStorage()
    this.getComicsFromStorage()
  }

  getCharactersFromStorage(){
    this.dataLocal.getFavCharacters().then(data =>{
      this.characters = data
    })
  }

  getComicsFromStorage(){
    this.dataLocal.getFavComics().then(data =>{
      this.comics = data
    })
  }

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

  reloadArrays(){
    this.characters = [];
    this.comics = [];
    this.getCharactersFromStorage()
    this.getComicsFromStorage()
  }
}
