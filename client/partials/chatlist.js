import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './chatlist.scss';
import './chatlist.html';

Template.chatlist.onCreated(function chatlistOnCreated() {
});

Template.chatlist.helpers({
  expand() {
    return Template.instance().expand.get();
  },
});

Template.chatlist.events({
});
