Revenus = new Mongo.Collection('revenus');
Services = new Mongo.Collection('services');

tabMonth = ['January', 'February','March','April','May','June', 'July', 'August','September','October','November','December'];
data_rev = [];

if (Meteor.isServer) {
    Meteor.publish('revenus', function (){
       return Revenus.find();
    });

    Meteor.publish('services', function (){
        return Services.find();
    });
}

if (Meteor.isClient) {

    Meteor.subscribe('revenus');
    Meteor.subscribe('services');

    // TEMPLATES
    Template.tableau.helpers({
        rev: function(){
            return Revenus.find();
        },
        code: function(index){
            return getServiceLabel(index);
        }
    });

    Template.test.helpers({
        jan: function(){
            return getRevByMonth('Janvier','20160101');
        },

        dataRev: function(){
            var tab = ['20160101','20150101', '20140101'];
            getDataRev(tab);
            return data_rev;
        }
    });



}

