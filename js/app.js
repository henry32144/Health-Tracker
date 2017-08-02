//initalize app
var app = app || {};

//bind event
app.foodlist = _.extend(app, Backbone.Events);

//start while loading accomplish
$(function() {

//Set Jquery datapicker format
	$( "#datepicker" ).datepicker({
	    dateFormat: "yy-mm-dd",
	});

	$("#datepicker").datepicker("setDate", new Date());

//Prepare standard search result for test
	var search = [
	{result: 'ラアメン' , cal: '123(kcal)'},
	{result: '蕎麦麺' , cal: '123(kcal)'},
	{result: '刺身' , cal: '123(kcal)'},
	{result: '寿司' , cal: '123(kcal)'},
	{result: '唐揚げ' , cal: '123(kcal)'},
	];

//set bootstrap popover function
    $("#save-button").popover();

//new view to start app
    new app.FoodListView();
    new app.SearchListView(search);
    new app.FunctionBarView();
    new app.ChartModalView();

});