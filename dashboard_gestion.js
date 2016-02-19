Revenus = new Mongo.Collection('revenus');
Services = new Mongo.Collection('services');

tabMonth = ['January', 'February','March','April','May','June', 'July', 'August','September','October','November','December'];
tabMois = ['Janvier', 'Fevrier','Mars','Avril','Mai','Juin', 'Juillet', 'Aout','Septembre','Octobre','Novembre','Decembre'];
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

    Template.contrat.helpers({
        services: function(){
            return Services.find({});
        }
    });

    // TEMPLATE REPORT
    Template.report.helpers({
        months: function(){
            return tabMonth;
        },
        showRev: function(){
            return Session.get('showRev');
        }
    });

    Template.tab_rev.helpers({
        rev_month: function(){
            return Session.get('data');
        },
        total: function(){
            return Session.get('total');
        },
        pourcentage: function(){
            return getPourcentageRev(this.montant);
        }
    });

    Template.report.events({
       'click .month-select': function(){
           var mois = '';
           var annee = $('#year').val();

           for (var i=0; i<tabMonth.length; i++){
               if(tabMonth[i] == this){
                    mois = tabMois[i];
               }
           }

           Session.set('showRev', true);
           getDataRevByMonth(annee,mois);
       },
        'click .year-select': function(){
            var annee = $('#year').val();
            if (!annee){
                console.log('annee par defaut');
                annee = '2016';
            }

            getDataYear(annee);
            Session.set('showRev', true);
        }
    });

    Template.compare.helpers({
        getData: function(){
            data_rev_chart = [];

            for (var h=0; h<tabMois.length; h++){
                data_rev_chart.push(getRevByMonth(tabMois[h],'2013'));
            }
            for (var i=0; i<tabMois.length; i++){
                data_rev_chart.push(getRevByMonth(tabMois[i],'2014'));
            }
            for (var j=0; j<tabMois.length; j++){
                data_rev_chart.push(getRevByMonth(tabMois[j],'2015'));
            }

            initChart(data_rev_chart);
        },
        test: function(){
            return getRevForChart(['2013','2014','2015']);
        },
        getChart: function(){
            initChart(getRevForChart(['2013','2014','2015']));
        }
    });

}

