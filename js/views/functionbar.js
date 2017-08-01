var app = app || {};

app.FunctionBarView = Backbone.View.extend({

	el: '#function-bar',

	initialize: function() {
		_.bindAll(this, "plusCal");
		_.bindAll(this, "minusCal");
		_.bindAll(this, "showChart");
		_.bindAll(this, "writeData");
		this.collection = new app.HistoryDatas();
		this.fetchData();
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
		firebase.database().ref("user/datas/" + this.dateData.get("date")).update({"totalCal": this.dateData.get("totalCal")})
		$("#save-button").popover('toggle')
		setTimeout(function () {
		    $('#save-button').popover('hide');
		}, 500);
	},

	showChart: function() {
		this.dateData = this.getCurrentDate();
		this.calDatas = [];
		if(this.dateData) {
			this.day = this.dateData.get("date").slice(-2);
			this.month = this.dateData.get("date").slice(5,7);
			this.year = this.dateData.get("date").slice(0,4);
			this.calDatas.push(this.dateData.get("totalCal").slice(0,-6));
			for(i = 6; i > 0 ; i --) {
				if(this.day > 1) {
					this.day--;
					this.calDatas.push(this.getDateData(this.year +"-"+ this.month +"-"+ this.day));
				}
				else if(this.day == 1) {
					if(this.month == 01) {
						this.day = 31;
						this.month = 12;
						this.year--;
						this.calDatas.push(this.getDateData(this.year +"-"+ this.month +"-"+ this.day));
						continue;
					}
					else if(this.month == 05 || this.month == 07 || this.month == 11) {
						this.day = 30;
						this.month --;
						if(this.month.toString().length = 1) {
							this.month = "0" + this.month;
						}
						this.calDatas.push(this.getDateData(this.year +"-"+ this.month +"-"+ this.day));
						continue;
					}
					else if(this.month == 03) {
						this.day = 28;
						this.month --;
						this.calDatas.push(this.getDateData(this.year +"-"+ this.month +"-"+ this.day));
						continue;
					}
					else {
						this.day = 31;
						this.month --;
						if(this.month.toString().length = 1) {
							this.month = "0" + this.month;
						}
						this.calDatas.push(this.getDateData(this.year +"-"+ this.month +"-"+ this.day));
						continue;
					}
				}
			}
		}

		$("#modChart").modal("show");
		app.trigger("shown.bs.modal" , this.calDatas);
	},

	getDateData: function(day) {
		this.dateData = this.collection.findWhere({date: day});
		if(this.dateData) {
			return this.dateData.get("totalCal").slice(0,-6);
		}
		else {
			return 0;
		}
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
			console.log(this.newData);
			this.newToDatabase(this.newData);
			this.collection.add(this.newData);
			console.log(this.collection);
			this.renderCal(this.newData.totalCal);
		}
	},

	fetchData: function() {
		var database = firebase.database().ref("user/datas");
		var self = this;

		var p = database.once('value').then(function(data) {
		   var datavalue = data.val();
		   self.writeData(datavalue);
		   return datavalue;
		}, function(error) {
		   alert(error);
		});

		console.log(p);

	},

	writeData: function(data) {
		console.log(data);
		if(data) {
			for(var item in data) {
				this.collection.add(data[item],{silent: true});
			}
			console.log(this.collection);
		}
		this.renderDate();
	},

	newToDatabase: function(data) {
		var database = firebase.database().ref("user/datas/" + data.date);

		database.set(data);
	},

});