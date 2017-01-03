	//EventBus = _.extend({}, Backbone.Events);
ApplicationRouter = Backbone.Router.extend({
	routes: {
		"": "podcastList",
		"podcast/:id": "podcastDetail",
		"podcast/:id/episode/:episodeId": "episodeDetail",
		"*actions": "podcastList"
	},
	initialize: function() {
		this.headerView = new HeaderView();
		this.podcastCollection = new PodcastCollection();
	},
	podcastList: function() {
		this.podcastListView = new PodcastListView();
	},
	podcastDetail: function(podcastId) {
		this.podcastListView = new PodcastDetailWrapperView(podcastId);
		//cargar episodios en detailContent
	},
	episodeDetail: function(podcastId, episodeId) {
		this.podcastListView = new PodcastDetailWrapperView(podcastId);
		//cargar detalle de episodio en detailContent
	}
});
app = new ApplicationRouter();
Backbone.history.start({pushState: true, root: "/podcaster/"});
