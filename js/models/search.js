var app = app || {};

app.Search = Backbone.Model.extend({
	defaults: {
		result: "name",
		cal: "(kcal)"
	},
		
	doSearch: function(str) {

	},

	_searchCompelete: function(results) {
		this.set('result', results);
	}
});