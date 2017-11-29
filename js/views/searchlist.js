var app = app || {};

//This view handle whole search list
app.SearchListView = Backbone.View.extend({

	el: '.search-area',

//Bind this and event
	initialize: function(results) {
		_.bindAll(this, "fillUrl");
        _.bindAll(this, "submitAjax");
        _.bindAll(this, "parseData");
		this.collection = new app.SearchList(results);
		this.render();

        this.listenTo(this.collection, 'add', this.renderResult);
        this.listenTo(this.collection, 'reset', this.clearResult);
	},

//Render search list
	render: function() {
		this.collection.each(function(item) {
			this.renderResult(item);
		}, this)
	},

//Append to html
	renderResult: function(item) {
		var SearchView = new app.SearchView({
			model: item
		});
		this.$el.children("#search-list").append(SearchView.render().el);
	},

//Clear all result before search
    clearResult: function() {
        this.$el.children("#search-list").empty();
    },

	events:{
        "click .food-search-item": "addFood",
        "keyup #search-bar": "setTimeDelay",
        "focus #search-bar": "showResult",
        "blur #search-bar": "hideResult",
    },

//Fill ajax url
    fillUrl: function(foodName) {
        if(foodName) {
        	this.url = 'https://api.nutritionix.com/v1_1/search/';
    		this.urlSecPart = '?results=0%3A10&fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=5801a68a&appKey=c55ded6d8f4a00ff80570dcbb659b1a3';
    		return this.url + foodName + this.urlSecPart;
        }
        else return false;
    },

//Parse data and add to result list
    parseData: function(Data) {
        this.collection.reset();
        Data.hits.forEach(function(item) {
            resultData = {
                result: item.fields.item_name,
                cal: item.fields.nf_calories + "(kcal)"
            };
            this.collection.add(resultData);
        }, this);
    },

//To set a delaytime to prevent to sumbit many ajaxs
    setTimeDelay: function(e) {
        var $this = $(this);
        var that = this;
        clearTimeout($this.data('timeout'));
            
        $this.data('timeout', setTimeout(function(){
            that.submitAjax($('#search-bar').val());
        }, 350));
    },
    
//Do ajax
    submitAjax: function(userType) {
        //get user type in auto compelete
    	this.userType = userType;
        //fill url
    	this.ajaxUrl = this.fillUrl(this.userType);
        if(this.ajaxUrl != false) {
            var ajaxResult;
            var self = this;

        	$.getJSON(this.ajaxUrl , function(data){
        	    ajaxResult = data;
                self.parseData(ajaxResult);
        	}).fail(function(e){
                //prevent alert too many times
                if(ajaxResult != false) {
                    ajaxResult = false;
        	       alert('failed to get food data');
                }
        	});
        }
    },

//add food to foodlist when clicked search result
    addFood: function(e) {
        e.preventDefault();

        //get clicked result data
        this.foodid = $(e.currentTarget).data("id");
        this.foodName = e.currentTarget.innerHTML;
        this.cal = this.collection.findWhere({result: this.foodid}).get("cal");

        this.foodData = {
        	foodName: this.foodName,
        	calories: this.cal
        };

        //trigger event and pass food data
        app.trigger("clickedResult" , this.foodData);

        //hide search list
        this.$el.children("#search-list").addClass("inVisible");
	},

//This function is to show search list
    showResult: function(e) {
        this.$el.children("#search-list").removeClass("inVisible");
    },

//This function is to hide search list
    hideResult: function(e) {
        var self = this;
        setTimeout(function() {
            self.$el.children("#search-list").addClass("inVisible");
        }, 200);
    },
});