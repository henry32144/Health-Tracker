var app = app || {};

//This model is used to save search result from api
app.Search = Backbone.Model.extend({
	defaults: {
		result: "name",
		cal: "(kcal)"
	},
});