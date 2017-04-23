import './main.scss';
import './partials/sidebar.js';
import './partials/joinchat.js';
import './partials/chatlist.js';
import './partials/chat.js';
import '../imports/startup/accout-config';

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('HH:mm');
});

Template.registerHelper('eq', function(a, b) {
  return a === b;
});
