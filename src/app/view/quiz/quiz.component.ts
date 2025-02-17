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
    class: 'min-h-screen w-full flex justify-center',
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
  score = signal(0);

  currentQuestion = signal(0);
  selectedAnswer = signal<number | null>(null);
  isAnswerCorrect = signal<boolean | null>(null);
  isAnswerSubmitted = signal<boolean>(false);

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

    this.arrayShuffleQuestions();
    this.arrayShuffleAnswers();
  }

  public shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  public arrayShuffleQuestions(): void {
    if (this.questions?.length) {
      this.questions = this.shuffleArray([...this.questions]);
    }
  }

  public arrayShuffleAnswers(): void {
    if (this.questions?.length) {
      this.questions.forEach(question => {
        if (question.answers?.length) {
          question.answers = this.shuffleArray([...question.answers]);
        }
      });
    }
  }

  public submitButton(): void {
    this.currentQuestion.set(this.currentQuestion() + 1);
  }

  selectAnswer(index: number) {
    if (this.isAnswerSubmitted()) return;

    this.selectedAnswer.set(index);
  }

  submitAnswer() {
    if (this.selectedAnswer() === null) return;

    const correctAnswer = this.questions[this.currentQuestion()].answers.find(a => a.correct);
    const selectedAnswer = this.questions[this.currentQuestion()].answers[this.selectedAnswer()!];

    const isCorrect = selectedAnswer === correctAnswer;
    this.isAnswerCorrect.set(isCorrect);
    this.isAnswerSubmitted.set(true);

    if (isCorrect) {
      this.score.set(this.score() + 1);
    }
  }

  nextQuestion() {
    if (this.currentQuestion() < this.questions.length - 1) {
      this.currentQuestion.set(this.currentQuestion() + 1);
      this.selectedAnswer.set(null);
      this.isAnswerCorrect.set(null);
      this.isAnswerSubmitted.set(false);
    } else {
      alert("Quiz beendet!");
    }
  }
}
