import { BaseUrlResolver, ResolvedMediaItem } from "../BaseResolver";

export class UploadRajaResolver extends BaseUrlResolver {
    constructor() {
        super({
            domains: [/https?:\/\/uploadraja/],
            speedRank: 90
        });
    }

    async resolveInner(_urlToResolve: string): Promise<ResolvedMediaItem | ResolvedMediaItem[]> {
        const response = await this.gotInstance(_urlToResolve);
        const response2 = await this.postHiddenForm(response.url, response.body, 0, false);
        const link = response2.headers['location'];
        if (link) {
            const title = this.extractFileNameFromUrl(link);
            const result = {
                link,
                title,
                isPlayable: true
            } as ResolvedMediaItem;
            return [result];
        }
        return [];
    }
}