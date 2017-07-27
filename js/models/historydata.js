var app = app || {};

app.HistoryData = Backbone.Model.extend({
	defaults: {
		date: "null",
		totalCal: "(kcal)",
	}
});