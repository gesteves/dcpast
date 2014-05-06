'use strict';

var DC = DC || {};

DC.Tags = (function ($) {
	var opts = {
		tags : $('a[rel=tag]'),
		articles : $('article')
	};

	var hideDefaultTags = function () {
    opts.tags.each(function() {
      var tag = $(this);
      var tags = /(washington dc|dc|district of columbia|^washington$|vintage|history)/gi;
      if (tag.text().match(tags)) {
        tag.remove();
      }
    });
  };

	var init = function () {
		hideDefaultTags();
	};

	return {
		init : init
	};
})(jQuery);

DC.Tags.init();