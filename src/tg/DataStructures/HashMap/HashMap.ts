import { Hashable } from "./Hashable";

/**
 * A hash map implementation backed by a cuckoo hash table.
 * The following implementation is closely based on
 * the Java implementation by Keith Schwarz (htiek@cs.stanford.edu).
 *
 * According to [1], the max load factor for three hash tables
 * appears to be around 0.91 based on experiments.
 * We chose 0.7, well below that threshold to minimize rehashing.
 *
 * [1]  Mitzenmacher, Michael. "Some open questions related to cuckoo hashing."
 *      European Symposium on Algorithms. Springer Berlin Heidelberg, 2009.
 */
export class HashMap<K extends Hashable, V> {
    private static readonly initialCapacity = 16;
    private static readonly maxLoadFactor = 0.7;
    private static readonly numHashFunctions = 3;

    private hashFunctions: HashFunction<K>[] = new Array(
        HashMap.numHashFunctions);
    private tables: (Entry<K, V> | undefined)[][] = new Array(
        HashMap.numHashFunctions);
    private count = 0;

    /**
     * @param initialCapacity The number of elements that the hash map will
     * hold before having to grow and rehash.
     */
    constructor(initialCapacity: number = HashMap.initialCapacity) {
        const capacity = Math.floor(
            initialCapacity / HashMap.maxLoadFactor / HashMap.numHashFunctions);

        for (let i = 0; i < HashMap.numHashFunctions; i++) {
            this.tables[i] = new Array(capacity);
        }

        this.generateHashFunctions();
    }

    /**
     * @param key Key for the associated value.
     * @param value Value to be associated with the key.
     */
    put(key: K, value: V): void {
        // Check if the key is already in the map
        // and replace the value in that case.
        for (let i = 0; i < HashMap.numHashFunctions; i++) {
            const hash = this.hashFunctions[i].hash(key);
            const entry = this.tables[i][hash];

            if (typeof entry !== "undefined" && entry.key.equals(key)) {
                entry.value = value;
                return;
            }
        }

        const maxLoad = HashMap.maxLoadFactor
            * HashMap.numHashFunctions
            * this.tables[0].length;
        if (this.count >= maxLoad) {
            this.grow();
        }

        // Try to insert the entry, rehashing until success.
        let toInsert: any = new Entry<K, V>(key, value);
        while (true) {
            toInsert = this.tryInsertEntry(toInsert);
            if (typeof toInsert === "undefined") {
                break;
            }
            this.rehash();
        }
        this.count++;
    }

    /**
     * @param key The key to look up.
     * @returns {any} The value associated with the key or undefined.
     */
    get(key: K): V | undefined {
        for (let i = 0; i < HashMap.numHashFunctions; i++) {
            const hash = this.hashFunctions[i].hash(key);
            const entry = this.tables[i][hash];

            if (typeof entry !== "undefined" && entry.key.equals(key)) {
                return entry.value;
            }
        }

        return undefined;
    }

    /**
     * @param key The key to remove.
     */
    remove(key: K): V | undefined {
        for (let i = 0; i < HashMap.numHashFunctions; i++) {
            const hash = this.hashFunctions[i].hash(key);
            const entry = this.tables[i][hash];

            if (typeof entry !== "undefined" && entry.key.equals(key)) {
                this.tables[i][hash] = undefined;
                this.count--;
                return entry.value;
            }
        }

        return undefined;
    }

    get size(): number {
        return this.count;
    }

    /**
     * @returns {Array} An array of all entries of the hash table.
     */
    get entries(): Array<Entry<K, V>> {
        let entries = [];
        for (let i = 0; i < HashMap.numHashFunctions; i++) {
            for (let j = 0; j < this.tables[i].length; j++) {
                const entry = this.tables[i][j];
                if (typeof entry !== "undefined") {
                    entries.push(entry);
                }
            }
        }

        return entries;
    }

    /**
     * Executes the provided function once for each entry in the hash map.
     * @param body Function to execute for each entry,
     * taking two arguments: key and value.
     */
    forEach(body: (key: K, value: V) => void): void {
        for (const entry of this.entries) {
            body(entry.key, entry.value);
        }
    }

    /**
     * @returns {Array} An array containing just the keys of the hash map.
     */
    get keys(): Array<K> {
        return this.entries.map(entry => {
            return entry.key
        });
    }

    /**
     * Generate new hash functions for the hash table.
     */
    private generateHashFunctions() {
        for (let i = 0; i < HashMap.numHashFunctions; i++) {
            this.hashFunctions[i] = randomHashFunction(this.tables[0].length);
        }
    }

    /**
     * Increase the size of the table to accommodate all entries and rehash.
     */
    private grow() {
        const newCapacity = this.tables[0].length * 2;
        for (let i = 0; i < HashMap.numHashFunctions; i++) {
            this.tables[i].length = newCapacity;
        }
        this.rehash();
    }

    /**
     * Recompute the hash values of the entries and place them accordingly.
     */
    private rehash() {
        const entries = this.entries;
        reinsert: while (true) {
            // Clear the tables
            for (let i = 0; i < HashMap.numHashFunctions; i++) {
                for (let j = 0; j < this.tables[i].length; j++) {
                    this.tables[i][j] = undefined;
                }
            }
            this.generateHashFunctions();
            // Try to insert all entries.
            // Rehash again if we can't insert some entry.
            for (let entry of entries) {
                if (typeof this.tryInsertEntry(entry) !== "undefined") {
                    continue reinsert;
                }
            }
            // Break the loop on success
            break;
        }
    }

    /**
     * Try to insert the entry into the hash table.
     * @param toInsert
     * @returns {any} The last displaced entry or undefined if all collisions
     * were resolved.
     */
    private tryInsertEntry(toInsert: Entry<K, V>): Entry<K, V> | undefined {
        // Try to insert the entry into one of the hash tables
        // switching between them.
        for (let numTries = 0; numTries < this.count + 1; numTries++) {
            const hash = this.hashFunctions
                [numTries % HashMap.numHashFunctions].hash(toInsert.key);
            const entry = this.tables
                [numTries % HashMap.numHashFunctions][hash];

            // The slot is free
            if (typeof entry === "undefined") {
                this.tables[numTries % HashMap.numHashFunctions][hash]
                    = toInsert;

                return undefined;
            }

            // The slot is taken, displace the element with the one to insert
            // and try to find a new slot for the displaced element.
            this.tables[numTries % HashMap.numHashFunctions][hash] = toInsert;
            toInsert = entry;
        }

        // Return the last displaced element if the number of tries exceeded
        // the number of entries
        return toInsert;
    }
}

class Entry<K extends Hashable, V> {
    readonly key: K;
    value: V;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }
}

class HashFunction<K extends Hashable> {
    /**
     * @param a First coefficient
     * @param b Second coefficient
     * @param lgSize Base-two log size of the number of buckets.
     */
    constructor(private a: number, private b: number, private lgSize: number) {}

    hash(object: K): number {
        // Split the object's hash value into upper and lower bits
        const objHash = object.hashValue;
        const upper = objHash >>> 16;
        const lower = objHash & (0xffff);

        // Product of the bits shifted so that only lgSize bits remain
        return (upper * this.a + lower * this.b) >>> (32 - this.lgSize);
    }
}

const randomHashFunction = <K extends Hashable>(buckets: number): HashFunction<K> => {
    return new HashFunction(randomInt(), randomInt(), Math.log2(buckets) >>> 0);
};

const randomInt = (): number => {
    const max = 2 ** 32 - 1;
    return Math.floor(Math.random() * max);
};