import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MongoDBMovie {
  @Prop({ required: true, unique: true })
  imdbId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  userLikesIds: string[];
}

export const MongoDBMovieSchema = SchemaFactory.createForClass(
  MongoDBMovie,
).set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});
