import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './chat.scss';
import './chat.html';

Template.chat.onCreated(function chatOnCreated() {
});

Template.chat.helpers({
  expand() {
    return Template.instance().expand.get();
  },
});

Template.chat.events({
});
