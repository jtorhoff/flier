import { Hashable } from "./HashMap/Hashable";
import { HashMap } from "./HashMap/HashMap";

export class LRUCache<K extends Hashable, V> {
    private map = new HashMap<K, Node<K, V>>();
    private list = new LinkedList<K, V>();

    constructor(readonly capacity: number) {
        if (capacity < 1) {
            throw new Error();
        }
    }

    get(key: K) {
        const node = this.map.get(key);
        if (node) {
            this.list.unlink(node);
            this.list.linkFirst(key, node.value);

            return node.value;
        }
        return undefined;
    }

    put(key: K, value: V) {
        const node = this.map.get(key);
        if (node) {
            this.list.unlink(node);

            const newNode = this.list.linkFirst(key, value);
            this.map.put(key, newNode);
            return;
        }

        if (this.map.size === this.capacity) {
            this.map.remove(this.list.getLast()!.key);
            this.list.unlinkLast();
        }

        this.map.put(key, this.list.linkFirst(key, value));
    }
}

class Node<K, V> {
    next?: Node<K, V>;
    previous?: Node<K, V>;

    constructor(readonly key: K, readonly value: V) {

    }
}

class LinkedList<K, V> {
    private first?: Node<K, V>;
    private last?: Node<K, V>;

    linkFirst(key: K, value: V) {
        const first = this.first;
        const newNode = new Node(key, value);
        newNode.next = first;

        this.first = newNode;
        if (first) {
            first.previous = newNode;
        } else {
            this.last = newNode;
        }
        if (!first) {
            this.last = newNode;
        }

        return newNode;
    }

    unlink(node: Node<K, V>) {
        const next = node.next;
        const previous = node.previous;

        if (previous) {
            previous.next = next;
            node.previous = undefined;
        } else {
            this.first = next;
        }

        if (next) {
            next.previous = previous;
            node.next = undefined;
        } else {
            this.last = previous;
        }
    }

    unlinkLast() {
        if (!this.last) {
            throw new Error();
        }
        const previous = this.last.previous;
        this.last.previous = undefined;
        this.last = previous;
        if (previous) {
            previous.next = undefined;
        } else {
            this.first = undefined;
        }
    }

    getLast() {
        return this.last;
    }
}
