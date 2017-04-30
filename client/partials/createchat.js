import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Rooms } from '../../imports/api/rooms';
import { Participants } from '../../imports/api/participants';

import './chat.scss';
import './chat.html';

Template.createchat.onCreated(function chatOnCreated() {
});

Template.createchat.helpers({
});

Template.createchat.events({
  'submit .create-form'(event, instance) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.name.value;

    if (text === '')
      return;
    const r = Rooms.insert({
        name: text,
		});
    
    $('#createChatModal').modal('hide');
    Participants.insert({
			user: Meteor.userId(),
			room: r,
			lastUpdate: new Date().getTime(),
			lastRead: null,
		});
    target.name.value = '';
  },
});