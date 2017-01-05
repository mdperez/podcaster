PodcastDetailView = Backbone.View.extend({
	el: "#detailContent",
	templateUrl: "templates/podcastDetail.html",
	template: null,
	episodeCollection: null,
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
		$.ajax({
			context: this,
			type: 'GET',
			url : "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=" + id,
			success : function(detail) {
				var feed = _.first(detail.results).feedUrl;
				this.getFeed(feed);
			},
			dataType: 'json'
		});
	},
	getFeed: function(feedUrl) {
		$.ajax({
			context: this,
			type: 'GET',
			url : "https://cors-anywhere.herokuapp.com/" + feedUrl,
			success : function(result) {
				this.episodeCollection = new EpisodeCollection(result, {parse: true});
				$(this.el).html(_.template(this.template)({episodesList: this.episodeCollection}));
			},
			dataType: 'xml'
		});
	}
});
