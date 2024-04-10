export type TimerState = 'not-started' | 'running' | 'paused' | 'completed';

export type TimerData = {
  currentTime: number,
  maxTime: number,
  state: TimerState
};