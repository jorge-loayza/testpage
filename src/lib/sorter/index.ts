export * from './bubblesort';

export interface Item {
    value: number;
    active: boolean;
    swapping: boolean;
    finalrun: boolean;
    pivot: boolean;
}

export enum SortingAlg {
    bubble = 0,
    merge = 1,
    heap = 2
}

export type SortComparator = (a: Item, b: Item) => boolean;
