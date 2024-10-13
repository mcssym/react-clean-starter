import { ViewModel } from '@foundation/core/system/state/view-model';
import type { PartialPropertiesOf } from '@foundation/supports/types';

export class MainViewState {
    constructor(_: PartialPropertiesOf<MainViewState>) {
    }
}

export class MainViewModel extends ViewModel<MainViewState> {
    static readonly token = Symbol('MainViewModel');

    constructor() {
        super(properties => new MainViewState(properties));
    }
}
