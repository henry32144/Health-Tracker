var app = app || {};

app.SearchListView = Backbone.View.extend({

	el: '#search-list',


	initialize: function(results) {
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
		this.$el.append(SearchView.render().el);
	},

	events:{
        'click .food-search-item':'addFood'
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