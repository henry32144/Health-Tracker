var app = app || {};

//this view hold entire foodlist
app.FoodListView = Backbone.View.extend({

	el: '#foods',

//bind this to functions and listen to events
	initialize: function() {
		_.bindAll(this, "addtoFoodList");
		_.bindAll(this, "saveFoodList");
		_.bindAll(this, "cleanFoodList");
		_.bindAll(this, "renderDateFood");
		this.collection = new app.FoodList();
		app.on('clickedResult' , this.addtoFoodList);
		app.on('saveFoodList' , this.saveFoodList);
		app.on('cleanFoodList' , this.cleanFoodList);
		app.on('renderDateFood' , this.renderDateFood);
		this.render();

		this.listenTo(this.collection, 'add', this.renderFood);
		this.listenTo(this.collection, 'change', this.renderFood);
	},

//render each models in collection
	render: function() {
		this.collection.each(function(item) {
			this.renderFood(item);
		}, this)
	},

//new view and append to html
	renderFood: function(item) {
		var FoodView = new app.FoodView({
			model: item
		});
		this.$el.append(FoodView.render().el);
	},

//this function called when search result is clicked
	addtoFoodList: function(item) {
		this.collection.add(item);
		this.callPlusCal(item);
	},

//this function will trigger plusCal event to functionbar.js to deal calculate
	callPlusCal: function(item) {
		app.trigger("plusCal" , item);
	},

//this function called by save button in functionbar,
//and save to both foodlist collection and Firebase
	saveFoodList: function(dateData) {
		//initialize temp array
		this.tempFoodData = [];
		//declare path in database 
		var database = firebase.database().ref("user/datas/" + dateData.get("date") + "/foods/");
		//reset foods attribute
		dateData.unset("foods");
		this.collection.each(function(item) {
			this.tempFoodData.push({"foodName": item.get("foodName"), "calories": item.get("calories")});
		}, this)
		dateData.set("foods" , this.tempFoodData);
		database.set(this.tempFoodData);
	},

//reset foodlist to rerender
	cleanFoodList: function() {
		this.collection.reset();
		this.$el.empty();
	},

//render food by the choosed date
	renderDateFood: function(dateData) {
		this.foodData = dateData.get("foods");
		if(this.foodData) {
			this.foodData.forEach(function(item) {
				this.collection.add(item);
			}, this);
		}
	},
});