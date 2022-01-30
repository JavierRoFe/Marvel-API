import { Component } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  characters = [];

  constructor(private dataLocal: DataLocalService) {}

  ngOnInit(){
    console.log('GUARDADOS: ', this.dataLocal.getFavCharacters())
    this.dataLocal.getFavCharacters().then(data =>{
      console.log('DATOS: ', data)
      this.characters = data
    })
  }

  getCharacterImage(character){
    return character.thumbnail.path + '/standard_medium.' + character.thumbnail.extension;
  }

  ionViewWillEnter(){
    this.dataLocal.getFavCharacters().then(data =>{
      console.log('VIEW WILL ENTER: ', data)
      this.characters = data
    })
  }

  removeCharacterFromList(character){
    this.dataLocal.unsetFavCharacters(character)
  }

}
