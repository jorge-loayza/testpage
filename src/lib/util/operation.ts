export class Cancellation {
    private _cancelRequested: boolean = false

    get cancelRequested(): boolean {
        return this._cancelRequested;
    }
    stop() {
        this._cancelRequested = true;
    }
}

export class Delay {
    private _delay: number = 0;
    get delay(): number {
        return this._delay;
    }
    set(delay: number) {
        this._delay = delay;
    }
}