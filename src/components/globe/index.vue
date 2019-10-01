<template>
    <canvas class="globe" ref="globe" v-bind:width="canvasWidth" v-bind:height="canvasHeight" v-on:mousedown="mousedownFunc" v-on:mousemove="mousemoveFunc" v-on:mouseleave="mouseleaveFunc" v-on:mouseup="mouseupFunc"></canvas>
</template>
<script>
export default {
    props: {
        globeRadius: {
            type: [Number],
            default: function () {
                return 200
            }
        },
        longitudeLineCount: {
            type: [Number],
            default: function () {
                return 18
            }
        },
        latitudeLineCount: {
            type: [Number],
            default: function () {
                return 17
            }
        },
        pointSize: {
            type: [Number],
            default: function () {
                return 3
            }
        },
        rotationSpeed: {
            type: [Number],
            default: function () {
                return 1
            }
        }
    },
    data: function () {
        return {
            canvasWidth: 600,
            canvasHeight: 600,
            ctx: null,
            visual: {
                x: 0,
                y: 0,
                z: 1000
            },
            pointList: [],
            offsetAngle: 0,
            enable: false,
            mouseOffsetX: 0,
            mouseOffsetY: 0,
            offsetX: 0,
            offsetY: 0,
            offsetZ: 0
        }
    },
    methods: {
        init: function () {
            this.ctx = this.$refs.globe.getContext('2d')
        },
        createPoint: function () {
            this.pointList = []
            for (let i = 0; i < this.latitudeLineCount; i++) {
                let y = Math.cos(180 / (this.latitudeLineCount + 1) * (i + 1) / 180 * Math.PI) * this.globeRadius
                let radius = Math.sin(180 / (this.latitudeLineCount + 1) * (i + 1) / 180 * Math.PI) * this.globeRadius
                let temp = []
                for (let j = 0; j < this.longitudeLineCount; j++) {
                    let angle = 360 / this.longitudeLineCount * j
                    let x = radius * Math.cos(angle / 180 * Math.PI)
                    let z = radius * Math.sin(angle / 180 * Math.PI)
                    temp.push({
                        originX: x,
                        originY: y,
                        originZ: z,
                        x,
                        y,
                        z,
                        radius,
                        size: 4
                    })
                }
                this.pointList.push(temp)
            }
        },
        computeProjectionDoordinate: function (point, offsetX = this.canvasWidth / 2, offsetY = this.canvasHeight / 2) {
            return [
                (point.x - this.visual.x) * this.visual.z / (this.visual.z - point.z) + offsetX,
                (point.y - this.visual.y) * this.visual.z / (this.visual.z - point.z) + offsetY
            ]
        },
        draw: function () {
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
            this.pointList.forEach(longitude => {
                longitude.forEach(item => {
                    this.ctx.beginPath()
                    let [x, y] = this.computeProjectionDoordinate(item)
                    this.ctx.arc(x, y, item.size, 0, 2 * Math.PI)
                    this.ctx.closePath()
                    this.ctx.fill()
                })
            })
        },
        animationFrame: function () {
            window.requestAnimationFrame(() => {
                this.pointList.forEach(longitude => {
                    longitude.forEach((item, index) => {
                        let originX = item.originX
                        let originY = item.originY
                        let originZ = item.originZ
                        let z = originZ * Math.cos(this.offsetY / 180 * Math.PI) - originX * Math.sin(this.offsetY / 180 * Math.PI)
                        let x = originX * Math.cos(this.offsetY / 180 * Math.PI) + originZ * Math.sin(this.offsetY / 180 * Math.PI)
                        originZ = z
                        originX = x
                        // z = item.z
                        // x = item.x
                        z = originZ * Math.cos(this.offsetX / 180 * Math.PI) - originY * Math.sin(this.offsetX / 180 * Math.PI)
                        let y = originY * Math.cos(this.offsetX / 180 * Math.PI) + originZ * Math.sin(this.offsetX / 180 * Math.PI)
                        originZ = z
                        originY = y
                        // z = item.z
                        // y = item.y
                        x = originX * Math.cos(this.offsetZ / 180 * Math.PI) - originY * Math.sin(this.offsetZ / 180 * Math.PI)
                        y = originY * Math.cos(this.offsetZ / 180 * Math.PI) + originX * Math.sin(this.offsetZ / 180 * Math.PI)
                        item.size = this.pointSize * this.visual.z / (this.visual.z - z)
                        item.x = x
                        item.y = y
                        item.z = z
                    })
                })
                // this.offsetAngle = this.offsetAngle + this.rotationSpeed
                this.draw()
                this.animationFrame()
            })
        },
        mousedownFunc: function (event) {
            this.enable = true
            this.mouseOffsetY = event.offsetX
            this.mouseOffsetX = event.offsetY
        },
        mousemoveFunc: function (event) {
            if (this.enable) {
                this.offsetY = this.offsetY + (event.offsetX - this.mouseOffsetY)
                this.offsetX = this.offsetX + (event.offsetY - this.mouseOffsetX)
                this.mouseOffsetX = event.offsetY % 360
                this.mouseOffsetY = event.offsetX % 360
                this.draw()
            }
        },
        mouseleaveFunc: function () {
            this.enable = false
        },
        mouseupFunc: function () {
            this.enable = false
        }
    },
    mounted: function () {
        this.init()
        this.createPoint()
        this.animationFrame()
    }
}
</script>
<style lang="stylus" scoped>
    .globe {
        border: 1px solid;
    }
</style>
