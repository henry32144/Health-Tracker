var app = app || {};

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
    var apiUrl = 'https://api.nutritionix.com/v1_1/search/';
    var secondPart = '?results=0%3A1&fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=5801a68a&appKey=c55ded6d8f4a00ff80570dcbb659b1a3';
});