import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit {

  @Input() id

  character;

  constructor(private modalCtrl: ModalController, private data: DataService) { }

  ngOnInit() {
    this.data.getCharacterDetails(this.id).subscribe(
      resp =>{
        this.character = resp.data.results[0];
      }
    )
  }

  goBack(){
    this.modalCtrl.dismiss()
  }

  getCharacterImage(character){
    return character.thumbnail.path + '/landscape_xlarge.' + character.thumbnail.extension;
  }

}
