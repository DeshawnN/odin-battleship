export default function Ship(length) {
    return {
        length,
        hits: new Array(length).fill().map(() => ({ hit: false })),
        sunk: false,
        getLength: function() {
            return this.length;
        },
        hit: function(position) {
            if (position > length || position < 0) return;
            this.hits[position].hit = true;
            this.isSunk();
        },
        isSunk: function() {
            const sunkStatus = this.hits.every((position) => position.hit);
            if (sunkStatus) {
                this.setSunkStatus(true);
            }
        },
        setSunkStatus: function(sunkStatus) {
            this.sunk = sunkStatus;
        }
    }
}