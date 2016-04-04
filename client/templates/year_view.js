Template.YearView.onCreated(function(){
  this.year = String(new Date().getFullYear());
  Session.set('loading', true);
});

Template.YearView.helpers({
  loading: function(){
    return Session.get('loading');
  },
  year: function(){
    return Template.instance().year;
  },
  contrat: function(){
    return Services.find({ $or:
        [ { catno: "5152467" },
          { catno: "5152459" },
          { catno: "5185574" },
          { catno: "5185582" },
          { catno: "5185590" },
          { catno: "5185608" },
          { catno: "5185616" },
          { catno: "5185566" },
          { catno: "5174149" },
          { catno: "5174156" },
          { catno: "5174164" },
          { catno: "5174172" },
          { catno: "5174180" },
          { catno: "5174198" }
        ]});
  },
  getRev: function(contractId, month, year){
    return getRevByContract(contractId, year, month);
  },
  months: function(){
    return tabMonth;
  },
  getTd: function(){
    var rev = [];
    var line = '';
    var total = 0;
    var annee = Template.instance().year;
    for (var i=0; i<tabMonth.length; i++){
      rev.push(getRevByContract(this.idservices, annee, tabMois[i]));
      total = total + parseFloat(rev[i]);
      line = line+'<td>' + accounting.formatMoney(rev[i],"€",2,".", ",") + '</td>';
    }
    return line + '<td class="total">' + accounting.formatMoney(total.toFixed(2),"€",2,".", ",") + '</td>';
  },

  totalYear: function(){
    var total = getRevByYear(Template.instance().year);
    if(total>0){
      Session.set('loading', false);
    }
    return total;
  },
  totalMois: function(id){
    return accounting.formatMoney(getRevByMonth(id, Template.instance().year),"€",2,".", ",");
  }
});

Template.YearView.events({

});
