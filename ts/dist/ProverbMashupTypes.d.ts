export interface Mashup {
    card: string;
    from: any[];
    halves: any[];
    join: string;
    lang: string;
    mashup: string;
    permalink: string;
    seed: string;
}
export interface MashupLoadMatch {
    lang?: string;
    seed?: string;
}
export interface Proverb {
    first: string;
    id: string;
    join: string;
    lang: string;
    "proverb-mashup_id": number;
    second: string;
    source: Record<string, any>;
    text: string;
    url: string;
}
export interface ProverbLoadMatch {
    id: number;
    lang: string;
}
export interface ProverbListMatch {
    join?: string;
    lang?: string;
    page?: number;
    per_page?: number;
}
export interface Random {
    first: string;
    id: number;
    join: string;
    lang: string;
    second: string;
    source: Record<string, any>;
    text: string;
    url: string;
}
export interface RandomLoadMatch {
    lang?: string;
}
export interface Today {
    card: string;
    from: any[];
    halves: any[];
    join: string;
    lang: string;
    mashup: string;
    permalink: string;
    seed: string;
}
export interface TodayLoadMatch {
    lang?: string;
}
