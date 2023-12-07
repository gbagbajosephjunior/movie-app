import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent  implements OnInit{
  movie: Movie | undefined;
  safeTrailerUrl: SafeResourceUrl = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');

    if (movieId !== null) {
      const movieIdString: string = movieId;

      this.movie = this.movieService.getMovieById(movieIdString);

      if (this.movie && this.movie.trailerLink) {
        const videoId = this.getVideoIdFromUrl(this.movie.trailerLink);
        this.safeTrailerUrl = this.getSafeTrailerUrl(videoId);
      }
    }
  }

  getVideoIdFromUrl(url: string): string {
    const videoId = url.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      return videoId.substring(0, ampersandPosition);
    }
    return videoId;
  }

  getSafeTrailerUrl(videoId: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
