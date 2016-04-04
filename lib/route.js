/**
 * Created by Eric Hamimi on 16/02/2016.
 */

Router.configure({
  layoutTemplate: 'MainView',
  loadingTemplate: 'Loading'
});

Router.route('/', function(){
   this.render('Home');
}, {
  layoutTemplate: "MainView"
});

Router.route('/report', function(){
   this.render('report');
}, {
  layoutTemplate: "MainView"
});

Router.route('/contrat',function(){
   this.render('contrat');
}, {
  layoutTemplate: "MainView"
});

Router.route('/test', function(){
   this.render('test');
}, {
  layoutTemplate: "MainView"
});

Router.route('/compare', function(){
   this.render('compare');
}, {
  layoutTemplate: "MainView"
});

Router.route('/increase', function(){
   this.render('increase');
}, {
  layoutTemplate: "MainView"
 });

 Router.route('/year-view', function(){
   this.render('YearView');
 }, {
   layoutTemplate: 'MainView'
 });

 Router.route('/telemarketing', {
    name: 'Telemarketing',
    template: 'Telemarketing'
 });
