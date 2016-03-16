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
        if (fmenu.find('i').hasClass('sidebar')) {
            menu.slideDown(500)
            fmenu.find('i').removeClass('sidebar').addClass('sort ascending')
        } else {
            menu.slideUp(500)
            fmenu.find('i').removeClass('sort ascending').addClass('sidebar')
        }
    })

    $(window).on('scroll', function() {
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

                var to = $(bt).attr('data-to')
                if (to) {
                    $(bt).click(function() {
                        $('html, body').animate({
                          scrollTop: $(to).offset().top
                        }, 1000);
                    })
                }
            }
        })
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

    setInterval(function() {
       $('.screen1 .button_down')
      .transition('bounce', '2s')
    }, 3000)
    

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
                    $(actus[i]).css('z-index', 10)
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
    var screen5select = screen5.find('.selectbar')
    var interval_slide, timer_slide

    screen5select
        .show()
        .css('left', $(screen5.find('.menu span')[index_slide]).offset().left)
        .css('width', $(screen5.find('.menu span')[index_slide]).width())

    var reset = function(slide, done) {
        slide.css('transition', 'none')
        slide.css('left', '100%')
        setTimeout(function() {slide.css('transition', 'left 1s ease'); if (done) {done()}}, 100)
    }

    var move = function(to) {
        var s;
        // move main
        $(slides[index_slide]).css('left', '-100%')
        
        // reset out left to out right
        if (slides[index_slide - 1]) {
            s = slides[index_slide - 1]
            reset($(s))
        } else {
            s = slides[slides.length - 1]
            reset($(s))
        }

        // move next to main
        if (to && slides[to]) {
            $(slides[to]).css('left', '0%')
            index_slide = to
        } else if (slides[index_slide + 1]) {
            $(slides[index_slide + 1]).css('left', '0%')
            index_slide++;
        } else {
            // else restart from begining
            index_slide = 0
            $(slides[0]).css('left', '0%')
        }

        screen5select
            .show()
            .css('left', $(screen5.find('.menu span')[index_slide]).offset().left)
            .css('width', $(screen5.find('.menu span')[index_slide]).width())
        
        timer_slide = setTimeout(over_slide, 2000);
    }

    var over_slide = function() {
        slides.find('.cover').css('left', '100%')
        $(slides[index_slide]).find('.cover').css('left', 0)
    }

    
    $(window).on('scroll', function() {
        if (win.scrollTop() >= screen5top && !interval_slide) {
            interval_slide = setInterval(move, 10000);
            timer_slide = setTimeout(over_slide, 2000);
        }
    })
    
    slides.each(function(i, slide) {
        $(slide).css('left', Math.min(i * 100, 100) + '%')
    })

    screen5.find('.column span').each(function(i, span) {
        $(span).parent().click(function() {
            clearInterval(interval_slide)
            clearTimeout(timer_slide)
            reset($(slides[i]), function() {
                move(i)
            })
        })
    })

    /************** 
     * SCREEN 6 - CONTACT
     **************/

     $('.screen6 .grid .column').each(function(i, c) {
        var img = $(c).find('img:not(.cover)')
        var cover = $(this).find('.cover')
        $(c).hover(function() {
            cover.css('top', img.position().top)
                 .css('left', img.position().left)
                 .fadeIn()
        }, function() {
            cover.fadeOut()
        })
     })
    
    $('html, body').css('overflow', 'hidden')
})
