import DataType from "../core/data-types/dataType.interface";
import FieldType from "./fieldType.interface";
import DateDataType from "../core/data-types/dateDataType";

export default class DateFieldType implements FieldType {

    getDataType(): DataType {
        return new DateDataType();
    }

    getType(): string {
        return "date"
    }

    validateDefinition(fieldDefinition: any): boolean {
        return !!fieldDefinition.name
    }
}
