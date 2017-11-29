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


//set bootstrap popover function
    $("#save-button").popover();

//new view to start app
    new app.FoodListView();
    new app.SearchListView(search);
    new app.FunctionBarView();
    new app.ChartModalView();

});