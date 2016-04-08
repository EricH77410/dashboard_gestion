/**
 * Created by Eric Hamimi on 08/04/2016.
 */

Template.Home.onCreated(function () {
   var self = this;
    self.autorun(function () {
       self.subscribe('revenus');
    });

    // Session
    // Mois et années
    Session.set('month',getMoisEnLettre(new Date().getMonth()));
    Session.set('actualYear', String(getAnnee(new Date())));
    Session.set('previousYear', String(getAnnee(new Date())-1));

});


Template.HomeContract.helpers({
    dataActual: function () {
        Session.set('contractRevActual', Revenus.getDataHomeContract(Session.get('month'),Session.get('actualYear')));
        return Session.get('contractRevActual');
    },
    dataPrevious: function () {
        Session.set('contractRevPrev', Revenus.getDataHomeContract(Session.get('month'),Session.get('previousYear')));
        return Session.get('contractRevPrev');
    },
    totalActual: function (){
        return getHomeTotal('contractRevActual');
    },
    totalPrevious: function () {
        return getHomeTotal('contractRevPrev');
    }
});

Template.HomeService.helpers({
    dataServiceActual: function(){
        Session.set('serviceRevActual', Revenus.getDataHomeService(Session.get('month'), Session.get('actualYear')));
        //return Revenus.getDataHomeService(Session.get('month'), Session.get('actualYear'));
        return Session.get('serviceRevActual');
    },
    dataServicePrevious: function(){
        Session.set('serviceRevPrev', Revenus.getDataHomeService(Session.get('month'),Session.get('previousYear')));
        //return Revenus.getDataHomeService(Session.get('month'),Session.get('previousYear'));
        return Session.get('serviceRevPrev');
    },
    totalActual: function () {
        return getHomeTotal('serviceRevActual');
    },
    totalPrevious: function () {
        return getHomeTotal('serviceRevPrev');
    }
});

Template.HomeGraph.helpers({
    createChart: function(){
        var dataSeries = getHomeDataSeries(); //Session.get('chartData');
        console.log(dataSeries);

    }

});

Template.Home.events({

});