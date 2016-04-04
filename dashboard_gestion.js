Revenus       = new Mongo.Collection('revenus');
Services      = new Mongo.Collection('services');
Telemarketing = new Mongo.Collection('telemarketing');

tabMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
tabMois = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
data_rev = [];

if (Meteor.isClient) {

    Meteor.subscribe('revenus');
    Meteor.subscribe('services');
    Meteor.subscribe('telemarketing');

    // TEMPLATES
    Template.tableau.helpers({
        rev: function () {
            return Revenus.find();
        },
        code: function (index) {
            return getServiceLabel(index);
        }
    });

    Template.contrat.helpers({
        services: function () {
            return Services.find({});
        }
    });

}
