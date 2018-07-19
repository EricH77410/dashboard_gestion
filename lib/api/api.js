/* ===============================
            API REST
   =============================== */

// Ajout d'info revenu
Router.route('/api/insert/revenu', function() {
    console.log('Arrivé req post revenu');
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json;charset=utf-8");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    Meteor.call('api_Add_Revenu', this.request.body, function(err, res) {
        if (err) throw err
        console.log(res);
    });
    this.response.end('Transfert data revenu OK');

}, { where: 'server' });

// Ajout d'une commande SMS
Router.route('/api/insert/sms_order', function() {
    console.log('Arrivé req post order_sms');
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json;charset=utf-8");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    Meteor.call('api_Add_smsOrder', this.request.body, function(err, res) {
        if (err) throw err
        console.log(res);
    });
    this.response.end('Transfert data smsOrder OK');

}, { where: 'server' });

// Ajout d'un client SMS
Router.route('/api/insert/sms_customer', function() {
    console.log('Arrivé req post order_sms');
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json;charset=utf-8");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    Meteor.call('api_add_sms_customer', this.request.body, function(err, res) {
        if (err) throw err
        console.log(res);
    });
    this.response.end('Transfert data smsCustomer OK');

}, { where: 'server' });

// Ajout d'un client SMS
Router.route('/api/insert/contract_month', function() {
    console.log('Arrivé req post contract_month');
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json;charset=utf-8");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    Meteor.call('api_add_contract_month', this.request.body, function(err, res) {
        if (err) throw err
        console.log(res);
    });
    this.response.end('Transfert data OK');

}, { where: 'server' });


// Ajout Install TG V 5.0
Router.route('/api/insert/install_tg', function() {
  console.log('Arrivé req post install tg');
  this.response.statusCode = 200;
  this.response.setHeader("Content-Type", "application/json;charset=utf-8");
  this.response.setHeader("Access-Control-Allow-Origin", "*");
  this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var id = ''
  Meteor.call('api_add_install_tg', this.request.body, function(err, res) {
    if (err) throw err
    console.log(res);
    id = res
  });
  this.response.end(id);


}, { where: 'server' });

// Ajout data TopTen DA
Router.route('/api/insert/topten', function() {
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    Meteor.call('api_Add_topten', this.request.body, function(err, res) {
        if (err) throw err
        console.log(res);   
    });

    this.response.end('Transfert data topten OK');
}, { where: 'server' });

// Ajout Stats HL
Router.route('/api/insert/stats_hl', function() {
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    Meteor.call('api_add_stats_hl', this.request.body, function(err, res) {
        if (err) throw err
        console.log(res);   
    });

    this.response.end('Transfert data stats_hl OK');
}, { where: 'server' });

// Ajout d'info télémarketing
Router.route('/api/insert/telemarketing', function() {
    console.log('Arrivé req post telemarketing');
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json;charset=utf-8");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    Meteor.call('api_Add_Telemarketing', this.request.body, function(err, res) {
        if (err) throw err
        console.log(res);
    })
    this.response.end('Transfert data telemarketing OK')
}, { where: 'server' });

// Ajout des infos contrats du jour (liste des contrats actifs etc ...)
Router.route('api/insert/live', function() {
    console.log('Arrivé req de liveinfo');
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json;charset=utf-8");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    Meteor.call('api_AddcontractInfo', this.request.body, function(err, res) {
        if (err) throw err
        console.log(res);
    })
    this.response.end('Transfert live info OK');
}, { where: 'server' });

Router.route('api/insert/customer', function() {
    console.log('Arrivé req de liveinfo');
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json;charset=utf-8");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    Meteor.call('api_Add_Customer', this.request.body, function(err, res) {
        if (err) throw err
        console.log(res);
    })
    this.response.end('Transfert data customer OK');
}, { where: 'server' });

Router.route('api/test', function() {
    console.log("Test API headers");
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json;charset=utf-8");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    this.response.end(JSON.stringify(Customer.find().fetch()));
}, { where: 'server' });

Router.route('api/stat_region', function() {
    console.log('Arrivé data région');

    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json;charset=utf-8");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    Meteor.call('api_add_stat', this.request.body, function(err, res) {
        if (err) throw err
        console.log(res);
    });
    this.response.end('Données stats mises à jour');
}, { where: 'server' });

Router.route('api/recall', function () {
    console.log('Arivée data recall');
    this.response.statusCode=200;

    this.response.setHeader("Content-Type", "application/json;charset=utf-8");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    Meteor.call('api_add_recall', this.request.body, function (err, res){
        if(err) throw err
        console.log(res);
    });
    this.response.end('data updated');
}, { where: 'server' });

Router.route('api/reminder', function () {
    console.log('Arivée data reminder');
    this.response.statusCode=200;

    this.response.setHeader("Content-Type", "application/json;charset=utf-8");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    Meteor.call('api_add_reminder', this.request.body, function (err, res){
        if(err) throw err
        console.log(res);
    });
    this.response.end('data updated');
}, { where: 'server' });

Router.route('api/sms', function () {
    console.log('Arrivée data sms');
    this.response.statusCode = 200;

    this.response.setHeader("Content-Type", "application/json;charset=utf-8");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    Meteor.call('api_add_sms', this.request.body, function (err, res){
        if (err) throw err;
        console.log(res);
    });
    this.response.end('data_uploaded');
}, { where: 'server'});
