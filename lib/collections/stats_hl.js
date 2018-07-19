Stats_hl = new Mongo.Collection('stats_hl');

// Request between
// Stats_hl.find({date: {$gte: '20160101', $lt: '20160131'} }).fetch()

Stats_hl.getDataByDate = function(dDate) {
    return Stats_hl.find({ date: dDate });
}

Stats_hl.getDataBetweenDates = function(dDate1, dDate2) {
    return Stats_hl.find({ date: {$gte: dDate1, $lt: dDate2} }).fetch();
}