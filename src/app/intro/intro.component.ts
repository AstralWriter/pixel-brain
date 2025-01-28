import {Component} from '@angular/core';

@Component({
  selector: 'intro-component',
  standalone: true,
  templateUrl: './intro.component.html',
  host: {
    class: 'flex flex-col gap-4',
  }
})
export class IntroComponent {

}
