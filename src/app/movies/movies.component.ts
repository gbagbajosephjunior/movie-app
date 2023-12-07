import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit{
  movies: Movie[] = [];
  sortedMovies: Movie[] = [];
  sortBy: string = ''; 
  watchlist: string[] = [];
  searchText: string = ''; 
  selectedGenre: string = ''; 

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movies = this.movieService.getMovies();
    this.sortedMovies = [...this.movies];
    this.watchlist = this.movieService.getWatchlist();
  }

  toggleWatchlist(movie: Movie): void {
    const index = this.watchlist.indexOf(movie.title);
    if (index !== -1) {
      this.removeFromWatchlist(index);
    } else {
      this.addToWatchlist(movie.title);
    }
  }

  addToWatchlist(title: string): void {
    this.watchlist.push(title);
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }

  removeFromWatchlist(index: number): void {
    this.watchlist.splice(index, 1);
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }

  isInWatchlist(movie: Movie): boolean {
    return this.watchlist.includes(movie.title);
  }

  sortMovies(type: string): void {
    this.sortBy = type;
    if (type === 'title') {
      this.sortedMovies = this.movies.slice().sort((a, b) => a.title.localeCompare(b.title));
    } else if (type === 'releaseDate') {
      this.sortedMovies = this.movies.slice().sort((a, b) => new Date(a.releasedDate).getTime() - new Date(b.releasedDate).getTime());
    }
  }

  
  searchMovies(): void {
    this.sortedMovies = this.movies.filter(movie =>
      movie.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  
  filterByGenre(): void {
    if (this.selectedGenre === '') {
      this.sortedMovies = [...this.movies];
    } else {
      this.sortedMovies = this.movies.filter(movie =>
        movie.genre.includes(this.selectedGenre)
      );
    }
  }

}
