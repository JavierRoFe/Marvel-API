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

  hideSearchBar(){
    var btnsearch = document.getElementById('search-icon-comics')
    btnsearch.setAttribute('name', 'search')
    var toolbarsearch = document.getElementById('toolbar-search-comics')
    toolbarsearch.style.display="none"
    this.searchbarVisible = false
  }

  ionViewWillEnter(){
    this.hideSearchBar();
  }

}
