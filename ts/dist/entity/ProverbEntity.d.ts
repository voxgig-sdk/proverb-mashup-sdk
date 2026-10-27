import { ProverbMashupEntityBase } from '../ProverbMashupEntityBase';
import type { ProverbMashupSDK } from '../ProverbMashupSDK';
import type { Control } from '../types';
import type { Proverb, ProverbLoadMatch, ProverbListMatch } from '../ProverbMashupTypes';
declare class ProverbEntity extends ProverbMashupEntityBase<Proverb> {
    constructor(client: ProverbMashupSDK, entopts: any);
    make(this: ProverbEntity): ProverbEntity;
    load(this: any, reqmatch?: ProverbLoadMatch, ctrl?: Control): Promise<ProverbEntity>;
    list(this: any, reqmatch?: ProverbListMatch, ctrl?: Control): Promise<ProverbEntity[]>;
}
export { ProverbEntity };
