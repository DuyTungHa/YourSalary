var User = require('../api/user/userModel');
var Session = require('../api/session/sessionModel');
var _ = require('lodash');

console.log('Seeding the Database');

var users = [
    {googleId: 123456789}, 
    {googleId: 34235233432},
    {googleId: 786534234234}
];

var sessions = [
  {title: 'HomeClass', description: 'Class online at homeclass website', salary: 150000, startDate: new Date(2019, 6, 26, 15, 15), endDate: new Date(2019, 6, 26, 16, 15)},
  {title: 'Minh and Huy', description: 'Address: 189 Giang Vo', salary: 200000, startDate: new Date(2019, 6, 26, 15, 15), endDate: new Date(2019, 6, 26, 16, 15)},
  {title: 'Work from home', description: 'Teaching English from home', salary: 300000, startDate: new Date(2019, 6, 26, 15, 15), endDate: new Date(2019, 6, 26, 16, 15)}
];

var createDoc = function(model, doc) {
    return new Promise(function(resolve, reject) {
      new model(doc).save(function(err, saved) {
        return err ? reject(err) : resolve(saved);
      });
    });
};

var cleanDB = function() {
    console.log('... cleaning the DB');
    var cleanPromises = [User, Session]
      .map(function(model) {
        return model.remove().exec();
      });
    return Promise.all(cleanPromises);
}

var createUsers = function(data) {

    var promises = users.map(function(user) {
      return createDoc(User, user);
    });
  
    return Promise.all(promises)
      .then(function(users) {
        return _.merge({users: users}, data || {} );
      });
};

var createSessions = function(data) {
  var newSessions = sessions.map(function(session, i) {
    session.freelancer = data.users[i]._id;
    return createDoc(Session, session);
  });

  return Promise.all(newSessions)
    .then(function(){
      console.log('Seeded DB with 3 Sessions, 3 Users'); 
    });
};



cleanDB()
  .then(createUsers)
  .then(createSessions);