import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {GameQuestion} from './question.model';
import gameQuestion from '../../../json/games/games-questions.json';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  // getQuestions(): Observable<GameQuestion[]> {
  //   return of(<GameQuestion[]> gameQuestion.gameQuestion);
  // }
  //
  getQuestionById(id: number): Observable<GameQuestion | undefined> {
    const game = gameQuestion.gameQuestion.find((g) => g.id === id);
    return of(game);
  }
}
