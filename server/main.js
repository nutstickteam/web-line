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
      return true; 
    }
  });
});

Meteor.publish('rooms', function() {
  var rooms = Participants.find({ user: this.userId }, { sort: { lastUpdate: -1 } }).fetch();
  return rooms.reduce((list, r) => {
    list.push(
      Rooms.find({ _id: r.room }, {
        fields: { secretInfo: 0 }
      }),
      Messages.find({ room: r.room }, {
        fields: { body: 1, owner: 1, createAt: 1 },
        sort: { timestamp: -1 }
      })
    );
    return list
  }, [Participants.find({ user: this.userId }, { sort: { lastUpdate: -1 } })]);
});

Meteor.publish('roomAndMessages', function (roomId) {
  check(roomId, String);
  return [
    Rooms.find({ _id: roomId }, {
      fields: { secretInfo: 0 }
    }),
    Messages.find({ roomId })
  ];
});
