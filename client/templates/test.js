Template.test.events({
    'click .add-data': function(){
        console.log('Adding new data ...');
        Meteor.call('addRevenu');
        console.log('New data has been added !');
    },
    'click .add-tele': function(){
      console.log('Adding new telemarketing data ...');
        Meteor.call('addTelemarketingData');
      console.log('New telemarketing data has been added !');
    }
});
