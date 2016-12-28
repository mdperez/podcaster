require(['assets/js/text!header.html'], function (headerTpl) {
	HeaderView = Backbone.View.extend({
		el: "#header",
		template: headerTpl,
		render: function() {
			$(this.el).html(_.template(this.template));
		}
	});
});
