export type TimerState = 'not-started' | 'running' | 'paused' | 'completed';

export type TimerData = {
  time: number
  state: TimerState
};