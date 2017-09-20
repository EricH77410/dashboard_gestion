Meteor.methods({
    // //Correction d'un petit problème de formatage année
    // correction_annee: function(){
    //   var data = Revenus.find({annee: '2016', mois:'Aout'}).fetch();
    //   var tmp='';
    //   data.forEach(function(item){
    //     tmp = String(item.catno)
    //     Revenus.update(item._id, {$set: {catno: tmp}});
    //   });
    // },

    // Gestion de l'ajout depuis API rest
    api_Add_Revenu: function(data) {
        console.log("INSERTION : ", data);
        return Revenus.insert(data);
    },
    api_Add_topten: function (data) {
        // On va appeler l'api siebel pour récupérer le titre et la description de chaques DA
        data.content.forEach(function (da){
            var res = Meteor.http.get('http://localhost:3100/siebel/sr/text/'+da.num)
                if (res.statusCode === 200) {
                    var obj = JSON.parse(res.content)
                    da.description  = obj[0].description;
                    da.title        = obj[0].title;
                } else {
                    console.log(res);
                }          
        });
        return Hotline.insert(data);
    },
    api_Add_Customer: function(data) {
        console.log(data);
        Customer.insert(data);
        return ('Data customer OK')
    },
    api_Add_Telemarketing: function(data) {
        console.log(data);
        return ('Super transfert de telemarketing')
    },
    api_AddcontractInfo: function(data) {
        Meteor.call('deleteLiveInfo', function(err, res) {
            if (err) {
                console.log('Erreur lors de la suppression des infos contrats ...' + err);
            }
        });
        LiveDataContract.insert(data);
        console.log('Insertion live infos contrats');
        console.log(data);
        return ('Super transfert de live infos');
    },

    api_add_stat: function(data) {
        console.log('on a reçu :');
        console.log(data);
        return 'données reçu';
    },

    addRevenu: function() {
        var data = JSON.parse(Assets.getText('serv_mongo.json'));
        data.forEach(function(item) {
            Revenus.insert(item);
        });
    },

    // Ajout des données de télémarketing (telemarketing.json)
    addTelemarketingData: function() {
        var data = JSON.parse(Assets.getText('telemarketing.json'));
        data.forEach(function(item) {
            Telemarketing.insert(item);
        });
    },
    deleteLiveInfo: function() {
        console.log('Erasing data ...');
        LiveDataContract.remove({});
    },
    checkPassword: function(pwd) {
        if (pwd === secret.pwd) {
            return true;
        } else {
            return false;
        }
    },
    getCode: function(code, version) {
        var d1 = 0;
        var d2 = 0;
        var d3 = 0;
        var d4 = 0;
        var d5 = 0;
        var d6 = 0;

        code = parseInt(code);
        version = parseInt(version);

        dhas1 = 0;

        switch (version) {
            case 1:
                dhas = (code * 41) + 110765;
                break;

            case 2:
                dhas = (code * 42) + 110865;
                break;

            case 3:
                dhas = (code * 43) + 110965;
                break;
            default:
                // default
        }

        d1 = parseInt(dhas % 10);
        dhas = dhas / 10;
        d2 = parseInt(dhas % 10);
        dhas = dhas / 10;
        d3 = parseInt(dhas % 10);
        dhas = dhas / 10;
        d4 = parseInt(dhas % 10);
        dhas = dhas / 10;
        d5 = parseInt(dhas % 10);
        dhas = dhas / 10;
        d6 = parseInt(dhas % 10);

        if (code % 2 == 0) {
            dhas = 10000 * (d2 + d3);
            dhas = dhas + (1000 * (d1 + d5 + d6));
            dhas = dhas + (100 * (d4 + d2));
            dhas = dhas + (10 * (d5 + d3));
            dhas = dhas + d2 + d4 + d6;
        } else {
            dhas = 10000 * (d1 + d4);
            dhas = dhas + (1000 * (d2 + d5 + d3));
            dhas = dhas + (100 * (d5 + d1));
            dhas = dhas + (10 * (d6 + d3));
            dhas = dhas + d3 + d4 + d6;
        }

        dhas1 = dhas;

        return dhas1;
    }
});