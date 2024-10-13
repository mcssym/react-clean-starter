import { ViewModel } from '@foundation/core/system/state/view-model';
import type { PartialPropertiesOf } from '@foundation/supports/types';

export class AppointmentViewState {
    constructor(_: PartialPropertiesOf<AppointmentViewState>) {
    }
}

export class AppointmentViewModel extends ViewModel<AppointmentViewState> {
    static readonly token = Symbol('AppointmentViewModel');

    constructor() {
        super(properties => new AppointmentViewState(properties));
    }
}
