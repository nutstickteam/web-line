import { Mongo } from 'meteor/mongo';

export const Messages = new Mongo.Collection('messages');

Messages.before.insert((userId, doc) => {
  doc.createAt = new Date().getTime();
})