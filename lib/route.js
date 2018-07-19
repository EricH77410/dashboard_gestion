/**
 * Created by Eric Hamimi on 16/02/2016.
 */

Router.configure({
    layoutTemplate: 'MainView',
    loadingTemplate: 'Loading'
});

Router.route('/', function() {
    this.render('Home');
}, {
    layoutTemplate: "MainView"
});

Router.route('/hotline', function () {
    this.render('TopTen');
},{
    layoutTemplate: "MainView"
});

Router.route('/stats_install', function () {
    this.render('Stat_Install');
},{
    layoutTemplate: "MainView"
});

Router.route('/stats_hl', function () {
    this.render('Stats_hl');
},{
    layoutTemplate: "MainView"
});

Router.route('/dashboard', function() {
    this.render('Dash');
}, {
    layoutTemplate: "MainView"
});

Router.route('/gestion', function() {
    this.render('GestionHome');
}, {
    layoutTemplate: "MainView"
});

Router.route('/report', function() {
    this.render('report');
}, {
    layoutTemplate: "MainView"
});

Router.route('/contrat', function() {
    this.render('contrat');
}, {
    layoutTemplate: "MainView"
});

Router.route('/test', function() {
    this.render('test');
}, {
    layoutTemplate: "MainView"
});

Router.route('/emailing', function() {
    this.render('Emailing');
}, {
    layoutTemplate: 'MainView'
});

Router.route('/compare', function() {
    this.render('compare');
}, {
    layoutTemplate: "MainView"
});

Router.route('/increase', function() {
    this.render('increase');
}, {
    layoutTemplate: "MainView"
});

Router.route('/year-view', function() {
    this.render('YearView');
}, {
    layoutTemplate: 'MainView'
});

Router.route('/telemarketing', {
    name: 'Telemarketing',
    template: 'Telemarketing'
});

Router.route('/recall', function() {
    this.render('MainMonitor');
}, {
    layoutTemplate: "MainView"
});

Router.route('/sms', function() {
    this.render('Sms');
}, {
    layoutTemplate: 'MainView'
});

Router.route('/sms-order', function() {
    this.render('SmsOrder');
}, {
    layoutTemplate: 'MainView'
});

// Router.route('/telemarketing', function(){
//   this.render('Telemarketing', {
//     data: function(){
//      return Telemarketing.find({}, {sort: {from: -1}});
//}
//   });
//   //console.log(this.data);
// })

Router.route('/customer', function() {
    this.render('customer');
}, {
    layoutTemplate: 'MainView'
});