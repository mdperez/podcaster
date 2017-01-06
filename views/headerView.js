HeaderView = Backbone.View.extend({
	el: "#header",
	templateUrl: "templates/header.html",
	template: null,
	initialize: function() {
		$.ajax({
			context: this,
			async : false,
			type: 'GET',
			url : this.templateUrl,
			success : function(result) {
				this.template = result;
				this.render();
			},
			error: function(error) {
        		console.log(error);
       	},
			dataType: 'html'
		});
	},
	render: function() {
		$(this.el).html(_.template(this.template));
	}
});
