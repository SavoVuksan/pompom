import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { PomodoroData, PomodoroState, TimerData } from "../models/timer.model";
import { computed } from "@angular/core";

const initialState: PomodoroData = {
    focusDuration: 2,
    longBreakDuration: 2,
    longBreakInterval: 4,
    pomodoroCount: 0,
    shortBreakDuration: 2,
    state: "focus"
}

export const PomodoroStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ state, pomodoroCount, longBreakInterval }) => ({
        title: computed(() => state() === 'focus' ? 'Focus' : 'Break'),
        finishedTimers: computed(() => pomodoroCount() % longBreakInterval())
    })),
    withMethods((store) => ({
        switchState() {
            const nextState: PomodoroState = store.state() === 'focus' ? 'break' : 'focus';
            if (nextState === 'break') {
                patchState(store, ({ pomodoroCount: store.pomodoroCount() + 1 }))
            }
            patchState(store, ({ state: nextState }))
        },
        getTimerStoreData() {
            if (store.state() === 'focus') {
                return {
                    currentTime: store.focusDuration(),
                    maxTime: store.focusDuration(),
                    state: 'not-started'
                } satisfies TimerData
            } else {
                return {
                    currentTime: store.shortBreakDuration(),
                    maxTime: store.shortBreakDuration(),
                    state: 'not-started'
                } satisfies TimerData;
            }
        },
        getBreakCounterColor(counter: number) {
            if (counter < store.finishedTimers()) {
                return 'bg-blue-500';
            } else {
                return 'bg-gray-500';
            }
        }
    }))
)