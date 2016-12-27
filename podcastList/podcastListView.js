require(['assets/js/text!podcastList/podcastList.html'], function (podcastListTpl) {
	PodcastListView = Backbone.View.extend({
		el: "#content",
		template: podcastListTpl,
		render: function() {
			var self = this;
			$(this.el).html(_.template(this.template));
			$.ajax({
            method: "GET",
            url: "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
            dataType: "json"
         }).done(function(data) {
				self.showPodcasts(data.feed.entry);
         });
		},
		showPodcasts: function(podcastList) {
			var self = this;
			_.each(podcastList, function(podcast, index) {
				console.log(podcast);
				if (index%4 === 0) $(self.el).find("#podcastList").append("<div class='row'>");
				$(self.el).find("#podcastList").append(
					"<div class='col-md-3 podcast'>" +
						"<div class='podcastContainer'>" +
							"<img class='thumb img-circle' src='" + podcast["im:image"][2].label +"'>" +
							//podcast.id.attributes["im:id"]
							"<div class='name'>" + podcast["im:name"].label + "</div>" +
							"<div class='artist text-muted'>Author:&nbsp;" + podcast['im:artist'].label + "</div>" +
						"</div>" +
					"</div>"
				);
				if (index%4 === 3) $(self.el).find("#podcastList").append("</div>");
			});
		}
	});
});
