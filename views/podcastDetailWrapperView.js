PodcastDetailWrapperView = Backbone.View.extend({
	el: "#content",
	templateUrl: "templates/podcastDetailWrapper.html",
	template: null,
	initialize: function(podcastId, episodeId) {
		$("body").addClass("loading");
		$.ajax({
			context: this,
			async : false,
			type: 'GET',
			url : this.templateUrl,
			success : function(result) {
				this.template = result;
				this.render(podcastId, episodeId);
			},
			dataType: 'html'
		});
	},
	render: function(podcastId, episodeId) {
		$(this.el).html(_.template(this.template)({podcast : app.podcastCollection.get(podcastId), episodeId: episodeId}));
	}
});
