import { Component, OnDestroy } from '@angular/core';
import {
  IQuote,
  QutoesService,
  cacheModifier,
  quoteCacheBuster,
} from './quotes.service';
import { Observable, switchMap } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { globalCacheBusterNotifier } from 'ts-cacheable';

@Component({
  selector: 'caching-presentation-example-quotes',
  templateUrl: './quotes.template.html',
  imports: [ReactiveFormsModule, NgIf, AsyncPipe],
  standalone: true,
})
export class QuotesComponent implements OnDestroy {
  public formGroup = new FormGroup({
    name: new FormControl(),
    quote: new FormControl(),
  });
  public quote: Observable<IQuote>;

  constructor(private readonly qutoeService: QutoesService) {
    this.quote = this.qutoeService.getQuote();
  }

  public triggerGetRequest(): void {
    cacheModifier.next((data: any) => {
      console.log(data);
      // modify if you want...
      return data;
    });
    this.quote = this.qutoeService.getQuote();
  }

  public clearCache(): void {
    quoteCacheBuster.next();
  }

  public onSubmitNewQuote(): void {
    const data = this.formGroup.getRawValue();
    this.quote = this.qutoeService
      .postQuote(data)
      .pipe(switchMap(() => this.qutoeService.getQuote()));
  }

  public ngOnDestroy(): void {
    quoteCacheBuster.next();
    // NOTE: If we have multiple notifiers or we just want to bust all the caches
    // globalCacheBusterNotifier.next(); // provided by ts-cacheable
  }
}
