import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink,} from '@angular/router';
import { PbButtonDirective } from '../../core/components/button/button.directive';
import { OptionComponent } from '../../core/components/option/option.component';
import { Game } from '../../core/services/game.model';
import { GameService } from '../../core/services/game-service';
import { QuestionService } from '../../core/services/question-service';
import { Question } from '../../core/services/question.model';
import {State} from '../../core/services/state-enum';

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
})
export class QuizComponent implements OnInit{
  private gameService = inject(GameService);
  private questionService = inject(QuestionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  questions = signal<Question[]>([]);
  game = signal<Game | undefined>(undefined);
  // überall single quotes verwenden in typescript anstelle von double quotes
  numbering = signal<["A", "B", "C", "D"]>(["A", "B", "C", "D"]);
  quizState = signal(State.Quizzing);
  questionCounter = signal<number>(10);
  score = signal<number>(0);
  currentQuestion = signal<number>(0);
  selectedAnswer = signal<number | null>(null);
  isAnswerCorrect = signal<boolean | null>(null);
  isAnswerSubmitted = signal<boolean>(false);

  ngOnInit(): void {
    const gameId = Number(this.route.snapshot.paramMap.get('id'));

    this.gameService.getGameById(gameId).subscribe({
      // typisierung
      next: (data) => {
        if (!data) {
          this.router.navigate(['/404']);
          return;
        }
        this.game.set(data);
      }
    });

    // typisierung
    this.questionService.getQuestionsByGameId(gameId).subscribe((data) => {
      if (data?.questions?.length) {
        const shuffledQuestions = this.shuffleArray([...data.questions]);

        shuffledQuestions.forEach((question) => {
          if (question.answers?.length) {
            question.answers = this.shuffleArray([...question.answers]);
          }
        });

        this.questions.set(shuffledQuestions);
      }
    });
  }

  public shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  public selectAnswer(index: number): void {
    if (this.isAnswerSubmitted()) return;

    this.selectedAnswer.set(index);
  }

  public submitAnswer() {
    if (this.selectedAnswer() === null) return;

    // typisierung
    const correctAnswer = this.questions()[this.currentQuestion()].answers.find(answer => answer.correct);
    const selectedAnswer = this.questions()[this.currentQuestion()].answers[this.selectedAnswer()!];
    const isCorrect = selectedAnswer === correctAnswer;

    this.isAnswerCorrect.set(isCorrect);
    this.isAnswerSubmitted.set(true);

    if (isCorrect) {
      this.score.set(this.score() + 1);
    }
  }

  public nextQuestion(): void {
    if (this.currentQuestion() + 1 < this.questionCounter()) {
      this.currentQuestion.set(this.currentQuestion() + 1);
      this.selectedAnswer.set(null);
      this.isAnswerCorrect.set(null);
      this.isAnswerSubmitted.set(false);
      this.quizState.set(State.Quizzing);
    } else {
      this.quizState.set(State.Finish);
    }
  }
}
