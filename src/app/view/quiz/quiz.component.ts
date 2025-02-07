import {Component, input} from '@angular/core';
import { RouterLink } from '@angular/router';
import {PbButtonDirective} from '../../core/components/button/button.directive';
import {OptionComponent} from '../../core/components/option/option.component';
import {Game} from '../../core/services/game.model';

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
  game = input<Game | undefined>();
  item = [1,2,3,4];
}
