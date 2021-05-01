import { BaseUrlResolver, ResolvedMediaItem } from "../BaseResolver";


export class UploadeverResolver extends BaseUrlResolver {
    constructor() {
        super({
            domains: [/https?:\/\/(uploadever)/],
            useCookies: true
        });
    }

    async resolveInner(_urlToResolve: string): Promise<ResolvedMediaItem[]> {
        const response = await this.gotInstance(_urlToResolve);
        const response2Body = await this.postHiddenForm(response.url, response.body);        
        var link = await this.xInstance(response2Body, '.download-button', 'a@href');
        const title = this.extractFileNameFromUrl(link);
        const result = {
            link,
            title,
            isPlayable: true
        } as ResolvedMediaItem;
        return [result];
    }
}
