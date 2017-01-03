PodcastDetailWrapperView = Backbone.View.extend({
	el: "#content",
	templateUrl: "templates/podcastDetailWrapper.html",
	template: null,
	initialize: function(id) {
		$.ajax({
			context: this,
			async : false,
			type: 'GET',
			url : this.templateUrl,
			success : function(result) {
				this.template = result;
				this.render(id);
			},
			dataType: 'html'
		});
	},
	render: function(id) {
		$(this.el).html(_.template(this.template)({podcast : app.podcastCollection.get(id)}));
		/*$.ajax({
			context: this,
			type: 'GET',
			url : "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=" + id,
			success : function(result) {
				console.log(result);
			},
			dataType: 'json'
		});*/
	}
});
