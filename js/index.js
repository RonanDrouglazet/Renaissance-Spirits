$(document).ready(function() {
    var win = $(window);
    var menu = $('header .menu');
    var mheight =  menu.height();
    var fmenu = $('header .floating');
    var actus = $('.actu')

    /************** 
     * MENU
     **************/
    $('header .floating').click(function() {
        menu.slideDown(500)
        fmenu.fadeOut()
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

    /************** 
     * INTRO
     **************/
    $('.ui.dropdown').dropdown()
    
    $('i.remove').click(function() {
        $('.cookie_use,.cookie_use_mobile').fadeOut()
    })

    $('button.accept').click(function() {
        $('.intro').fadeOut()
        $('html, body').css('overflow', '')
    })

    /************** 
     * SCREEN 1 - SHOW MORE
     **************/
    $('.screen1 .button_rs_out').click(function() {
        $('.screen2').show()
        $('html, body').animate({
          scrollTop: $('.screen2').offset().top
        }, 1000);
    })

    /************** 
     * SCREEN 3 - ACTU
     **************/
    $('.actu .button').click(function() {
        var left = !$(this).hasClass('left')
        var index = actus.get().indexOf(this.parentNode)
        var dir

        $('.actu .button').fadeOut(1000)

        actus.each(function(i, actu) {
            $(actu).css('z-index', actus.length - i)
        })

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
                    $(actus[i]).css('z-index', 100)
               }
               dir = null
            }
        })
    })

    actus.each(function(i, actu) {
        $(actu).css('z-index', actus.length - i)
    })

    /************** 
     * SCREEN 5 - SLIDE
     **************/
    var index_slide = 0
    var screen5 = $('.screen5')
    var screen5top = screen5.offset().top
    var slides = screen5.find('.slides .slide')

    var move = function() {
        var s;
        // move main
        $(slides[index_slide]).css('left', '-100%')
        
        // reset out left to out right
        if (slides[index_slide - 1]) {
            s = slides[index_slide - 1]
            $(s).hide()
            $(s).css('left', '100%')
            setTimeout(function() { $(s).show() }, 1000)
        } else {
            s = slides[slides.length - 1]
            $(s).hide()
            $(s).css('left', '100%')
            setTimeout(function() { $(s).show() }, 1000)
        }

        // move next to main
        if (slides[index_slide + 1]) {
            $(slides[index_slide + 1]).css('left', '0%')
        } else {
            // else restart from begining
            index_slide = -1
            $(slides[0]).css('left', '0%')
        }

        index_slide++;
        setTimeout(over_slide, 2000);
    }

    var over_slide = function() {
        $(slides[index_slide]).find('.cover').css('left', 0)
        if (slides[index_slide - 1]) {
            $(slides[index_slide - 1]).find('.cover').css('left', '100%')
        } else {
            $(slides[slides.length - 1]).find('.cover').css('left', '100%')
        }
    }

    var interval_slide;
    $(window).on('scroll', function() {
        if (win.scrollTop() >= screen5top && !interval_slide) {
            interval_slide = setInterval(move, 10000);
            setTimeout(over_slide, 2000);
        }
    })
    
    slides.each(function(i, slide) {
        $(slide).css('left', Math.min(i * 100, 100) + '%')
    })


    
    $('html, body').css('overflow', 'hidden')
})
