Revenus = new Mongo.Collection('revenus');
Services = new Mongo.Collection('services');

tabMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
tabMois = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
data_rev = [];

if (Meteor.isServer) {
    Meteor.publish('revenus', function () {
        return Revenus.find();
    });

    Meteor.publish('services', function () {
        return Services.find();
    });

    // Ajout des data du fichier serv_mongo.json
    //Meteor.startup(function(){
      //  var data = JSON.parse(Assets.getText('serv_mongo.json'));
        //data.forEach(function(item){
          //  Revenus.insert(item);
        //});
    //});

}

if (Meteor.isClient) {

    Meteor.subscribe('revenus');
    Meteor.subscribe('services');

    // TEMPLATES
    Template.tableau.helpers({
        rev: function () {
            return Revenus.find();
        },
        code: function (index) {
            return getServiceLabel(index);
        }
    });

    Template.increase.helpers({
        contratcs : function(){
            var data = Services.find({ $or:
                [ { catno: "5152467" },
                    { catno: "5152459" },
                    { catno: "5185574" },
                    { catno: "5185582" },
                    { catno: "5185590" }
                ]}).fetch();

            for (var i=0; i<data.length; i++){
                data[i].increase = parseFloat(priceInc(data[i].prix_ht));
                data[i].new_price = parseFloat(data[i].prix_ht + data[i].increase).toFixed(2);
                data[i].price_vat = priceVatIncluded(data[i].new_price);
            }
            return data;
        }
    });

    Template.contrat.helpers({
        services: function () {
            return Services.find({});
        }
    });

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
        }
    });

    Template.compare.helpers({
        createChart: function () {
            var dataSeries = [];

            // Use Meteor.defer() to create chart after DOM is ready:
            Meteor.defer(function () {

                getDataSeries([$('#year1').val(), $('#year2').val(), $('#year3').val()]);

                dataSeries = Session.get('chartData');

                Highcharts.chart('chart',
                    {
                        series: dataSeries,
                        title: {text: "Revenu comparison"},
                        xAxis: {categories: tabMonth},
                        chart: {type: 'spline'},
                        yAxis: {title: {text: 'Revenu'}}
                    });
            });
        }
    });

    Template.compare.events({
        'click .upd': function (e) {
            e.preventDefault();

            var tabAnnee = [];

            var y1 = $('#year1').val();
            var y2 = $('#year2').val();
            var y3 = $('#year3').val();

            if (y1 != '') {
                tabAnnee.push(y1);
            }

            if (y2 != '') {
                tabAnnee.push(y2);
            }

            if (y3 != '') {
                tabAnnee.push(y3);
            }

            getDataSeries(tabAnnee);

            console.log(Session.get('chartData'));
        }
    });

    Template.test.helpers({

    });
    Template.test.events({
        'click .add-data': function(){
            //var data = Revenus.find({annee: "2016", mois:'Fevrier'}).fetch();
            //data.forEach(function(item){
            //    Revenus.remove(item._id);
            //});
            console.log('Clic Clic');
        }
    });

}
