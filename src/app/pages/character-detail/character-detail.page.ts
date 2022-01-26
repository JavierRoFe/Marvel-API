import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
})
export class CharacterDetailPage implements OnInit {

  id;
  character;

  constructor(private route: ActivatedRoute, private router: Router, private data: DataService) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.characterId) {
        this.id = params.characterId;
      }
    })
  }

  ngOnInit() {
    this.data.getCharacterDetails(this.id).subscribe(
      resp =>{
        this.character = resp.data.results[0];
      }
    )
  }

}
