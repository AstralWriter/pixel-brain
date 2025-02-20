import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PbButtonDirective} from '../../core/components/button/button.directive';
import {OptionComponent} from '../../core/components/option/option.component';
import {Game} from '../../core/services/game.model';
import {GameService} from '../../core/services/game-service';
import {QuestionService} from '../../core/services/question-service';
import {Question} from '../../core/services/question.model';
import {QuizEndComponent} from '../quiz-end/quiz-end.component';

@Component({
  selector: 'quiz-component',
  standalone: true,
  imports: [
    RouterLink,
    PbButtonDirective,
    OptionComponent,
    QuizEndComponent,
  ],
  host: {
    class: 'min-h-screen w-full flex justify-center',
  },
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.less' // Less Datei kann auch hier raus
})
export class QuizComponent { // da du die ngOnInit methode benutzt solltest du auch das interface für OnInit implementieren
  private gameService = inject(GameService);
  private questionService = inject(QuestionService);
  private route = inject(ActivatedRoute);

  questions: Question[] = []; // signal benutzen
  game: Game | undefined = <Game | undefined>{}; // signal benutzen
  numbering = ["A", "B", "C", "D"]; // signal benutzen
  quizState = "Quizzing"; //zum signal umbauen und entweder ENUM oder type verwenden
  questionCounter = 10; // signal benutzen

  score = signal(0);
  currentQuestion = signal(0);
  selectedAnswer = signal<number | null>(null);
  isAnswerCorrect = signal<boolean | null>(null);
  isAnswerSubmitted = signal<boolean>(false);

  ngOnInit(): void {
    const gameId = Number(this.route.snapshot.paramMap.get('id'));

    this.gameService.getGameById(gameId).subscribe((data) => { // typisierung
      this.game = data;
    });

    this.questionService.getQuestionsByGameId(gameId).subscribe((data) => { // typisierung
      if (data) {
        this.questions = data.questions;
      }
    });

    // das Fragen problem, dass die einmal kurz evaluiert und dann geändert werden existiert nach wie vor oder? das vielleicht noch fixen
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

  public submitButton(): void { // unbenutzte methode
    this.currentQuestion.set(this.currentQuestion() + 1);
  }

  public selectAnswer(index: number): void {
    if (this.isAnswerSubmitted()) return;

    this.selectedAnswer.set(index);
  }

  public submitAnswer() {
    if (this.selectedAnswer() === null) return;

    const correctAnswer = this.questions[this.currentQuestion()].answers.find(a => a.correct); // variablenname "a" ist sehr nichts sagend
    const selectedAnswer = this.questions[this.currentQuestion()].answers[this.selectedAnswer()!];

    const isCorrect = selectedAnswer === correctAnswer;
    this.isAnswerCorrect.set(isCorrect);
    this.isAnswerSubmitted.set(true);

    if (isCorrect) {
      this.score.set(this.score() + 1);
    }
  }

  public nextQuestion(): void {
    if (this.currentQuestion() + 1 < this.questionCounter ) {
      this.currentQuestion.set(this.currentQuestion() + 1);
      this.selectedAnswer.set(null);
      this.isAnswerCorrect.set(null);
      this.isAnswerSubmitted.set(false);
      this.quizState = "Quizzing";
    } else {
      this.quizState = "Finish";
    }
  }
}
