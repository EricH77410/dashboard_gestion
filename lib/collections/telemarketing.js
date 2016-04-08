/**
 * Created by Eric Hamimi on 05/04/2016.
 */
Telemarketing = new Mongo.Collection('telemarketing');

Telemarketing.getDataByDate = function (date) {
    return Telemarketing.find({from: date});
}