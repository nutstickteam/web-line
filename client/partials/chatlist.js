import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Rooms } from '../../imports/api/rooms';
import { Messages } from '../../imports/api/messages';
import { Participants } from '../../imports/api/participants';

import './chatlist.scss';
import './chatlist.html';

Template.chatlist.onCreated(function chatlistOnCreated() {
  var self = this;
  self.autorun(function() {
    self.subscribe('rooms');
  });
});

Template.chatlist.helpers({
  expand() {
    return Template.instance().expand.get();
  },
  rooms() {
    const user = this.userId || Meteor.userId();
    var rooms = Participants.find({ user: user }, {
      fields: { 'room': 1 },
      sort: { lastUpdate: -1 }
    }).fetch();

    return rooms.map((r) => {
      var room = Rooms.findOne({ _id: r.room });
      var lastest = Messages.findOne({ room: r.room });
      if (lastest && lastest.serverMsg) {
        var user = Meteor.users.findOne({ _id: lastest.body.userId }, {fields: {username: 1}});
        lastest.body = user.username + ' joins chat.';
      }
      return {
        ...room,
        lastest,
      }
    });
  },
});

Template.chatlist.events({
});
