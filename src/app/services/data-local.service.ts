import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init()
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  setFavCharacters(characterArray){
    this.storage.set('favcharacters', characterArray)
  }

  setFavComics(comicArray){
    this.storage.set('favcomics', comicArray)
  }

  async getFavCharacters(){
    const characters = await this.storage.get('favcharacters')
    return characters
  }

  async getFavComics(){
    const comics = await this.storage.get('favcomics')
    return comics
  }

}
