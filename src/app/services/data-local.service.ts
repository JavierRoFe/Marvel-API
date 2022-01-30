import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ResultCharacter } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  //private _storage: Storage | null = null;
  favCharactersArray = []
  favComicsArray = []

  constructor(private storage: Storage) {
    this.init()
  }

  async init() {
    await this.storage.create();
    //this._storage = storage;
    //this.clear()
  }

  async setFavCharacter(character){
    //this.favCharactersArray = await this.storage.get('favcharacters')
    console.log('FAVCHARACTERS: ', this.favCharactersArray)
    if(this.favCharactersArray != null){
      if(this.favCharactersArray.includes(character)){
        console.log('Ya existe: ', character.name)
      }else{
        this.favCharactersArray.push(character)
      }
    }else{
      this.favCharactersArray[0] = character
    }
    console.log('Fav characters antes de subirlo: ', this.favCharactersArray)
    await this.storage.set('favcharacters', this.favCharactersArray)
  }

  async setFavComics(comicArray){
    await this.storage.set('favcomics', comicArray)
  }

  async unsetFavCharacters(character){
    this.favCharactersArray.forEach((element, index) => {
      if(element.id == character.id){
        console.log('Character removed: ', character.name)
        this.favCharactersArray.splice(index, 1)
      } 
    });
    await this.storage.set('favcharacters', this.favCharactersArray)
  }

  async getFavCharacters(){
    const characters = await this.storage.get('favcharacters')
    return characters
  }

  async getFavComics(){
    const comics = await this.storage.get('favcomics')
    return comics
  }

  async clear(){
    await this.storage.clear();
  }

}
