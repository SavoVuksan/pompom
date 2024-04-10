import { Component, HostBinding, effect, inject } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import { patchState, signalState } from '@ngrx/signals';
import { interval } from 'rxjs';
import { TimerData } from '../../models/timer.model';
import { TimerService } from '../../data/timer.service';
import { AsyncPipe } from '@angular/common';



@Component({
  selector: 'timer',
  standalone: true,
  imports: [
    ButtonModule, CardModule, AsyncPipe
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  host:{'class': 'p-4 m-4'}
})
export class TimerComponent {
  timerService = inject(TimerService);
}
