$(document).ready(function() {
    var win = $(window);
    var menu = $('header .menu');
    var mheight =  menu.height();
    var fmenu = $('header .floating');

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

    /****
    * SELECT BAR WHEN OVER MENU BUTTON
    *****/
    var select1 = $($('header .selectbar')[0])
    select1.parent().find('.column').each(function(i, bt) {
        var span = $(bt).find('span')
        if (span.html() !== "") {
            span.hover(function() {
                select1
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
    $('header').mouseleave(function() {
        select1.fadeOut()
    })


    /****
    * SELECT BAR WHEN SCROLL OVER SECTION
    *****/
    var select2 = $($('header .selectbar')[1])
    var sectionsTop = []
    $('.menu > .grid > .column').each(function(i, c) {
        c = $(c)
        if (c.data('to')) {
            sectionsTop.push($(c.data('to')).offset().top)
        }
    })

    win.on('scroll', function() {
        $(sectionsTop.slice().reverse()).each(function(i, t) {
            if (win.scrollTop() >= (t - (win.height() / 2))) {
                var span = $($('.menu > .grid > .column[data-to]').get().reverse()[i]).find('span')
                select2
                    .show()
                    .css('left', span.offset().left)
                    .css('width', span.width())
                return false
            }
        })
    })


    /****
    * SUB MENU MARQUES
    *****/
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

        var id = $(this).parent().data('id')
        var sid = $(this).parent().data('sid')
        var next = $(this).addClass('active')
        .parents('.column').next()

        // reset current selected
        next.find('.active')
        .removeClass('active')

        // find wich row we have to show and display it
        next.find('.row[data-id="' + id + '"]' + (sid ? '[data-sid="' + sid + '"]' : ''))
        .addClass('active')

        // hide potential sub menu
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
        $('.screen1 .button_down').addClass('rotate').appendTo('.screen2').click(function() {
            $('.screen2').slideUp()
            $('html, body').animate({
              scrollTop: $('.screen1').offset().top
            }, 1000);
            $(this).removeClass('rotate').off('click').appendTo('.screen1').find('img').attr('src', 'img/arrow_down.png')
        }).find('img').attr('src', 'img/arrow_down_blue.png')
    })

    /************** 
     * SCREEN 3 - ACTU
     **************/
    var actus
    var selectActusByDate = function(date) {
        actus = $('section .actu[data-date="' + date + '"]').show()
        $('section .actu:not([data-date="' + date + '"])').hide()

        // reset and set right active date
        $('section#actualites > .dates > .date').removeClass('active')
        $('section#actualites > .dates > #' + date).addClass('active')

        actus.each(function(i, actu) {
            // choose the right position for this actu based on the index
            var classname = 
                i === 0 ? 'center' : 
                i === 1 ? 'right' : 
                i === 2 && i !== actus.length - 1 ? 'outright' :
                i === actus.length - 1 ? 'left' : 
                'outleft'

            // reset
            actu.className = 'actu'
            // and set
            $(actu).addClass(classname)
            // hide or show arrow button if center actu
            if (classname === 'center') {
                $(actu).find('.button').fadeIn(1000)
                // and show details if already open
                if ($(document.body).children('.screen9').length && $(document.body).children('.screen9').css('display') !== 'none') {
                    actu_details($(actu).find('section'))
                }
            } else {
                $(actu).find('.button').fadeOut(1000)
            }
        })
    }
    
    selectActusByDate(2015)
    selectActusByDate(2016)

    $('section#actualites > .dates > .date').click(function() {
        selectActusByDate(this.id)
    })

    $('section .actu .button').click(function() {
        var left = $(this).hasClass('right')
        var index = actus.get().indexOf(this.parentNode)
        var acl = actus.length
        var delay = 0
        var dir = null

        actus.find('.button').fadeOut(1000)

        actus.each(function(i, actu) {
            $(actu).css('z-index', actus.length - i)
        })

        var dones = []
        actus.each(function(i, actu) {
            
            delay = 0
            var cl = actu.className.substr(5)
            if (dones.indexOf(cl) !== -1) {
                return
            }
            dones.push(cl)

            switch (cl) {
                case 'center':
                    dir = left ? 'left' : 'right'
                break

                case 'left':
                    dir = left ? 'outleft' : 'center'
                break

                case 'right':
                    dir = left ? 'center' : 'outright'
                break

                case 'outleft':
                    dir = left ? 'outright' : 'left'
                    if (left) {
                        actu.className = 'actu fast ' + dir
                        delay = 100
                        // special case if we have not enought actu
                        if (actus.length === 4) {
                            dir = 'right'
                        }
                    }
                break

                case 'outright':
                    dir = left ? 'right' : 'outleft'
                        if (!left) {
                            actu.className = 'actu fast ' + dir
                            delay = 100
                            // special case if we have not enought actu
                            if (actus.length === 4) {
                                dir = 'left'
                            }
                        }
                break
            }


            if (dir) {
                setTimeout(function(dir, actu) {
                    actu.className = 'actu ' + dir 
                    
                    if (dir === 'center') {
                        $(actu).find('.button').fadeIn(1000)
                        $(actu).css('z-index', 10)
                        
                        if ($(document.body).children('.screen9').length && $(document.body).children('.screen9').css('display') !== 'none') {
                            actu_details($(actu).find('section'))
                        }

                        $('.screen3 .dates .date').removeClass('active');
                        $('.screen3 .dates #' + $(actu).data('date') ).addClass('active');
                    }
                }.bind(this, dir, actu), delay)
            }
        })
    })

    var actu_details = function(section) {
        var current = $(document.body).children('.screen9')
        var actual = section.clone()

        if (current.length) {
            current.replaceWith(actual)
        } else {
            actual.insertBefore('.actu.arrowcontainer')
        }
    }

    $('.actu .content').click(function() {
        actu_details($(this).find('section'))

        $('html, body').animate({
          scrollTop: $('body > .screen9').offset().top
        }, 1000);

        $('.screen3 .button_down').addClass('rotate').appendTo('body > .actu.arrowcontainer').click(function() {
            $('body > .screen9').slideUp()
            $('html, body').animate({
              scrollTop: $('.screen3').offset().top
            }, 1000);
            $(this).removeClass('rotate').off('click').appendTo('.screen3')
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
    var screen5top = screen5.offset().top - 200
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
            actual.insertBefore('.marques.arrowcontainer')
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
        details($(this).parents('.cover').find('section'));

        $('html, body').animate({
          scrollTop: $('body > .screen10').offset().top
        }, 1000);

        $('.screen5 .button_down').addClass('rotate').appendTo('body > .marques.arrowcontainer').click(function() {
            $('body > .screen10').slideUp()
            $('html, body').animate({
              scrollTop: $('.screen5').offset().top
            }, 1000);
            $(this).removeClass('rotate').off('click').appendTo('.screen5').find('img').attr('src', 'img/arrow_down.png')
        }).find('img').attr('src', 'img/arrow_down_blue.png')
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
