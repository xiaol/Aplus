// Uncomment the code below and fill in your information.
// Then start Meteor in your project to create an initial admin user


if (Meteor.users.find().count() === 0) {
  var userObj = {
      username: 'xiaol', 
      email: 'liuxiao.in@qq.com', 
      password: 'qpalzm4',
      profile: {name: 'xiaol'},
      roles: 'admin',
    };
  Accounts.createUser(userObj);
}
