Template.sms.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('sms');
    });
});

Template.sms.helpers({
	data: function () {
		return 1
	}
});

// To display 
// Qte SMS commandé par mois
// 

