import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './chat.scss';
import './chat.html';

Template.chat.onCreated(function chatOnCreated() {
  console.log(Template.currentData());
});

Template.chat.helpers({
  expand() {
    return Template.instance().expand.get();
  },
});

Template.chat.events({
});
