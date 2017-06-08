(window.OctoBoot_plugins = window.OctoBoot_plugins || {}).language = function() {
    if (location.hash) {
        var ln = location.hash.substr(1)

        var elements = $('.ob-language.' + ln).parent().parent()
        elements.each(function(i, el) {
            $(el).contents().filter(function() {
                return this.nodeType == 3 && !!$(this).text().trim()
            }).each(function(i, text) {
                var sln = $(el).children('.ob-language').find('.ob-language.' + ln + ' span.' + ln + i)

                if (sln.length) {
                    text.textContent = sln.text()
                }
            })
        })

        var aelements = $('*[ob-language-' + ln + ']'), data
        aelements.each(function(i, el) {
            try {
                data = $(el).attr('ob-language-' + ln).split('&')
                data.forEach(function(attr) {
                    attr = attr.split('=')
                    if (attr[0] === 'style')  {
                        var styles = attr[1].split(';')
                        styles.forEach(function(style) {
                            var styleSplited = style.split(':')
                            $(el).css(styleSplited[0], styleSplited[1])
                        })
                    } else {
                        $(el).attr(attr[0], attr[1])
                    }
                })

            } catch (e) {console.error(e)}

            data = null
        })
    }
}

$(document).ready(OctoBoot_plugins.language)
