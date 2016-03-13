$(document).ready(function() {
    var win = $(window);
    var menu = $('header .menu');
    var mheight =  menu.height();
    var fmenu = $('header .floating');
    var actus = $('.actu')

    $('.ui.dropdown').dropdown()
    
    $('i.remove').click(function() {
        $('.cookie_use,.cookie_use_mobile').fadeOut()
    })

    $('button.accept').click(function() {
        $('.intro').fadeOut()
        $('html, body').css('overflow', '')
    })

    $('.screen1 .button_rs_out').click(function() {
        $('.screen2').show()
        $('html, body').animate({
          scrollTop: $('.screen2').offset().top
        }, 1000);
    })

    $('header .floating').click(function() {
        menu.slideDown(500)
        fmenu.fadeOut()
    })

    $('.actu .button').click(function() {
        var left = !$(this).hasClass('left')
        var index = actus.get().indexOf(this.parentNode)
        var dir

        $('.actu .button').fadeOut(1000)

        actus.each(function(i, actu) {

            if (i === index - 1) {
                dir = left ? 'outleft' : 'center'
            } else if (i === index - 2) {
                dir = left ? 'outleft' : 'left'
            } else if (i === index) {
                dir = left ? 'left' : 'right'
            } else if (i === index + 1) {
                dir = left ? 'center' : 'outright'
            } else if (i === index + 2) {
                dir = left ? 'right' : 'outright'
            } 

            if (dir) {
               actus[i].className = 'actu ' + dir 
               if (dir === 'center') {
                    $(actus[i]).find('.button').fadeIn(1000)
               }
               dir = null
            }
        })

    })

    $(window).on('scroll', function() {
        if (win.scrollTop() > mheight && fmenu.css('display') !== 'block') {
            menu.slideUp(500)
            fmenu.fadeIn()
        } else if (win.scrollTop() < mheight && fmenu.css('display') === 'block') {
            menu.slideDown(500)
            fmenu.fadeOut()
        }
    })
    
    $('html, body').css('overflow', 'hidden')
})
