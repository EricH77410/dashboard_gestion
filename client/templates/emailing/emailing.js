var releaseData = 
 [
     {
         version: '4.9.00.20',
         content: [
             "-Cette version intègre une correction sur certaines facturations électroniques qui pouvaient être considérées en anomalie [N°9070032]." +
             "<br>-Le transfert des actes du Plan de traitement vers la facturation a été également optimisé" +
             "bridge, sont devenus remboursables sous conditions. Pour répondre à l’exigence de la Sécurité Sociale, vous " +
             "devez désormais indiquer lors d’une facturation que l’acte est remboursable lorsque celui-ci répond aux conditions " +
             "de remboursement. Et dans le cas d’une feuille de soins papier ajouter un X sur la ligne d’acte.",
             "Afin de vous faciliter cette gestion, lors de la saisie d’un acte remboursable sous condition, un message sera affiché vous " +
             "demandant si celui-ci est remboursable, ainsi l’information sera automatiquement renseignée dans la feuille " +
             "de soins électronique et un X sera imprimée dans le cas d’une feuille de soins papier.",
             "<strong>2. Intégration de la dernière CCAM v.44.50 :</strong><br> " +
             " <ol> <li>Actes de bridges désormais remboursables sous conditions (Bridges de bases HBLD040, HBLD043, HBLD033, " +
             "HBLD023 et pour les piliers et intermédiaires de bridge HBMD490, HBMD342, HBMD082, HBMD479, HBMD433, " +
             " HBMD072, HBMD081, HBMD087).</li> " +
             "<li>Création de l’acte YYYY465, 70€ [Supplément pour examen spécifique préalable et postérieur à l'acte de " +
             "pose d'un appareillage en propulsion mandibulaire dans le traitement du syndrome d'apnées-hypopnées " +
             " obstructives du sommeil] avec remboursement sous conditions.</li> " +
             "<li>Acte LBLD017 [Pose d'un appareillage en propulsion mandibulaire] maintenant remboursable sous conditions.</li> " +
             "<li>Suppression des incompatibilités sur les dents 15 et 25 pour les actes HBGD031 [Avulsion d'1 dent permanente " +
             "sur arcade avec séparation des racines] et HBGD032 [Avulsion de 2 dents permanentes sur arcade avec séparation des racines].</li> </ol>",
             "<strong>3. Corrections et améliorations diverses :</strong><br> - En FSE, le justificatif d’exonération est " +
             "désormais systématiquement renseigné <br> - FSE en ALD, un message pouvait être affiché à tort<br> - Devis " +
             "type optimisé sur les actes multi-dents<br> - Impression du code barres des ordonnances amélioré<br> Et bien " +
             "d’autres améliorations…"
         ]
     },
     {
         version: '4.9.00.23',
         content: [
             "- Intégration de la dernière CCAM version 45 : Le code de regroupement de l’acte LBLD017 [Pose d'un appareillage en propulsion mandibulaire] devient «PAR»." +
             "- Améliorations des performances lors de la recherche et ouverture d’un dossier patient, affichage de l’historique imagerie et de l’assistance au codage CCAM." +
             "- Optimisation lors de la localisation d’un acte sur les quadrants et sextants, utilisés par exemple pour [HBGD040 - Avulsion de plusieurs dents surnuméraires à l'état de germe ou de plusieurs odontoïdes]." +
             "- L’impression d’un duplicata depuis l’historique des factures télétransmisses est de nouveau opérationnelle." +
             "- La mise à jour de certaines conventions AMC pouvaient engendrer une anomalie.",
             "- Le profil utilisateur «Assistance» peut également réaliser une FSE pour un patient bénéficiant de l’ACS." +
             "- L’utilisation d’une ordonnance type prend désormais en compte les préférences du  praticien sur l’option d’impression de l’état médical et d’éventuelle allergie du patient." +
             "- Diverses corrections.",
         ]
     },
     {
         version: '4.9.00.25',
         content: [
             "1. CMU : A partir du 1er octobre 2017, les plafonds sur les tarifs des prothèses pour les bénéficiaires CMU ont été revalorisés et pour certains actes ajoutés.",
             "2.  ACS : A partir du 1er octobre 2017, les plafonds sur les tarifs des prothèses pour les bénéficiaires CMU sont également applicables pour les bénéficiaires de l’ACS.",
             "Afin de répondre à cette réglementation CS Trophy Gestion appliquera les tarifs CMU également aux patients ACS si vous avez activé cette règle dans votre profil praticien.",
            "[Pour ceci, sélectionnez Paramétrages / Gestion des praticiens / Paramétrages suite et cocher « Appliquer les honoraires CMU aux ACS »]",
            "A noter : contrairement à la CMU-C, les bénéficiaires ACS pourront avoir un reste à charge, puisque celle-ci varie selon les contrats A,B ou C.", 
         ]
     }
 ];


Tracker.autorun ( function () {
    Session.set('version_content', releaseData[releaseData.length-1]);
});

Template.Emailing.helpers({
    tabVersion: function () {
        var versions = [];
        for (var i=0; i<releaseData.length; i++){
            versions.push(releaseData[i].version)
        }
        return versions
    },
    verion_maj: function() {
        return releaseData[releaseData.length-1].version;        
    },
    version_precedente: function() {
        return releaseData[releaseData.length-2].version;
    },

    release_news: function() {
        //return releaseData[0]; // [releaseData.length-1]
        return Session.get('version_content');
    }

})

Template.Emailing.events({
    'click .release': function (evt) {
        var version = releaseData.filter(function (rel) {
            return rel.version === evt.currentTarget.id
        })
        Session.set('version_content', version[0])
    },
});