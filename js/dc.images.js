'use strict';

var DC = DC || {};

DC.Images = (function ($) {
	var opts = {
		photos : $('img.main-photo')
	};

	var $window = $(window);

	var setUpLazyLoad = function () {
    opts.photos.show();
    if ($window.width() > 300) {
      opts.photos.lazyload({
        threshold : 200
      });
    }
  };

	var init = function () {
		setUpLazyLoad();
	};

	return {
		init : init
	};
})(jQuery);

DC.Images.init();