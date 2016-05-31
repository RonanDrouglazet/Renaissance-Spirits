$(document).ready(function() {

    /**************
     * MENU
     **************/

    $('header .selectbar').each(function(i, bar) {
        var select = $(this)
        $(bar).parent().find('.column').each(function(i, bt) {
            var span = $(bt).find('span')
            if (span.html() !== "" && $('.menu.mobile').css('display') === 'none') {
                span.hover(function() {
                    select
                        .show()
                        .css('left', span.offset().left)
                        .css('width', span.width())
                }, function() {})
            }
        })
    })

    var fmenu = $('header .floating')
    var menu = $('.menu.mobile')
    fmenu.click(function() {
        if (fmenu.find('i').hasClass('sidebar')) {
            menu.addClass('open')
            fmenu.find('i').removeClass('sidebar').addClass('sort ascending')
        } else {
            menu.removeClass('open')
            fmenu.find('i').removeClass('sort ascending').addClass('sidebar')
        }
    })

});
