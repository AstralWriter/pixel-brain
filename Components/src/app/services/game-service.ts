import { Injectable } from '@angular/core';
import { Game } from './game.model';
import games from '../../assets/games/games.json';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  getGames(): Promise<Game[]> {
    return Promise.resolve(games.games);
  }

  getGameById(id: number): Promise<Game | undefined> {
    return Promise.resolve(games.games.find((game: Game) => game.id === id));
  }
}
