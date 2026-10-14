import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-greeting2',
  standalone: true,
  imports: [],
  templateUrl: './greeting2.component.html',
  styleUrl: './greeting2.component.css'
})
export class GreetingComponent2 {
  @Input() name = 'мир';
}
