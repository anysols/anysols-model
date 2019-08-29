import {DatabaseConfiguration, DatabaseConnection} from "./connection";
import {FieldType, CollectionService} from "./collection-service";
import OperationInterceptor from "./collection-service/operation-interceptor/operationInterceptor";
import Collection from "./collection-service/collection/collection";

const privates = new WeakMap();

export default class AnysolsODM {

    constructor() {
        const collectionService = new CollectionService();
        privates.set(this, {collectionService});
    }

    async connect(config: any) {
        if (!config)
            throw new Error("AnysolsODM::connect -> There is no config provided");
        const dbConfig = new DatabaseConfiguration(config.host, config.port, config.database, config.username, config.password, config.dialect);
        _setConnection(this, await DatabaseConnection.connect(dbConfig));
    }

    closeConnection(): Promise<void> {
        const conn = _getConnection(this);
        return conn.closeConnection();
    }

    databaseExists(): Promise<any> {
        let conn = _getConnection(this);
        return conn.databaseExists();
    }

    dropDatabase() {
        let conn = _getConnection(this);
        return conn.dropDatabase();
    }

    defineCollection(schemaJson: any) {
        const collectionService = _getCollectionService(this);
        collectionService.defineCollection(schemaJson);
    }

    collection(collectionName: string): Collection {
        const collectionService = _getCollectionService(this);
        return collectionService.collection(collectionName);
    }

    addFieldType(fieldType: FieldType) {
        const collectionService = _getCollectionService(this);
        collectionService.addFieldType(fieldType);
    }

    addInterceptor(operationInterceptor: OperationInterceptor) {
        const collectionService = _getCollectionService(this);
        collectionService.addInterceptor(operationInterceptor);
    }

}

/**
 * PRIVATE METHODS
 */
function _setConnection(that: any, conn: DatabaseConnection) {
    privates.get(that).conn = conn;
    _getCollectionService(that).setConnection(conn);
}

function _getConnection(that: any): DatabaseConnection {
    let conn = privates.get(that).conn;
    if (!conn)
        throw new Error("AnysolsODM::getConn -> There is no active connection");
    return conn;
}

function _getCollectionService(that: any): CollectionService {
    privates.get(that).collectionService.setConnection(_getConnection(that));
    return privates.get(that).collectionService;
}
