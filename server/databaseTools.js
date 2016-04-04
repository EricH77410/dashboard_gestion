
Meteor.methods({
  // Ajout des data du fichier serv_mongo.json
  addRevenu: function(){
    var data=JSON.parse(Assets.getText('serv_mongo.json'));
    data.forEach(function(item){
      Revenus.insert(item);
    });
  },

  // Ajout des données de télémarketing (telemarketing.json)
  addTelemarketingData: function(){
    var data = JSON.parse(Assets.getText('telemarketing.json'));
    data.forEach(function(item){
      Telemarketing.insert(item);
    });
  }
});
