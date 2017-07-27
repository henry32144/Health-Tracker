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
		"click #calender-button": "showDatePicker",
		"click #chart-button": "showChart",
		"change #datepicker" : "renderDate", 
	},

	getCurrentCal: function() {
		this.currentDate = $( "#datepicker" ).val();
		return this.collection.findWhere({date: this.currentDate});
	},

	plusCal: function(item) {
		this.currentCal = this.getCurrentCal();
		this.newCal = parseInt(this.currentCal.get("totalCal").slice(0,-6)) + parseInt(item.get("calories").slice(0,-6)) + "(kcal)";
		this.currentCal.set("totalCal", this.newCal);
		this.renderCal(this.newCal);
	},

	minusCal: function(item) {
		this.currentCal = this.getCurrentCal();
		this.newCal = parseInt(this.currentCal.get("totalCal").slice(0,-6)) - parseInt(item.get("calories").slice(0,-6)) + "(kcal)";
		this.currentCal.set("totalCal", this.newCal);
		this.renderCal(this.newCal);
	},

	renderCal: function(cal) {
		$("#total-cal").html("Total Cal:" + cal);
	},

	showDatePicker: function() {
		$( "#datepicker" ).datepicker('show');
	},

	showChart: function() {
		console.log(456);
	},

	renderDate: function() {
		this.currentDate = $( "#datepicker" ).val();
		this.dateData = this.collection.findWhere({date: this.currentDate});
		if(this.dateData) {
			console.log('exist');
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

	changeDate: function() {
		var choosedDate = $( "#datepicker" ).val();
		console.log(choosedDate);
	},

});