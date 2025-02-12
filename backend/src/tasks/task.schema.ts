import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Task extends Document {
  @Prop({ required: true })
  title!: string; // added !

  @Prop()
  description!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: "todo" })
  status!: "todo" | "in-progress" | "done";
}

export const TaskSchema = SchemaFactory.createForClass(Task);

