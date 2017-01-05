EpisodeCollection = Backbone.Collection.extend({
   model: EpisodeModel,
   parse: function (data) {
      var $xml = $(data);
      return $xml.find('item').map(function (index, val) {
         var date = $(this).find('pubDate').text();
         var description = $(this).find('description').text();
         var duration = $(this).find("itunes\\:duration").text();
         if (duration.indexOf(":") === -1) {
            duration = moment.utc(duration*1000).format("HH:mm:ss");
         }
         var id = index+1;
         var title = $(this).find('title').text();
         var url = $(this).find('enclosure').attr("url");
         return {
            date: moment(new Date(date)).format("DD/MM/YYYY"),
            description: description,
            duration: duration,
            id: id,
            title: title,
            url: url
         };
      }).get();
   }
});
