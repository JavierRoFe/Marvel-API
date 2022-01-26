import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersComponent } from './characters/characters.component';
import { ComicsComponent } from './comics/comics.component';



@NgModule({
  declarations: [
    CharactersComponent,
    ComicsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CharactersComponent,
    ComicsComponent
  ]
})
export class ComponentsModule { }
