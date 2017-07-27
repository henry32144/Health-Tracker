var app = app || {};

app.FoodListView = Backbone.View.extend({

	el: '#foods',


	initialize: function(initialFoods) {
		_.bindAll(this, "addtoFoodList");
		this.collection = new app.FoodList(initialFoods);
		app.on('clickedResult' , this.addtoFoodList);
		this.render();

		this.listenTo(this.collection, 'add', this.renderFood)
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
		app.trigger("plusCal" , item);
		this.$el.append(FoodView.render().el);
	},

	addtoFoodList: function(item) {
		console.log(item);
		this.collection.add(item);
	},

});