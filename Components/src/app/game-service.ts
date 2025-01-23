import {Injectable} from '@angular/core';
import game from '../assets/games/games.json';

@Injectable()
export class GameService {
  getGames(): Promise<game[]> {
    return Promise.resolve(game);
  }
}
