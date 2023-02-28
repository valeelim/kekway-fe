<template>
    <div class="flex grow divide-x min-h-screen"
    :class="[{
        'divide-slate-100 divide-opacity-30': theme === 'dark',
        'divide-slate-900 divide-opacity-20': theme === 'light'
    }]">
        <div class="w-full lg:w-3/4 pt-5">
            <div v-if="user" class="flex flex-col items-center">
                <TweetCreateBox @addTweet="addTweet" />
            </div>
            <div
                v-if="isLoadingTweets"
                class="flex items-center justify-center">
                <v-progress-circular :size="70" color="#56ADEE" indeterminate>
                </v-progress-circular>
            </div>
            <div
                v-for="tweet in tweets"
                :key="tweet.id"
                class="flex flex-col items-center">
                <TweetBox
                    class="my-3"
                    :tweet="tweet"
                    @deleteTweet="deleteTweet"
                    @editTweet="editTweet" />
            </div>
        </div>
        <div class="hidden lg:block pl-4 pt-5 max-w-[200px]">
            <ProfileUserBox v-if="user" :userId="user.id" :key="user.id" />
            <a v-else href="/login">
                <vs-button>
                    Login
                </vs-button>
            </a>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        data() {
            return {
                tweets: [],
                isAnonymous: true,
                user: this.$auth.user,
                isLoadingTweets: true,
            };
        },
        mounted() {
            this.$services.tweet
                .getAllValidTweets(this.$auth.strategy.token.get("local"))
                .then((data) => {
                    this.tweets = data;
                })
                .catch((err) => {
                    
                })
                .finally(() => {
                    this.isLoadingTweets = false;
                });
        },
        computed: {
            ...mapGetters({
                theme: "theme/getTheme",
            }),
        },
        methods: {
            deleteTweet(tweet) {
                this.tweets = this.tweets.filter((tw) => tw.id !== tweet.id);
            },
            addTweet(tweet) {
                this.tweets.push(tweet);
            },
            editTweet(tweet) {
                const idx = this.tweets.findIndex((tw) => tw.id === tweet.id);
                this.tweets[idx] = tweet;
                this.$forceUpdate();
            },
        },
    };
</script>

<style></style>
