import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import {Calls, CallSchema, CallDocument} from './../schemas/calls.schema';
@Injectable()
export class CallsService {
    
    constructor(@InjectModel(Calls.name) private logModel: Model<CallDocument>,
    @InjectTwilio() private readonly client: TwilioClient
    ) {
        
    }
    async logCall(obj:any): Promise<any>{
        var recording = null;
        var recordingList = await this.client.calls(obj.CallSid).recordings.list()
        if(recordingList&&recordingList.length>0){
            recording = await this.client.recordings.get(recordingList[0].sid).fetch();            
        }
       
        var model = new this.logModel({
            callStatus:obj.CallStatus,
            From:obj.From,
            To:obj.To,
            Recording:{
                dateCreated:recording?.dateCreated,
                duration:recording?.duration,
                mediaUrl:recording?.mediaUrl,
                source:recording?.source,
                startTime:recording?.startTime,
                status:recording?.startTime

            }
        });
        return model.save();
    }
    async getLogs() {
        return await this.logModel.find({});
      }
}