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
            return getTotalData_Rev();
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
           Session.set('data', data_rev);
       }
    });

    Template.test.helpers({
        janvier: function(){
            return getRevByMonth('Janvier','20160101');
        },

        dataRev: function(){
            var tab = ['20160101','20150101', '20140101'];
            getDataRev(tab);
            return data_rev;
        }
    });

    Template.test.events({
        'click .upd': function(){
            var an = '';
            data = Revenus.find();
            data.forEach(function(row){
               an = row.annee.substring(0,4);
                console.log(row._id);
                Revenus.update(row._id,{$set: {annee: an}});
            });
        }
    });

    Template.compare.helpers({
        getData: function(){
            data_rev_chart = [];
            for (var i=0; i<tabMois.length; i++){
                data_rev_chart.push(getRevByMonth(tabMois[i],'2014'));
            }

            for (var j=0; j<tabMois.length; j++){
                data_rev_chart.push(getRevByMonth(tabMois[j],'2015'));
            }

            initChart(data_rev_chart);
        }
    });

}

