// Uncomment the code below and fill in your information.
// Then start Meteor in your project to create an initial admin user


if (Meteor.users.find().count() === 0) {
  var userObj = {
      username: 'admin', 
      email: 'admin', 
      password: 'admin',
      profile: {name: 'admin'},
      roles: 'admin',
    };
  Accounts.createUser(userObj);
}
