import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  comics = []

  searchbarVisible = false;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.loadComics();
  }

  loadComics(event?) {
    this.data.getComics().subscribe(
      resp => {
        this.data.offsetComics += 20;
        console.log(resp)
        if ((this.data.offsetComics + 20) >= parseInt(resp.data.total)) {
          this.data.offsetComics += (parseInt(resp.data.total) - this.data.offsetComics)
          this.comics.push(...resp.data.results)
          event.target.disabled = true;
          event.target.complete();
          return;
        }
        this.comics.push(...resp.data.results)
        if (event) {
          event.target.complete()
        }
      })
  }

  loadComicsOnSearch(event?){
    console.log('bloqueando el infinite scroll')
    this.data.offsetSearchComics += 20
    var searchbar = document.querySelector('ion-searchbar');
    this.data.searchComics(searchbar.value).subscribe(
      resp=> {
        console.log(resp)
        if ((this.data.offsetSearchComics + 20) >= parseInt(resp.data.total)) {
          this.data.offsetSearchComics += (parseInt(resp.data.total) - this.data.offsetSearchComics)
          this.comics.push(...resp.data.results)
          //event.target.disabled = true;
          event.target.complete();
          return;
        }
        this.comics.push(...resp.data.results)
        if(event){
          event.target.complete();
        }
      }
    )
  }

  searchComics(searchValue){
    this.data.offsetSearchComics = 0;
    if(searchValue.target.value != ''){
      this.data.searchComics(searchValue.target.value).subscribe(
        resp => {
          this.comics = []
          this.comics.push(...resp.data.results)
        }
      )
    }
  }

  goToTop(){
    this.content.scrollToTop(500);
  }

  showSearchBar(){
    var btnsearch = document.getElementById('search-icon-comics')
    btnsearch.setAttribute('name', 'close')
    var toolbarsearch = document.getElementById('toolbar-search-comics')
    toolbarsearch.style.display="block"
    this.searchbarVisible = true
  }

  hideSearchBar(event?){
    var btnsearch = document.getElementById('search-icon-comics')
    btnsearch.setAttribute('name', 'search')

    var toolbarsearch = document.getElementById('toolbar-search-comics')
    toolbarsearch.style.display="none"
    this.searchbarVisible = false

    var searchbar = document.querySelector('ion-searchbar');
    if(searchbar.value != '' && this.comics.length == 0){
      this.resetComicsOffset()
      this.loadComics()
    }
    else if(searchbar.value != '' && this.comics.length > 0){
      this.reloadComicsList()
    }
    if(event){
      if(searchbar.value == '' && this.comics[0].id != 82967){
        this.reloadComicsList()
      }
    }
    searchbar.value = '';
  }

  ionViewWillEnter(){
    this.hideSearchBar();
  }

  ionViewWillLeave(){
    if(this.comics[0].id != 82967){
      this.reloadComicsList()
    }
  }

  resetComicsOffset(){
    this.data.offsetComics = 0;
  }

  reloadComicsList(){
    this.comics = []
    this.resetComicsOffset()
    this.loadComics()
  }

}
