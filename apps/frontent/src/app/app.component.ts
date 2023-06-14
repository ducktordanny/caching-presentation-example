import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuotesComponent } from './quotes/quotes.component';

@Component({
  standalone: true,
  imports: [RouterModule, QuotesComponent],
  selector: 'caching-presentation-example-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent { }
