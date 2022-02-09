import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.scss'],
})
export class ComicDetailComponent implements OnInit {

  @Input() id

  comic;
  creators = []

  constructor(private modalCtrl: ModalController, private data: DataService) { }

  ngOnInit() {
    this.data.getComicDetails(this.id).subscribe(
      resp =>{
        this.comic = resp.data.results[0];
        this.creators = resp.data.results[0].creators.items;
      }
    )
  }

  goBack(){
    this.modalCtrl.dismiss()
  }

  getComicImage(comic){
    return comic.thumbnail.path + '/portrait_fantastic.' + comic.thumbnail.extension;
  }

  getCreators(){
    var creatorsList = ''
    var index = 0;
    for(let creator of this.creators){
      if(index != this.creators.length - 1){
        creatorsList += creator.name + ', ';
      }else{
        creatorsList += creator.name;
      }
      index++;
    }
    return creatorsList;
  }

}
