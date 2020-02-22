var Xray = require('x-ray')
var x = Xray()
var helper = require('../helpers');
const got = require('got');
const { CookieJar } = require('tough-cookie');

var BaseUrlResolver = require('../BaseResolver');
const FormData = require('form-data');

class RacatyResolver extends BaseUrlResolver {
    constructor() {
        super();
        this.domains = ['https://racaty'];
    }

    async resolveInner(_urlToResolve) {
        var links = [];
        const cookieJar = new CookieJar();
        const response = await got(_urlToResolve, { cookieJar });
        const hidden = await helper.getHiddenForm(response.body);

        const form = new FormData();
        for (const key in hidden) {
            form.append(key, hidden[key]);
        }
        const response2 = await got.post(_urlToResolve, {
            body: form,
            cookieJar: cookieJar
        });

        const finalLink = await x(response2.body, '#DIV_1>a@href');
        if (finalLink) {
            const title = decodeURIComponent(new URL(finalLink).pathname.split('/').slice(-1)[0]);
            links.push(BaseUrlResolver.prototype.createResult(title, finalLink, '', true));
        }
        return links;
    }
}

module.exports = RacatyResolver;