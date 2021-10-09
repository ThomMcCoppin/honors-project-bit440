import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  topAnime: any[] = [];
  addingToLocalStorage: any[] = [];

  constructor() {}

  ngOnInit() {
    this.fetchTopAnime();
  }

  fetchTopAnime() {
    this.topAnime = JSON.parse(localStorage.getItem("animeList"));
    console.log("anime:", this.topAnime);
  }
  
  exportAnime(selectedAnime) {
    sessionStorage.setItem("animeId", selectedAnime);
  }

  removeFavorite(selectedAnimeId) {
    this.topAnime.forEach(currentAnime => {
      if(currentAnime.id === selectedAnimeId) {
        this.topAnime = this.topAnime.filter(function(anime) {
          return anime.id != selectedAnimeId;
        })
      localStorage.setItem("animeList", JSON.stringify(this.topAnime));
      }
    });
  }

// so, ion buttons arne't needed
// in foreach, the "element" tag is what the current iteated item is
// use (click) on any element
 }
