Handlebars.registerHelper('formatDate', function(d) {
  var date = new Date(d);
  date = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  return date;
});

Handlebars.registerHelper('isPostAuthor', function(postAuthorId) {
  var user = Meteor.user();
  if (postAuthorId === user._id || user.roles === 'admin') {
    return true;
  }
});

Handlebars.registerHelper('isAdmin', function(user) {
  if (user && user.roles === 'admin') {
    return true;
  }
});

Handlebars.registerHelper('getUserEmail', function(user) {
  if ( Meteor.user() ) {
    var email = Meteor.user().emails[0].address;
  }
  return email;
});