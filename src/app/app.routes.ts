import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'intro', loadComponent: () => import('./view/intro/intro.component').then((c) => c. IntroComponent) },
  { path: 'home', loadComponent: () => import('./view/home/home.component').then((c) => c. HomeComponent) },
  { path: 'quiz/:id', loadComponent: () => import('./view/quiz/quiz.component').then((c) => c. QuizComponent) },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', loadComponent: () => import('./core/components/not-found/not-found.component').then((c) => c.NotFoundComponent) },
];
