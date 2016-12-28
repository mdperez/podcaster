require(['assets/js/text!header.html'], function (headerTpl) {
	//EventBus = _.extend({}, Backbone.Events);
	ApplicationRouter = Backbone.Router.extend({
		routes: {
			"": "podcastList",
			"*actions": "podcastList"
		},
		initialize: function() {
			this.headerView = new HeaderView();
			this.headerView.render();
			this.podcastCollection = new PodcastCollection();
		},
		podcastList: function() {
			this.podcastListView = new PodcastListView();
			this.podcastListView.render();
		}
	});
	app = new ApplicationRouter();
	Backbone.history.start();
});
