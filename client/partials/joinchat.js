import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Participants } from '../../imports/api/participants';
import { Rooms } from '../../imports/api/rooms';

import './joinchat.scss';
import './joinchat.html';
import './chat.scss';
import './chat.html';

Template.joinchat.onCreated(function chatOnCreated() {
  var self = this;
  self.autorun(function() {
    self.subscribe('findrooms');
  });
});

Template.joinchat.helpers({
});

Template.joinchat.events({
  'submit .join-form'(event, instance) {
    console.log(event);
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.group.value;

    if (text === '')
      return;

    const room = Rooms.findOne({ name: text });
    console.log(room);
    const p = Participants.insert({
      user: Meteor.userId(),
      room: room._id,
      lastUpdate: new Date().getTime(),
      lastRead: null,
    });

    FlowRouter.go('/' + room._id);

    target.group.value = '';
  },
});
