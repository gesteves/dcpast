(function($) {
  $window = $(window);
  $document = $(document);

  methods = {
    init : function () {
      _dc.setUpTweetText();
      _dc.setUpLazyLoad();
      _dc.hideDefaultTags();
      _dc.initFacebook();
      _dc.initTwitter();
      _dc.initGooglePlus();
      _dc.initAnalytics();
    }
  };

  _dc = {
    setUpTweetText : function () {
      $('article').each(function () {
        var article = $(this),
            description = article.find('.description');
            caption = description.find('.caption p').first().text();
            caption = caption.length > 100 ? caption.substring(0, 80) + '…' : caption
            tweet = article.find('.twitter-share-button');
            tweet.attr('data-text', caption);
      });
    },
    setUpLazyLoad : function () {
      var photo = $('img.main-photo');
      photo.show();
      if ($window.width() > 300) {
        photo.lazyload({
          threshold : 200
        });
      }
    },
    hideDefaultTags : function () {
      $('a[rel=tag]').each(function() {
        var tag = $(this);
        var tags = /(washington dc|dc|district of columbia|^washington$|vintage|history)/gi;
        if (tag.text().match(tags)) {
          tag.remove();
        }
      });
    },
    initFacebook : function () {
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '322594371195777', // App ID from the App Dashboard
          status     : true, // check the login status upon init?
          cookie     : true, // set sessions cookies to allow your server to access the session?
          xfbml      : true  // parse XFBML tags on this page?
        });


        FB.Event.subscribe('edge.create', function(targetUrl) {
          window._gaq = window._gaq || [];
          window._gaq.push(['_trackSocial', 'Facebook', 'Like', targetUrl]);
        });
        FB.Event.subscribe('edge.remove', function(targetUrl) {
          window._gaq = window._gaq || [];
          window._gaq.push(['_trackSocial', 'Facebook', 'Like', targetUrl]);
        });

      };

      (function(d, debug){
         var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement('script'); js.id = id; js.async = true;
         js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
         ref.parentNode.insertBefore(js, ref);
       }(document, /*debug*/ false));
    },
    initTwitter : function () {
      window.twttr = (function (d,s,id) {
        var t, js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
        js.src="//platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
        return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });
      }(document, "script", "twitter-wjs"));

      twttr.ready(function (twttr) {
        twttr.events.bind('tweet', function(event) {
          var url;
          window._gaq = window._gaq || [];
          if (event.target && event.target.nodeName == 'IFRAME') {
                url = _dc.extractParamFromUri(event.target.src, 'url');
          }
          window._gaq.push(['_trackSocial', 'Twitter', 'Tweet', url]);
        });
        twttr.events.bind('follow', function(event) {
          window._gaq = window._gaq || [];
          window._gaq.push(['_trackSocial', 'Twitter', 'Follow', '@' + event.data.screen_name]);
        });
      });
    },
    initGooglePlus : function () {
      (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
      })();
    },
    extractParamFromUri : function (uri, paramName) {
      if (!uri) {
        return;
      }
      var regex = new RegExp('[\\?&#]' + paramName + '=([^&#]*)');
      var params = regex.exec(uri);
      if (params != null) {
        return unescape(params[1]);
      }
      return;
    },
    initAnalytics : function () {
      window._gauges = window._gauges || [];
      (function() {
        var t   = document.createElement('script');
        t.type  = 'text/javascript';
        t.async = true;
        t.id    = 'gauges-tracker';
        t.setAttribute('data-site-id', '513682d0613f5d0a1c000032');
        t.src = '//secure.gaug.es/track.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(t, s);
      })();

      window._gaq = window._gaq || [];
      window._gaq.push(['_setAccount', 'UA-250261-35']);
      window._gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
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