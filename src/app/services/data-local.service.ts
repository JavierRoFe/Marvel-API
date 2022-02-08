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
    //this.clear()
  }

  async setFavCharacter(character){
    this.favCharactersArray = await this.storage.get('favcharacters')
    console.log('FAVCHARACTERS: ', this.favCharactersArray)
    if(this.favCharactersArray != null){
      console.log('ARRAY not null', character)
      var alreadyExists = false
      for(let favcharacter of this.favCharactersArray){
        if(favcharacter.id == character.id){
          alreadyExists = true
          console.log('Existe? ', alreadyExists)
        } 
      }
      if(alreadyExists){
        console.log('Ya existe: ', character.name)
      }else{
        this.favCharactersArray.push(character)
      }
    }else{
      this.favCharactersArray = []
      this.favCharactersArray.push(character)
    }
    console.log('Fav characters antes de subirlo: ', this.favCharactersArray)
    await this.storage.set('favcharacters', this.favCharactersArray)
  }

  async setFavComics(comic){
    this.favComicsArray = await this.storage.get('favcomics')
    console.log('FAVCHARACTERS: ', this.favComicsArray)
    if(this.favComicsArray != null){
      console.log('ARRAY not null', comic)
      var alreadyExists = false
      for(let favcomic of this.favComicsArray){
        if(favcomic.id == comic.id){
          alreadyExists = true
          console.log('Existe? ', alreadyExists)
        } 
      }
      if(alreadyExists){
        console.log('Ya existe: ', comic.title)
      }else{
        this.favComicsArray.push(comic)
      }
    }else{
      this.favComicsArray = []
      this.favComicsArray.push(comic)
    }
    console.log('Fav characters antes de subirlo: ', this.favComicsArray)
    await this.storage.set('favcomics', this.favComicsArray)
  }

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

  async getFavCharacters(){
    this.favCharactersArray = await this.storage.get('favcharacters')
    return this.favCharactersArray
  }

  async getFavComics(){
    this.favComicsArray = await this.storage.get('favcomics')
    return this.favComicsArray
  }

  async clear(){
    await this.storage.clear();
  }

}
