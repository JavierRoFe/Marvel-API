import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.page.html',
  styleUrls: ['./comic-detail.page.scss'],
})
export class ComicDetailPage implements OnInit {

  id;
  comic;

  constructor(private route: ActivatedRoute, private router: Router, private data: DataService) { 
    this.route.queryParams.subscribe(params => {
      if (params && params.comicId) {
        this.id = params.comicId;
      }
    })
  }

  ngOnInit() {
    this.data.getComicDetails(this.id).subscribe(
      resp =>{
        console.log(resp)
        this.comic = resp.data.results[0];
      }
    )
  }

}
