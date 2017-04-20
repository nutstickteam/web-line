import { Meteor } from 'meteor/meteor';
import { Rooms } from '../imports/api/rooms.js';
import '../imports/api/rooms.js';
import '../imports/api/messages.js';

Meteor.startup(() => {
    // code to run on server at startup
    Rooms.remove({});
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
});

Meteor.publish('rooms', function() {
  return Rooms.find({}, {
    fields: { secretInfo: 0 }
  });
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

Picker.route('/user/:id', function(params, req, res, next) {
  res.end(params.id);
});
