import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <div class="div-all">
          <router-outlet></router-outlet>
      </div>`
})
export class AppComponent {
}
