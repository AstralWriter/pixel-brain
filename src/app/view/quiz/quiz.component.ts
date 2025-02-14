import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PbButtonDirective} from '../../core/components/button/button.directive';
import {OptionComponent} from '../../core/components/option/option.component';
import {Game} from '../../core/services/game.model';
import {GameService} from '../../core/services/game-service';
import {QuestionService} from '../../core/services/question-service';
import {Question} from '../../core/services/question.model';

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

  questions: Question[] = [];
  game: Game | undefined = <Game | undefined>{};
  numbering = ["A", "B", "C", "D"];
  currentQuestion = signal(0);

  ngOnInit(): void {
    const gameId = Number(this.route.snapshot.paramMap.get('id'));

    this.gameService.getGameById(gameId).subscribe((data) => {
      this.game = data;
    });

    this.questionService.getQuestionsByGameId(gameId).subscribe((data) => {
      if (data) {
        this.questions = data.questions;
      }
    });
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  public arrayShuffle() {
    if (this.questions?.length) {
      this.questions = this.shuffleArray([...this.questions]);
      console.log(this.questions);
    }
  }

  public arrayShuffleText() {
    if (this.questions?.[0]?.answers?.length) {
      this.questions[0].answers = this.shuffleArray([...this.questions[0].answers]);
      console.log(this.questions[0].answers);
    }
  }

  public SubmitButton(): void {
    this.currentQuestion.set(this.currentQuestion() + 1);
  }
}
