import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  host:{'class': 'p-4 m-4 flex flex-col rounded border gap-4'}
})
export class TimerComponent {

}
