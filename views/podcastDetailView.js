PodcastDetailView = Backbone.View.extend({
	el: "#detailContent",
	episodeListUrl: "templates/episodeList.html",
	episodeDetailUrl: "templates/episodeDetail.html",
	templateUrl: "",
	template: null,
	podcastId: null,
	episodeCollection: null,
	initialize: function(podcastId, episodeId) {
		this.podcastId = podcastId;
		this.episodeId = episodeId;
		this.episodeId ? this.templateUrl = this.episodeDetailUrl : this.templateUrl = this.episodeListUrl;
		$.ajax({
			context: this,
			async : false,
			type: 'GET',
			url : this.templateUrl,
			success : function(result) {
				this.template = result;
				this.getPodcastDetails();
			},
			dataType: 'html'
		});
	},
	getPodcastDetails: function() {
		$.ajax({
			context: this,
			type: 'GET',
			url : "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=" + this.podcastId,
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
				if (this.episodeId) {
					$(this.el).html(_.template(this.template)({episode: this.episodeCollection.get(this.episodeId)}));
				} else {
					$(this.el).html(_.template(this.template)({episodesList: this.episodeCollection, id: this.podcastId}));
				}
			},
			dataType: 'xml'
		});
	}
});
