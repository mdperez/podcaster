	//EventBus = _.extend({}, Backbone.Events);
ApplicationRouter = Backbone.Router.extend({
	routes: {
		"": "podcastList",
		"podcast/:id(/episode/:episodeId)": "podcastDetail",
		"*actions": "podcastList"
	},
	initialize: function() {
		this.headerView = new HeaderView();
		this.podcastCollection = new PodcastCollection();
	},
	podcastList: function() {
		this.podcastListView = new PodcastListView();
	},
	podcastDetail: function(podcastId, episodeId) {
		this.podcastDetailWrapperView = new PodcastDetailWrapperView(podcastId, episodeId);
		this.podcastDetailView = new PodcastDetailView(podcastId, episodeId);
	}
});
app = new ApplicationRouter();
Backbone.history.start({pushState: true, root: "/podcaster/"});

//link handler para pushState
$(document).on("click", "a", function(e){
    e.preventDefault();
    var href = $(e.currentTarget).attr('href');
    app.navigate(href, true);
});
