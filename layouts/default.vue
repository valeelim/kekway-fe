<template>
    <div
        class="flex flex-col md:flex-row min-h-screen h-auto"
        :class="`theme--${theme}`">
        <div class="md:h-screen md:w-[30vw] lg:w-[24vw]">
            <BaseSidebar />
        </div>
        <div class="grow mt-12 md:mt-0">
            <Nuxt />
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";

    export default {
        data() {
            return {};
        },
        mounted() {
            this.$vs.setColor("primary", "#0ea5e9");
            this.$moment.locale("en", {
                relativeTime: {
                    future: "in %s",
                    past: "%s ago",
                    s: "seconds",
                    ss: "%ss",
                    m: "a minute",
                    mm: "%dm",
                    h: "an hour",
                    hh: "%dh",
                    d: "a day",
                    dd: "%dd",
                    M: "a month",
                    MM: "%dM",
                    y: "a year",
                    yy: "%dY",
                },
            });
        },
        computed: {
            ...mapGetters({
                theme: "theme/getTheme",
            }),
        },
        methods: {
            ...mapActions({
                setTheme: "theme/setTheme",
            }),
        },
    };
</script>

<style>
    .theme--dark {
        background-color: #0f172a;
        color: white;
    }
    .theme---light {
        background-color: #f3f2ef;
        color: black;
    }
</style>
