var app = app || {};

//Declare historydatas for read and write to Firebase
app.HistoryDatas = Backbone.Collection.extend({
	url: config.databaseURL + "/user/datas",
	model: app.HistoryData,
});