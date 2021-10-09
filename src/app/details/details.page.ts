import { Component, OnInit } from '@angular/core';
import { Anime } from '../interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  selectedAnime: any;

  constructor() { }

  ngOnInit() {
    this.getAnimeDetails();
  }

  getAnimeDetails(animeId?) {
    animeId = sessionStorage.getItem("animeId");
    animeId = parseInt(animeId); //interesting thing, animeId is a string out of local storage, which is why it won't compare with currentAnime
    this.selectedAnime = JSON.parse(localStorage.getItem("animeList"));
    this.selectedAnime.forEach(currentAnime => {  
      if (animeId === currentAnime.id) {
        this.selectedAnime = currentAnime;
        console.log("found in array", this.selectedAnime);
      }
    });
  }
}