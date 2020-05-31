import {
  createSchema,
  Type,
  typedModel,
  ExtractDoc,
  ExtractProps,
} from 'ts-mongoose';

const SubscriberSchema = createSchema({
  name: Type.string({ required: true }),
  subscribedToChannel: Type.string({ required: true }),
  subscribeDate: Type.date({ required: true, default: Date.now() }),
});

export const Subscriber = typedModel('Subscriber', SubscriberSchema);
export type SubscriberDoc = ExtractDoc<typeof SubscriberSchema>;
export type SubscriberProps = ExtractProps<typeof SubscriberSchema>;
