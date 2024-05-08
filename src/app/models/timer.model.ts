import { Subscription, min } from 'rxjs';

export type TimerState = 'not-started' | 'running' | 'paused' | 'completed';

export type TimerData = {
  currentTime: Duration;
  maxTime: Duration;
  state: TimerState;
};

export type PomodoroState = 'focus' | 'break';

export type PomodoroData = {
  state: PomodoroState;
  pomodoroCount: number;
  focusDuration: Duration;
  shortBreakDuration: Duration;
  longBreakDuration: Duration;
  longBreakInterval: number;
  timerData: TimerData;
  timer?: Subscription;
};

export class Duration {
  constructor(public minutes: number, public seconds: number) {}

  toSeconds() {
    return this.minutes * 60 + this.seconds;
  }

  substractSeconds(amount: number) {
    if (this.seconds - amount < 0) {
      this.minutes = this.minutes - 1;
      const rest = Math.abs(this.seconds - amount);
      this.seconds = 60 - rest;
    } else {
      this.seconds = this.seconds - amount;
    }

    return this;
  }

  static fromDuration(duration: Duration) {
    return new Duration(duration.minutes, duration.seconds);
  }
}
