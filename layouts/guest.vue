<template>
    <div class="h-screen flex gradient">
        <Nuxt />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters({
            theme: 'theme/getTheme',
        })
    }

}
</script>

<style>
.gradient {
    background-image: linear-gradient(to right top, #051937, #09284a, #0c395e, #0d4a73, #0b5c87);
}
</style>