$(document).ready(function() {
    var win = $(window);
    var menu = $('header .menu');
    var mheight =  menu.height();
    var fmenu = $('header .floating');
    var actus = $('.actu')

    /************** 
     * MENU
     **************/
    /*$('header .floating').click(function() {
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
    })*/

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

    var block;
    $('header .menu .column span').hover(function() {
        $('header .marques').hide()
    }, null)
    $('header .menu .column:nth-child(5) span').hover(function() {
        $('header .marques').show()
    }, null)

    $('header .marques').hover(function() {
        block = true
        $(this).show()
    }, function() {
        $(this).hide()
    })

    $('header .marques .button').click(function() {
        $(this).parents('.column').find('.button.active').removeClass('active')

        var id = $(this).data('id')
        var next = $(this).addClass('active')
        .parents('.column').next()

        next.find('.active')
        .removeClass('active')
        next.find('.row:nth-child(' + id + ')')
        .addClass('active')

        next.next().find('.active')
        .removeClass('active')
    })

    $('header .marques').mouseleave(function() {
        $('header .marques').hide()
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
    })

    /************** 
     * SCREEN 1 - SHOW MORE
     **************/
    $('.screen1 .button_rs_out').click(function() {
        $('.screen2').show()
        $('html, body').animate({
          scrollTop: $('.screen2').offset().top
        }, 1000);
        $('.screen1 .button_down').addClass('rotate').click(function() {
            $('.screen2').slideUp()
            $('html, body').animate({
              scrollTop: $('.screen1').offset().top
            }, 1000);
            $(this).removeClass('rotate').off('click')
        })
    })

    /************** 
     * SCREEN 3 - ACTU
     **************/
    $('.actu .button').click(function() {
        var left = $(this).hasClass('right')
        var index = actus.get().indexOf(this.parentNode)
        var acl = actus.length
        var delay = 0
        
        var p1 = index === 0 ? acl - 1 : index - 1
        var p2 = index <= 1 ? (acl - 2) + index : index - 2
        var p3 = index === acl - 1 ? 0 : index + 1
        var p4 = index >= acl - 2 ? (index - (acl - 2)) : index + 2

        var dir = null

        $('.actu .button').fadeOut(1000)

        actus.each(function(i, actu) {
            $(actu).css('z-index', actus.length - i)
        })

        actus.each(function(i, actu) {

            if (i === p1) {
                dir = left ? 'outleft' : 'center'
            } else if (i === p2) {
                dir = left ? 'outleft' : 'left'
            } else if (i === index) {
                dir = left ? 'left' : 'right'
            } else if (i === p3) {
                dir = left ? 'center' : 'outright'
            } else if (i === p4) {
                dir = left ? 'right' : 'outright'
            }

            if (
                (dir === 'left' || dir === 'right') && 
                ( !$(actus[i]).hasClass('out' + dir)  && !$(actus[i]).hasClass('center') )) {

                actus[i].className = 'actu fast out' + dir
                delay = 100
            }

            if (
                (dir === 'outleft' && $(actus[i]).hasClass('outright')) || 
                (dir === 'outright' && $(actus[i]).hasClass('outleft'))) {

                actus[i].className = 'actu fast ' + dir
                delay = 100
            }

            if (dir) {
                setTimeout(function(dir) {
                    actus[i].className = 'actu ' + dir 
                    if (dir === 'center') {
                        $(actus[i]).find('.button').fadeIn(1000)
                        $(actus[i]).css('z-index', 10)
                        
                        if ($(document.body).children('.screen9').length && $(document.body).children('.screen9').css('display') !== 'none') {
                            actu_details($(actus[i]).find('section'))
                        }

                        $('.screen3 .dates .date').removeClass('active');
                        $('.screen3 .dates #' + $(actus[i]).data('date') ).addClass('active');
                    }
                }.bind(this, dir), delay)
            }
        })
    })

    var actu_details = function(section) {
        var current = $(document.body).children('.screen9')
        var actual = section.clone()

        if (current.length) {
            current.replaceWith(actual)
        } else {
            actual.insertBefore('.screen8')
        }
    }

    $('.actu .content').click(function() {
        actu_details($(this).find('section'))

        $('html, body').animate({
          scrollTop: $('body > .screen9').offset().top
        }, 1000);

        $('.screen3 .button_down').addClass('rotate').click(function() {
            $('.screen9').slideUp()
            $('html, body').animate({
              scrollTop: $('.screen3').offset().top
            }, 1000);
            $(this).removeClass('rotate').off('click')
        })
    });

    actus.each(function(i, actu) {
        $(actu).css('z-index', actus.length - i)
    })

    /************** 
     * SCREEN 5 - BOUTEILLES
     **************/

     $('.screen4 .bouteille').click(function() {
        select_slide($(this).data('id'))
     })

    /************** 
     * SCREEN 5 - SLIDE
     **************/
    var index_slide = 0
    var screen5 = $('.screen5')
    var screen5top = screen5.offset().top
    var slides = screen5.children('.slides').children('.slide')
    var interval_slide, timer_slide

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
        /*if (slides[index_slide - 1]) {
            s = slides[index_slide - 1]
            reset($(s))
        } else {
            s = slides[slides.length - 1]
            reset($(s))
        }*/
        
        // move next to main
        if ((to || to === 0) && slides[to]) {
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
        
        // if details is open
        if ($(document.body).children('.screen10').length && $(document.body).children('.screen10').css('display') !== 'none') {
            details($(slides[index_slide]).find('section'));
        }
        
        timer_slide = setTimeout(over_slide, 2000);
    }

    var clean_interval_slide = function() {
        clearInterval(interval_slide)
        interval_slide = true // deactivate scroll listening
        clearTimeout(timer_slide)
    }

    var select_slide = function(n) {
        clean_interval_slide()
        
        $('html, body').animate({
          scrollTop: $('body > .screen5').offset().top
        }, 1000);
        
        reset($(slides[n]), function() {
            move(n)
        })
    }

    var over_slide = function() {
        slides.find('.cover').css('left', '100%')
        $(slides[index_slide]).find('.cover').css('left', 0)
    }

    var details = function(section) {
        var current = $(document.body).children('.screen10')
        var actual = section.clone()

        if (current.length) {
            current.replaceWith(actual)
        } else {
            actual.insertBefore('.screen12')
        }

        screen10()

        clearInterval(interval_slide)
        interval_slide = true // deactivate scroll listening
    }

    
    win.on('scroll', function() {
        if (win.scrollTop() >= screen5top && !interval_slide) {
            interval_slide = setInterval(move_auto, 10000);
            timer_slide = setTimeout(over_slide, 3000);
        }
    })
    
    slides.each(function(i, slide) {
        $(slide).css('left', Math.min(i * 100, 100) + '%')
    })

    // show details
    $('.screen5 .button_rs_out').click(function() {
        details($(this).parent().find('section'));

        $('html, body').animate({
          scrollTop: $('body > .screen10').offset().top
        }, 1000);

        $('.screen5 .button_down').addClass('rotate').click(function() {
            $('.screen10').slideUp()
            $('html, body').animate({
              scrollTop: $('.screen5').offset().top
            }, 1000);
            $(this).removeClass('rotate').off('click')
        })
    });

    // click on arrow
    $('.screen5 .slides').children('.button').click(function() {
        move_auto(this)
    })

    var move_auto = function(button) {
        if (button) {
            clean_interval_slide()
        }

        var index = $(button).hasClass('left') ? index_slide - 1 : index_slide + 1
        index = index < 0 ? slides.length - 1 : index
        index = index > slides.length - 1 ? 0 : index
        reset($(slides[index]), function() {
            move(index)
        })
    }

    //menu
    $('header .marques .sub:last-child .row').each(function(i, row) {
        $(row).click(function() {
            $('header .marques').hide()
            select_slide(i)
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
    

    /************** 
     * SCREEN 8 - NOS VALEURS
     **************/

     $('.screen8 img').hover(function() {
        $('.screen8 .cartouche:nth-child(' + $(this).data('id') + ')').fadeIn()
     }, function() {
        $('.screen8 .cartouche:nth-child(' + $(this).data('id') + ')').fadeOut()
     })

     /************** 
     * SCREEN 10 - PRODUCT DETAILS
     **************/
     var screen10 = function() {
        $('.screen10').each(function(a, screen) {
            $(screen).find('.slide').each(function(i, slide) {
                $(slide).css('left', ((i * 200) + 50) + '%')
            })
         })

         $('.screen10 .arrow').click(function() {
            var active;
            var left = !$(this).hasClass('left');
            var menus = $(this).parents('.container').find('.menu div')

            menus.each(function(i, bt) {
                if ($(bt).hasClass('active')) {
                    active = i
                }
            })

            var current = $($(this).parent().find('.slide').get(active))
            //console.log($(this).parent(), $(this).parent().find('.slide'), current)
            current.css('transition', 'left 1s ease-in-out')
            current.css('left', left ? '-200%' : '200%')
            $(menus.get(active)).removeClass('active')

            var n = left && active !== 0 ? active - 1 : 
                    left ? menus.length - 1 : 
                    active !== menus.length - 1 ? active + 1 : 0

            var next = $($(this).parent().find('.slide').get(n))
            next.css('transition', 'none')
            next.css('left', left ? '200%' : '-200%')
            //console.log(active, left && active !== 0 ? active - 1 : active !== menus.length - 1 ? active + 1 : 0)
            
            setTimeout(function() {
                next.css('transition', 'left 1s ease-in-out')
                next.css('left', '50%')
            }, 100)

            $(menus.get(n)).addClass('active')
         })
     }
     
})
