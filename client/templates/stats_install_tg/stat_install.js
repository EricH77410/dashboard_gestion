var HighchartsInst = require('highcharts');

// ===== API =====
const apiInfo 	= "http://marl2116:3100/siebel/infos/";
const apiContrat= "http://marl2116:3100/siebel/contrat/";
const apiAssets = "http://marl2116:3100/siebel/assets/";
const apiNum 	= "http://marl2116:3100/siebel/customer/row/";
const apiEmail 	= "http://marl2116:3100/siebel/customer/email/";
const apiSR		= "http://localhost:3100/siebel/sr/";
const apiBlase 	= "http://localhost:3100/siebel/customer/search/";
// ===== API =====

Template.Stat_Install.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('install');
    });
});

Template.Stat_Install.helpers({
	data: function() {
		return Install.getList();
	},
	getError: function() {
		return infoState.error;
	},
	getMessage: function () {
		return infoState.msg;
	}
});

Template.Stat_Install.events({
  'click .js-edit-install': function(e){
    Session.set('customer-install',{})
    const data = {
      row:e.currentTarget.dataset.row,
      serial:e.currentTarget.dataset.serial,
      id: e.currentTarget.dataset.id,
      dSent: e.currentTarget.dataset.dt_sent,
      dInst: e.currentTarget.dataset.dt_install
    }
    apiCall(data);
    $('#modal-install').modal();    
  }
});

Template.InstallGraph.helpers({
  createChartInstall: function(){
    var data = getChartDataInstall();
    Meteor.defer(function() {
      HighchartsInst.chart('install-chart', data);
    });
  }
});

Template.ModalInstall.helpers({
	editCustomer: function() {
		return Session.get('customer-install');
	}
})

Template.ModalInstall.events({
  'click .js-submit-install': function() {
    var dt = $('#edit-install-dt').val();
    var id = Session.get('customer-install').id
    var y = dt.substr(0,4);
    var m = dt.substr(5,2);
    var d = dt.substr(8,2);
    updateInstall(id,y+m+d);
  }
})

updateInstall = function(id,installDt){
  console.log('update:'+id+' '+installDt);
  // Install.update({id},{$set: {install_date: installDt}})
}

// ===== API CALL =====
const apiCall = (data) => {
  if (data.row) {
    Meteor.http.get(apiInfo+data.row, function(err, res) {
      if (err){
        console.log(err);
        return;
      }
      const content = JSON.parse(res.content);
      const customer = {
        adr: content[0].adr,
        adr2: content[0].adr2,
        city: content[0].city,
        zip: content[0].zipcode,
        tel: content[0].tel,
        date_install: data.dInst,
        date_sent: data.dSent,
        serial: data.serial,
        id: data.id,
        name: content[0].name,
        email: content[0].email,
        num_client: content[0].num_client
      };
      Session.set('customer-install', customer);
    })
  }
}
// ===== END API CALL =====


// ===== CREATE CHART =====
getChartDataInstall = function() {
  var tmp = Install.find().fetch();
  var sent = tmp.length;
  var installed = 0;
  tmp.forEach(function(item){
    if(item.date_install){
      installed++;
    }
  });

  objectReturn = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'CS Trophy Gestion V5.00'
    },
    xAxis: {
      categories: ['CS TG 5.00'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Install V5.00 Tracking',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      shadow: true
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Installed',
      data: [installed]
    }, {
      name: 'Sent',
      data: [sent]
    }]
  }
  return objectReturn;
};