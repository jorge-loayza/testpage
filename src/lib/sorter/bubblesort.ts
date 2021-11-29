import { sleep } from '../util/sleep';
import { Item, SortComparator } from './';
import { Cancellation, Delay } from '../util/operation';

export async function bubbleSort(data: Item[], comparator: SortComparator, delay: Delay, stopping: Cancellation) {
    let n = data.length - 1;
    do {
        for (var i = 0; i < n; i++) {
            if(stopping.cancelRequested) break;
            let cur = data[i];
            let next = data[i + 1];
            cur.active = true;
            next.active = true;
            if (comparator(cur,next)) {
                await sleep(delay.delay);
                cur.swapping  = true;
                next.swapping = true;
                await sleep(delay.delay);
                let temp = cur.value;
                cur.value = next.value;
                next.value = temp;
                cur.swapping  = false;
                next.swapping = false;
            }
            await sleep(delay.delay);
            cur.active = false;
            next.active = false;
        }
        if(!stopping.cancelRequested) data[n].finalrun = true;
        n--;
    } while (n && !stopping.cancelRequested);
    if(!stopping.cancelRequested) data[0].finalrun = true;
}

