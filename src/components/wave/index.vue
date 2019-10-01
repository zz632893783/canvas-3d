<template>
    <canvas class="wave" ref="wave" v-bind:width="canvasWidth" v-bind:height="canvasHeight"></canvas>
</template>
<script>
import Line from './line'
export default {
    props: {},
    data: function () {
        return {
            canvasWidth: 600,
            canvasHeight: 400,
            ctx: null,
            visual: {
                x: 0,
                y: -100,
                z: 1000
            },
            lineList: [
                new Line(20, 2, 0, 0, -150, -200, 200, 10),
                new Line(20, 2, 0, 0, -120, -200, 200, 10),
                new Line(20, 2, 0, 0, -90, -200, 200, 10),
                new Line(20, 2, 0, 0, -60, -200, 200, 10),
                new Line(20, 2, 0, 0, -30, -200, 200, 10),
                new Line(20, 2, 0, 0, 0, -200, 200, 10),
                new Line(20, 2, 0, 0, 30, -200, 200, 10),
                new Line(20, 2, 0, 0, 60, -200, 200, 10),
                new Line(20, 2, 0, 0, 90, -200, 200, 10),
                new Line(20, 2, 0, 0, 120, -200, 200, 10),
                new Line(20, 2, 0, 0, 150, -200, 200, 10)
            ],
            lineOffset: 0,
            rotationAngleSpeed: 1
        }
    },
    methods: {
        init: function () {
            this.ctx = this.$refs.wave.getContext('2d')
        },
        draw: function () {
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
            this.lineList.forEach(line => {
                line.pointList.forEach(item => {
                    this.ctx.beginPath()
                    this.ctx.arc(item.canvasX + this.canvasWidth / 2, item.canvasY + this.canvasHeight / 2, 2, 0, 2 * Math.PI)
                    this.ctx.closePath()
                    this.ctx.fill()
                })
            })
        },
        animationFrame: function () {
            window.requestAnimationFrame(() => {
                this.lineList.forEach((line, index) => {
                    line.c = this.lineOffset + index * 30
                    line.updatePointList(this.rotationAngleSpeed, this.visual)
                })
                this.lineOffset = this.lineOffset + 1
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
    .wave {
        border: 1px solid;
    }
</style>
