Install       = new Mongo.Collection('install');

Install.getList = function () {
  return Install.find().fetch();
}