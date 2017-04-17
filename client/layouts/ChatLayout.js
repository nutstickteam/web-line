import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './ChatLayout.html';
import { Messages } from '../../imports/api/messages.js';

Template.ChatLayout.onCreate(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('chats');
  });

  var id = FlowRouter.getParam('id');
  this.chat = new ReactiveVar(Chats.find({_id: id}));

});

Template.ChatLayout.helpers({
  chat() {
    return Template.instance().chat.get();
  },
  messages() {
    return Messages.find({ chat: Template.instance().chat.get()._id });
  }
});