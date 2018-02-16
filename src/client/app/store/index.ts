import * as fromCounter from './counter.reducer';
import { CounterEffects } from './counter.effects';

export const reducers = {
  counter: fromCounter.reducer
};

export const effects = [CounterEffects];
