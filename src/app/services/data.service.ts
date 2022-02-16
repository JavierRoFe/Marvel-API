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
  offsetSearchComics = 0

  /*
  Recoge una lista de 20 personajes de la API, según el offset
  */
  getCharacters(){
    return this.http.get<RespuestaCharacter>(URL + `characters?` + APIKEY + `&limit=20&offset=${this.offsetCharacters}`);
  }

  /*
  Devuelve los detalles del personaje indicado en el id
  */
  getCharacterDetails(characterId){
    return this.http.get<RespuestaCharacter>(URL + `characters/${characterId}?` + APIKEY);
  }

  /*
  Recoge una lista de 20 comics de la API, según el offset
  */
  getComics(){
    return this.http.get<RespuestaComic>(URL + `comics?` + APIKEY + `&limit=20&offset=${this.offsetComics}`);
  }

  /*
  Devuelve los detalles del comic indicado en el id
  */
  getComicDetails(comicId){
    return this.http.get<RespuestaComic>(URL + `comics/${comicId}?` + APIKEY);
  }

  /*
  Muestra una lista de personajes que empiezan por el parámetro
  */
  searchCharacters(value){
    return this.http.get<RespuestaCharacter>(URL + `characters?nameStartsWith=${value}&` + APIKEY + `&limit=20&offset=${this.offsetSearchCharacters}`);
  }

  /*
  Muestra una lista de comics que empiezan por el parámetro
  */
  searchComics(value){
    return this.http.get<RespuestaComic>(URL + `comics?titleStartsWith=${value}&` + APIKEY + `&limit=20&offset=${this.offsetSearchComics}`);
  }
}
