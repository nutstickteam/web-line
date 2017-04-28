import { Meteor } from 'meteor/meteor';
import { Participants } from '../imports/api/participants.js';
import { Messages } from '../imports/api/messages.js';
import { Rooms } from '../imports/api/rooms.js';
import '../imports/api/rooms.js';
import '../imports/api/messages.js';
import '../imports/api/participants.js';

Meteor.startup(() => {
  // code to run on server at startup
  if (Rooms.find().count() === 0) {
    ["Meteor", "JavaScript", "Reactive", "MongoDB"].forEach(function(r) {
      Rooms.insert({
        name: r,
        secretInfo: {
          admin: true,
        },
      });
    });
  }

  Participants.allow({
    'insert': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return userId === doc.user; 
    },
    'update': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true; 
    },
    'remove': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return userId === doc.user; 
    },
  });

  Messages.allow({
    'insert': function (userId, doc) {
      /* user and doc checks ,
      return true to allow insert */
      return doc.serverMsg ? doc.body.userId === userId : doc.ownerId === userId;
    },
  });
});

Meteor.publish('rooms', function() {
  const rooms = Participants.find({ user: this.userId }, {
    fields: { 'room': 1 },
    sort: { lastUpdate: -1 }
  }).fetch();

  const roomsList = rooms.map((r) => r.room);

  const usersList = Messages.find({ room: {$in: roomsList}, serverMsg: true }, {
    fields: { body: 1 },
    sort: { timestamp: -1 }
  }).fetch().map((msg) => msg.body.userId);

  return [
    Participants.find({ user: this.userId }, {
      // fields: { 'room': 1 },
      sort: { lastUpdate: -1 }
    }),
    Rooms.find({ _id: {$in: roomsList} }, {
      // fields: { 'room': 1 },
      sort: { lastUpdate: -1 }
    }),
    Messages.find({ room: {$in: roomsList} }, {
      sort: { createAt: -1 },
    }),
    Meteor.users.find({ _id: {$in: usersList} }, {
      // fields: {username: 1}
    }),
  ];
});

Meteor.publish('roomAndMessages', function (roomId) {
  console.log(roomId, this.userId);
  return [
    Rooms.find({ _id: roomId }, {
      // fields: { secretInfo: 0 }
    }),
    Messages.find({ room: roomId }),
    Participants.find({ user: this.userId, room: roomId }),
  ];
});