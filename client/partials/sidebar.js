import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './sidebar.html';

Template.sidebar.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.expand = new ReactiveVar('');
});

Template.sidebar.helpers({
  expand() {
    return Template.instance().expand.get();
  },
});

Template.sidebar.events({
  'click .menu-toggle'(event, instance) {
    instance.expand.set(instance.expand.get() === '' ? 'expand' : '');
  },
});
