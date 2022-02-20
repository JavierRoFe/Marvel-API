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

  /*
  Cierra el modal
  */
  goBack(){
    this.modalCtrl.dismiss()
  }

  /*
  Devuelve la ruta de la imagen del comic
  */
  getComicImage(comic){
    return comic.thumbnail.path + '/portrait_fantastic.' + comic.thumbnail.extension;
  }

  /*
  Devuelve un string con la lista de autores del comic
  */
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

  /*
  Llama a la función que guarda el comic en el local storage
  */
  storeFavComic(comic){
    this.favourite = true;
    this.dataLocal.setFavComics(comic)
  }

  /*
  Cambia el icono del botón dependiendo de si el comic está en favoritos o no
  */
  getFavButtonIcon(){
    var icon = ''
    this.favourite ? icon = 'heart-dislike-outline' : icon = 'heart-outline';
    return icon;
  }

  /*
  Llama a la función que elimina a un comic de favoritos en el local storage
  */
  unsetFavComic(comic){
    this.dataLocal.unsetFavComics(comic);
    this.favourite = false;
  }

}
