<template>
    <div
        class="flex flex-col border rounded-md px-3 sm:px-4 pt-2 sm:pt-3 pb-2 sm:pb-5 border-opacity-20 w-10/12 cursor-pointer shadow-md max-w-full"
        :class="[
            {
                'hover:bg-slate-100 hover:bg-opacity-5': !editMode,
                'border-sky-200 shadow-gray-400/5': theme === 'dark',
                'border-slate-800': theme === 'light',
            },
        ]">
        <div
            class="flex flex-col divide-y divide-slate-700"
            :class="{ 'divide-opacity-20': theme === 'light' }">
            <div class="flex mb-4 w-full">
                <ProfileUserBox :userId="tweet.owner" class="w-3/4"/>
                <v-chip
                    v-if="tweet.close_only"
                    class="ma-2 px-[8px] sm:px-[12px]"
                    outlined
                    :dark="theme === 'dark'">
                    <p
                        class="text-green-500"
                        v-if="$vuetify.breakpoint.lgAndUp">
                        Close Friend Only
                    </p>
                    <p class="text-green-500" v-else>
                        <i class="bx bx-group"></i>
                    </p>
                </v-chip>
                <div
                    class="relative"
                    v-if="$auth.user && $auth.user.id === tweet.owner">
                    <i
                        class="bx bx-dots-vertical-rounded text-xl sm:text-2xl hover:text-gray-500"
                        @click="toggleMenu"
                        v-click-outside="closeMenu"></i>
                    <div
                        v-if="menuIsOpen"
                        class="rounded-xl border border-sky-100 border-opacity-30 min-w-[80px] sm:min-w-[100px] h-[70px] sm:h-[90px] absolute right-0 sm:left-[10px] bg-[#09132b] flex flex-col justify-center sm:py-4 text-gray-300">
                        <div
                            v-if="tweet.owner === $auth.user.id"
                            class="text-cyan-500 pl-2 sm:pl-3 py-2 text-xs sm:text-sm hover:bg-gray-400/30"
                            @click="editMode = true">
                            <i class="pr-2 bx bx-edit"></i>Edit
                        </div>
                        <div
                            v-if="tweet.owner === $auth.user.id"
                            class="text-red-500 pl-2 sm:pl-3 py-2 hover:bg-gray-400/30 text-xs sm:text-sm"
                            @click="deleteTweet">
                            <i class="pr-2 bx bxs-message-square-x"></i>Delete
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-if="!editMode"
                class="sm:ml-[4.5rem] mt-[-11px] cursor-text whitespace-pre-wrap pt-2 pb-5 text-sm sm:text-lg"
                :class="[
                    {
                        'text-slate-300': theme === 'dark',
                        'text-black': theme === 'light',
                    },
                ]">
                <p>{{ tweet.desc }}</p>
            </div>
            <div class="mb-1 sm:mb-3" v-else>
                <div>
                    <v-textarea
                        :rows="$vuetify.breakpoint.smAndUp ? '6' : '2'"
                        v-model="temporaryTweet.desc"
                        :dark="theme"
                        auto-grow></v-textarea>
                </div>
                <div class="flex justify-between mt-[-7px]">
                    <div class="grow">
                        <vs-checkbox
                            v-if="editMode"
                            success
                            v-model="temporaryTweet.close_only"
                            class="float-left text-lg text-gray-400 mt-[-12px] sm:mt-0">
                            <template #icon>
                                <i class="bx bx-check-double"></i>
                            </template>
                            <p v-if="$vuetify.breakpoint.mdAndUp">
                                Close friend only
                            </p>
                            <p v-else class="text-xl">
                                <i class="bx bx-group"></i>
                            </p>
                        </vs-checkbox>
                    </div>
                    <div class="w-full mt-[-10px] flex justify-end">
                        <vs-button
                            @click="cancel"
                            :size="$vuetify.breakpoint.smAndUp ? '' : 'small'"
                            class="h-[30px] w-[70px] sm:h-[40px] sm:w-[80px] sm:text-sm inline-block focus:shadow-md focus:shadow-white/20"
                            danger>
                            <i class="bx bx-x text-"></i>
                            Cancel
                        </vs-button>
                        <vs-button
                            @click="save"
                            :size="$vuetify.breakpoint.smAndUp ? '' : 'small'"
                            class="h-[30px] w-[70px] sm:h-[40px] sm:w-[80px] sm:text-sm inline-block focus:shadow-md focus:shadow-white/20">
                            <i class="bx bx-send mr-1 sm:mr-2"></i>
                            Save
                        </vs-button>
                    </div>
                </div>
            </div>
            <div class="text-xs sm:text-sm pt-3 opacity-50">
                {{ getCreatedAt }}
                <p
                    class="font-thin text-xs sm:text-sm inline"
                    v-if="
                        $moment(tweet.created_at).unix() !==
                        $moment(tweet.last_updated).unix()
                    ">
                    (
                    <span v-if="$vuetify.breakpoint.mdAndUp">
                        last edited: {{ getLastUpdated }}
                    </span>
                    <span v-else>
                        <i class="bx bx-edit-alt"></i>{{ getLastUpdated }}
                    </span>
                    )
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        props: {
            tweet: {
                type: Object,
                required: true,
            },
        },
        mounted() {},
        data() {
            return {
                menuIsOpen: false,
                editMode: false,
                temporaryTweet: {
                    desc: "",
                    close_only: false,
                },
            };
        },
        computed: {
            ...mapGetters({
                theme: "theme/getTheme",
            }),
            getCreatedAt() {
                const date = new Date(this.tweet.created_at);
                return this.$moment(date).fromNow(true);
            },
            getLastUpdated() {
                const date = new Date(this.tweet.last_updated);
                return this.$moment(date).fromNow(true);
            },
        },
        watch: {
            editMode(val) {
                if (val === true && this.temporaryTweet.desc === "") {
                    this.temporaryTweet = { ...this.tweet };
                }
            },
        },
        methods: {
            toggleMenu() {
                this.menuIsOpen = !this.menuIsOpen;
            },
            closeMenu() {
                if (this.menuIsOpen) {
                    this.menuIsOpen = false;
                }
            },
            deleteTweet() {
                const loading = this.$vs.loading({
                    type: "circles",
                });
                this.$services.tweet
                    .deleteTweet(this.$auth.strategy.token.get("local"), {
                        tweet_id: this.tweet.id,
                    })
                    .then((data) => {
                        loading.close();
                        this.$emit("deleteTweet", this.tweet);
                    })
                    .catch((err) => {
                        console.log("DELETE ERROR", err);
                    });
            },
            save() {
                if (
                    this.$_.isEqual(this.tweet, this.temporaryTweet) ||
                    this.temporaryTweet.desc === ""
                ) {
                    this.editMode = false;
                    return;
                }

                const loading = this.$vs.loading({
                    type: "circles",
                });

                this.$services.tweet
                    .editTweet(this.$auth.strategy.token.get("local"), {
                        tweet_id: this.tweet.id,
                        desc: this.temporaryTweet.desc,
                        close_only: this.temporaryTweet.close_only,
                    })
                    .then((data) => {
                        this.editMode = false;
                        this.temporaryTweet = { ...data };
                        loading.close();
                        this.$emit("editTweet", data);
                    })
                    .catch((err) => {
                        console.log("EDIT TWEET ERROR", err);
                    });
            },
            cancel() {
                this.editMode = false;
            },
        },
    };
</script>

<style>
    .theme--light.v-chip {
        border-color: rgb(6, 165, 6);
    }
</style>
