PodcastModel = Backbone.Model.extend({
    defaults: {
      id: "",
      image: "",
      name: "",
      artist: ""
   },
   parse: function (data) {
      var podcast = {
         id: data.id.attributes["im:id"],
         image: data["im:image"][2].label,
         name: data["im:name"].label,
         artist: data['im:artist'].label
      };
      return podcast;
   }
});
