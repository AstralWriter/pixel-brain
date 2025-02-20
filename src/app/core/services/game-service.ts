import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Game} from './game.model';
import games from '../../../json/games/games.json';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  getGames(): Observable<Game[]> {
    return of(<Game[]> games.games);
  }

  getGameById(id: number): Observable<Game | undefined> {
    const game = games.games.find((game: Game) => game.id === id);
    return of(<Game | undefined> game);
  }
}
