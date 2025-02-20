import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { GameQuestion } from './question.model';
import gameQuestions from '../../../json/games/games-questions.json';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  getQuestionsByGameId(id: number): Observable<GameQuestion | undefined> {
    const question = gameQuestions.gameQuestion.find((question) => question.id === id);
    return of(<GameQuestion | undefined> question);
  }
}
