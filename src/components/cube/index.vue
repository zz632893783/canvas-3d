<template>
    <div class="cube">
        <canvas ref="cube" v-bind:width="canvasWidth" v-bind:height="canvasHeight"></canvas>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            canvasWidth: 600,
            canvasHeight: 400,
            ctx: null,
            visual: {
                x: 0,
                y: 0,
                z: 300
            },
            pointMap: {
                A: [-50, 50, 50],
                B: [-50, 50, -50],
                C: [50, 50, -50],
                D: [50, 50, 50],
                E: [-50, -50, 50],
                F: [-50, -50, -50],
                G: [50, -50, -50],
                H: [50, -50, 50]
            }
        }
    },
    methods: {
        init: function () {
            this.ctx = this.$refs.cube.getContext('2d')
        },
        transformCoordinatePoint: function (x, y, z, offsetX = this.canvasWidth / 2, offsetY = this.canvasHeight / 2) {
            return {
                x: (x - this.visual.x) * this.visual.z / (this.visual.z - z) + offsetX,
                y: (y - this.visual.y) * this.visual.z / (this.visual.z - z) + offsetY
            }
        },
        draw: function () {
            let point
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
            // 绘制矩形ABCD
            this.ctx.beginPath()
            point = this.transformCoordinatePoint(...this.pointMap.A)
            this.ctx.moveTo(point.x, point.y)
            point = this.transformCoordinatePoint(...this.pointMap.B)
            this.ctx.lineTo(point.x, point.y)
            point = this.transformCoordinatePoint(...this.pointMap.C)
            this.ctx.lineTo(point.x, point.y)
            point = this.transformCoordinatePoint(...this.pointMap.D)
            this.ctx.lineTo(point.x, point.y)
            this.ctx.closePath()
            this.ctx.stroke()
            // 绘制矩形EFGH
            this.ctx.beginPath()
            point = this.transformCoordinatePoint(...this.pointMap.E)
            this.ctx.moveTo(point.x, point.y)
            point = this.transformCoordinatePoint(...this.pointMap.F)
            this.ctx.lineTo(point.x, point.y)
            point = this.transformCoordinatePoint(...this.pointMap.G)
            this.ctx.lineTo(point.x, point.y)
            point = this.transformCoordinatePoint(...this.pointMap.H)
            this.ctx.lineTo(point.x, point.y)
            this.ctx.closePath()
            this.ctx.stroke()
            // 绘制直线AE
            this.ctx.beginPath()
            point = this.transformCoordinatePoint(...this.pointMap.A)
            this.ctx.moveTo(point.x, point.y)
            point = this.transformCoordinatePoint(...this.pointMap.E)
            this.ctx.lineTo(point.x, point.y)
            this.ctx.stroke()
            this.ctx.closePath()
            // 绘制直线BF
            this.ctx.beginPath()
            point = this.transformCoordinatePoint(...this.pointMap.B)
            this.ctx.moveTo(point.x, point.y)
            point = this.transformCoordinatePoint(...this.pointMap.F)
            this.ctx.lineTo(point.x, point.y)
            this.ctx.stroke()
            this.ctx.closePath()
            // 绘制直线CD
            this.ctx.beginPath()
            point = this.transformCoordinatePoint(...this.pointMap.C)
            this.ctx.moveTo(point.x, point.y)
            point = this.transformCoordinatePoint(...this.pointMap.G)
            this.ctx.lineTo(point.x, point.y)
            this.ctx.stroke()
            this.ctx.closePath()
            // 绘制直线DH
            this.ctx.beginPath()
            point = this.transformCoordinatePoint(...this.pointMap.D)
            this.ctx.moveTo(point.x, point.y)
            point = this.transformCoordinatePoint(...this.pointMap.H)
            this.ctx.lineTo(point.x, point.y)
            this.ctx.stroke()
            this.ctx.closePath()
        },
        animationFrame: function () {
            let rotationAngle = 1
            window.requestAnimationFrame(() => {
                for (let key in this.pointMap) {
                    let point = this.pointMap[key]
                    let x = point[0]
                    let y = point[1]
                    let z = point[2]
                    point[0] = x * Math.cos(rotationAngle / 180 * Math.PI) - z * Math.sin(rotationAngle / 180 * Math.PI)
                    point[1] = y
                    point[2] = z * Math.cos(rotationAngle / 180 * Math.PI) + x * Math.sin(rotationAngle / 180 * Math.PI)
                }
                this.draw()
                this.animationFrame()
            })
        }
    },
    mounted: function () {
        this.init()
        this.animationFrame()
    }
}
</script>
<style lang="stylus" scoped>
    .cube {
        canvas {
            border: 1px solid;
        }
    }
</style>
