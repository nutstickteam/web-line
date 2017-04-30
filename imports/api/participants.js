import { Mongo } from 'meteor/mongo';
import { Messages } from './messages';
import { Rooms } from './rooms';

export const Participants = new Mongo.Collection('participants');
if (Meteor.isServer) {
  Participants.after.insert((userId, doc) => {
    Messages.insert({
      serverMsg: true,
      body: {
        userId,
        action: 'join',
      },
      room: doc.room,
      createAt: new Date().getTime(),
    });
  });

  Participants.after.remove((userId, doc) => {
    Messages.insert({
      serverMsg: true,
      body: {
        userId,
        action: 'leave',
      },
      room: doc.room,
      createAt: new Date().getTime(),
    });
  });
}