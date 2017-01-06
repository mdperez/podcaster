PodcastCollection = Backbone.Collection.extend({
   url: 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
   model: PodcastModel,
   initialize: function(){
      var self = this;
      if ((localStorage.getItem('podcastCollection') !== null) && this.getDays()){
         this.reset(JSON.parse(localStorage.getItem('podcastCollection')).data);
      } else {
         this.fetch({async: false}).done(function(data){
            var localCollection = {
               data: self.toJSON(),
               date: new Date()
            }
            localStorage.setItem('podcastCollection', JSON.stringify(localCollection));
         });
      }
   },
   getDays: function() {
      var now = new Date();
      var date = Date.parse(JSON.parse(localStorage.getItem('podcastCollection')).date);
      var days = moment.duration(now - date).asDays();
      return (days < 1);
   },
   parse: function(data) {
      return data.feed.entry;
   }
});
