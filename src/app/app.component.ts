import { Component } from '@angular/core';
import { GreetingComponent } from './greeting/greeting.component';
import { GreetingComponent2 } from './greeting2/greeting2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GreetingComponent, GreetingComponent2],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-app';
  count = 0;

  increment(): void {
    this.count++;
  }

  reset(): void {
    this.count = 0;
  }
}
