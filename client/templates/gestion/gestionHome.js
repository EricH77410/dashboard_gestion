
// Appel à l'API
const api 		= "http://marl2116:3100/siebel/customer/serial/";
const apiInfo 	= "http://marl2116:3100/siebel/infos/";
const apiContrat= "http://marl2116:3100/siebel/contrat/";
const apiAssets = "http://marl2116:3100/siebel/assets/";
const apiNum 	= "http://marl2116:3100/siebel/customer/row/";
const apiEmail 	= "http://marl2116:3100/siebel/customer/email/"
const apiSR		= "http://localhost:3100/siebel/sr/"
const apiBlase 	= "http://localhost:3100/siebel/customer/search/";

Template.GestionHome.onCreated(function () {
	resetData();
});

Template.GestionHome.helpers({
	info: function () {
		return Session.get("customer-info");
	},
	contract: function () {
		return Session.get('customer-contrat');
	},
	assets: function () {
		return Session.get('customer-assets');
	},
	sr: function () {
		return Session.get('customer-sr');
	}
});

Template.UserCard.helpers({
	infos: function () {
		return Session.get('customer-info');
	}
});

Template.SearchResult.helpers({
	results: function () {
		if(Session.get('customer-search').length > 1){
			return Session.get('customer-search');
		}		
	}
})

Template.SearchResult.events({
	'dblclick .result-item': function (e) {
		var row = e.currentTarget.id;
		if (row) {
			collectData(row)
			$('#myModalResult').modal('toggle')
		}
	}
})

Template.GestionHome.events({
	'click #search-client': function () {		
		resetData();
		var search = $('#input-client').val().toUpperCase();
		Meteor.http.get(apiNum+search, function(err, res){
			if (err){
				console.log(err)
			} else {
				console.log(JSON.parse(res.content)[0]);
				collectData(JSON.parse(res.content)[0].rowId);
			}
		});
		console.log(search);
	},
	'click #search-serial': function () {
		resetData();
		var search = $('#input-serial').val().toUpperCase();
		Meteor.http.get(api+search, function (err, res){
			if (err){
				console.log(err);
				return
			} else {
				
				var ret = JSON.parse(res.content)[0];
				if (ret.rowId) {
					collectData(ret.rowId);
				}
				console.log(ret);
			}
		});
		console.log(search);
	},
	'click #search-other': function () {
		resetData();
		var search = $('#input-other').val();
		console.log(search);
	},
	'click #search-blase': function () {
		resetData();
		var search = $('#input-blase').val().toUpperCase();
		Meteor.http.get(apiBlase+search, function (err, res){
				if (err){
					console.log(err);
					return
				} else {
				
					var ret = JSON.parse(res.content);
					Session.set('customer-search',ret);

					if (Session.get('customer-search').length == 1){
						console.log('Fetching data ...');
						collectData(ret[0].row_id)
					} else {
						// Afficher une modal avec le resultat
						$('#myModalResult').modal()
					}
					
				}
			});
	},
	'keypress #input-client': function (k) {
		if (k.keyCode === 13) {
            resetData();
			var search = $('#input-client').val().toUpperCase();
			Meteor.http.get(apiNum+search, function(err, res){
				if (err){
					console.log(err)
				} else {
					console.log(JSON.parse(res.content)[0]);
					collectData(JSON.parse(res.content)[0].rowId);
				}
			});
		}
	},
	'keypress #input-serial': function (k) {
		if (k.keyCode === 13) {
            resetData();
			var search = $('#input-serial').val().toUpperCase();
			Meteor.http.get(api+search, function (err, res){
				if (err){
					console.log(err);
					return
				} else {
				
					var ret = JSON.parse(res.content)[0];
					if (ret.rowId) {
						collectData(ret.rowId);
					}
				}
			});
		}
	},
	'keypress #input-blase': function (k) {
		if (k.keyCode === 13) {
            resetData();
			var search = $('#input-blase').val().toUpperCase();
			Meteor.http.get(apiBlase+search, function (err, res){
				if (err){
					console.log(err);
					return
				} else {
				
					var ret = JSON.parse(res.content);
					Session.set('customer-search',ret);

					if (Session.get('customer-search').length == 1){
						console.log('Fetching data ...');
						collectData(ret[0].row_id)
					} else {
						// Afficher une modal avec le resultat
						$('#myModalResult').modal()
					}
					
				}
			});
		}
	},
});

var collectData = function (sRow) {
	Meteor.http.get(apiInfo+sRow, function (err, res){
		if (err) {
			console.log(err);
			return
		} else {
			Session.set("customer-info",JSON.parse(res.content)[0]);
			getEmail(sRow);							
		}
	});
	
	Meteor.http.get(apiContrat+sRow, function (e, r){
		if (e) {
			console.log(e);
		} else {
			Session.set("customer-contrat", JSON.parse(r.content));
		}
	});

	Meteor.http.get(apiAssets+sRow, function (e, r){
		if (e) {
			console.log(e);
		} else {
			Session.set('customer-assets', JSON.parse(r.content));
		}
	});

	Meteor.http.get(apiSR+sRow, function (e, r){
		if (e) {
			console.log(e);
		} else {
			Session.set('customer-sr', JSON.parse(r.content));
		}
	})
};

var resetData = function () {
	Session.set('customer-contrat',"");
	Session.set('customer-assets', "");
	Session.set('customer-info', "");
	Session.set('customer-sr',"");
	Session.set('customer-search','');
}

var getEmail = function (sRow) {
	Meteor.http.get(apiEmail+sRow, function (e,r){
		if (e) {
			console.log(e);
		} else {
			var ret = JSON.parse(r.content)[0];
			var tmp = Session.get('customer-info');
			console.log(ret);
			if (ret.email == null) {
				tmp.email=ret.mail_3;
			} else {
				tmp.email= ret.email;
			}
			Session.set('customer-info', tmp);			
		}
	})
};


