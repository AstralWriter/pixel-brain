import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import {ButtonComponent} from '../../core/components/button/button.component';

@Component({
  selector: 'quiz-component',
  standalone: true,
  imports: [
    RouterLink,
    ButtonComponent
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.less'
})
export class QuizComponent {
  item = [1,2,3,4];
}
