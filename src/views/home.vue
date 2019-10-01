<template>
    <div class="home">
        <cube></cube>
        <globe></globe>
    </div>
</template>
<script>
import cube from '@/components/cube/index'
import globe from '@/components/globe/index'
export default {
    components: {
        cube,
        globe
    },
    data: function () {
        return {
            msg: 'home'
        }
    }
}
</script>
<style lang="stylus" scoped></style>
