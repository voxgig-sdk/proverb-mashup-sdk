import { ProverbMashupEntityBase } from '../ProverbMashupEntityBase';
import type { ProverbMashupSDK } from '../ProverbMashupSDK';
import type { Control } from '../types';
import type { Mashup, MashupLoadMatch } from '../ProverbMashupTypes';
declare class MashupEntity extends ProverbMashupEntityBase<Mashup> {
    constructor(client: ProverbMashupSDK, entopts: any);
    make(this: MashupEntity): MashupEntity;
    load(this: any, reqmatch?: MashupLoadMatch, ctrl?: Control): Promise<MashupEntity>;
}
export { MashupEntity };
