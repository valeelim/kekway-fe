<template>
    <div
        class="flex rounded-md border border-sky-200 border-opacity-10 w-10/12 pl-4 pr-7 pb-3 shadow-md"
        :class="[
            {
                'border-sky-200 shadow-gray-400/5': theme === 'dark',
                'border-slate-800': theme === 'light',
            },
        ]">
        <div class="pt-4">
            <vs-avatar circle :size="$vuetify.breakpoint.mdAndUp ? '60' : '50'">
                <img :src="getPhoto(profile)" />
            </vs-avatar>
        </div>
        <div class="flex flex-col ml-6">
            <div>
                <v-textarea
                    :rows="$vuetify.breakpoint.smAndUp ? '6' : '2'"
                    v-model="desc"
                    :dark="theme === 'dark'"
                    auto-grow
                    placeholder="How's your day?"
                    class="text-sm sm:text-lg"></v-textarea>
            </div>
            <div class="w-full mt-[-14px]">
                <vs-checkbox
                    success
                    v-model="closeFriendOnly"
                    class="float-left sm:text-md">
                    <template #icon>
                        <i class="bx bx-check-double"></i>
                    </template>
                    <p v-if="$vuetify.breakpoint.mdAndUp">Close friend only</p>
                    <p v-else class="text-xl"><i class="bx bx-group"></i></p>
                </vs-checkbox>

                <vs-button
                    @click="post"
                    class="w-[80px] float-right sm:text-sm"
                    :size="$vuetify.breakpoint.smAndUp ? '' : 'small'">
                    <i class="bx bx-send mr-2"></i>
                    Post
                </vs-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        data() {
            return {
                profile: {},
                desc: "",
                isLoading: false,
                closeFriendOnly: false,
            };
        },
        mounted() {
            this.profile = this.$auth.user;
        },
        computed: {
            ...mapGetters({
                theme: "theme/getTheme",
            }),
        },
        methods: {
            getPhoto(user) {
                if (user.profile_photo)
                    return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/${user.profile_photo}`;
                return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqDOokdSSPwYnjA0qJUmuOwi53yPCySZ7WpqBCspRDew&s";
            },
            post() {
                this.isLoading = true;

                const loading = this.$vs.loading({
                    text: "POSTING",
                    type: "gradient",
                });

                this.$services.tweet
                    .createTweet(this.$auth.strategy.token.get("local"), {
                        desc: this.desc,
                        close_only: this.closeFriendOnly,
                    })
                    .then((tweet) => {
                        this.$emit("addTweet", tweet);
                        this.desc = "";
                    })
                    .catch((err) => {
                        this.$vs.notification({
                            progress: "auto",
                            color: "#EF4444",
                            title: "Something went wrong",
                            position: "top-center",
                            text: `${JSON.stringify(
                                err.response.data.message
                            )}`,
                        })
                    })
                    .finally(() => {
                        loading.close();
                    })
            },
        },
    };
</script>

<style></style>
