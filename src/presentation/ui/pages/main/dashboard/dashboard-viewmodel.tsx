import { ViewModel } from '@foundation/core/system/state/view-model';
import type { PartialPropertiesOf } from '@foundation/supports/types';

export class DashboardViewState {
    constructor(_: PartialPropertiesOf<DashboardViewState>) {
    }
}

export class DashboardViewModel extends ViewModel<DashboardViewState> {
    static readonly token = Symbol('DashboardViewModel');

    constructor() {
        super(properties => new DashboardViewState(properties));
    }
}
