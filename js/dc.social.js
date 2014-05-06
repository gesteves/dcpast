/* global FB */
'use strict';

var DC = DC || {};

DC.Social = (function ($) {
	var opts = {
		articles : $('articles')
	};

	var setUpTweetText = function () {
    opts.articles.each(function () {
      var article = $(this),
          description = article.find('.description'),
          caption = description.find('.caption p').first().text(),
          tweet = article.find('.twitter-share-button');
      caption = caption.length > 100 ? caption.substring(0, 80) + '…' : caption;
      tweet.attr('data-text', caption);
    });
  };

  var initFacebook = function () {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '322594371195777', // App ID from the App Dashboard
        status     : true, // check the login status upon init?
        cookie     : true, // set sessions cookies to allow your server to access the session?
        xfbml      : true  // parse XFBML tags on this page?
      });
    };

    (function(d, debug){
       var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement('script'); js.id = id; js.async = true;
       js.src = '//connect.facebook.net/en_US/all' + (debug ? '/debug' : '') + '.js';
       ref.parentNode.insertBefore(js, ref);
     }(document, /*debug*/ false));
  };

  var initTwitter = function () {
    window.twttr = (function (d,s,id) {
      var t, js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; } js=d.createElement(s); js.id=id;
      js.src='//platform.twitter.com/widgets.js'; fjs.parentNode.insertBefore(js, fjs);
      return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f); } });
    }(document, 'script', 'twitter-wjs'));
  };

  var initGooglePlus = function () {
    (function() {
      var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
      po.src = 'https://apis.google.com/js/plusone.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    })();
  };

  var initPinterest = function () {
    opts.articles.each(function () {
      var article = $(this),
          description = article.find('.description'),
          caption = description.find('.caption p').first().text(),
          pinterest = article.find('.pinterest a'),
          pin_url = pinterest.attr('href') + encodeURIComponent(caption);
          pinterest.attr('href', pin_url);
    });
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = '//assets.pinterest.com/js/pinit.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  };

	var init = function () {
		setUpTweetText();
		initTwitter();
		initFacebook();
		initGooglePlus();
		initPinterest();
	};

	return {
		init : init
	};
})(jQuery);

DC.Social.init();