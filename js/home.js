
var cover = function() {
	var st = $(window).scrollTop()
	var wh = $(window).innerHeight()
	var eh = $(this).innerHeight()
	var of = $(this).offset()
	var diff
	
	if (st + wh > of.top) {
		diff = (st + wh) - of.top
		diff = diff > eh ? eh : diff

		$(this).find('.cover').css('margin-top', '-' + diff + 'px')
	}
}


$(document).ready(function() {
    $('.covered').each(function() {
    	$(window).scroll(cover.bind(this))
    	$(window).resize(cover.bind(this))
    })
})
