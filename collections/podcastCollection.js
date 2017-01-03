PodcastCollection = Backbone.Collection.extend({
   url: 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
   model: PodcastModel,
   initialize: function(){
      //comprobar si existe en localStorage, si no existe hacemos fetch y guardamos
      this.fetch({async: false}).done(function(data){
         //guardamos en localStorage
      });
   },
   parse: function (data) {
      return data.feed.entry;
   }
});
