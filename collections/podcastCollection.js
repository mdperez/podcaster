PodcastCollection = Backbone.Collection.extend({
   url: 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
   model: PodcastModel,
   initialize: function(){
   },
   parse: function (data) {
      return data.feed.entry;
   }
});
