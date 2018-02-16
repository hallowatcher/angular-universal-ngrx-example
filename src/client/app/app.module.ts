import {
  BrowserModule,
  BrowserTransferStateModule,
  makeStateKey,
  TransferState
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import * as fromRoot from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { CounterService } from './services/counter.service';

// make sure you export for AoT
export function stateSetter(reducer) {
  return function(state: any, action: any) {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
}

const _metaReducers = [stateSetter];

export const metaReducers = _metaReducers;

export const NGRX_STATE = makeStateKey('NGRX_STATE');

@NgModule({
  declarations: [AppComponent],
  imports: [
    StoreModule.forRoot(fromRoot.reducers, { metaReducers }),
    EffectsModule.forRoot(fromRoot.effects),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    StoreDevtoolsModule.instrument(),
    HttpClientModule,
    AppRoutingModule,
    BrowserTransferStateModule
  ],
  providers: [CounterService],
  bootstrap: [AppComponent]
})
export class AppModule {
  public constructor(
    private readonly transferState: TransferState,
    private readonly store: Store<any>
  ) {
    const isBrowser = this.transferState.hasKey<any>(NGRX_STATE);

    if (isBrowser) {
      this.onBrowser();
    } else {
      this.onServer();
    }
  }
  onServer() {
    this.transferState.onSerialize(NGRX_STATE, () => {
      let state;
      this.store
        .subscribe((saveState: any) => {
          console.log('Set for browser', JSON.stringify(saveState));
          state = saveState;
        })
        .unsubscribe();

      return state;
    });
  }

  onBrowser() {
    const state = this.transferState.get<any>(NGRX_STATE, null);
    this.transferState.remove(NGRX_STATE);
    this.store.dispatch({ type: 'SET_ROOT_STATE', payload: state });
    console.log('Got state from server', JSON.stringify(state));
  }
}
