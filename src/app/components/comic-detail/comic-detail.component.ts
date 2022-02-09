import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.scss'],
})
export class ComicDetailComponent implements OnInit {

  @Input() id

  comic;
  creators = []
  btn_text = ['Añadir a favoritos', 'Eliminar de favoritos']
  favourite = false;

  constructor(private modalCtrl: ModalController, private data: DataService, private dataLocal: DataLocalService) { }

  ngOnInit() {
    this.data.getComicDetails(this.id).subscribe(
      resp =>{
        this.comic = resp.data.results[0];
        this.creators = resp.data.results[0].creators.items;
      }
    )
    this.dataLocal.getFavComics().then(data =>{
      for(let comic of data){
        if(this.id == comic.id){
          this.favourite = true;
        }
      }
    })
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

  storeFavComic(comic){
    this.favourite = true;
    this.dataLocal.setFavComics(comic)
  }

  getFavButtonIcon(){
    var icon = ''
    this.favourite ? icon = 'heart-dislike-outline' : icon = 'heart-outline';
    return icon;
  }

  unsetFavComic(comic){
    this.dataLocal.unsetFavComics(comic);
    this.favourite = false;
  }

}
