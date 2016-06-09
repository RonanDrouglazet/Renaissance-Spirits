$(document).ready(function() {
    var win = $(window);
    var menu = $('header .menu');
    var mheight =  menu.height();
    var fmenu = $('header .floating');
    var is_touch_device = function() {
      return 'ontouchstart' in window        // works on most browsers
          || navigator.maxTouchPoints;       // works on IE10/11 and Surface
    }();

    var desktopMenu = function() {
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
        var getSectionTop = function() {
            sectionsTop = []
            $('.menu:not(.mobile) > .grid > .column').each(function(i, c) {
                c = $(c)
                if (c.data('to')) {
                    sectionsTop.push($(c.data('to')).offset().top)
                }
            })
        }

        var moveSelectToSection = function() {
            $(sectionsTop.slice().reverse()).each(function(i, t) {
                if (win.scrollTop() >= (t - (win.height() / 2))) {
                    var span = $($('.menu:not(.mobile) > .grid > .column[data-to]').get().reverse()[i]).find('span')
                    select2
                        .show()
                        .css('left', span.offset().left)
                        .css('width', span.width())
                    return false
                }
            })
        }

        setInterval(getSectionTop, 1000)
        win.on('scroll', moveSelectToSection)
        getSectionTop()

        /****
        * SUB MENU MARQUES
        *****/
        var block;
        $('header .menu .stackable.grid .column span').hover(function() {
            $('header .marques').hide()
        }, null)
        $('header .menu .stackable.grid .column:nth-child(5) span').hover(function() {
            $('header .marques').show()
        }, null)

        $('header .marques').hover(function() {
            block = true
            $(this).show()
        }, function() {
            $(this).hide()
        })

        $('header .marques .button span').hover(function() {
            $(this).parents('.column').find('.button.active').removeClass('active')

            var id = $(this).parents('.row').data('id')
            var sid = $(this).parents('.row').data('sid')
            var next = $(this).parent().addClass('active')
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
        }, null)

        $('header .marques').mouseleave(function() {
            $('header .marques').hide()
        })
    }

    var mobileMenu = function() {
        $('header .floating').click(function() {
            if (fmenu.find('i').hasClass('sidebar')) {
                $('.menu.mobile').addClass('open')
                fmenu.find('i').removeClass('sidebar').addClass('sort ascending')
            } else {
                $('.menu.mobile').removeClass('open')
                fmenu.find('i').removeClass('sort ascending').addClass('sidebar')
            }
        })

        /****
        * SELECT BAR WHEN SCROLL OVER SECTION
        *****/
        var select = $('header .menu.mobile .selectbar')
        var sectionsTop = []
        var span = $($('.menu.mobile > .grid > .column[data-to]').get(0)).find('span');
        $('.menu.mobile > .grid > .column').each(function(i, c) {
            c = $(c)
            var to = c.data('to')
            if (to) {
                sectionsTop.push($(to).offset().top)
                c.click(function() {
                    $('header .floating').click()
                    $('html, body').animate({
                      scrollTop: $(to).offset().top
                    }, 1000);
                })
            }
        })

        win.on('scroll', function() {
            $(sectionsTop.slice().reverse()).each(function(i, t) {
                if (win.scrollTop() >= (t - (win.height() / 2))) {
                    span = $($('.menu.mobile > .grid > .column[data-to]').get().reverse()[i]).find('span')
                    return false
                }
            })
        })

        setInterval(function() {
            select
                .show()
                .css('left', span.offset().left)
                .css('top', span.parent().position().top + (span.height() + span.position().top))
                .css('width', span.width())
        }, 100)
    }

    if ($('.menu.mobile').css('display') !== 'none') {
        mobileMenu()
    } else {
        desktopMenu()
    }

    /**************
     * MAKE ME TOUCH :)
     **************/

     var makeMeTouch = function(btToHide, ctnToTouch, cbk) {
         var start, diff, stop, limit;
         btToHide.hide()
         ctnToTouch.on('touchstart', function(e) {
             start = e.originalEvent.pageX
             limit = window.innerWidth * .25
             stop = false
         })
         ctnToTouch.on('touchmove', function(e) {
             if (stop) return
             diff = e.originalEvent.pageX - start
             if (diff < -limit) {
                 cbk(false)
                 stop = true
             } else if (diff > limit) {
                 cbk(true)
                 stop = true
             }
         })
     }

    /**************
     * INTRO
     **************/
    var cookie = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*18Y\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1"))

    if (cookie) {
        $('.intro').fadeOut(0)
    } else {
        $('.ui.dropdown').dropdown()

        $('i.remove').click(function() {
            $('.cookie_use,.cookie_use_mobile').fadeOut()
        })

        $('button.accept').click(function() {
            document.cookie = "18Y=true; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/"
            $('.intro').fadeOut()
        })
    }


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
            $(actu).css('z-index', actus.length - i)

            // hide or show arrow button if center actu
            if (classname === 'center') {
                if (!is_touch_device) {
                    $(actu).find('.button').fadeIn(1000)
                } else {
                    $(actu).find('.button').fadeOut(1000)
                }
                // and show details if already open
                if ($(document.body).children('.screen9').length && $(document.body).children('.screen9').css('display') !== 'none') {
                    actu_details($(actu).find('section'))
                }
            } else {
                $(actu).find('.button').fadeOut(1000)
            }
        })
    }

    var moveActu = function(left) {
        var index = actus.get().indexOf($('section .actu.center').get(0))
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
                        if (!is_touch_device) {
                            $(actu).find('.button').fadeIn(1000)
                        }

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
    }

    var actu_details = function(section) {
        var current = $(document.body).children('.screen9')
        var actual = section.clone()

        if (current.length) {
            current.replaceWith(actual)
        } else {
            actual.insertBefore('.actu.arrowcontainer')
        }
    }

    selectActusByDate(2015)
    selectActusByDate(2016)

    if (is_touch_device) {
        makeMeTouch(actus.find('.button'), $('.screen3'), function(left) {
            moveActu(!left)
        })
    }

    $('section#actualites > .dates > .date').click(function() {
        selectActusByDate(this.id)
    })

    $('section .actu .button').click(function() {
        moveActu($(this).hasClass('right'))
    })

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

    /**************
     * SCREEN 5 - BOUTEILLES
     **************/

     $('.screen4 .bouteille').click(function() {
        select_slide($(this).data('id'))
     })

     var scalefb = function() {
         if (win.width() < $('.screen4 .content').width()) {
             var scaleB = win.width() / ($('.screen4 .content').width() * 1.1)
             $('.screen4 .content').css({
                 transform: 'scale(' + scaleB + ')',
                 transformOrigin: '0.5% 0'
             })
         }
     }

     scalefb()
     win.on('orientationchange', scalefb)

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

        timer_slide = setTimeout(over_slide, is_touch_device ? 0 : 3000);
    }

    var clean_interval_slide = function() {
        clearInterval(interval_slide)
        interval_slide = true // deactivate scroll listening
        clearTimeout(timer_slide)
    }

    var select_slide = function(n, noScroll) {
        clean_interval_slide()

        if (!noScroll) {
            $('html, body').animate({
              scrollTop: $('body > .screen5').offset().top
            }, 1000);
        }

        reset($(slides[n]), function() {
            move(n)
        })
    }

    var over_slide = function() {
        slides.find('.cover').css('left', '100%')
        $(slides[index_slide]).find('.cover').css('left', 0)
    }

    var details = function(section, nb) {
        var current = $(document.body).children('.screen10')
        var actual = section.clone()

        if (current.length) {
            current.replaceWith(actual)
        } else {
            actual.insertBefore('.marques.arrowcontainer')
        }

        if (nb) {
            $('body > .screen10 .container .menu > div.active').removeClass('active')
            $($('body > .screen10 .container .menu > div').get(nb)).addClass('active')
        }

        screen10()

        clearInterval(interval_slide)
        interval_slide = true // deactivate scroll listening
    }


    win.on('scroll', function() {
        if (win.scrollTop() >= screen5top && !interval_slide) {
            interval_slide = setInterval(move_auto, 10000);
            timer_slide = setTimeout(over_slide, is_touch_device ? 0 : 3000);
        }
    })

    slides.each(function(i, slide) {
        $(slide).css('left', Math.min(i * 100, 100) + '%')
    })

    // show details
    var showDetails = function(section, nb) {
        details(section, nb);

        $('html, body').animate({
          scrollTop: $('body > .screen10').offset().top
        }, 1000);

        $('.screen5 .button_down')
            .addClass('rotate')
            .appendTo('body > .marques.arrowcontainer')
            .find('img')
            .attr('src', 'img/arrow_down_blue.png')
    }

    var arrowDetails = function() {
        if ($(this).hasClass('rotate')) {
            $('body > .screen10').slideUp()
            $('html, body').animate({
              scrollTop: $('.screen5').offset().top
            }, 1000);
            $(this)
                .removeClass('rotate')
                .appendTo('.screen5')
                .find('img')
                .attr('src', 'img/arrow_down.png')
        } else {
            showDetails($(slides[index_slide]).find('section'))
        }
    }

    $('.screen5 .button_rs_out').click(function() {
        showDetails($(this).parents('.cover').find('section'))
    });

    $('.screen5 .button_down').on('click',arrowDetails)


    var move_auto = function(goLeft) {
        if (goLeft || goLeft === false) {
            clean_interval_slide()
        }

        var index = goLeft ? index_slide - 1 : index_slide + 1
        index = index < 0 ? slides.length - 1 : index
        index = index > slides.length - 1 ? 0 : index
        reset($(slides[index]), function() {
            move(index)
        })
    }

    // click on arrow
    $('.screen5 .slides').children('.button').click(function() {
        move_auto($(this).hasClass('left'))
    })

    if (is_touch_device) {
        makeMeTouch($('.screen5 .slides').children('.button'), $('.screen5'), move_auto)
    }

    //menu
    $('header .marques .sub:last-child .row').each(function(i, row) {
        $(row).find('.buttonl').each(function(ib, button) {
            $(button).click(function() {
                $('header .marques').hide()
                // select marque
                select_slide(i, true)
                // select details
                setTimeout(function() {
                    showDetails($(slides[index_slide]).find('section'), ib)
                }, 100)
            })
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
         var slideW = $('body > .screen10 .slide').width()
         if (win.width() < slideW) {
            $('body > .screen10 .slides').css('height', '1100px')
            $('body > .screen10 .slide').addClass('widthauto')
            $('body > .screen10 .slide .button').addClass('nobsolute')
         }

         // init slides
         var center = win.width() < slideW ? 0 : 50
         var menus = $('body > .screen10 .container .menu > div')
         var active
         menus.each(function(i, bt) {
             if ($(bt).hasClass('active')) {
                 active = i
             }
         })

         $('body > .screen10 .slide').css('left', '200%')
         $($('body > .screen10 .slide').get(active)).css('left', center + '%')

         var move = function(left) {
             var current = $($('body > .screen10').find('.slide').get(active))

             current.css('transition', 'left 1s ease-in-out')
             current.css('left', left ? '-200%' : '200%')
             $(menus.get(active)).removeClass('active')

             var n = left && active !== 0 ? active - 1 :
                     left ? menus.length - 1 :
                     active !== menus.length - 1 ? active + 1 : 0

             var next = $($('body > .screen10').find('.slide').get(n))
             next.css('transition', 'none')
             next.css('left', left ? '200%' : '-200%')


             setTimeout(function() {
                 next.css('transition', 'left 1s ease-in-out')
                 next.css('left', center + '%')
             }, 100)


             // reset active index
             $(menus.get(n)).addClass('active')
             menus.each(function(i, bt) {
                 if ($(bt).hasClass('active')) {
                     active = i
                 }
             })
         }

         $('body > .screen10 .arrow').click(function() {
            move(!$(this).hasClass('left'))
         })

         if (is_touch_device && $('body > .screen10 .arrow').length) {
             $('body > .screen10 .container .menu').show()
             makeMeTouch($('body > .screen10 .arrow'), $('body > .screen10'), function(left) {
                 move(!left)
             })
         }
     }

})
