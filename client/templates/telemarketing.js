
// Template.Telemarketing.rendered = function() {
//   console.log(this.data.fetch());
// }

Template.Telemarketing.helpers({
  data: function(){
    return Telemarketing.find({}, {sort: {from: -1}});
  }
});

Template.Telemarketing.events({

});
