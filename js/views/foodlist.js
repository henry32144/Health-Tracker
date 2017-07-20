var app = app || {};

app.FoodListView = Backbone.View.extend({

	el: '#foods',

	initialize: function(initialFoods) {
		this.collection = new app.FoodList(initialFoods);
		this.render();
	},

	render: function() {
		this.collection.each(function(item) {
			this.renderFood(item);
		}, this)
	},

	renderFood: function(item) {
		var FoodView = new app.FoodView({
			model: item
		});
		this.$el.append(FoodView.render().el);
	},

    addFoodtoList: function(foodData) {
        this.collection.add(foodData);
	},
});