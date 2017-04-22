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
    var rooms = Participants.find({ user: Meteor.userId() }, { sort: { lastUpdate: -1 } }).fetch();
    return rooms.map((r) => {
      var room = Rooms.findOne({ _id: r.room }, {
        fields: { secretInfo: 0 }
      });
      var lastest = Messages.findOne({ room: r.room }, {
        fields: { body: 1, owner: 1, createAt: 1 },
        sort: { createAt: -1 }
      });
      console.log(lastest)
      return {
        ...room,
        lastest,
      }
    });
  },
});

Template.chatlist.events({
});
