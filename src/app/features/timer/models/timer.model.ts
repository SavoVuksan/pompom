export type TimerState = 'not-started' | 'running' | 'paused' | 'completed';

export type TimerData = {
  currentTime: number,
  maxTime: number,
  state: TimerState
};

export type PomodoroState = 'focus' | 'break';

export type PomodoroData = {
  state: PomodoroState,
  pomodoroCount: number,
  focusDuration: number,
  shortBreakDuration: number,
  longBreakDuration: number,
  longBreakInterval: number,
}