// TEMPLATE REPORT
Template.report.helpers({
    months: function() {
        return tabMonth;
    },
    showRev: function() {
        return Session.get('showRev');
    }
});

Template.tab_rev.helpers({
    rev_month: function() {
        return Session.get('data');
    },
    total: function() {
        return Session.get('total');
    },
    pourcentage: function() {
        return getPourcentageRev(this.montant);
    }
});

Template.service_rev.helpers({
    servicesRev: function() {
        return Session.get('services_revenu');
    },
    totalServices: function() {
        return Session.get('total_services');
    },
    servicesQty: function() {
        return Session.get('services_qty');
    },
    service_total: function() {
        return Session.get('total_service');
    },
    pourcentage: function() {
        return getPourcentageRev(this.montant);
    },
    poucentage_service: function() {
        return getPourcentageRev(Session.get('total_service'));
    }
});

Template.total_rev.helpers({
    total: function() {
        return Session.get('total');
    }
});

Template.service_rev.events({
    'click .triable': function() {
        Session.set('DESC', !Session.get('DESC'));
        var newArray = sortObjectTable(Session.get('services_revenu'), 'montant', Session.get('DESC'));
        Session.set('services_revenu', newArray);
    }
});

Template.contrat_rev.events({
    'click .triable': function() {
        Session.set('DESC', !Session.get('DESC'));
        var newArray = sortObjectTable(Session.get('contracts_revenu'), 'montant', Session.get('DESC'));
        Session.set('contracts_revenu', newArray);
    }
});

Template.contrat_rev.helpers({
    contractsRev: function() {
        return Session.get('contracts_revenu');
    },
    totalContracts: function() {
        return Session.get('total_contracts');
    },
    contract_qty: function() {
        return Session.get('contract_qty');
    },
    contract_total: function() {
        return Session.get('total_contract');
    },
    pourcentage: function() {
        return getPourcentageRev(this.montant);
    },
    poucentage_contrat: function() {
        return getPourcentageRev(Session.get('total_contract'));
    }
});

Template.report.events({
    'click .month-select': function() {
        var mois = '';
        var annee = $('#year').val();

        if (!annee) {
            annee = $("#year").attr('placeholder');
        }

        for (var i = 0; i < tabMonth.length; i++) {
            if (tabMonth[i] == this) {
                mois = tabMois[i];
            }
        }

        Session.set('showRev', true);
        getDataRevByMonth(annee, mois);

        // Modif style
        $('.month-select').removeClass('active');
        $('.year-select').removeClass('active');
        $('#' + this).addClass('active');
    },
    'click .year-select': function() {
        var annee = $('#year').val();
        if (!annee) {
            annee = $("#year").attr('placeholder');
            if (!annee) {
                console.log('annee par defaut');
                annee = '2018';
            }            
        }

        getReportYear(annee);
        Session.set('showRev', true);

        $('.month-select').removeClass('active');
        $('.year-select').addClass('active');
    },
    'click .sortable': function() {
        Session.set('DESC', !Session.get('DESC'));
        var newArray = sortObjectTable(Session.get('data'), 'montant', Session.get('DESC'));
        Session.set('data', newArray);
    },
    'blur #year': function () {
        console.log($('#year').val())
    }
});