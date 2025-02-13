import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PbButtonDirective} from '../../core/components/button/button.directive';
import {OptionComponent} from '../../core/components/option/option.component';
import {Game} from '../../core/services/game.model';
import {GameService} from '../../core/services/game-service';
import {QuestionService} from '../../core/services/question-service';
import {GameQuestion} from '../../core/services/question.model';

@Component({
  selector: 'quiz-component',
  standalone: true,
  imports: [
    RouterLink,
    PbButtonDirective,
    OptionComponent,
  ],
  host: {
    class: 'h-full w-full flex justify-center',
  },
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.less'
})
export class QuizComponent {
  private gameService = inject(GameService);
  private questionService = inject(QuestionService);
  private route = inject(ActivatedRoute);

  question: GameQuestion = <GameQuestion>{};
  game: Game | undefined = <Game | undefined>{};
  numbering = ["A", "B", "C", "D"];

  ngOnInit(): void {
    const gameId = Number(this.route.snapshot.paramMap.get('id'));

    this.gameService.getGameById(gameId).subscribe((data) => {
      this.game = data;
    });

    this.questionService.getQuestionById(gameId).subscribe((data) => {
      if (data) {
        this.question = data;
      }
    });

    const questionsArray = this.question?.questions ?? [];

    const shuffle = (array: { id: number; question: string; answers: { text: string; correct: boolean }[] }[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    if (questionsArray.length > 0) {
      const shuffledArray = shuffle([...questionsArray]);
      console.log(shuffledArray);
    }
  }

  public arrayShuffle(array: any[]) {}
}
