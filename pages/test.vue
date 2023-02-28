<template>
    <div class="">
        <vs-dialog v-model="displayUserGroup" width="80vw">
            <div class="flex flex-col centered mt-3">
                <h3>{{ onDisplayGroupName }} Group Members</h3>
            </div>
        </vs-dialog>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        data() {
            return {
                on: true,
                displayUserGroup: true,
            };
        },
        computed: {
            ...mapGetters({
                theme: "theme/getTheme",
            }),
        },
    };
</script>
