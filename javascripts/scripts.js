(function($) {
  $window = $(window);
  $document = $(document);

  methods = {
    init : function () {
      _dc.setUpSocialSharing();
      _dc.setUpLazyLoad();
      _dc.hideDefaultTags();
    }
  };

  _dc = {
    setUpSocialSharing : function () {
      $('article').each(function () {
        var article = $(this),
            description = article.find('.description');
            caption = description.find('.caption p').first().text(),
            short_caption = caption.length > 100 ? encodeURIComponent(caption.substring(0, 80) + '…') : encodeURIComponent(caption),
            pinterest = article.find('a[data-network=Pinterest]'),
            tweet = article.find('a[data-network=Twitter]'),
            tweet_href = tweet.attr('href'),
            pin_href = pinterest.attr('href');
        tweet.attr('href', tweet_href + short_caption);
        pinterest.attr('href', pin_href + encodeURIComponent(caption));
      });
      $('.share a').click(function (e) {
        var link, type, url;
        link = $(this);
        type = link.data('network');
        action = link.data('action');
        target = link.data('target');
        url = link.attr('href');
        e.preventDefault();
        _gaq.push(['_trackSocial', type, action, target]);
        _dc.openPopup(url, 'Share this photo', 575, 370);
      });
    },
    setUpLazyLoad : function () {
      $('img.main-photo').show().lazyload({
        threshold : 200
      });
    },
    hideDefaultTags : function () {
      $('a[rel=tag]').each(function() {
        var tag = $(this);
        var tags = /(washington dc|dc|district of columbia|^washington$)/gi;
        if (tag.text().match(tags)) {
          tag.remove();
        }
      });
    },
    openPopup : function (url, title, width, height) {
      var top, left, opts;
      top = (window.screen.availHeight - height)/2;
      left = (window.screen.availWidth - width)/2;
      opts = 'height=' + height + ',width=' + width + ',top=' + top + ',left=' + left;
      sharewindow = window.open(url, title, opts);
      if (window.focus) {
        sharewindow.focus();
      }
    }
  };

  $.fn.dc = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist in DC plugin');
    }
  };

  $document.ready(function() {
    $document.dc();
  });

})(jQuery);