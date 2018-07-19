Template.Stats_hl.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('stats_hl');
	})
});

var date1 = null;
var date2 = null;

var Highcharts = require('highcharts');
// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);

Template.Stats_hl.onRendered(function(){
	 $.datepicker.regional['fr'] = {clearText: 'Effacer', clearStatus: '',
    closeText: 'Fermer', closeStatus: 'Fermer sans modifier',
    prevText: '&lt;Préc', prevStatus: 'Voir le mois précédent',
    nextText: 'Suiv&gt;', nextStatus: 'Voir le mois suivant',
    currentText: 'Courant', currentStatus: 'Voir le mois courant',
    monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin',
    'Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    monthNamesShort: ['Jan','Fév','Mar','Avr','Mai','Jun',
    'Jul','Aoû','Sep','Oct','Nov','Déc'],
    monthStatus: 'Voir un autre mois', yearStatus: 'Voir un autre année',
    weekHeader: 'Sm', weekStatus: '',
    dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
    dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
    dayStatus: 'Utiliser DD comme premier jour de la semaine', dateStatus: 'Choisir le DD, MM d',
    dateFormat: 'dd/mm/yy', firstDay: 0, 
    initStatus: 'Choisir la date', isRTL: false};
 	$.datepicker.setDefaults($.datepicker.regional['fr']);

	date1 = $('#date1')//.datepicker();
	date2 = $('#date2')//.datepicker();

	$('.dp').datepicker();
});

var CallData = null;

Template.Stats_hl.helpers({
	data: function () {
		return Session.get('CallData');
	},
    totalPeriod: function () {
        var total = 0;
        if (Session.get('CallData')) {
            Session.get('CallData').forEach(function (it){
                total += it.am + it.pm;
            })
        }
        return total;
    },
    du: function() {
        return d1;
    },
    au: function () {
        return d2;
    }
});

Template.Stats_hl.events({
	'click #go': function(){
		var d1 = getFormatedDate(date1.val()); // $('#date1').val()
		var d2 = getFormatedDate(date2.val()); // $('#date2').val()
        CallData = Stats_hl.getDataBetweenDates(d1,d2);
        Session.set('CallData', CallData);
	}
})

 // Template.ChartCall.helpers({
 //     createChart: function() {
 //         var data = getChartDataCall();
 //         Meteor.defer(function() {
 //             Highcharts.chart('chart-call', data);
 //         });
 //     }
 // });

// getChartDataCall = (am, pm, text) => {
//     objectReturn = {
//         chart:{
//             plotBackgroundColor: null,
//             plotBorderWidth: null,
//             plotShadow: false,
//             type: 'pie'
//         },
//         plotOptions: {
//             pie: {
//                 allowPointSelect: true,
//                 cursor: 'pointer',
//                 dataLabels: {
//                     enabled: false
//                 },
//                 showInLegend: true
//             }
//         },
//         series: [{
//             name: 'Appels HL',
//             colorByPoint: true,
//             data: [
//                 {
//                     name: 'AM',
//                     y: am
//                 },
//                 {
//                     name: 'APM',
//                     y: pm
//                 }
//             ]
//         }
//         ],
//         title: { text: text }
//     };
//     return objectReturn;
// }

