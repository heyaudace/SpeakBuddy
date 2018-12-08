class ArrayQueue<T> {
    private dataPoints: Array<T>;
    constructor (public capacity: number, init: Array<T> = null) {
        this.dataPoints = new Array<T>();
        if(init != null) {
            init.forEach(this.add);
        }
    }

    /**
     * Adds new element to the queue. Removes the first element from the
     * queue if the queue is currently at maximum capacity.
     * @param element element to add
     */
    public add ( element: T) {
        if(this.dataPoints.length == this.capacity) {
            this.dataPoints.shift()
        }
        this.dataPoints.push(element);
    }

    /**
     * Remove the first element from the queue and return it.
     */
    public pop(): T {
        let elem: T = this.dataPoints[0];
        this.dataPoints.shift();
        return elem;
    }

    /**
     * Return the current number of elements on the queue
     */
    public count(): number {
        return this.dataPoints.length;
    }

    /**
     * Returns the element at a given index in the queue(counted from the first element)
     * @param index index of the element to be returned
     */
    public getAt(index: number): T {
        return this.dataPoints[index];
    }

    /**
     * Get another queue that is part of this.
     * @param start position of the first element
     * @param end position+1 of the last element
     * @param capacity capacity of the new array. set to start-end if not specified
     */
    public subQueue(start: number, end: number, capacity: number = start - end): ArrayQueue<T> {
        return new ArrayQueue(capacity, this.dataPoints.slice(start, end));
    }

    public arrayData() : Array<T> {
        return this.dataPoints;
    }

}