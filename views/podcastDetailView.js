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
				if ((localStorage.getItem('episodeCollection_' + this.podcastId) !== null) && this.getDays()){
					this.episodeCollection = new EpisodeCollection()
		         this.episodeCollection.reset(JSON.parse(localStorage.getItem('episodeCollection_' + this.podcastId)).data);
					this.render();
		      } else {
					this.getPodcastDetails();
				}
			},
			error: function(error) {
        		console.log(error);
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
			error: function(error) {
        		console.log(error);
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
				var localCollection = {
               data: this.episodeCollection.toJSON(),
               date: new Date()
            }
            localStorage.setItem('episodeCollection_' + this.podcastId, JSON.stringify(localCollection));
				this.render();
			},
			error: function(error) {
				$("body").removeClass("loading");
        		console.log(error);
       	},
			dataType: 'xml'
		});
	},
	getDays: function() {
      var now = new Date();
      var date = Date.parse(JSON.parse(localStorage.getItem('episodeCollection_' + this.podcastId)).date);
      var days = moment.duration(now - date).asDays();
      return (days < 1);
   },
	render: function() {
		if (this.episodeId) {
			$(this.el).html(_.template(this.template)({episode: this.episodeCollection.get(this.episodeId)}));
			$("body").removeClass("loading");
		} else {
			$(this.el).html(_.template(this.template)({episodesList: this.episodeCollection, id: this.podcastId}));
			$("body").removeClass("loading");
		}
	}
});
