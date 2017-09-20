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