import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  favCharactersArray
  favComicsArray

  constructor(private storage: Storage) {
    this.init()
  }

  async init() {
    await this.storage.create();
  }

  /*
  Recoge el array del storage, comprueba si el personaje está ya en favoritos, si no está lo añade y sube el array al storage
  */
  async setFavCharacter(character){
    this.favCharactersArray = await this.storage.get('favcharacters')
    if(this.favCharactersArray != null){
      var alreadyExists = false
      for(let favcharacter of this.favCharactersArray){
        if(favcharacter.id == character.id){
          alreadyExists = true
        } 
      }
      if(alreadyExists){
      }else{
        this.favCharactersArray.push(character)
      }
    }else{
      this.favCharactersArray = []
      this.favCharactersArray.push(character)
    }
    await this.storage.set('favcharacters', this.favCharactersArray)
  }

  /*
  Recoge los comics del storage, comprueba si el comic de parámetro ya es favorito, si no lo es lo añade al array y lo sube al storage
  */
  async setFavComics(comic){
    this.favComicsArray = await this.storage.get('favcomics')
    if(this.favComicsArray != null){
      var alreadyExists = false
      for(let favcomic of this.favComicsArray){
        if(favcomic.id == comic.id){
          alreadyExists = true
        } 
      }
      if(!alreadyExists) this.favComicsArray.push(comic)
    }else{
      this.favComicsArray = []
      this.favComicsArray.push(comic)
    }
    await this.storage.set('favcomics', this.favComicsArray)
  }

  /*
  Pasa los personajes diferentes a un array temporal y lo sube al storage
  */
  async unsetFavCharacters(character){
    var tmpArray = []
    for(let favcharacter of this.favCharactersArray){
      if(favcharacter.id != character.id){
        tmpArray.push(favcharacter)
      }
    }
    this.favCharactersArray = tmpArray;
    await this.storage.set('favcharacters', this.favCharactersArray)
  }

  /*
  Pasa los comics diferentes a un array temporal y lo sube al storage
  */
  async unsetFavComics(comic){
    var tmpArray = []
    for(let favcomic of this.favComicsArray){
      if(favcomic.id != comic.id){
        tmpArray.push(favcomic)
      }
    }
    this.favComicsArray = tmpArray;
    await this.storage.set('favcomics', this.favComicsArray)
  }

  /*
  Recoge los personajes favoritos del storage en un array
  */
  async getFavCharacters(){
    this.favCharactersArray = await this.storage.get('favcharacters')
    return this.favCharactersArray
  }

  /*
  Recoge los comics favoritos del storage en un array
  */
  async getFavComics(){
    this.favComicsArray = await this.storage.get('favcomics')
    return this.favComicsArray
  }

  /*
  Vacía el storage, usado durante el testing
  */
  async clear(){
    await this.storage.clear();
  }

}
