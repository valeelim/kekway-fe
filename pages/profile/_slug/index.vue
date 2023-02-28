<template>
    <div class="flex-col w-full items-center">
        <div
            class="border rounded-lg border-opacity-20 min-h-[90vh] mx-2 my-3 sm:my-4 lg:mx-10  relative shadow-2xl"
            :class="[
                {
                    'border-sky-200 shadow-cyan-400/10': theme === 'dark',
                    '': theme === 'light',
                },
            ]">
            <div
                class="w-[95%] mx-auto aspect-video h-[25vh] sm:h-[30vh] lg:h-[40vh] relative overflow-hidden">
                <img
                    class="mt-5 object-cover h-full w-full"
                    src="~/assets/images/wall.jpg" />
            </div>
            <div class="min-h-[100px] sm:min-h-[200px] relative flex">
                <div
                    class="flex absolute top-[-40px] left-[10%] sm:left-[40px] lg:top-[-50px] lg:left-[100px]">
                    <div
                        class="rounded-[50%] absolute bg-[#080d1a] left-[-5px] w-[120px] top-[-5px] sm:left-[-9px] sm:w-[218px] aspect-square"
                        :class="[
                            {
                                'bg-[#0F172A]': theme === 'dark',
                                'bg-white': theme === 'light',
                            },
                        ]"></div>
                    <vs-avatar
                        circle
                        :size="$vuetify.breakpoint.smAndUp ? '200' : '110'"
                        class="hover:cursor-pointer aspect-square"
                        @click="photoEvent">
                        <img :src="getPhoto(profile)" />
                    </vs-avatar>
                    <div
                        v-if="editProfile"
                        @click="photoEvent"
                        class="absolute bottom-2 left-2 rounded-[50%] bg-[#080d1a] w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] flex justify-center items-center z-10 shadow-md shadow-gray-400/30 cursor-pointer hover:bg-opacity-80"
                        :class="[
                            {
                                'bg-white text-black': theme === 'light',
                            },
                        ]">
                        <i
                            class="bx bx-pencil text-lg sm:text-3xl"
                            :class="{
                                'hover:text-gray-400': theme === 'dark',
                            }"></i>
                    </div>
                    <div
                        class="relative ml-3 sm:ml-4 flex flex-col top-[45px] sm:top-[60px] w-full">
                        <div class="w-full">
                            <span
                                v-if="!editProfile"
                                class="inline-block text-lg sm:text-3xl font-bold truncate max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[400px]">
                                {{ profile.name }}
                            </span>
                            <span
                                v-else
                                class="inline-block sm:block sm:text-xl font-bold h-[30px] sm:h-[42px]">
                                <vs-input
                                    v-model="temporaryProfile.name"
                                    class="customInput inline w-auto">
                                    <template #icon>
                                        <i class="bx bx-rename"></i>
                                    </template>
                                </vs-input>
                            </span>
                            <i
                                v-if="
                                    !editProfile &&
                                    $auth.user &&
                                    $route.params.slug === $auth.user.username
                                "
                                class="float-right bx bx-edit text-xl sm:text-4xl ml-4 text-gray-400 cursor-pointer "
                                :class="[
                                    {
                                        'hover:text-black': theme === 'light',
                                        'hover:text-white': theme === 'dark',
                                    },
                                ]"
                                @click="editProfile = true"></i>
                        </div>
                        <span
                            v-if="!editProfile"
                            class="text-md mt-[-10px] sm:mt-0 sm:text-2xl text-gray-400">
                            @{{ profile.username }}
                        </span>
                        <span
                            v-else
                            class="inline-block sm:block h-[30px] sm:h-[42px] sm:text-lg font-bold sm:pt-2">
                            <vs-input
                                v-model="temporaryProfile.username"
                                class="customInput inline w-auto">
                                <template #icon>
                                    <i class="bx bx-at"></i>
                                </template>
                            </vs-input>
                        </span>
                        <div v-if="editProfile" class="mt-1 sm:mt-4">
                            <i
                                class="bx bx-check text-2xl sm:text-4xl ml-4 text-gray-400 cursor-pointer"
                                :class="[
                                    {
                                        'hover:text-black': theme === 'light',
                                        'hover:text-white': theme === 'dark',
                                    },
                                ]"
                                @click="saveProfileEdit"></i>
                            <i
                                class="bx bx-x text-2xl sm:text-4xl ml-4 text-gray-400 cursor-pointer"
                                :class="{
                                    'hover:text-black': theme === 'light',
                                    'hover:text-white': theme === 'dark',
                                }"
                                @click="editProfile = false"></i>
                        </div>
                        <div
                            v-if="
                                $auth.user &&
                                $route.params.slug !== $auth.user.username
                            "
                            class="sm:mt-4 w-min">
                            <vs-tooltip
                                @mouseenter.native="hoveringCloseFriend = true"
                                @mouseleave.native="
                                    hoveringCloseFriend = false
                                ">
                                <i
                                    v-if="hoveringCloseFriend && isCloseFriend"
                                    class="bx bx-user-x text-gray-400 text-2xl sm:text-4xl cursor-pointer hover:text-red-500"
                                    @click="removeCloseFriend"></i>
                                <i
                                    v-else-if="isCloseFriend"
                                    class="bx bx-user-check text-2xl sm:text-4xl cursor-pointer text-green-600"></i>
                                <i
                                    v-else
                                    class="bx bx-user-plus text-gray-400 text-2xl sm:text-4xl cursor-pointer hover:text-gray-100"
                                    @click="makeCloseFriend"></i>
                                <template #tooltip>
                                    <p v-if="isCloseFriend">
                                        Remove from close friend
                                    </p>
                                    <p v-else>Add to close friend</p>
                                </template>
                            </vs-tooltip>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full flex flex-col items-center mb-10">
                <TweetCreateBox
                    v-if="
                        $auth.user && $route.params.slug === $auth.user.username
                    "
                    @addTweet="addTweet" />
                <div
                    v-for="tweet in tweets"
                    :key="tweet.id"
                    class="flex flex-col items-center w-full mt-5">
                    <TweetBox
                        :tweet="tweet"
                        @deleteTweet="deleteTweet"
                        @editTweet="editTweet" />
                </div>
            </div>
        </div>
        <form enctype="multipart/form-data" ref="photoForm">
            <input
                type="file"
                class="hidden"
                ref="uploadPhoto"
                accept="image/*"
                name="photo"
                @change="onPhotoSelected" />
        </form>
        <vs-dialog not-close auto-width not-padding v-model="showPhotoDialog">
            <img :src="getPhoto(profile)" alt="" />
        </vs-dialog>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        data() {
            return {
                profile: {
                    id: "",
                    email: "",
                    name: "",
                    username: "",
                    profile_photo: "",
                },
                temporaryProfile: {},
                tweets: [],
                isCloseFriend: false,
                hoveringCloseFriend: false,
                showPhotoDialog: false,
                editProfile: false,

                isLoading: false,
            };
        },
        mounted() {
            this.$services.account
                .getUserByUsername(
                    this.$auth.strategy.token.get("local"),
                    this.$route.params.slug
                )
                .then((data) => {
                    this.profile = data;
                    this.temporaryProfile = { ...data };
                });

            this.$services.tweet
                .getUserTweets(
                    this.$auth.strategy.token.get("local"),
                    this.$route.params.slug
                )
                .then((data) => {
                    this.tweets = data;
                })
                .catch((err) => {
                    // HANDLE ERROR
                });

            if (this.$auth.user) {
                this.$services.account
                    .getCloseFriends(this.$auth.strategy.token.get("local"))
                    .then((data) => {
                        if (
                            data.find(
                                (user) => user.username === this.$route.params.slug
                            ) !== undefined
                        ) {
                            this.isCloseFriend = true;
                        }
                    })
                    .catch((err) => {
                    });
            }
        },
        computed: {
            ...mapGetters({
                theme: "theme/getTheme",
            }),
        },
        watch: {
            editProfile(val) {
                if (!val) {
                    this.temporaryProfile = { ...this.profile };
                }
            },
        },
        methods: {
            getPhoto(user) {
                if (user.profile_photo) {
                    return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/${user.profile_photo}`;
                }
                return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqDOokdSSPwYnjA0qJUmuOwi53yPCySZ7WpqBCspRDew&s";
            },
            photoEvent() {
                if (
                    this.$auth.user &&
                    this.$route.params.slug === this.$auth.user.username &&
                    this.editProfile
                )
                    this.$refs.uploadPhoto.click();
                else this.showPhotoDialog = !this.showPhotoDialog;
            },
            onPhotoSelected() {
                const formData = new FormData(this.$refs.photoForm);
                this.$services.account
                    .uploadProfilePhoto(
                        this.$auth.strategy.token.get("local"),
                        formData
                    )
                    .then((data) => {
                        this.$vs.notification({
                            progress: "auto",
                            color: "#146e27",
                            title: "Profile photo successfully changed",
                            position: "top-center",
                        });

                        setTimeout(() => {
                            location.reload();
                        }, 400);
                    })
                    .catch((err) => {

                    });
            },
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
            removeCloseFriend() {
                const loading = this.$vs.loading({
                    text: 'Removing from close friend :(',
                    type: 'circles'
                })

                this.$services.account
                    .removeCloseFriend(this.$auth.strategy.token.get("local"), {
                        friended_id: this.profile.id,
                    })
                    .then((data) => {
                        this.isCloseFriend = false;
                    })
                    .catch((err) => {
                    })
                    .finally(() => {
                        loading.close();
                    })
            },
            makeCloseFriend() {
                const loading = this.$vs.loading({
                    text: 'Making new friend',
                    type: 'circles'
                })
                this.$services.account
                    .makeCloseFriend(this.$auth.strategy.token.get("local"), {
                        friended_id: this.profile.id,
                    })
                    .then((data) => {
                        this.isCloseFriend = true;
                    })
                    .catch((err) => {
                    })
                    .finally(() => {
                        loading.close();
                    })
            },
            saveProfileEdit() {
                const loading = this.$vs.loading({
                    text: 'Saving User',
                    type: 'circles'
                })

                this.$services.account
                    .editBiodata(
                        this.$auth.strategy.token.get("local"),
                        this.temporaryProfile
                    )
                    .then((data) => {
                        this.profile = data;
                        this.temporaryProfile = { ...data };
                        this.$auth.setUser(data);
                        this.$router.push(`/profile/${data.username}`)
                    })
                    .catch((err) => {
                        this.$vs.notification({
                            title: 'Something went wrong',
                            text: `Error listed here: ${response.data.message}`
                        })
                    })
                    .finally(() => {
                        this.editProfile = false;
                        loading.close();
                    })
            },
        },
    };
</script>

<style>
    .customInput .vs-input-content .vs-input {
        background: inherit;
        color: inherit;
    }
    .customInput .vs-input-content {
        position: relative;
        width: auto;
    }
    .customInput .vs-input-content .vs-input__icon {
        background: inherit;
    }
</style>
