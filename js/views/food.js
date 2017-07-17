var app = app || {};

app.FoodView = Backbone.View.extend({
	tagName: 'div'
	className: 'foodContainer',
	template: _.template( $( '#foodTemplate' ).html() ),

	render: function() {
	    this.$el.html( this.template( this.model.attributes ) );
	    return this;
	},

	events: {
	    'click .delete-button': 'deleteFood'
	},

	deleteFood: function() {
		this.model.destory();
		this.remove();
	},
});