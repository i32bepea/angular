import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, tap, map, find } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private productUrl = 'https://elite-schedule-app-i2-20e9c-25736.firebaseio.com/';
  private products: IProduct[];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    if (this.products == null) {
        return this.http.get<IProduct[]>(`${this.productUrl}.json`).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError),
        map(products => this.products = products),
        );
    } else {
        return of<IProduct[]>(this.products);
    }

  }

  getProduct(id: number): Observable<IProduct> {

    if (this.products == null) {
        return this.http.get<IProduct[]>(`${this.productUrl}.json`).pipe(
            catchError(this.handleError),
            map(products => this.products = products),
            map(res => res.find((product: IProduct) => product.productId === id)),
            tap(data => console.log(`ID:${id}=> ${JSON.stringify(data)}`)),
        );
    } else {
        return of<IProduct>(this.products.find((product: IProduct) => product.productId === id));
    }
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
