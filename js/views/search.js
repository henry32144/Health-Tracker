var app = app || {};

//This view hold single search result
app.SearchView = Backbone.View.extend({
	tagName: 'div',
	className: 'searchContainer',
	template: _.template($('#searchTemplate').html()),


	render: function() {
	    this.$el.html(this.template(this.model.attributes));
	    this.$el.children().attr("data-id" , this.model.get("result"));
	    return this;
	},
	
});