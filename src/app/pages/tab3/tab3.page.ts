import { Component } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  characters = [];
  comics = [];

  constructor(private dataLocal: DataLocalService) {}

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

  async removeCharacterFromList(character){
    console.log('Borrando...')
    await this.dataLocal.unsetFavCharacters(character)
    this.characters = []
    this.getCharactersFromStorage()
  }

  async removeComicFromList(comic){
    console.log('Borrando...')
    await this.dataLocal.unsetFavComics(comic)
    this.comics = []
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

}
