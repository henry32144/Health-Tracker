var app = app || {};

//This view is hold single foodlist item
app.FoodView = Backbone.View.extend({
	tagName: 'div',
	className: 'foodContainer',
	template: _.template($('#foodTemplate').html()),

	render: function() {
	    this.$el.html(this.template(this.model.attributes));
	    return this;
	},

	events: {
	    'click .delete-button': 'deleteFood'
	},

//This delete function trigger minus event to recalcuate Calories  
	deleteFood: function() {
		app.trigger("minusCal" , this.model);
		this.model.collection.remove(this.model);
		this.remove();
	},
});