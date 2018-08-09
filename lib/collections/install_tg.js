Install       = new Mongo.Collection('install');

Install.getList = function () {
  return Install.find().fetch();
}

Install.getListOrderByInstalled = function(){
  return Install.find({}, {sort: {date_install: -1}});
}

Install.getInstalled = function(){
  return Install.find({"date_install":{"$exists": true} }).fetch()
}

Install.getNotInstalled = function () {
  return Install.find({"date_install": {"$exists": false}}).fetch()
}

Install.getListSearch = function(txt){
  return Install.find({ $text: { $search: txt, $caseSesnsitive: false } })
}