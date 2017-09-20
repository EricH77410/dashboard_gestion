Hotline = new Mongo.Collection('hotline');

Hotline.getDaPeriod = function (mois, annee) {
    return Hotline.find({mois: mois, annee: annee},{sort: {qty:-1}});
}
