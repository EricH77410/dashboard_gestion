Meteor.publish('revenus', function () {
    return Revenus.find();
});

Meteor.publish('services', function () {
    return Services.find();
});

Meteor.publish('hotline', function () {
    return Hotline.find();
});

Meteor.publish('stats_hl', function () {
    return Stats_hl.find();
});

Meteor.publish('telemarketing', function(){
    return Telemarketing.find({}, {sort: {from: -1}});
});

Meteor.publish('live_data', function(){
  return LiveDataContract.find({});
});

 Meteor.publish('contract', function(){
    return Contract.find({});
 });

Meteor.publish('customer', function(){
  return Customer.find({});
});

Meteor.publish('sms', function(){
    return Sms.find({});
});

Meteor.publish('sms_order', function(){
    return SmsOrder.find({});
});

Meteor.publish('sms_customer', function(){
    return SmsCustomer.find({});
});

Meteor.publish('recall', function () {
	return Recall.find({});
});

Meteor.publish('reminder', function () {
    return Reminder.find({});
});

Meteor.publish('install', function(){
  return Install.find({});
})