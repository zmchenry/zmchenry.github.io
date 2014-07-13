(function($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

   $.fn.visible = function(partial) {

    var $t            = $(this),
    $w            = $(window),
    viewTop       = $w.scrollTop(),
    viewBottom    = viewTop + $w.height(),
    _top          = $t.offset().top,
    _bottom       = _top + $t.height(),
    compareTop    = partial === true ? _bottom : _top,
    compareBottom = partial === true ? _top : _bottom;

    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };

})(jQuery);

var win = $(window);

var allMods = $(".flex-item");

allMods.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("already-visible");
  }
});

win.scroll(function(event) {
  allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("come-in");
    }
  });

});

// Light-box begins here

var $overlay = $('<div id="overlay"></div>');
var $post = $('<iframe></iframe>');

// Add image to overlay
$overlay.append($post);
// Add an overlay to body
$("body").append($overlay);

// Add click listener to container of blog articles
$(".flex-container .post").click(function() {
  // Stop click from going to link
  event.preventDefault();
  var blogLocation = $(this).children("a").attr("href");
  // Add blogpost to overlay
  $post.attr("src", blogLocation);
  $overlay.show(600);
});

$overlay.click(function() {
  $overlay.hide();
});
