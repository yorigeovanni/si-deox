import { MMKV } from 'react-native-mmkv';
//#################################################
// OFLINE STORAGE 
//===================================================
const STORAGE_KEYS = {
    OFFLINE_QUEUE: 'OFFLINE_QUEUE',
    OFFLINE_DATA: 'OFFLINE_DATA',
    NETWORK_STATE: 'NETWORK_STATE'
};


export class OfflineStore {
    static storage = new MMKV({
        id: 'offline-store',
        encryptionKey: 'your-secret-key'
    });

    // Queue Management
    static getQueue() {
        const queue = this.storage.getString(STORAGE_KEYS.OFFLINE_QUEUE);
        return queue ? JSON.parse(queue) : [];
    }

    static saveQueue(queue) {
        this.storage.set(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(queue));
    }

    static addToQueue(item) {
        const queue = this.getQueue();
        queue.push({
            ...item,
            id: Date.now().toString(),
            timestamp: Date.now(),
            status: 'pending'
        });
        this.saveQueue(queue);
    }

    static removeFromQueue(itemId) {
        const queue = this.getQueue();
        const newQueue = queue.filter(item => item.id !== itemId);
        this.saveQueue(newQueue);
    }

    // Offline Data Management
    static getOfflineData(model) {
        const data = this.storage.getString(`${STORAGE_KEYS.OFFLINE_DATA}_${model}`);
        return data ? JSON.parse(data) : [];
    }

    static saveOfflineData(model, data) {
        this.storage.set(`${STORAGE_KEYS.OFFLINE_DATA}_${model}`, JSON.stringify(data));
    }

    static addOfflineData(model, data) {
        const existingData = this.getOfflineData(model);
        const newData = Array.isArray(data) ? data : [data];
        this.saveOfflineData(model, [...existingData, ...newData]);
    }

    static updateOfflineData(model, id, updates) {
        const data = this.getOfflineData(model);
        const updatedData = data.map(item => 
            item.id === id ? { ...item, ...updates } : item
        );
        this.saveOfflineData(model, updatedData);
    }

    static removeOfflineData(model, id) {
        const data = this.getOfflineData(model);
        const filteredData = data.filter(item => item.id !== id);
        this.saveOfflineData(model, filteredData);
    }

    // Sync Management
    static async syncQueue() {
        const queue = this.getQueue();
        const failedItems = [];

        for (const item of queue) {
            try {
                item.status = 'processing';
                this.saveQueue(queue);

                switch (item.action) {
                    case 'create':
                        await createModelData(item.model, item.data);
                        this.removeOfflineData(item.model, item.data.id);
                        break;
                    case 'update':
                        await updateModelData(item.model, item.data.id, item.data);
                        this.updateOfflineData(item.model, item.data.id, item.data);
                        break;
                    case 'delete':
                        await deleteModelData(item.model, item.data.id);
                        this.removeOfflineData(item.model, item.data.id);
                        break;
                }

                this.removeFromQueue(item.id);
            } catch (error) {
                //console.error(`Failed to sync item ${item.id}:`, error);
                item.status = 'failed';
                failedItems.push(item);
            }
        }

        this.saveQueue(failedItems);
        return failedItems.length === 0;
    }
}













