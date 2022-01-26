import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersComponent } from './characters/characters.component';
import { ComicsComponent } from './comics/comics.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { ComicDetailComponent } from './comic-detail/comic-detail.component';



@NgModule({
  declarations: [
    CharactersComponent,
    ComicsComponent,
    CharacterDetailComponent,
    ComicDetailComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CharactersComponent,
    ComicsComponent,
    CharacterDetailComponent,
    ComicDetailComponent,
  ]
})
export class ComponentsModule { }
