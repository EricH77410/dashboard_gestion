
const SMS_URL = "http://marl2116:3100/sms/";

let customers=Session.get('CustomerSms');
let command = [];

Template.SmsOrder.onCreated(function() {
    var self = this;
    resetData()
    self.autorun(function() {
        self.subscribe('sms_order');
        self.subscribe('sms_customer');
    });
});

Template.SmsOrder.helpers({
   customerList: function() {
       //var data = SmsCustomer.find({}).fetch();
       //console.log(data)
       return Session.get('CustomerSms');
   }
});

Template.ModalEdit.helpers({
    editCustomer: function() {
        return Session.get('EditCustomer');
    },
    commandList: function() {
        if (Session.get('EditCustomer')){
            console.log(SmsOrder.getCommandList(Session.get('EditCustomer').idclient))
            return SmsOrder.getCommandList(Session.get('EditCustomer').idclient)
        }
    }
})

Template.ModalEdit.events({
    'click .js-submit': function(e){
        var name   = $('#customer-name').val();
        var num     = $('#customer-num').val();
        var log      = $('#customer-login').val()
        var pwd     = $('#customer-pwd').val()
        var _id     = Session.get('EditCustomer')._id
        var updatedCustomer = {
            name: name,
            num_client: num,
            login: log,
            pwd: pwd
        }
        e.preventDefault();
        updateClient(_id, updatedCustomer)
    }
})

// Todo
// Si il n'y a qu'un seul résultat, ouvrir directement la modal

Template.SmsOrder.events({
    'click .js-update': function(e){
        var log = e.currentTarget.dataset.log;
        var pwd = e.currentTarget.dataset.pwd;
        var id = e.currentTarget.dataset.id;
        getMessageQty(log,pwd,id)
    },
    'click .js-search-num': function(){
        resetData()
        var num = $('#js-search-num').val();
        customers = SmsCustomer.searchCustomerByNum(num);
        Session.set('CustomerSms',customers);
    },
    'click .js-search-name': function(){
        resetData()
        var blase = $('#js-search-name').val();
        customers = SmsCustomer.searchNameLike(blase);
        Session.set('CustomerSms', customers);
    },
    'click .js-edit-customer': function(e) {
        //resetData()
        // on met à jour les crédits SMS lors de l'ouverture de la modal
        var id = e.currentTarget.dataset.id
        var log = e.currentTarget.dataset.log;
        var pwd = e.currentTarget.dataset.pwd
        getSmsQty(log,pwd,id, function(res){
            Session.set('EditCustomer', SmsCustomer.findOne(id))
            if(id) {
                $('#modal-edit').modal()
            }
        })
    },
    'click .js-search-qty': function() {
        //resetData()
        var qty = parseInt($('#js-search-qty').val())
        Session.set('CustomerSms',SmsCustomer.searchQtyLessThan(qty))
    }
})

// Call the SMS V3 API
var getMessageQty = function (login, pwd,id) {

    const url = encodeURI(SMS_URL+login+'/'+pwd)
    if (login){
        Meteor.http.get(url, function(err,res){
            console.log('getMsgQty',res.data.left);
            console.log(customers)
            customers.map(function(cust){
                if(cust._id===id){
                    cust.qty = res.data.left
                }
            });
            Session.set('CustomerSms',customers)
            updateClient(id, {qty: res.data.left})
        });
    }
};

var getSmsQty = function (login, pwd,id, callback) {

    const url = encodeURI(SMS_URL+login+'/'+pwd)
    if (login){
        Meteor.http.get(url, function(err,res) {
            if(err) {
                console.log('Erreur: ', err)
                return;
            }
            console.log('getMsgQty',res.data.left);
            updateClient(id, {qty: res.data.left})
            callback(res.data.left)
        });
    }
};

var updateClient = function(id, data){
    console.log(id, data);
   return SmsCustomer.update( {_id: id}, {$set: data} );
}

var resetData = function () {
    console.log('reset data')
    Session.set('CustomerSms',null);
    Session.set('EditCustomer',null)
}



// Update a document in a collection :
// SmsCustomer.update({_id:'LcBAFtH6DY37fN5FG'},{$set:{name: 'DR ABEINNON François'}})