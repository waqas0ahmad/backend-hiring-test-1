import { Controller, Get, Post, Render, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { CallsService } from './services/call.service';
import { TwilioService } from './services/twilio.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly service: TwilioService,
    private readonly callsService: CallsService
  ) { }

  @Post("welcome")
  welcome(@Req() req) {
    return this.service.welcome();
  }

  @Post("menu")
  menu(@Req() req) {
    const digit = req.body.Digits;
    return this.service.menu(digit);
  }


  @Post("callback")
  callback(@Req() req) {
    this.callsService.logCall(req.body);
  }

  /**
   * 
   * View -> hbs view templates -> To view call logs
   */

  @Get("logs")
  @Render("index")
  async getLogs() {
    var data = await this.callsService.getLogs();
    return { data }
  }


  /**
   * Default function created by CLI
   * @returns String
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
