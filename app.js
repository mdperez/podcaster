require(['assets/js/text!header.html'], function (headerTpl) {

	var ApplicationRouter = Backbone.Router.extend({
		routes: {
			"": "podcastList",
			"*actions": "podcastList"
		},
		initialize: function() {
			this.headerView = new HeaderView();
			this.headerView.render();
		},
		podcastList: function() {
			this.podcastListView = new PodcastListView();
			this.podcastListView.render();
		}
	});

	HeaderView = Backbone.View.extend({
		el: "#header",
		template: headerTpl,
		initialize: function() {},
		render: function() {
			$(this.el).html(_.template(this.template));
		}
	});

	app = new ApplicationRouter();
	Backbone.history.start();
});
