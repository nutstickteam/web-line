import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Rooms } from '../../imports/api/rooms';
import { Messages } from '../../imports/api/messages';

import './chat.scss';
import './chat.html';

Template.chat.onCreated(function chatOnCreated() {
  var self = this;
  self.autorun(function() {
    self.subscribe('roomAndMessages', self.data.id);
  });
});

Template.chat.helpers({
  room() {
    return Rooms.findOne({ _id: Template.instance().data.id }, {
      fields: { secretInfo: 0 }
    });
  },
  messages() {
    return Messages.find({ room: Template.instance().data.id }).fetch();
  }
});

Template.chat.events({
});
