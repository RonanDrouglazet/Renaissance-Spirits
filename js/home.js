
var cover = function() {
    var st = $(window).scrollTop()
    var bg = $(this).find('.background.nofixed')
    var bgh = bg.innerHeight()
    var bgf = $(this).find('.background.fixed')
    var cbgf = $(this).find('.cover_bg')
    var of = $(this).offset()
    var diff = st - of.top

    if (st >= of.top && bgf.css('display') === 'none') {
        bgf.css('display', 'block')
        $(this).find('.cover').css('height', bgh + 'px')
    } else if (st >= of.top && diff <= bgh) {
        bgf.css('top', 0)
        cbgf.css('height', diff + 'px')
        cbgf.css('top', bgh - diff + 'px')
        if (cbgf.css('display') === 'none') {
            cbgf.css('display', 'block')
        }
    } 

    if (diff >= bgh * 2) {
        bgf.css('top', (bgh * 2) + 'px')
    } else if (diff >= bgh) {
        bgf.css('top', (bgh - diff) + 'px')
        cbgf.css('top', bgh - diff + 'px')
        cbgf.css('height', bgh + 'px')
    } else if (diff <= 0) {
        bgf.css('display', 'none')
        cbgf.css('display', 'none')
    }
}


$(document).ready(function() {
    $('.covered').each(function() {
        $(window).scroll(cover.bind(this))
        $(window).resize(cover.bind(this))
    })
})
