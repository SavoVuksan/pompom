/// <reference lib="webworker" />

import { interval, takeWhile, tap, timeout } from 'rxjs';
import { Duration } from '../models/timer.model';

let timer: Duration | undefined;
let remainingTime: number = 0;
addEventListener('message', ({ data }) => {
  timer = new Duration(data.minutes, data.seconds);
  remainingTime = timer.toSeconds();

  interval(1000)
    .pipe(
      tap(() => {
        if (remainingTime >= 0) {
          postMessage({
            remainingTime: Duration.fromSeconds(remainingTime),
          });
        } else {
          postMessage({
            timerState: 'finished',
          });
        }
        remainingTime--;
      }),
      takeWhile(() => remainingTime >= -1)
    )
    .subscribe();
});
