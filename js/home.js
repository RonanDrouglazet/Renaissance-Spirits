
var cover = function() {
    var st = $(window).scrollTop()
    var bg = $(this).find('.background.nofixed')
    var bgh = bg.innerHeight()
    var bgf = $(this).find('.background.fixed')
    var cbgf = $(this).find('.cover_bg')
    var of = $(this).offset()
    var diff = st - of.top

    if (st >= of.top && bgf.css('display') === 'none') {
        // when we begin to scroll in parallax
        bgf.show()
        $(this).find('.cover').css('height', bgh + 'px')
    } else if (st >= of.top && diff <= bgh) {
        // then
        bgf.css('top', 0)
        cbgf.css('height', diff + 'px')
        cbgf.css('top', bgh - diff + 'px')
        if (cbgf.css('display') === 'none') {
            cbgf.show()
        }
    }

    if (diff >= bgh * 2) {
        // when we scroll out parallax completely
        bgf.css('top', (bgh * 2.5) + 'px')
        bgf.hide()
        cbgf.hide()
    } else if (diff >= bgh) {
        // when we begin to leave parallax
        bgf.css('top', (bgh - diff) + 'px')
        cbgf.css('top', bgh - diff + 'px')
        cbgf.css('height', bgh + 'px')
        if (cbgf.css('display') === 'none') {
            cbgf.show()
        }
    } else if (diff <= 0) {
        // when we are just over original image
        bgf.hide()
        cbgf.hide()
    }
}

var slide = function() {
    var imgs = $(this).find('img.slide')
    var current = 0
    var start = '100%'
    var end = '0%'
    var rtl = true

    imgs.each(function(id, elm) {
        if (id !== 0) {
            $(elm).css('left', start)
            setTimeout(function() { $(elm).css('transition', 'left 2s ease-in-out') }, 500)
        }
    })

    setInterval(function() {
        if (current === imgs.length) {
            rtl = false
        } else if (current === 0) {
            rtl = true
        }

        current = rtl ? current + 1 : current - 1

        if (current !== 0) {
            $(imgs[current]).css('left', rtl ? end : start)
        }
    }, 5000)
}


$(document).ready(function() {
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
