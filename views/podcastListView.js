require(['assets/js/text!templates/podcastList.html'], function (podcastListTpl) {
	PodcastListView = Backbone.View.extend({
		el: "#content",
		template: podcastListTpl,
		render: function() {
			var self = this;
			$(this.el).html(_.template(this.template));

			app.podcastCollection.fetch().done(function(){
  				self.showPodcasts();
			});
		},
		showPodcasts: function() {
			var self = this;
			var podcastList = app.podcastCollection.models;
			_.each(podcastList, function(podcast, index) {
				if (index%4 === 0) $(self.el).find("#podcastList").append("<div class='row'>");
				$(self.el).find("#podcastList").append(
					"<div class='col-md-3 podcast'>" +
						"<div class='podcastContainer'>" +
							"<img class='thumb img-circle' src='" + podcast.attributes.image +"'>" +
							"<div class='name'>" + podcast.attributes.name + "</div>" +
							"<div class='artist text-muted'>Author:&nbsp;" + podcast.attributes.artist + "</div>" +
						"</div>" +
					"</div>"
				);
				if (index%4 === 3) $(self.el).find("#podcastList").append("</div>");
			});
		}
	});
});
