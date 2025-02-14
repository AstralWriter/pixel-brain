import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {GameQuestion} from './question.model';
import gameQuestions from '../../../json/games/games-questions.json';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  // getQuestions(): Observable<GameQuestion[]> {
  //   return of(<GameQuestion[]> gameQuestion.gameQuestion);
  // }
  //
  getQuestionsByGameId(id: number): Observable<GameQuestion | undefined> {
    const game = gameQuestions.gameQuestion.find((g) => g.id === id) as GameQuestion | undefined;
    return of(game);
  }
}
