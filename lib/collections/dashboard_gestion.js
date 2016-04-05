
tabMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
tabMois = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
data_rev = [];

if (Meteor.isClient) {

    Meteor.subscribe('revenus');
    Meteor.subscribe('services');
    Meteor.subscribe('telemarketing');

}
