import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class CounterService {
  constructor(private http: HttpClient) {}

  getRandomNumber(): Observable<number> {
    return this.http
      .post('https://api.random.org/json-rpc/1/invoke', {
        jsonrpc: '2.0',
        method: 'generateIntegers',
        params: {
          apiKey: 'e389eebe-d8f0-4003-a832-5d2f4297b231',
          n: 1,
          min: 0,
          max: 100
        },
        id: 42
      })
      .pipe(
        tap(result => console.log((<any>result).result.random.data[0])),
        map(result => (<any>result).result.random.data[0])
      );
  }
}
