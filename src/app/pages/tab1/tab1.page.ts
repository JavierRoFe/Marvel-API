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
      })
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

  hideSearchBar(){
    var btnsearch = document.getElementById('search-icon')
    btnsearch.setAttribute('name', 'search')
    var toolbarsearch = document.getElementById('toolbar-search')
    toolbarsearch.style.display="none"
    this.searchbarVisible = false
  }

  ionViewWillEnter(){
    this.hideSearchBar();
  }

}
