Template.Recall.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('recall');
		self.subscribe('reminder')
        Session.set('recall',Recall.find({}).fetch()[0])
		Session.set('reminder', Reminder.find({}).fetch()[0]);

    });
});

var Highcharts = require('highcharts');

// Load module after Highcharts is loaded
//require('highcharts/modules/exporting')(Highcharts);

Template.Recall.helpers({
	info: function (){
		return Session.get('recall');
	},
	pourcentage_renew: function(){
		return getPurcentage(Session.get('recall').renewed,336)
	},
	pourcentage_notrenewed: function (){
		return getPurcentage(Session.get('recall').notrenewed,336)
	},
	pourcentage_nowant: function(){
		return getPurcentage(Session.get('recall').nowant,336)
	},
	pourcentage_will: function (){
		return getPurcentage(Session.get('recall').willrenew,336)
	},
	pourcentage_courrier: function(){
		return getPurcentage(Session.get('recall').courrier,336)
	}
});

Template.Reminder.helpers({
    info: function(){
        return Session.get('reminder');
    },
    pourcentage_renew: function(){
        return getPurcentage(Session.get('reminder').renewed,262)
    },
    pourcentage_notrenewed: function (){
        return getPurcentage(Session.get('reminder').notrenewed,262)
    },
    pourcentage_nowant: function(){
        return getPurcentage(Session.get('reminder').nowant,262)
    },
    pourcentage_will: function (){
        return getPurcentage(Session.get('reminder').willrenew,262)
    },
    pourcentage_courrier: function(){
        return getPurcentage(Session.get('reminder').nousesoft,262)
    }
});

Template.RecallGraph.helpers({
    createChart: function() {
        var data = getChartData();
        Meteor.defer(function() {
            Highcharts.chart('chart-recall', data);
        });
    }
});

Template.ReminderGraph.helpers({
    createReminderChart: function () {
        var data = getChartDataReminder();
        Meteor.defer(function () {
            Highcharts.chart('chart-reminder', data);
        })
    }
})

getChartData = () =>{
	objectReturn = {
		chart:{
			plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
		},
		plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
        	name: 'Recall',
			colorByPoint: true,
			data: [
				{
					name: 'Renewed',
					y: Session.get('recall').renewed
				},
				{
					name: 'Not Renewed',
					y: Session.get('recall').notrenewed
				},
				{
					name: "Don't want",
					y: Session.get('recall').nowant
				},
				{
					name: 'Mail not received',
					y: Session.get('recall').courrier
				},
				{
					name: 'Will renew',
					y: Session.get('recall').willrenew
				}
			]
        }			
        ],
        title: { text: "Operation Recall Contract" }
    };
    return objectReturn;
}

getChartDataReminder = () =>{
    objectReturn = {
        chart:{
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Relance Clients',
            colorByPoint: true,
            data: [
                {
                    name: 'Renewed',
                    y: Session.get('reminder').renewed
                },
                {
                    name: 'Not Renewed',
                    y: Session.get('reminder').notrenewed
                },
                {
                    name: "Don't want",
                    y: Session.get('reminder').nowant
                },
                {
                    name: "Don't use the software",
                    y: Session.get('reminder').nousesoft
                },
                {
                    name: 'Will renew',
                    y: Session.get('reminder').willrenew
                }
            ]
        }
        ],
        title: { text: "Operation Reminder Old Customers" }
    };
    return objectReturn;
}