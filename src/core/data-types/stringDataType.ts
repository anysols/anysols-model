import DataType from "./dataType.interface";

export default class StringDataType extends DataType {

    config: any;

    constructor(config: any = {}) {
        super();
        this.config = config;
    }

    transform() {
        return {
            "type": "string",
            "pattern": this.config.pattern
        }
    }

}
