import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { TimerData, TimerState } from "../models/timer.model";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { filter, interval, map, pipe, switchMap, takeUntil, tap } from "rxjs";
import { computed, effect } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";


export const TimerStore = signalStore(
    withState(() => {
        return {
            maxTime: 25,
            currentTime: 5,
            state: "not-started" as TimerState
        } satisfies TimerData
    }),

    withComputed((store) => ({
        isTimeOver: computed(() => store.currentTime() === 0),
        isTimerActive: computed(() => store.state() === 'running'),
        timerButtonLabel: computed(() => {
            switch (store.state()) {
                case 'not-started':
                    return 'Start';
                case 'paused':
                    return 'Resume';
                case 'completed':
                    return 'Next';
                case 'running':
                    return 'Pause';
            }
        }),
    })),
    withMethods((store) => ({
        toggleTimer() {
            patchState(store, (state) => {
                let nextState: TimerState = state.state;
                switch (state.state) {
                    case 'not-started':
                        nextState = 'running';
                        break;
                    case 'running':
                        nextState = 'paused'
                        break;
                    case 'paused':
                        nextState = 'running'
                        break;
                }
                return { state: nextState }
            })
        },
        switchState(nextState: TimerState) {
            patchState(store, (state) => ({ state: nextState }))
        },
        reduceTime() {
            patchState(store, (state) => ({ currentTime: state.currentTime - 1 }))
        },
    })),
)