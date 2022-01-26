import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  characters = []

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

}
