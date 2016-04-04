
Template.increase.helpers({
    contratcs : function(){
        var data = Services.find({ $or:
            [ { catno: "5152467" },
              { catno: "5152459" },
              { catno: "5185574" },
              { catno: "5185582" },
              { catno: "5185590" }
            ]}).fetch();

        for (var i=0; i<data.length; i++){
            data[i].increase = parseFloat(priceInc(data[i].prix_ht));
            data[i].new_price = parseFloat(data[i].prix_ht + data[i].increase).toFixed(2);
            data[i].price_vat = priceVatIncluded(data[i].new_price);
        }
        return data;
    }
});
