import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwilioModule } from 'nestjs-twilio';
import { TwilioService } from './services/twilio.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CallsService } from './services/call.service';
import { Calls, CallSchema } from './schemas/calls.schema';

@Module({
  imports: [
    /** .env configuration **/
    ConfigModule.forRoot(),

    
    /** include db module monogodb **/
    MongooseModule.forRoot(process.env.DB_URL),


    /** schema depency injection **/
    MongooseModule.forFeature([{name:Calls.name,schema:CallSchema}]),
    

    /** inlude twillio account **/
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
  ],
  controllers: [AppController],

  /** Add providers (AppService -> default service created by CLI) **/
  providers: [AppService,TwilioService,CallsService],
})
export class AppModule { }
