import { Injectable } from '@nestjs/common';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { twiml } from 'twilio';
const VoiceResponse = twiml.VoiceResponse;
@Injectable()
export class TwilioService {

  public constructor(@InjectTwilio() private readonly client: TwilioClient) { }

  welcome() {
    const voiceResponse = new VoiceResponse();

    const gather = voiceResponse.gather({
      action: '/menu',
      numDigits: 1,
      method: 'POST',
    });

    gather.say(
      { loop: 3,voice:'Polly.Raveena',language:'en-GB' },
      'Thanks for calling "Turing technologies". ' +
      'Please press 1 for calling our agent. ' +
      'Press 2 to record your voice message after beep.'
    );

    return voiceResponse.toString();
  };


  async dialNumber() {

    const twiml = new VoiceResponse();
    twiml.say("Your call is being transfered.");
    twiml.dial(process.env.REDIRECTED_PHONE);
    console.log(twiml.toString());
    return twiml.toString();

  }
  recordCall() {
    const recoder = new VoiceResponse();
    recoder.record({ playBeep: true });
    return recoder.toString();

  }
  menu(digit) {
    const optionActions = {
      '1': this.dialNumber.bind(this),
      '2': this.recordCall.bind(this),
    };


    return (optionActions[digit])
      ? optionActions[digit]()
      : this.redirectWelcome();

  };

  redirectWelcome(): string {
    const twiml = new VoiceResponse();

    twiml.say({
      voice: 'alice',
      language: 'en-GB',
    }, 'Returning to the main menu');

    twiml.redirect('/welcome');

    return twiml.toString();
  }

}