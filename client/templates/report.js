// TEMPLATE REPORT
Template.report.helpers({
    months: function () {
        return tabMonth;
    },
    showRev: function () {
        return Session.get('showRev');
    }
});

Template.tab_rev.helpers({
    rev_month: function () {
        return Session.get('data');
    },
    total: function () {
        return Session.get('total');
    },
    pourcentage: function () {
        return getPourcentageRev(this.montant);
    }
});

Template.report.events({
    'click .month-select': function () {
        var mois = '';
        var annee = $('#year').val();

        if(!annee){
            annee = $("#year").attr('placeholder');
        }

        for (var i = 0; i < tabMonth.length; i++) {
            if (tabMonth[i] == this) {
                mois = tabMois[i];
            }
        }

        Session.set('showRev', true);
        getDataRevByMonth(annee, mois);
    },
    'click .year-select': function () {
        var annee = $('#year').val();
        if (!annee) {
            console.log('annee par defaut');
            annee = '2016';
        }

        getDataYear(annee);
        Session.set('showRev', true);
    },
    'click .sortable': function(){
      Session.set('DESC', !Session.get('DESC'));
      var newArray = sortObjectTable(Session.get('data'),'montant',Session.get('DESC'));
      Session.set('data', newArray);
    }
});
