import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {
  IncreaseCounter,
  IncreaseCounterFromRandom
} from '../../../store/counter.actions';
import { CounterService } from '../../../services/counter.service';
import { take } from 'rxjs/operators';
import { initialState } from '../../../store/counter.reducer';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  counter: Observable<number>;

  constructor(
    private store: Store<any>,
    private counterService: CounterService
  ) {
    this.counter = this.store.select(state => state.counter);

    this.counter.pipe(take(1)).subscribe(count => {
      if (count === initialState) {
        this.store.dispatch(new IncreaseCounterFromRandom());
      }
    });
  }

  increaseCounter() {
    this.store.dispatch(new IncreaseCounter());
  }

  increaseCounterRandom() {
    this.store.dispatch(new IncreaseCounterFromRandom());
  }

  ngOnInit() {}
}
