class Line {
    constructor (a, b, c, d, z, start, end, gap) {
        this.a = a
        this.b = b
        this.c = c
        this.d = d
        this.z = z
        this.start = start
        this.end = end
        this.gap = gap
        this.pointList = []
        this.computePointList()
    }
    computePointList () {
        this.pointList = []
        for (let i = this.start; i <= this.end; i = i + this.gap) {
            let x = i
            let y = this.a * Math.sin((this.b * x + this.c) / 180 * Math.PI) + this.d
            let offset = i
            this.pointList.push({
                x,
                y,
                z: this.z,
                originX: x,
                offset
            })
        }
    }
    updatePointList (rotationAngleSpeed, visual) {
        this.pointList.forEach(item => {
            let x = item.x
            // let y = item.y
            let z = item.z
            item.x = x * Math.cos(rotationAngleSpeed / 180 * Math.PI) - z * Math.sin(rotationAngleSpeed / 180 * Math.PI)
            item.z = z * Math.cos(rotationAngleSpeed / 180 * Math.PI) + x * Math.sin(rotationAngleSpeed / 180 * Math.PI)
            item.y = this.a * Math.sin((this.b * item.originX + this.c + item.offset) / 180 * Math.PI) + this.d
            item.canvasX = (item.x - visual.x) * visual.z / (visual.z - z)
            item.canvasY = (item.y - visual.y) * visual.z / (visual.z - z)
        })
    }
}
export default Line
