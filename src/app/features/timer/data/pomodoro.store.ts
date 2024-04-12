import { signalStore, withComputed, withState } from "@ngrx/signals";
import { PomodoroData } from "../models/timer.model";
import { computed } from "@angular/core";

const initialState: PomodoroData = {
    focusDuration: 25,
    longBreakDuration: 15,
    longBreakInterval: 4,
    pomodoroCount: 1,
    shortBreakDuration: 5,
    state: "focus"
}

export const pomodoroStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ state }) => ({
        title: computed(() => state() === 'focus' ? 'Focus' : 'Break')
    }))
)