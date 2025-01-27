import {Component} from '@angular/core';

@Component({
  selector: 'head-component',
  standalone: true,
  templateUrl: './head.component.html',
  host: {
    class: 'flex flex-col gap-4',
  }
})
export class HeadComponent {

}
