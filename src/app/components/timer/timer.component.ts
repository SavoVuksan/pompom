import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  host:{'class': 'p-4 bg-red-500 block'}
})
export class TimerComponent {

}
