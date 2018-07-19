Template.Dash.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('revenus');
        self.subscribe('sms');
        self.subscribe('live_data');
        self.subscribe('customer');
        self.subscribe('stats_hl');
        self.subscribe('contract');
    });
});

Template.Dash.helpers({
    nbAppelHl: function() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();

        return stats_hl.getDataBetweenDates(year+month+'01',year+month+'30');

    }
});

