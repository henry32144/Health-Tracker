var app = app || {};

//Declare foodlist collection to hold foodlist area
app.FoodList = Backbone.Collection.extend({
	model: app.Food,
});