import { Action } from '@ngrx/store';

export const INCREASE_COUNTER = '[Counter] Increase';
export const INCREASE_COUNTER_FROM_RANDOM = '[Counter] Increase from random';
export const INCREASE_COUNTER_FROM_RANDOM_SUCCESS =
  '[Counter] Increase from random success';

export class IncreaseCounter implements Action {
  readonly type = INCREASE_COUNTER;
}

export class IncreaseCounterFromRandom implements Action {
  readonly type = INCREASE_COUNTER_FROM_RANDOM;
}

export class IncreaseCounterFromRandomSuccess implements Action {
  readonly type = INCREASE_COUNTER_FROM_RANDOM_SUCCESS;
  constructor(public payload: number) {}
}

export type CounterActions =
  | IncreaseCounter
  | IncreaseCounterFromRandom
  | IncreaseCounterFromRandomSuccess;
