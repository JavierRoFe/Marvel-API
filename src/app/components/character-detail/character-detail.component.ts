import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit {

  @Input() id

  character;
  comics = [];
  btn_text = ['Añadir a favoritos', 'Eliminar de favoritos']
  favourite = false;

  constructor(private modalCtrl: ModalController, private data: DataService, private dataLocal: DataLocalService) { }

  ngOnInit() {
    this.data.getCharacterDetails(this.id).subscribe(
      resp =>{
        this.character = resp.data.results[0];
        this.comics = resp.data.results[0].comics.items;
      }
    )
    this.dataLocal.getFavCharacters().then(data =>{
      for(let character of data){
        if(this.id == character.id){
          this.favourite = true;
        }
      }
    })
  }

  goBack(){
    this.modalCtrl.dismiss()
  }

  getCharacterImage(character){
    return character.thumbnail.path + '/landscape_xlarge.' + character.thumbnail.extension;
  }

  storeFavCharacter(character){
    this.favourite = true;
    console.log('PERSONAJE: ' + character.name)
    this.dataLocal.setFavCharacter(character)
  }

  getFavButtonIcon(){
    var icon = ''
    this.favourite ? icon = 'heart-dislike-outline' : icon = 'heart-outline';
    return icon;
  }

  unsetFavCharacter(character){
    this.dataLocal.unsetFavCharacters(character);
    this.favourite = false;
  }

}
