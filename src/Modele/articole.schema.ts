import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document as mongoDocument } from "mongoose";

export type ArticolDocument = Articol & mongoDocument;

@Schema()
export class Articol {

    @Prop()
    title: string;

    @Prop()
    desc: string;

}

export const ArticolSchema = SchemaFactory.createForClass(Articol);

//Pentru indexare
ArticolSchema.index({title: 'text', desc: 'text'});