<template>
    <div class="home">
        <!-- <cube></cube> -->
        <!-- <globe></globe> -->
        <wave></wave>
    </div>
</template>
<script>
// import cube from '@/components/cube/index'
// import globe from '@/components/globe/index'
import wave from '@/components/wave/index'
export default {
    components: {
        // cube,
        // globe
        wave
    },
    data: function () {
        return {
            msg: 'home'
        }
    }
}
</script>
<style lang="stylus" scoped></style>
