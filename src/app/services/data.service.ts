import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaCharacter, RespuestaComic } from '../interfaces/interfaces';
const URL = environment.url;
const APIKEY = environment.apikey;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  offsetCharacters = 0
  offsetComics = 0
  offsetSearchCharacters = 0

  getCharacters(){
    return this.http.get<RespuestaCharacter>(URL + `characters?` + APIKEY + `&limit=20&offset=${this.offsetCharacters}`);
  }

  getCharacterDetails(characterId){
    return this.http.get<RespuestaCharacter>(URL + `characters/${characterId}?` + APIKEY);
  }

  getComics(){
    return this.http.get<RespuestaComic>(URL + `comics?` + APIKEY + `&limit=20&offset=${this.offsetComics}`);
  }

  getComicDetails(comicId){
    return this.http.get<RespuestaComic>(URL + `comics/${comicId}?` + APIKEY);
  }

  searchCharacters(value){
    console.log(value.target.value)
    return this.http.get<RespuestaCharacter>(URL + `characters?nameStartsWith=${value.target.value}&` + APIKEY + `&limit=50&offset=${this.offsetSearchCharacters}`);
  }
}
