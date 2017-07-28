var app = app || {};

app.FunctionBarView = Backbone.View.extend({

	el: '#function-bar',


	initialize: function() {
		_.bindAll(this, "plusCal");
		_.bindAll(this, "minusCal");
		this.collection = new app.HistoryDatas();
		this.renderDate();
		app.on('plusCal' , this.plusCal);
		app.on('minusCal' , this.minusCal);
		this.listenTo(this.collection, 'add', this.renderDate);
	},

	events:{
		"click #save-button": "saveData",
		"click #chart-button": "showChart",
		"change #datepicker" : "renderDate", 
	},

	getCurrentDate: function() {
		this.currentDate = $( "#datepicker" ).val();
		return this.collection.findWhere({date: this.currentDate});
	},

	plusCal: function(item) {
		this.currentCal = this.getCurrentDate();
		this.newCal = parseInt(this.currentCal.get("totalCal").slice(0,-6)) + parseInt(item.calories.slice(0,-6)) + "(kcal)";
		this.currentCal.set("totalCal", this.newCal);
		this.renderCal(this.newCal);
	},

	minusCal: function(item) {
		this.currentCal = this.getCurrentDate();
		this.newCal = parseInt(this.currentCal.get("totalCal").slice(0,-6)) - parseInt(item.get("calories").slice(0,-6)) + "(kcal)";
		this.currentCal.set("totalCal", this.newCal);
		this.renderCal(this.newCal);
	},

	renderCal: function(cal) {
		$("#total-cal").html("Total Cal:" + cal);
	},

	saveData: function() {
		this.dateData = this.getCurrentDate();
		app.trigger("saveFoodList" , this.dateData);

		$("#save-button").popover('toggle')
		setTimeout(function () {
		    $('#save-button').popover('hide');
		}, 500);
	},

	showChart: function() {
		console.log(456);
	},

	renderDate: function() {
		this.dateData = this.getCurrentDate();
		app.trigger("cleanFoodList" , this.dateData);

		if(this.dateData) {
			console.log('exist');
			app.trigger("renderDateFood" , this.dateData);
			this.renderCal(this.dateData.get("totalCal"));
		}
		else {
			console.log("new");
			this.newData = {
				date: this.currentDate,
				totalCal: "0(kcal)",
			};
			this.collection.add(this.newData);
			this.renderCal(this.newData.totalCal);
		}
	},



});