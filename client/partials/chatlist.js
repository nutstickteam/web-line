import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Rooms } from '../../imports/api/rooms';

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
    var rooms = Rooms.find({}, {
      fields: { secretInfo: 0 },
    }).fetch();
    return rooms;
  },
});

Template.chatlist.events({
});
