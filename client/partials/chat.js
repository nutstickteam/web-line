import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Rooms } from '../../imports/api/rooms';
import { Participants } from '../../imports/api/participants';
import { Messages } from '../../imports/api/messages';

import './chat.scss';
import './chat.html';


var autoScrollingIsActive = false;
/* reactive var here */ 
scrollToBottom = function scrollToBottom (duration) {
  var messageWindow = $(".chat");
  var scrollHeight = messageWindow.prop("scrollHeight");
  messageWindow.stop().animate({scrollTop: scrollHeight}, duration || 0);
};

Template.chat.onCreated(function chatOnCreated() {
  var self = this;
  self.autorun(function() {
    self.subscribe('roomAndMessages', self.data.id);
  });
});

Template.chat.helpers({
  participant() {
    return Participants.findOne({ user: Meteor.userId(), room: Template.instance().data.id })
  },
  room() {
    return Rooms.findOne({ _id: Template.instance().data.id }, {
      fields: { secretInfo: 0 }
    });
  },
  messages() {
    const m = Messages.find({ room: Template.instance().data.id }).fetch().map((m) => ({
      ...m,
      isMe: m.ownerId === Meteor.userId(),
    }));

    setTimeout(() => scrollToBottom(250), 5);
    const p = Participants.findOne({ user: Meteor.userId(), room: Template.instance().data.id });
    Participants.update(p._id, {
      $set: {
        lastRead: m[m.length - 1]._id,
      },
    });
    return m;
  }
});

Template.chat.events({
  'submit .send-form'(event, instance) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    Messages.insert({
			owner: Meteor.user().username,
			ownerId: Meteor.userId(),
      body: text,
			room: Template.instance().data.id,
			createAt: new Date().getTime(),
		});

    Participants.update

    target.text.value = '';
  },
});