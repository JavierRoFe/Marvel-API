import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ResultComic } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss'],
})
export class ComicsComponent implements OnInit {

  @Input() comics: ResultComic[] = [];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {}

  openComicDetails(id){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        comicId: id
      }
    };
    this.router.navigate(['comic-detail'], navigationExtras);
  }

}
