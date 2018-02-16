import {
  CounterActions,
  INCREASE_COUNTER,
  INCREASE_COUNTER_FROM_RANDOM_SUCCESS
} from './counter.actions';

export const initialState = 0;

export function reducer(state = initialState, action: CounterActions) {
  switch (action.type) {
    case INCREASE_COUNTER:
      return state + 1;

    case INCREASE_COUNTER_FROM_RANDOM_SUCCESS:
      return state + action.payload;
  }

  return state;
}
