import { Component } from '@angular/core';
import { GameListComponent } from '../game-list/game-list.component';
import { IntroComponent } from '../intro/intro.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    GameListComponent,
    IntroComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
