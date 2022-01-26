import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ResultCharacter } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {

  @Input() characters: ResultCharacter[] = [];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {}

  openCharacterDetails(id){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        characterId: id
      }
    };
    this.router.navigate(['character-detail'], navigationExtras);
  }
}
