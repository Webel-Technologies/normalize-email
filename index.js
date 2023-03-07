'use strict'

var MINUS_ONLY = /\-.*$/
var PLUS_ONLY = /\+.*$/
var PLUS_AND_DOT = /\.|\+.*$/g

var normalizeableProviders = {
    'gmail.com': {
        cut: PLUS_AND_DOT,
    },
    'googlemail.com': {
        cut: PLUS_AND_DOT,
        aliasOf: 'gmail.com',
    },
    'hotmail.com': {
        cut: PLUS_ONLY,
    },
    'live.com': {
        cut: PLUS_AND_DOT,
    },
    'outlook.com': {
        cut: PLUS_ONLY,
    },
    'icloud.com': {
        cut: PLUS_ONLY,
    },
    'yahoo.com': {
        cut: MINUS_ONLY,
    },
}

module.exports = function normalizeEmail(emailToNormalize) {
    if (typeof emailToNormalize != 'string') {
        throw new TypeError('normalize-email expects a string')
    }

    const email = emailToNormalize.toLowerCase()
    const emailParts = email.split(/@/)

    if (emailParts.length !== 2) {
        return emailToNormalize
    }

    let username = emailParts[0]
    let domain = emailParts[1]

    if (normalizeableProviders.hasOwnProperty(domain)) {
        if (normalizeableProviders[domain].hasOwnProperty('cut')) {
            username = username.replace(normalizeableProviders[domain].cut, '')
        }
        if (normalizeableProviders[domain].hasOwnProperty('aliasOf')) {
            domain = normalizeableProviders[domain].aliasOf
        }
    }

    return username + '@' + domain
}
