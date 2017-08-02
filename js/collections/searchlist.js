var app = app || {};

//Declare searchlist collection to hold searchlist from api
app.SearchList = Backbone.Collection.extend({
	model: app.Search,
	
});