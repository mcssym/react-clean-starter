import { Expose, instanceToPlain } from 'class-transformer';
import { type PropertiesOf } from 'foundation/supports/types';

const NOMINAL = Symbol('SaveDTO');

export class SaveDTO {
    [NOMINAL]: symbol = NOMINAL;
    @Expose()
    readonly content: string;

    constructor(data: PropertiesOf<SaveDTO>) {
        this.content = data.content;
    }

    toData(): Record<string, any> {
        return instanceToPlain(this, {
            excludeExtraneousValues: true,
            exposeUnsetFields: false,
        })
    }
}
