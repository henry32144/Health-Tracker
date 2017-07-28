var app = app || {};

app.FoodListView = Backbone.View.extend({

	el: '#foods',


	initialize: function(initialFoods) {
		_.bindAll(this, "addtoFoodList");
		_.bindAll(this, "saveFoodList");
		_.bindAll(this, "cleanFoodList");
		_.bindAll(this, "renderDateFood");
		this.collection = new app.FoodList(initialFoods);
		app.on('clickedResult' , this.addtoFoodList);
		app.on('saveFoodList' , this.saveFoodList);
		app.on('cleanFoodList' , this.cleanFoodList);
		app.on('renderDateFood' , this.renderDateFood);
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
		console.log(FoodView);
		this.$el.append(FoodView.render().el);
	},

	addtoFoodList: function(item) {
		console.log(item);
		this.collection.add(item);
		this.callPlusCal(item);
	},

	callPlusCal: function(item) {
		app.trigger("plusCal" , item);
	},

	saveFoodList: function(dateData) {
		this.tempFoodData = [];
		this.collection.each(function(item) {
			this.tempFoodData.push({"foodName": item.get("foodName"), "calories": item.get("calories")});
		}, this)
		console.log(this.tempFoodData);
		dateData.set("foods" , this.tempFoodData);
		console.log(dateData);
	},

	cleanFoodList: function() {
		this.collection.reset();
		this.$el.empty();
	},

	renderDateFood: function(dateData) {
		this.foodData = dateData.get("foods");
		console.log(this.foodData);
		if(this.foodData) {
			this.foodData.forEach(function(item) {
				this.collection.add(item);
			}, this);
		}
	},

});