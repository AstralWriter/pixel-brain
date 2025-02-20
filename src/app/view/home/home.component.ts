import { Component } from '@angular/core';
import {GameListComponent} from '../game-list/game-list.component';
import {IntroComponent} from '../intro/intro.component';
import {GameComponent} from '../../core/components/game/game.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    GameListComponent,
    IntroComponent,
    GameComponent // raus und dran denken auch die imports immer zu löschen die nicht benutzt werden
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less' // Leere less datei löschen
})
export class HomeComponent {

}
