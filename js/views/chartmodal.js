var app = app || {};

app.ChartModalView = Backbone.View.extend({

	el: '#modChart',


	initialize: function() {
		_.bindAll(this, "render");
		app.on("shown.bs.modal" , this.render);
		app.on("hidden.bs.modal" , this.hidden);
	},

	render: function(history) {
		this.historyData = history.reverse();
		var modal = this.$el;
		var canvas = modal.find('.modal-body canvas');
		modal.find('.modal-title').html("Calories in 7 days");
		var ctx =  $('#canvas', this.$el)[0].getContext("2d");
		var data = {	    
			    labels : ["7","6","5","4","3","2","Choosed"],
			    datasets: [{
			    	label: "Yours",
			        backgroundColor: "rgba(56,191,74,0.2)",
			        borderColor: "rgba(56,191,74,1)",
			        pointBackgroundColor: "rgba(56,191,74,1)",
			        pointBorderColor: "rgba(56,191,74,1)",
			        pointHoverBackgroundColor: "#fff",
			        pointHoverBorderColor: "rgba(151,187,205,1)",
			        data : this.historyData
			    },{
			    	label: "Male suggest",
			        backgroundColor: "rgba(151,187,205,0.2)",
			        borderColor: "rgba(151,187,205,1)",
			        pointBackgroundColor: "rgba(151,187,205,1)",
			        pointBorderColor: "rgba(151,187,205,1)",
			        pointHoverBackgroundColor: "#fff",
			        pointHoverBorderColor: "rgba(151,187,205,1)",
			        data : [1800,1800,1800,1800,1800,1800,1800]
			    },{
			    	label: "Female suggest",
			        backgroundColor: "rgba(220,220,220,0.2)",
			        borderColor: "#F7464A",
			        pointBackgroundColor: "#FF5A5E",
			        pointBorderColor: "#FF5A5E",
			        pointHoverBackgroundColor: "#fff",
			        pointHoverBorderColor: "red",
			        data : [1350,1350,1350,1350,1350,1350,1350]
			    }]
		}
		var chart = new Chart(ctx, {
			type: 'line',
			data: data,
			responsive: true,

		});
	},

	hidden: function() {
		var modal = $(this);
		var canvas = modal.find('.modal-body canvas');
		canvas.attr('width','568px').attr('height','300px');
		// destroy modal
		$(this).data('bs.modal', null);
	},

});