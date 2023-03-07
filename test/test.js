var assert = require('assert')
var normalizeEmail = require('..')

var gmailEmailsToNormalize = [
    'johnotander@gmail.com',
    'johnotander@googlemail.com',
    'johnotander@GMAIL.com',
    'johnotander+foobar@gmail.com',
    'john.o.t.a.n.d.er+foobar@gmail.com',
    'JOHN.o.t.a.n.d.er+foobar@googlemail.com',
    'john.otander@gmail.com',
]

var hotmailEmailsToNormalize = ['johnotander@hotmail.com', 'johnotander@hotmail.com', 'johnotander@HOTMAIL.com', 'Johnotander@hotmail.com']

var liveEmailsToNormalize = [
    'johnotander@live.com',
    'johnotander@live.com',
    'johnotander@live.com',
    'johnotander+foobar@live.com',
    'john.o.t.a.n.d.er+foobar@live.com',
    'JOHN.o.t.a.n.d.er+foobar@live.com',
    'john.otander@live.com',
]

var outlookEmailsToNormalize = [
    'john.otander@outlook.com',
    'JOHN.otander@outlook.com',
    'john.Otander+any.label@outlook.com',
    'john.otander+foobar@outlook.com',
]

var yahooEmailsToNormalize = [
    'john.otander@yahoo.com',
    'JOHN.otander@yahoo.com',
    'john.Otander-any.label@yahoo.com',
    'john.otander-foobar@yahoo.com',
]

var icloudEmailsToNormalize = [
    'john.otander@icloud.com',
    'JOHN.otander@icloud.com',
    'john.Otander+any.label@icloud.com',
    'john.otander+foobar@icloud.com',
]

describe('normalize-email', function () {
    it('should normalize gmail emails', function () {
        gmailEmailsToNormalize.forEach(function (email) {
            assert.equal(normalizeEmail(email), 'johnotander@gmail.com')
        })
    })

    it('should normalize hotmail emails', function () {
        hotmailEmailsToNormalize.forEach(function (email) {
            assert.equal(normalizeEmail(email), 'johnotander@hotmail.com')
        })
    })

    it('should normalize live emails', function () {
        liveEmailsToNormalize.forEach(function (email) {
            assert.equal(normalizeEmail(email), 'johnotander@live.com')
        })
    })

    it('should normalize outlook emails', function () {
        outlookEmailsToNormalize.forEach(function (email) {
            assert.equal(normalizeEmail(email), 'john.otander@outlook.com')
        })
    })

    it('should not remove dots from hotmail emails', function () {
        assert.equal(normalizeEmail('john.otander@hotmail.com'), 'john.otander@hotmail.com')
    })

    it('should normalize yahoo emails', function () {
        yahooEmailsToNormalize.forEach(function (email) {
            assert.equal(normalizeEmail(email), 'john.otander@yahoo.com')
        })
    })

    it('should not remove dots from yahoo emails', function () {
        assert.equal(normalizeEmail('john.otander@yahoo.com'), 'john.otander@yahoo.com')
    })

    it('should normalize iCloud emails', function () {
        icloudEmailsToNormalize.forEach(function (email) {
            assert.equal(normalizeEmail(email), 'john.otander@icloud.com')
        })
    })

    it('should not remove dots from iCloud emails', function () {
        assert.equal(normalizeEmail('john.otander@icloud.com'), 'john.otander@icloud.com')
    })
})
