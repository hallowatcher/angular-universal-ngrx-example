import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  INCREASE_COUNTER_FROM_RANDOM,
  IncreaseCounterFromRandomSuccess
} from './counter.actions';
import { switchMap, map } from 'rxjs/operators';
import { CounterService } from '../services/counter.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CounterEffects {
  constructor(
    private actions$: Actions,
    private counterService: CounterService
  ) {}

  @Effect()
  increaseCounterFromRandom$ = this.actions$.pipe(
    ofType(INCREASE_COUNTER_FROM_RANDOM),
    switchMap(() => this.counterService.getRandomNumber()),
    map(num => new IncreaseCounterFromRandomSuccess(num))
  );
}
