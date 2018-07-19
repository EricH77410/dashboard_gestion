Template.TopTen.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('hotline');
    });
});

Template.TopTen.helpers({
    data: function () {
        //return Hotline.getDaPeriod("Janvier","2017").fetch();
        return Session.get('TopTen');
    },
    months: function(){
        return tabMonth;
    },
    monthSelected: function(){
        return Session.get('MonthSelected');
    }
});

Template.TopTen.events({
    'click .month-select':function(){
        var mois = '';

        for (var i = 0; i < tabMonth.length; i++) {
            if (tabMonth[i] == this) {
                mois = tabMois[i];
                console.log(mois);
            }
        }
        Session.set('TopTen', Hotline.getDaPeriod(mois,"2018").fetch())
        Session.set('MonthSelected', mois);
    }
});

Template.Item.events({
    'click .js-detail-view':function(evt){
        evt.preventDefault();
        if (evt.target.text == 'Hide details') {
            evt.target.text = 'See details';
        } else {
            evt.target.text = 'Hide details';
        }
    }
});
