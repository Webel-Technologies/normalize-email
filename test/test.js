const assert = require('assert')
const normalizeEmail = require('..')

const gmailEmailsToNormalize = [
    'johnotander@gmail.com',
    'johnotander@googlemail.com',
    'johnotander@GMAIL.com',
    'johnotander+foobar@gmail.com',
    'john.o.t.a.n.d.er+foobar@gmail.com',
    'JOHN.o.t.a.n.d.er+foobar@googlemail.com',
    'john.otander@gmail.com',
]

const hotmailEmailsToNormalize = [
    'johnotander@hotmail.com',
    'johnotander@hotmail.com',
    'johnotander@HOTMAIL.com',
    'Johnotander@hotmail.com',
]

const liveEmailsToNormalize = [
    'john.otander@live.com',
    'JOHN.otander@live.com',
    'john.Otander+any.label@live.com',
    'john.otander+foobar@live.com',
]

const outlookEmailsToNormalize = [
    'john.otander@outlook.com',
    'JOHN.otander@outlook.com',
    'john.Otander+any.label@outlook.com',
    'john.otander+foobar@outlook.com',
]

const yahooEmailsToNormalize = [
    'john.otander@yahoo.com',
    'JOHN.otander@yahoo.com',
    'john.Otander-any.label@yahoo.com',
    'john.otander-foobar@yahoo.com',
]

const icloudEmailsToNormalize = [
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

    it('should normalize gmail with different domain TLD', function () {
        assert.equal(normalizeEmail('john.otander@gmail.es'), 'johnotander@gmail.es')
        assert.equal(normalizeEmail('john.otander@gmail.it'), 'johnotander@gmail.it')

        assert.equal(normalizeEmail('john.otander@googlemail.es'), 'johnotander@gmail.es')
        assert.equal(normalizeEmail('john.otander@googlemail.it'), 'johnotander@gmail.it')
    })

    it('should normalize hotmail emails', function () {
        hotmailEmailsToNormalize.forEach(function (email) {
            assert.equal(normalizeEmail(email), 'johnotander@hotmail.com')
        })
    })

    it('should normalize hotmail with different domain TLD', function () {
        assert.equal(normalizeEmail('john.otander@hotmail.es'), 'john.otander@hotmail.es')
        assert.equal(normalizeEmail('john.otander@hotmail.it'), 'john.otander@hotmail.it')
    })

    it('should not remove dots from hotmail emails', function () {
        assert.equal(normalizeEmail('john.otander@hotmail.com'), 'john.otander@hotmail.com')
    })

    it('should normalize live emails', function () {
        liveEmailsToNormalize.forEach(function (email) {
            assert.equal(normalizeEmail(email), 'john.otander@live.com')
        })
    })

    it('should normalize live with different domain TLD', function () {
        assert.equal(normalizeEmail('john.otander@live.es'), 'john.otander@live.es')
        assert.equal(normalizeEmail('john.otander@live.it'), 'john.otander@live.it')
    })

    it('should not remove dots from live emails', function () {
        assert.equal(normalizeEmail('john.otander@live.com'), 'john.otander@live.com')
    })

    it('should normalize outlook emails', function () {
        outlookEmailsToNormalize.forEach(function (email) {
            assert.equal(normalizeEmail(email), 'john.otander@outlook.com')
        })
    })

    it('should normalize outlook with different domain TLD', function () {
        assert.equal(normalizeEmail('john.otander@outlook.es'), 'john.otander@outlook.es')
        assert.equal(normalizeEmail('john.otander@outlook.it'), 'john.otander@outlook.it')
    })

    it('should not remove dots from outlook emails', function () {
        assert.equal(normalizeEmail('john.otander@outlook.com'), 'john.otander@outlook.com')
    })

    it('should normalize yahoo emails', function () {
        yahooEmailsToNormalize.forEach(function (email) {
            assert.equal(normalizeEmail(email), 'john.otander@yahoo.com')
        })
    })

    it('should not remove dots from yahoo emails', function () {
        assert.equal(normalizeEmail('john.otander@yahoo.com'), 'john.otander@yahoo.com')
    })

    it('should normalize yahoo with different domain TLD', function () {
        assert.equal(normalizeEmail('john.otander@yahoo.es'), 'john.otander@yahoo.es')
        assert.equal(normalizeEmail('john.otander@yahoo.it'), 'john.otander@yahoo.it')
    })

    it('should normalize iCloud emails', function () {
        icloudEmailsToNormalize.forEach(function (email) {
            assert.equal(normalizeEmail(email), 'john.otander@icloud.com')
        })
    })

    it('should not remove dots from iCloud emails', function () {
        assert.equal(normalizeEmail('john.otander@icloud.com'), 'john.otander@icloud.com')
    })

    it('should normalize iCloud with different domain TLD', function () {
        assert.equal(normalizeEmail('john.otander@icloud.es'), 'john.otander@icloud.es')
        assert.equal(normalizeEmail('john.otander@icloud.it'), 'john.otander@icloud.it')
    })
})
