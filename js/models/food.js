var app = app || {};

app.Food = Backbone.Model.extend({
	defaults: {
		foodName: "name",
		calories: "(kcal)"
	}
});