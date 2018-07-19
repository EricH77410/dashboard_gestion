Sms = new Mongo.Collection('sms');
SmsOrder = new Mongo.Collection('sms_order');
SmsCustomer = new Mongo.Collection('sms_customer');

Sms.getCountByMonth = function(sYear, sMonth) {
    return Sms.find({year: sYear, mois: sMonth}).fetch()
}

Sms.getDataByYear = function (sYear) {
    var data = Sms.find({year: sYear}).fetch();
    var tab = [
        {mois:'Jan', qty:0},
        {mois:'Fev', qty:0},
        {mois:'Mar', qty:0},
        {mois:'Avr', qty:0},
        {mois:'Mai', qty:0},
        {mois:'Jun', qty:0},
        {mois:'Jui', qty:0},
        {mois:'Aou', qty:0},
        {mois:'Sep', qty:0},
        {mois:'Oct', qty:0},
        {mois:'Nov', qty:0},
        {mois:'Dec', qty:0}
    ]

    data.forEach(function(it){
        switch(it.mois) {
            case'1':
                tab[0].qty += it.qty;
                break;
            case'2':
                tab[1].qty += it.qty;
                break;
            case'3':
                tab[2].qty += it.qty;
                break;
            case'4':
                tab[3].qty += it.qty;
                break;
            case'5':
                tab[4].qty += it.qty;
                break;
            case'6':
                tab[5].qty += it.qty;
                break;
            case'7':
                tab[6].qty += it.qty;
                break;
            case'8':
                tab[7].qty += it.qty;
                break;
            case'9':
                tab[8].qty += it.qty;
                break;
            case'10':
                tab[9].qty += it.qty;
                break;
            case'11':
                tab[10].qty += it.qty;
                break;
            case'12':
                tab[11].qty += it.qty;
                break;
        }
    });

    return tab
}

SmsCustomer.searchCustomerByNum = function(num){
    return SmsCustomer.find({num_client: num}).fetch();
}

SmsCustomer.searchQtyLessThan = function(val) {
    return SmsCustomer.find({ qty:  {$lt: val}}).fetch();
}

SmsCustomer.searchNameLike = function(name){
    return SmsCustomer.find({ name: {$regex: name, $options:'i'}}).fetch()
}

SmsOrder.getCommandList = function(id) {
    return SmsOrder.find({'idclient':id}, {sort: {date: -1}}).fetch();
}
