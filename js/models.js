function Point(x, y, z, value) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.value = value;

    this.toString = () => {
        return `Point(x=${this.x + 1}, y=${this.y + 1}, z=${this.z + 1}, value=${this.value})`;
    }
}

function SpaceRequest(depth, pointA, pointB, points) {
    this.depth = depth;
    this.pointA = pointA;
    this.pointB = pointB;
    this.points = points;
}