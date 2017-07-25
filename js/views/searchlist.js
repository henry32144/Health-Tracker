var app = app || {};

app.SearchListView = Backbone.View.extend({

	el: '.search-area',


	initialize: function(results) {
		_.bindAll(this, "fillUrl");
		this.collection = new app.SearchList(results);
		this.render();
	},

	render: function() {
		this.collection.each(function(item) {
			this.renderResult(item);
		}, this)
	},

	renderResult: function(item) {
		var SearchView = new app.SearchView({
			model: item
		});
		this.$el.children("#search-list").append(SearchView.render().el);
	},

	events:{
        "click .food-search-item": "addFood",
        "keyup #search-bar": "submitAjax",
    },

    fillUrl: function(foodName) {
    	this.url = 'https://api.nutritionix.com/v1_1/search/';
		this.urlSecPart = '?results=0%3A5&fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=5801a68a&appKey=c55ded6d8f4a00ff80570dcbb659b1a3';
		return this.url + foodName + this.urlSecPart;
    },

    submitAjax: function(e) {
    	e.preventDefault();
    	this.userType = $("#search-bar").val();
    	console.log(this.userType);
    	console.log(this.fillUrl(this.userType));
    	
    },

    addFood: function(e) {
        e.preventDefault();

        var foodData = {};

        var foodName = e.currentTarget.innerHTML;

        var cal = '123.32';

        foodData = {
        	foodName: foodName,
        	calories: cal
        };

        app.trigger("clickedResult" , foodData);
	},
});