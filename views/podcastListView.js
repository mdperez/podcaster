PodcastListView = Backbone.View.extend({
	el: "#content",
	templateUrl: "templates/podcastList.html",
	template: null,
	initialize: function() {
		$.ajax({
			context: this,
			async : false,
			type: 'GET',
			url : this.templateUrl,
			success : function(result) {
				this.template = result;
				this.render();
			},
			dataType: 'html'
		});
	},
	render: function() {
		var numPodcasts = app.podcastCollection.models.length;
		$(this.el).html(_.template(this.template));
		$(this.el).find("#inputPodcastFilter").off("keyup").on("keyup", _.bind(this.filterPodcast,this));
		this.showPodcasts(app.podcastCollection.models);
	},
	showPodcasts: function(podcastList) {
		var self = this;
		$(this.el).find("#numPodcasts").html(podcastList.length);
		$(this.el).find("#podcastList").empty();
		_.each(podcastList, function(podcast, index) {
			if (index%4 === 0) $(self.el).find("#podcastList").append("<div class='row'>");
			$(self.el).find("#podcastList").append(
				"<div class='col-md-3 podcast' data-id='" + podcast.attributes.id +"'>" +
					"<div class='podcastContainer'>" +
						"<img class='thumb img-circle' src='" + podcast.attributes.image +"'>" +
						"<div class='name'>" + podcast.attributes.name + "</div>" +
						"<div class='artist text-muted'>Author:&nbsp;" + podcast.attributes.artist + "</div>" +
					"</div>" +
				"</div>"
			);
			if (index%4 === 3) $(self.el).find("#podcastList").append("</div>");
		});
		$(self.el).find(".podcast").off("click").on("click", _.bind(self.goPodcastDetail,self));
	},
	filterPodcast: function() {
		var filter = $(this.el).find("#inputPodcastFilter").val();
		var results = app.podcastCollection.filter(function(item) {
			return ((item.attributes.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) || (item.attributes.artist.toLowerCase().indexOf(filter.toLowerCase()) !== -1));
		});
		this.showPodcasts(results);
	},
	goPodcastDetail: function(e) {
		var id = $(e.currentTarget).data("id");
		app.navigate("podcast/" + id, true);
	}
});
