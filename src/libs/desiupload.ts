import { GenericFormBasedResolver } from "../BaseResolver";

export class DesiuploadResolver extends GenericFormBasedResolver {
    constructor() {
        super({
            domains: [/https?:\/\/(dl\d{0,}.desiupload)/],
            useCookies: true,
            speedRank: 55
        }, '.downloadbtn a', 1);
    }
}
