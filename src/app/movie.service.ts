
import { Injectable } from '@angular/core';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movies: Movie[] = [
    {
      title: 'Tenet',
      description: 'Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',
      rating: 7.8,
      id: 1,
      duration: '2h 30min',
      genre: ['Action', 'Sci-Fi'],
      releasedDate: '3 September 2020',
      trailerLink: 'https://www.youtube.com/watch?v=LdOM0x0XDMo',
      thumbnailUrl: '/assets/Tenet.png' 
    },
    
    {
      title: 'Spider-Man: Into the Spider-Verse',
      description: 'Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.',
      rating: 8.4,
      duration: '1h 57min',
      id: 2,
      genre: ['Action', 'Animation', 'Adventure'],
      releasedDate: '14 December 2018',
      trailerLink: 'https://www.youtube.com/watch?v=tg52up16eq0',
      thumbnailUrl: '/assets/Spider Man.png' 
    },
    
    {
      title: 'Knives Out',
      description: 'A detective investigates the death of a patriarch of an eccentric, combative family.',
      rating: 7.9,
      duration: '2h 10min',
      id: 3,
      genre: ['Comedy', 'Crime', 'Drama'],
      releasedDate: '27 November 2019',
      trailerLink: 'https://www.youtube.com/watch?v=qGqiHJTsRkQ',
      thumbnailUrl: '/assets/Knives Out.png' 
    },

    {
      title: 'Guardians of the Galaxy',
      description: 'A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.',
      rating: 8.0,
      duration: '2h 1min',
      id: 4,
      genre: ['Action', 'Adventure', 'Comedy'],
      releasedDate: '1 August 2014',
      trailerLink: 'https://www.youtube.com/watch?v=d96cjJhvlMA',
      thumbnailUrl: '/assets/Guardians of The Galaxy.png '
    },

    {
      title: 'Avengers: Age of Ultron',
      description: "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.",
      rating: 7.3,
      duration: '2h 21min',
      id: 5,
      genre: ['Action', 'Adventure', 'Sci-Fi'],
      releasedDate: '1 May 2015',
      trailerLink: 'https://www.youtube.com/watch?v=tmeOjFno6Do',
      thumbnailUrl: '/assets/Avengers.png' 
    }
    
    
    
  ];

  private watchlist: string[] = [];

  constructor() { }

  getMovies(): Movie[] {
    return this.movies;
  }
  getMovieById(id: string): Movie | undefined {
    return this.movies.find(movie => movie.id.toString() === id);
  }
  

  addToWatchlist(movie: Movie): void {
    if (!this.watchlist.includes(movie.title)) {
      this.watchlist.push(movie.title);
      localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
    }
  }

  removeFromWatchlist(movie: Movie): void {
    const index = this.watchlist.indexOf(movie.title);
    if (index !== -1) {
      this.watchlist.splice(index, 1);
      localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
    }
  }

  getWatchlist(): string[] {
    const storedWatchlist = localStorage.getItem('watchlist');
    if (storedWatchlist) {
      this.watchlist = JSON.parse(storedWatchlist);
    }
    return this.watchlist;
  }

}

