var app = app || {};

app.SearchView = Backbone.View.extend({
	tagName: 'div',
	className: 'searchContainer',
	template: _.template($('#searchTemplate').html()),


	render: function() {
	    this.$el.html(this.template(this.model.attributes));
	    return this;
	},

	events: {
	    'click': 'addFood'
	},

	addFood: function() {

	}

});