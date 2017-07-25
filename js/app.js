var app = app || {};
app.foodlist = _.extend(app, Backbone.Events);

$(function() {

	var search = [
	{result: 'ラアメン' , cal: '123(kcal)'},
	{result: '蕎麦麺' , cal: '123(kcal)'},
	{result: '刺身' , cal: '123(kcal)'},
	{result: '寿司' , cal: '123(kcal)'},
	{result: '唐揚げ' , cal: '123(kcal)'},
	];
    new app.FoodListView();
    new app.SearchListView(search);

});