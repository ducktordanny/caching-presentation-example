import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {
  CacheBuster,
  Cacheable,
  GlobalCacheConfig,
  LocalStorageStrategy,
} from 'ts-cacheable';

export interface IQuote {
  name: string;
  quote: string;
}

export const quoteCacheBuster = new Subject<void>();
export const cacheModifier = new Subject<any>();

// NOTE: You can also use other storageStrategies, by default it saves everything to memory
GlobalCacheConfig.storageStrategy = LocalStorageStrategy;

@Injectable({ providedIn: 'root' })
export class QutoesService {
  constructor(private readonly http: HttpClient) { }

  @Cacheable({
    cacheBusterObserver: quoteCacheBuster,
    maxAge: 5000,
    cacheModifier,
  })
  public getQuote(): Observable<IQuote> {
    return this.http.get<IQuote>('/api/quote');
  }

  @CacheBuster({ cacheBusterNotifier: quoteCacheBuster })
  public postQuote(newQuoteBody: IQuote): Observable<null> {
    return this.http.post<null>('/api/quote', newQuoteBody);
  }
}
