import { ProverbMashupEntityBase } from '../ProverbMashupEntityBase';
import type { ProverbMashupSDK } from '../ProverbMashupSDK';
import type { Control } from '../types';
import type { Today, TodayLoadMatch } from '../ProverbMashupTypes';
declare class TodayEntity extends ProverbMashupEntityBase<Today> {
    constructor(client: ProverbMashupSDK, entopts: any);
    make(this: TodayEntity): TodayEntity;
    load(this: any, reqmatch?: TodayLoadMatch, ctrl?: Control): Promise<TodayEntity>;
}
export { TodayEntity };
