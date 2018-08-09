var HighchartsInst = require('highcharts');

// ===== API =====
const apiInfo 	= "http://marl2116:3100/siebel/infos/";
const apiContrat= "http://marl2116:3100/siebel/contrat/";
const apiAssets = "http://marl2116:3100/siebel/assets/";
const apiNum 	= "http://marl2116:3100/siebel/customer/row/";
const apiEmail 	= "http://marl2116:3100/siebel/customer/email/";
const apiSR		= "http://marl2116:3100/siebel/cstg5/sr/";
const apiBlase 	= "http://marl2116:3100/siebel/customer/search/";
const apiUserName = "http://marl2116:3100/siebel/username/";
// ===== API =====

let state = {
  filter: 'all',
  data: [],
  index:0,
};

Template.Stat_Install.onCreated(function() {
    var self = this;
  console.log('onCreated')
  Session.set('loading', true);
    self.autorun(function() {
        self.subscribe('install');
      Session.set('install-customer', Install.getList());
    });
});

Template.Stat_Install.onRendered(function(){
  console.log('onRendered')
  setTimeout(function(){
    Session.set('loading', false)
  },500)
})

Template.Stat_Install.helpers({
	data: function() {
      return  Session.get('install-customer'); //Install.getList()
	},
  counter: function(){
    return Session.get('install-customer').length;
  },
  loading: function(){
    return Session.get('loading');
  }
});


Template.Stat_Install.events({
  'click .container-install': function(){
    resetSession()
  },
  'click .js-edit-install': function(e){
    Session.set('loading', true);
    Session.set('customer-install',{});
    const data = {
      row:e.currentTarget.dataset.row,
      serial:e.currentTarget.dataset.serial,
      id: e.currentTarget.dataset.id,
      dSent: e.currentTarget.dataset.dt_sent,
      dInst: e.currentTarget.dataset.dt_install,
      version: '5.00.02',
      cnx: e.currentTarget.dataset.cnx
    };
    apiCall(data, function(){
      $('#modal-install').modal();
      Session.set('loading', false)
    });

  },
  'click .js-filter-installed': function(){
    state.filter = 'installed';
    Session.set('install-customer', Install.getInstalled());
  },
  'submit .js-search':function(e){
    e.preventDefault();
    var txt = $('#search-install').val().toUpperCase();
    var newState = Session.get('install-customer').filter(function(item){
      return item.name.indexOf(txt) > -1
    })
    console.log('search: ',newState);
    Session.set('install-customer', newState)
  },
  'click .js-filter-not': function(){
    state.filter = 'not';
    Session.set('install-customer', Install.getNotInstalled());
  },
  'click .js-filter-all': function () {
    state.filter = 'all';
    Session.set('install-customer', Install.getList());
  },
  'click .js-all-v5-sr': function(){
    Session.set('loading', true)
    apiCallV2(apiSR, function (data){
      console.log(data);
      Session.set('AllSr', data);
      console.log('Show Modal SR')
      $('#modal-sr').modal();
      Session.set('loading', false)
    } )
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
	},
  sr: function(){
    return Session.get('install-sr');
  }
})

Template.ModalInstall.events({
  'click .js-submit-install': function() {
    var dt = $('#edit-install-dt').val();
    var cnx = $('#cnx').val();
    var id = Session.get('customer-install').id;
    var y = dt.substr(0,4);
    var m = dt.substr(5,2);
    var d = dt.substr(8,2);
    updateInstall(id,y+m+d, cnx);
  },
  'click .js-close-install': function(){
    Session.set('install-sr',[]);
    Session.set('customer-install', {});
  },
  'click .js-get-sr': function(){
    Session.set('install-sr',[]);

    getCstgV5Sr(Session.get('customer-install').row, function(sr){
      Session.set('install-sr', sr);
      console.log('getCstgSr: ', Session.get('install-sr'))
    })

  },
  'click .js-suivant': function(){
      // Passer au suivant dans la liste des installé ....
    getIndice(Session.get('customer-install').id, function(ind){
      console.log('cb: ', ind);
      let e;
      resetSession()
      if (ind < Session.get('install-customer').length){
        e = Session.get('install-customer')[ind];
      } else {
        console.log('on revient au premier')
        e = Session.get('install-customer')[0];
      }
      const data = {
        row:e.row,
        serial:e.serial,
        id: e._id,
        dSent: e.date_sent,
        dInst: e.date_install,
        version: '5.00.02',
        cnx: e.cnx
      };
      apiCall(data, function(cust){
        console.log('cust: ',cust)
      });
    })
  }
})

Template.ModalSr.helpers({
  data: function(){
    return Session.get('AllSr');
  },
  count: function(){
    return Session.get('AllSr').length;
  }
});

updateInstall = function(id,installDt, cnx){
  console.log('update:'+id+' '+installDt);
  Install.update(id,{$set: {date_install: installDt, cnx:cnx}});
}

getIndice = function (id, cb){
  var indice = 0;
  Session.get('install-customer').forEach(function(item){
    if (item._id===id){
      cb (indice+1)
    }
    indice++
  });
}

resetSession = function(){
  Session.set('install-sr', null)
}

getUserName = function(pb, cb){
  if (pb){
    Meteor.http.get(apiUserName+pb, function(err, res){
      if(err){
        console.log(err);
        return;
      }
      cb(JSON.parse(res.content)[0].name)
    })
  }
}

// ===== API CALL =====
const apiCall = function(data, cb) {
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
        num_client: content[0].num_client,
        version: data.version,
        cnx: data.cnx,
        row: data.row
      };
      Session.set('customer-install', customer);
      cb();
    });
  }
}

apiCallV2 = function(url, cb){
  Meteor.http.get(url, function (err, res){
    if (err){
      console.log(err);
      return
    }
    cb(JSON.parse(res.content));
  })
}

const getCstgV5Sr = function(sRow, cb) {
  if (sRow){
    Meteor.http.get(apiSR+sRow, function(err, res){
      if (err) {
        console.log(err);
        return ;
      }
      const sr = JSON.parse(res.content);
      cb(sr)
    });
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

