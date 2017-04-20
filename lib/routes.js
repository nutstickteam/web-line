if(Meteor.isClient){
	Accounts.onLogin(function(){
		FlowRouter.go('home');
	});

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

FlowRouter.route('/:id', {
	name: 'chat',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Chat'});
	}
});

FlowRouter.route('/account', {
	name: 'chat',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Account'});
	}
});
