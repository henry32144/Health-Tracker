var app = app || {};

app.SearchListView = Backbone.View.extend({

	el: '.search-area',


	initialize: function(results) {
		_.bindAll(this, "fillUrl");
        _.bindAll(this, "submitAjax");
        _.bindAll(this, "parseData");
		this.collection = new app.SearchList(results);
		this.render();

        this.listenTo(this.collection, 'add', this.renderResult);
        this.listenTo(this.collection, 'reset', this.clearResult);
	},

	render: function() {
		this.collection.each(function(item) {
			this.renderResult(item);
		}, this)
	},

	renderResult: function(item) {
		var SearchView = new app.SearchView({
			model: item
		});
		this.$el.children("#search-list").append(SearchView.render().el);
	},

    clearResult: function() {
        this.$el.children("#search-list").empty();
    },

	events:{
        "click .food-search-item": "addFood",
        "keyup #search-bar": "submitAjax",
        "focus #search-bar": "showResult",
        "blur #search-bar": "hideResult",
    },

    fillUrl: function(foodName) {
    	this.url = 'https://api.nutritionix.com/v1_1/search/';
		this.urlSecPart = '?results=0%3A10&fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=5801a68a&appKey=c55ded6d8f4a00ff80570dcbb659b1a3';
		return this.url + foodName + this.urlSecPart;
    },

    parseData: function(Data) {
        console.log(Data);
        this.collection.reset();
        Data.hits.forEach(function(item) {
            resultData = {
                result: item.fields.item_name,
                cal: item.fields.nf_calories + "(kcal)"
            };
            console.log(resultData);
            this.collection.add(resultData);
        }, this)
    },

    submitAjax: function(e) {
    	e.preventDefault();
    	this.userType = $("#search-bar").val();
    	console.log(this.userType);
    	console.log(this.fillUrl(this.userType));
    	this.ajaxUrl = this.fillUrl(this.userType);
        var ajaxResult;
        var self = this;

    	$.getJSON(this.ajaxUrl , function(data){
    	    ajaxResult = data;
            console.log(ajaxResult);
            self.parseData(ajaxResult);
    	}).fail(function(e){
            //prevent alert too many times
            if(ajaxResult != false) {
                ajaxResult = false;
    	       alert('failed to get food data');
            }
    	});


    },

    addFood: function(e) {
        e.preventDefault();

        
        this.foodid = $(e.currentTarget).data("id");
        this.foodName = e.currentTarget.innerHTML;
        this.cal = this.collection.findWhere({result: this.foodid}).get("cal");

        this.foodData = {
        	foodName: this.foodName,
        	calories: this.cal
        };

        app.trigger("clickedResult" , this.foodData);

        this.$el.children("#search-list").addClass("inVisible");
	},

    showResult: function(e) {
        this.$el.children("#search-list").removeClass("inVisible");
    },

    hideResult: function(e) {
        var self = this;
        setTimeout(function() {
            self.$el.children("#search-list").addClass("inVisible");
        }, 200);
    },
});