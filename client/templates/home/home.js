/**
 * Created by Eric Hamimi on 08/04/2016.
 */
var Highcharts = require('highcharts');

// Load module after Highcharts is loaded
//require('highcharts/modules/exporting')(Highcharts);

Template.Home.onCreated(function() {
    Session.set('loading', true);
    var self = this;
    self.autorun(function() {
        self.subscribe('revenus');
        self.subscribe('live_data');
        self.subscribe('customer');
    });

    // Session
    // Mois et années
    Session.set('month', getMoisEnLettre(new Date().getMonth()));
    Session.set('actualYear', String(getAnnee(new Date())));

    if (Session.get('month') === "Decembre") {
        Session.set('actualYear', String(getAnnee(new Date()) - 1));
        Session.set('previousYear', String(getAnnee(new Date()) - 2));
    } else {
        Session.set('previousYear', String(getAnnee(new Date()) - 1));
    }

});

Template.Home.rendered = function() {
    setTimeout(function() {
        Session.set('loading', false);
    }, 1000);
}

Template.Home.helpers({
    loading: function() {
        return Session.get('loading');
    },
    liveInfo: function() {
        return LiveDataContract.find().fetch()[0];
    },
    totalActiveContract: function() {
        return  LiveDataContract.getTotalActiveContract();
    }
});



Template.HomeContract.helpers({
    dataActual: function() {
        Session.set('contractRevActual', Revenus.getDataHomeContract(Session.get('month'), Session.get('actualYear')));
        return Session.get('contractRevActual');
    },
    mois: function() {
        return Session.get('month');
    },
    actuYear: function() {
        return Session.get('actualYear');
    },
    prevYear: function() {
        return Session.get('previousYear');
    },
    dataPrevious: function() {
        Session.set('contractRevPrev', Revenus.getDataHomeContract(Session.get('month'), Session.get('previousYear')));
        return Session.get('contractRevPrev');
    },
    totalActual: function() {
        return getHomeTotal('contractRevActual');
    },
    totalPrevious: function() {
        return getHomeTotal('contractRevPrev');
    },
    qty_contract_actual: function() {
        return getQty(Session.get('contractRevActual'));
    },
    qty_contract_previous: function() {
        return getQty(Session.get('contractRevPrev'));
    }
});

Template.HomeService.helpers({
    dataServiceActual: function() {
        Session.set('serviceRevActual', Revenus.getDataHomeService(Session.get('month'), Session.get('actualYear')));
        return Session.get('serviceRevActual');
    },
    dataServicePrevious: function() {
        Session.set('serviceRevPrev', Revenus.getDataHomeService(Session.get('month'), Session.get('previousYear')));
        return Session.get('serviceRevPrev');
    },
    totalActual: function() {
        return getHomeTotal('serviceRevActual');
    },
    totalPrevious: function() {
        return getHomeTotal('serviceRevPrev');
    },
    qty_service_actual: function() {
        return getQty(Session.get('serviceRevActual'));
    },
    qty_service_previous: function() {
        return getQty(Session.get('serviceRevPrev'));
    }
});

Template.HomeGraph.helpers({
    createChart: function() {
        var data = getHomeDataSeries();
        Meteor.defer(function() {
            Highcharts.chart('chart', data);
        });
    }
});

Template.Home.events({
    // TODO
    // Il faudra penser à changer les valeurs de l'année si on est après décembre
    'click .previous': function() {
        var indexMois = tabMois.indexOf(Session.get('month'));
        Session.set('month', getMoisEnLettre(indexMois));
    },
    'click .next': function() {
        var indexMois = tabMois.indexOf(Session.get('month'));
        Session.set('month', getMoisEnLettre_next(indexMois));
    }
});