import { ProverbMashupEntityBase } from '../ProverbMashupEntityBase';
import type { ProverbMashupSDK } from '../ProverbMashupSDK';
import type { Control } from '../types';
import type { Random, RandomLoadMatch } from '../ProverbMashupTypes';
declare class RandomEntity extends ProverbMashupEntityBase<Random> {
    constructor(client: ProverbMashupSDK, entopts: any);
    make(this: RandomEntity): RandomEntity;
    load(this: any, reqmatch?: RandomLoadMatch, ctrl?: Control): Promise<RandomEntity>;
}
export { RandomEntity };
