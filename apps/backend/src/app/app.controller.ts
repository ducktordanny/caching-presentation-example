import { Body, Controller, Get, Post } from '@nestjs/common';

interface IQuote {
  name: string;
  quote: string;
}

@Controller()
export class AppController {
  private quote: IQuote = {
    name: 'rick-roll',
    quote: 'Never gonna give you up! 😉',
  };

  @Get('quote')
  public getData() {
    return this.quote;
  }

  @Post('quote')
  public postData(@Body() newQuoteData: IQuote) {
    this.quote = newQuoteData;
  }
}
