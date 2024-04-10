import { Component, HostBinding } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';

@Component({
  selector: 'timer',
  standalone: true,
  imports: [
    ButtonModule, CardModule,
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  host:{'class': 'p-4 m-4'}
})
export class TimerComponent {
  timeLeft: number = 60;
}
