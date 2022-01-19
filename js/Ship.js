function Ship(length) {
    return {
        length,
        hits: new Array(length).fill().map(() => ({ hit: false })),
        sunk: false,
        getLength: function() {
            return this.length;
        },
        hit: function(position) {
            if (position > length || position < 0) return;
            // if (this.hits[position].hit) return;
            this.hits[position].hit = true;
        },
        isSunk: function() {
            return this.hits.every((position) => position.hit)
        }
    }
}

module.exports = Ship;