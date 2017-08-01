var app = app || {};

app.HistoryDatas = Backbone.Collection.extend({
	url: config.databaseURL + "/user/datas",
	model: app.HistoryData,

});