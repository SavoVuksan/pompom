import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { PomodoroData, PomodoroState, TimerData } from "../models/timer.model";
import { computed } from "@angular/core";

const initialState: PomodoroData = {
    focusDuration: 25,
    longBreakDuration: 15,
    longBreakInterval: 4,
    pomodoroCount: 1,
    shortBreakDuration: 5,
    state: "focus"
}

export const PomodoroStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ state }) => ({
        title: computed(() => state() === 'focus' ? 'Focus' : 'Break')
    })),
    withMethods((store) => ({
        switchState() {
            const nextState: PomodoroState = store.state() === 'focus' ? 'break' : 'focus';
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
        }
    }))
)