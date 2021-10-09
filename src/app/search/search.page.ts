import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  query: any = gql`
  query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (id: $id, search: $search) {
        id
      	seasonYear
      	genres
      	episodes
        title {
          romaji
          english
        }
      }
    }
  }
  `;
  anime: any[] = [];
  fullAnime: any[] = [];
  searchTerm: string = "";
  addingToLocalStorage: any[] = [];

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: this.query
      })
      .valueChanges.subscribe((result: any) => {
        this.anime = result?.data?.Page.media
        console.log("apollo" ,this.anime);
        this.fullAnime = this.anime;
      });
  }

  searchForAnime() {
    console.log('Searching for ', this.searchTerm);

    if(this.searchTerm === "" || this.searchTerm === null) {
      this.anime = this.fullAnime;

      return
    }

    this.anime = this.anime.filter( (singularAnime: any) => {
      return singularAnime.title.romaji.toLowerCase().includes(this.searchTerm.toLowerCase());
    })

  }

  addToFavorites(selectedTitle) {
    console.log("favorite: ", selectedTitle);
    this.addingToLocalStorage.push(selectedTitle);
    localStorage.setItem("animeList", JSON.stringify(this.addingToLocalStorage));
    console.log("local storage:", this.addingToLocalStorage);
  }
}
