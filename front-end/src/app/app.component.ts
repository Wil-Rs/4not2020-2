import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-principal></app-principal>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'Escola Agora Vai';
}
