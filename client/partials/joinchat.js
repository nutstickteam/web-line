import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Participants } from '../../imports/api/participants';

import './chat.scss';
import './chat.html';

Template.joinchat.onCreated(function chatOnCreated() {
});

Template.joinchat.helpers({
});

Template.joinchat.events({
  'submit .join-form'(event, instance) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.group.value;

    if (text === '')
      return;
    console.log('p')
    Participants.insert({
			user: Meteor.userId(),
			room: text,
			lastUpdate: new Date().getTime(),
			lastRead: null,
		});

    target.group.value = '';
  },
});
