import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {PbButtonDirective} from '../../core/components/button/button.directive';

@Component({
  selector: 'quiz-component',
  standalone: true,
  imports: [
    RouterLink,
    PbButtonDirective,
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.less'
})
export class QuizComponent {
  item = [1,2,3,4];
}
