var app = app || {};

app.FoodList = Backbone.Collection.extend({
	model: app.Food,
});