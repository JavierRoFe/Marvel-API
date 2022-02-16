import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ResultComic } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { ComicDetailComponent } from '../comic-detail/comic-detail.component';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss'],
})
export class ComicsComponent implements OnInit {

  @Input() comics: ResultComic[] = [];

  constructor(private modalCtrl: ModalController, private dataLocal: DataLocalService) { }

  ngOnInit() {}

  async openComicDetails(id){
    const modal = await this.modalCtrl.create({
      component: ComicDetailComponent,
      componentProps: {id}
    })
    modal.present()
  }

  getComicImage(comic){
    return comic.thumbnail.path + '/standard_medium.' + comic.thumbnail.extension;
  }

  storeFavComic(comic){
    this.dataLocal.setFavComics(comic)
  }

}
