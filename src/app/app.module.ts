import {RouterModule, Routes} from '@angular/router';
import {IntroComponent} from './intro/intro.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {NgModule} from '@angular/core';


const appRoutes: Routes = [
  {path: 'crisis-center', component: IntroComponent},
];

@NgModule({
  imports: [
    BrowserModule, FormsModule,
    RouterModule.forRoot(
      appRoutes, {enableTracing: true}
    ), AppComponent, IntroComponent
  ],
  declarations: [
  ],
})
export class AppModule {
}
