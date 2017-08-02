var app = app || {};

//Standard food model
app.Food = Backbone.Model.extend({
	defaults: {
		foodName: "name",
		calories: "(kcal)"
	}
});