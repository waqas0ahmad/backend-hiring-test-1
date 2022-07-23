import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type CallDocument = Calls & Document;
export type RecordingDocument = Recording & Document;

@Schema()
export class Recording {
    @Prop()
    status: string;
    @Prop()
    mediaUrl: string;
    @Prop()
    dateCreated: string;
    @Prop()
    startTime: string;

    // in secords
    @Prop()
    duration: string;
    @Prop()
    source: string;
}

const RecordingSchema = SchemaFactory.createForClass(Recording);

@Schema()
export class Calls {
    @Prop()
    From: string;
    @Prop()
    To: string;
    @Prop()
    callStatus: string;
    @Prop()
    CallSid: string;
    @Prop()
    Caller: string;
    @Prop()
    Direction: string;
    @Prop()
    Called: string;
    @Prop({type:RecordingSchema})
    Recording:Recording
}

export const CallSchema = SchemaFactory.createForClass(Calls)