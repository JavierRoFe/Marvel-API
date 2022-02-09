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

  loadCharacters(event?) {
    this.data.getCharacters().subscribe(
      resp => {
        this.data.offsetCharacters += 20;
        console.log(resp)
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

  loadCharactersOnSearch(event?){
    console.log('bloqueando el infinite scroll')
    this.data.offsetSearchCharacters += 20
    var searchbar = document.querySelector('ion-searchbar');
    this.data.searchCharacters(searchbar.value).subscribe(
      resp=> {
        console.log(resp)
        if ((this.data.offsetSearchCharacters + 20) >= parseInt(resp.data.total)) {
          this.data.offsetSearchCharacters += (parseInt(resp.data.total) - this.data.offsetSearchCharacters)
          this.characters.push(...resp.data.results)
          //event.target.disabled = true;
          event.target.complete();
          return;
        }
        this.characters.push(...resp.data.results)
        if(event){
          event.target.complete();
        }
      }
    )
  }

  searchCharacters(searchValue){
    this.data.offsetSearchCharacters = 0;
    if(searchValue.target.value != ''){
      this.data.searchCharacters(searchValue.target.value).subscribe(
        resp => {
          this.characters = []
          this.characters.push(...resp.data.results)
        }
      )
    }
  }

  goToTop(){
    this.content.scrollToTop(500);
  }

  showSearchBar(){
    var btnsearch = document.getElementById('search-icon')
    btnsearch.setAttribute('name', 'close')
    var toolbarsearch = document.getElementById('toolbar-search')
    toolbarsearch.style.display="block"
    this.searchbarVisible = true
  }

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

  ionViewWillEnter(){
    this.hideSearchBar();
    this.goToTop();
  }

  ionViewWillLeave(){
    if(this.characters[0].id != 1011334){
      this.reloadCharactersList()
    }
  }

  resetCharactersOffset(){
    this.data.offsetCharacters = 0;
  }

  reloadCharactersList(){
    this.characters = []
    this.resetCharactersOffset()
    this.loadCharacters()
  }

}
