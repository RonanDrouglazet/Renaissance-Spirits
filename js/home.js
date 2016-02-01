
var cover = function() {
    var st = $(window).scrollTop()
    var bg = $(this).find('.background.nofixed')
    var bgh = bg.innerHeight()
    var bgf = $(this).find('.background.fixed')
    var cbgf = $(this).find('.cover_bg')
    var of = $(this).offset()
    var diff = st - of.top

    if (st >= of.top && bgf.css('visibility') === 'hidden') {
        // when we begin to scroll in parallax
        bgf.css('visibility', 'visible')
        $(this).find('.cover').css('height', bgh + 'px')
    } else if (st >= of.top && diff <= bgh) {
        // then
        bgf.css('top', 0)
        cbgf.css('height', diff + 'px')
        cbgf.css('top', bgh - diff + 'px')
        if (cbgf.css('visibility') === 'hidden') {
            cbgf.css('visibility', 'visible')
        }
    }

    if (diff >= bgh * 2) {
        // when we scroll out parallax completely
        bgf.css('top', (bgh * 2.5) + 'px')
        bgf.css('visibility', 'hidden')
        cbgf.css('visibility', 'hidden')
    } else if (diff >= bgh) {
        // when we begin to leave parallax
        bgf.css('top', (bgh - diff) + 'px')
        cbgf.css('top', bgh - diff + 'px')
        cbgf.css('height', bgh + 'px')
        if (cbgf.css('visibility') === 'hidden') {
            cbgf.css('visibility', 'visible')
        }
    } else if (diff <= 0) {
        // when we are just over original image
        bgf.css('visibility', 'hidden')
        cbgf.css('visibility', 'hidden')
    }
}

var slide = function() {
    var _this = $(this)
    var imgs = _this.find('img.slide')
    var current = 0
    var start = 100
    var end = '0%'
    var rtl = true

    

    _this.css('transition', 'left 2s ease-in-out')
    _this.css('left', '0%')

    if (_this.hasClass('fixed') || _this.hasClass('cover_bg')) {
        _this.css('width', (imgs.length * 100) + '%')
        imgs.css('width', (100 / imgs.length) + '%')
        start = 100 / imgs.length
    }

    imgs.each(function(id, elm) {
        $(elm).css('left', (start * id) + '%')
    })

    setInterval(function() {
        if (current === imgs.length - 1) {
            rtl = false
        } else if (current === 0) {
            rtl = true
        }

        current = rtl ? current + 1 : current - 1
        console.log('current', current)
        console.log('goto', (-100 *  current) + '%')
        _this.css('left', (-100 *  current) + '%')
    }, 5000)
}


$(document).ready(function() {
    
    // Intro
    $('.ui.dropdown').dropdown()
    $('i.remove').click(function() {
        $('.cookie_use,.cookie_use_mobile').fadeOut()
    })
    $('button.accept').click(function() {
        $('.intro').fadeOut()
        $('html, body').css('overflow', '')
    })
    $('html, body').css('overflow', 'hidden')


    // Home page
    $('.covered').each(function() {
        $(window).scroll(cover.bind(this))
        $(window).resize(cover.bind(this))
        // fake a little scroll to init everything
        setTimeout(function() {
            window.scrollTo(0, window.scrollY - 1)
        }, 100);
    })
    $('div.slide').each(slide)
})
