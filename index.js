'use strict'

const MINUS_ONLY = /\-.*$/
const PLUS_ONLY = /\+.*$/
const PLUS_AND_DOT = /\.|\+.*$/g

const knownProviders = {
    gmail: /^gmail\..*/,
    googlemail: /^googlemail\..*/,
    hotmail: /^hotmail\..*/,
    live: /^live\..*/,
    outlook: /^outlook\..*/,
    icloud: /^icloud\..*/,
    yahoo: /^yahoo\..*/,
}

const normalizeableProviders = {
    gmail: {
        cut: PLUS_AND_DOT,
    },
    googlemail: {
        cut: PLUS_AND_DOT,
        aliasOf: {
            replace: /googlemail/,
            replacement: 'gmail',
        },
    },
    hotmail: {
        cut: PLUS_ONLY,
    },
    live: {
        cut: PLUS_ONLY,
    },
    outlook: {
        cut: PLUS_ONLY,
    },
    icloud: {
        cut: PLUS_ONLY,
    },
    yahoo: {
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

    const providerEntry = Object.entries(knownProviders).find(([_, providerRegex]) => providerRegex.test(domain))

    if (providerEntry) {
        if (normalizeableProviders[providerEntry[0]].hasOwnProperty('cut')) {
            username = username.replace(normalizeableProviders[providerEntry[0]].cut, '')
        }
        if (normalizeableProviders[providerEntry[0]].hasOwnProperty('aliasOf')) {
            const { replace, replacement } = normalizeableProviders[providerEntry[0]].aliasOf
            domain = domain.replace(replace, replacement)
        }
    }

    return username + '@' + domain
}
