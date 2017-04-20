if(Meteor.isClient){
	Accounts.onLogin(function(){});

	Accounts.onLogout(function(){
		FlowRouter.go('login');
	});
}

FlowRouter.triggers.enter([function(context, redirect){
	if(!Meteor.userId()) {
		FlowRouter.go('login');
	}
}]);

FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('MainLayout', {main: 'Home'})
  }
});

FlowRouter.route('/login', {
	name: 'login',
	action() {
		BlazeLayout.render('LoginLayout');
	}
});

FlowRouter.route('/account', {
	name: 'chat',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Account'});
	}
});

FlowRouter.route('/join', {
	name: 'joinchat',
	action() {
		BlazeLayout.render('MainLayout', {main: 'JoinChat'});
	}
});

FlowRouter.route('/:id', {
	name: 'chat',
	action({ id }) {
		BlazeLayout.render('MainLayout', {main: 'Chat', id: id});
	}
});

// FlowRouter.route('/join/:id', {
// 	name: 'rest_join',
// 	action({ id }) {
// 		Participants.insert({
// 			user: Meteor.userId(),
// 			room: id,
// 			lastUpdate: new Date('2012.08.10').getTime(),
// 			lastRead: null,
// 		})
// 		res.end(params.id);
// 	}
// });