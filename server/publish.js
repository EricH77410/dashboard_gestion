Meteor.publish('revenus', function () {
    return Revenus.find();
});

Meteor.publish('services', function () {
    return Services.find();
});

Meteor.publish('telemarketing', function(){
    return Telemarketing.find({}, {sort: {from: -1}});
});
