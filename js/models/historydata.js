var app = app || {};

//this model is used to save and write Database
app.HistoryData = Backbone.Model.extend({
	defaults: {
		date: "null",
		totalCal: "(kcal)",
		foods: [],
	},
});