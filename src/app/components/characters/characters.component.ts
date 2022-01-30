import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ResultCharacter } from 'src/app/interfaces/interfaces';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {

  @Input() characters: ResultCharacter[] = [];

  favCharacters = [];

  constructor(private modalCtrl: ModalController, private dataLocal: DataLocalService) { }

  ngOnInit() {}

  async openCharacterDetails(id){
    const modal = await this.modalCtrl.create({
      component: CharacterDetailComponent,
      componentProps: {id}
    })
    modal.present()
  }

  getCharacterImage(character){
    return character.thumbnail.path + '/standard_medium.' + character.thumbnail.extension;
  }

  storeFavCharacter(character){
    console.log('PERSONAJE: ' + character.name)
    //this.favCharacters.push(character)
    this.dataLocal.setFavCharacter(character)
  }
}
