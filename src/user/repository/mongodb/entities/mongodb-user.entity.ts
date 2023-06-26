import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MongoDBUser {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  passwordHash: string;
}

export const MongoDBUserSchema = SchemaFactory.createForClass(MongoDBUser).set(
  'toJSON',
  {
    transform: (_, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    },
  },
);
