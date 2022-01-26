import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ResultCharacter } from 'src/app/interfaces/interfaces';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {

  @Input() characters: ResultCharacter[] = [];

  constructor(private modalCtrl: ModalController) { }

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
}
