Meteor.publish('revenus', function () {
    return Revenus.find();
});

Meteor.publish('services', function () {
    return Services.find();
});

Meteor.publish('hotline', function () {
    return Hotline.find();
});

Meteor.publish('telemarketing', function(){
    return Telemarketing.find({}, {sort: {from: -1}});
});

Meteor.publish('live_data', function(){
  return LiveDataContract.find({});
});

Meteor.publish('customer', function(){
  return Customer.find({});
})

Meteor.publish('sms', function(){
	return Sms.find({});
})
