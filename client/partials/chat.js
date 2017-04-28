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
  this.lastRead = new ReactiveVar(null);
  self.autorun(function() {
    self.subscribe('roomAndMessages', self.data.id);
    // console.log(Meteor.userId(),self.data.id,
    //   Participants.findOne({ user: Meteor.userId(), room: self.data.id })
    // )
    // self.lastRead = new ReactiveVar(
    //   Participants.findOne({ user: Meteor.userId(), room: self.data.id })
    //     .lastRead
    // );
  });
});

Template.chat.onRendered(() => {
});

Template.chat.helpers({
  lastRead() {
    const lastReadState = Template.instance().lastRead && Template.instance().lastRead.get();
    if (lastReadState) {
      return lastReadState
    }
    const lastRead = Participants.findOne({ user: Meteor.userId(), room: Template.instance().data.id }).lastRead;
    Template.instance().lastRead.set(lastRead);
    return lastRead;
  },
  room() {
    return Rooms.findOne({ _id: Template.instance().data.id }, {
      fields: { secretInfo: 0 }
    });
  },
  messages() {
    const m = Messages.find({ room: Template.instance().data.id }, {sort: {createAt: 1}}).fetch().map((m) => {
      if (m.serverMsg) {
        const username = Meteor.users.findOne({_id: m.body.userId}, {fields: {username: 1}}).username;
        // Meteor.users.findOne({_id: m.body.userId}, {fields: {username: 1}}).username;
        return {
          ...m,
          body: `${username} ${m.body.action === 'join' ? 'joins' : 'leaves'} chat.`,
        };
      }
      return m;
    }).map((m) => (m.serverMsg ? m : {
      ...m,
      isMe: m.ownerId === Meteor.userId(),
    }));

    setTimeout(() => scrollToBottom(250), 5);
    const p = Participants.findOne({ user: Meteor.userId(), room: Template.instance().data.id });
    if (p) {
      Participants.update(p._id, {
        $set: {
          lastRead: m[m.length - 1]._id,
        },
      });
    }
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
  'click .leave-btn'(event, instance) {
    event.preventDefault();

    console.log(Meteor.userId());

    const p = Participants.findOne({ user: Meteor.userId(), room: Template.instance().data.id });
    
    Participants.remove(p._id);

    FlowRouter.go('/');
  }
});