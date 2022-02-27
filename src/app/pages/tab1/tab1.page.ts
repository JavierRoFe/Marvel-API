import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  characters = []

  searchbarVisible = false;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.loadCharacters();
  }

  /*
  Recoge 20 personajes de la API
  */
  loadCharacters(event?) {
    this.data.getCharacters().subscribe(
      resp => {
        this.data.offsetCharacters += 20;
        if ((this.data.offsetCharacters + 20) >= parseInt(resp.data.total)) {
          this.data.offsetCharacters += (parseInt(resp.data.total) - this.data.offsetCharacters)
          this.characters.push(...resp.data.results)
          event.target.disabled = true;
          event.target.complete();
          return;
        }
        this.characters.push(...resp.data.results)
        if (event) {
          event.target.complete()
        }
      }
    )
  }

  /*
  Recoge los 20 personajes siguientes de una búsqueda
  */
  loadCharactersOnSearch(event?){
    var searchbar = document.querySelector('ion-searchbar');
    this.data.searchCharacters(searchbar.value).subscribe(
      resp=> {
        if(parseInt(resp.data.total) < 20){
          event.target.complete();
          return;
        } 

        if ((this.data.offsetSearchCharacters + 20) >= parseInt(resp.data.total)) {
          this.data.offsetSearchCharacters += (parseInt(resp.data.total) - this.data.offsetSearchCharacters)
          this.characters.push(...resp.data.results)
          //event.target.disabled = true;
          event.target.complete();
          return;
        }

        this.characters.push(...resp.data.results)
        this.data.offsetSearchCharacters += 20;
        
        if(event){
          event.target.complete();
        }
      }
    )
  }

  /*
  Consulta una lista de personajes en la API según el texto escrito en el searchbar
  */
  searchCharacters(searchValue){
    this.data.offsetSearchCharacters = 0;
    if(searchValue.target.value != ''){
      this.data.searchCharacters(searchValue.target.value).subscribe(
        resp => {
          this.characters = []
          this.characters.push(...resp.data.results)

          if(parseInt(resp.data.total) > 20) this.data.offsetSearchCharacters += 20;
        }
      )
    }
  }

  /*
  Scrollea al inicio de la página
  */
  goToTop(){
    this.content.scrollToTop(500);
  }

  /*
  Muestra la searchbar oculta al apretar el botón
  */
  showSearchBar(){
    var btnsearch = document.getElementById('search-icon')
    btnsearch.setAttribute('name', 'close')
    var toolbarsearch = document.getElementById('toolbar-search')
    toolbarsearch.style.display="block"
    this.searchbarVisible = true
  }

  /*
  Esconde la searchbar y refresca la lista de personajes
  */
  hideSearchBar(event?){
    var btnsearch = document.getElementById('search-icon')
    btnsearch.setAttribute('name', 'search')

    var toolbarsearch = document.getElementById('toolbar-search')
    toolbarsearch.style.display="none"
    this.searchbarVisible = false

    var searchbar = document.querySelector('ion-searchbar');
    if(searchbar.value != '' && this.characters.length == 0){
      this.resetCharactersOffset()
      this.loadCharacters()
    }
    else if(searchbar.value != '' && this.characters.length > 0){
      this.reloadCharactersList()
    }
    if(event){
      if(searchbar.value == '' && this.characters[0].id != 1011334){
        this.reloadCharactersList()
      }
    }
    searchbar.value = '';
  }

  /*
  Esconde la searchbar al entrar a la página
  */
  ionViewWillEnter(){
    this.hideSearchBar();
  }

  /*
  Refresca la lista de personajes al abandonar la página
  */
  ionViewWillLeave(){
    if(this.characters[0].id != 1011334){
      this.reloadCharactersList()
    }
  }

  /*
  Reestablece el offset de los personajes a 0
  */
  resetCharactersOffset(){
    this.data.offsetCharacters = 0;
  }

  /*
  Refresca la lista de personajes
  */
  reloadCharactersList(){
    this.characters = []
    this.resetCharactersOffset()
    this.loadCharacters()
  }
}