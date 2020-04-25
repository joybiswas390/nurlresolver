var Xray = require('x-ray')
var x = Xray()
const got = require('got');

var BaseUrlResolver = require('../BaseResolver');

class CloudMailRuResolver extends BaseUrlResolver {
    constructor() {
        super();
        this.domains = ['https://cloud.mail.ru'];
    }

    async resolveInner(_urlToResolve) {
        var links = [];
        try {
            const response = await got(_urlToResolve);
            var title = await x(response.body, 'title');
            var regex01 = /"weblink_get"\s*:\s*\[.+?"url"\s*:\s*"([^"]+)/gs
            var regex02 = /"tokens"\s*:\s*{\s*"download"\s*:\s*"([^"]+)/gs
            var regex03 = /public\/(.*)/g

            var link1 = regex01.exec(response.body)[1];
            //var link2 = regex02.exec(response.body);
            var link3 = regex03.exec(_urlToResolve)[1];

            var finalLink = `${link1}/${link3}`;//?key=${link2}`;
            var headers = await got.head(finalLink);
            (headers.statusCode === 200) &&
                links.push(BaseUrlResolver.prototype.createResult(title, finalLink, '', true));
        } catch (error) {
            console.log(`Error occurred while parsing cloudmailru link: ${_urlToResolve}`);
        }
        return links;
    }
}

module.exports = CloudMailRuResolver;