$(document).ready(function() {
    var win = $(window);
    var menu = $('header .menu');
    var mheight =  menu.height();
    var fmenu = $('header .floating');

    /************** 
     * MENU
     **************/
    $('header .floating').click(function() {
        if (fmenu.find('i').hasClass('sidebar')) {
            menu.slideDown(500)
            fmenu.find('i').removeClass('sidebar').addClass('sort ascending')
        } else {
            menu.slideUp(500)
            fmenu.find('i').removeClass('sort ascending').addClass('sidebar')
        }
    })

    win.on('scroll', function() {
        if (win.scrollTop() > mheight && fmenu.css('display') !== 'block') {
            menu.slideUp(500)
            fmenu.find('i').removeClass('sort ascending sidebar').addClass('sidebar')
            fmenu.fadeIn()
        } else if (win.scrollTop() < mheight && fmenu.css('display') === 'block') {
            menu.slideDown(500)
            fmenu.fadeOut()
        }
    })

    $('header .selectbar').each(function(i, bar) {
        var select = $(this)
        $(bar).parent().find('.column').each(function(i, bt) {
            var span = $(bt).find('span')
            if (span.html() !== "") {
                span.hover(function() {
                    select
                        .show()
                        .css('left', span.offset().left)
                        .css('width', span.width())
                }, function() {})
            }
        })
    })

});