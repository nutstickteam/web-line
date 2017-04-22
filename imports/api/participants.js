import { Mongo } from 'meteor/mongo';
import { Messages } from './messages';

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
    console.log('13213', userId, doc)
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