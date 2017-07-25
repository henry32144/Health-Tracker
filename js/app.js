var app = app || {};
app.foodlist = _.extend(app, Backbone.Events);

$(function() {
	var foods = [
	{foodName: 'Ramen' , calories: '133'},
	{foodName: 'Cake' , calories: '513'},
	];
	var search = [
	{result: 'ラアメン'},
	{result: '蕎麦麺'},
	{result: '刺身'},
	{result: '寿司'},
	{result: '唐揚げ'},
	];
    new app.FoodListView(foods);
    new app.SearchListView(search);

});