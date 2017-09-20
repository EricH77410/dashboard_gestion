Template.test.events({
    'click .add-data': function() {
        console.log('Adding new data ...');
        // Demander un mot de passe avant de faire l'import
        var pwd = prompt("Password :");
        Meteor.call('checkPassword', pwd, function(err, res) {
            if (err) {
                alert(err);
            } else {
                if (res) {
                    Meteor.call('addRevenu');
                    console.log('import ok');
                } else {
                    alert('Pas acces !');
                }
            }
        });
    },
    'click .add-tele': function() {
        console.log('Adding new telemarketing data ...');
        // Demander un mot de passe avant de faire l'import
        var pwd = prompt("Password :");

        Meteor.call('checkPassword', pwd, function(err, res) {
            if (err) {
                alert(err);
            } else {
                if (res) {
                    Meteor.call('addTelemarketingData');
                    console.log('import ok');
                } else {
                    alert('Pas acces !');
                }
            }
        });
    },
    'click .delete-info': function() {
        var pwd = prompt("Password :");

        Meteor.call('checkPassword', pwd, function(err, res) {
            if (err) {
                alert(err);
            } else {
                if (res) {
                    Meteor.call('deleteLiveInfo');
                } else {
                    alert("Pas d'acces ...");
                }
            }
        });
    }
});

Template.gencode.events({
    'click #gen': function() {
        var c = $('#code').val();
        var v = $('#version').find('option:selected').val();
        Meteor.call('getCode', c, v, function(err, result) {
            if (!err) {
                $('#result').text(result);
            } else {
                console.log('Erreur : ' + err);
            }
        });
    },

    'blur #code': function() {
        if ($('#code').val() != '') {
            Meteor.call('getCode', $('#code').val(), $('#version').find('option:selected').val(), function(err, res) {
                if (!err) {
                    $('#result').text(res);
                } else {
                    console.log('Erreur : ' + err);
                }
            });
        }
    }
});