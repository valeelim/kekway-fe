<template>
    <div class="relative md:h-screen md:w-[30vw] lg:w-[24]">
        <vs-sidebar
            v-if="$vuetify.breakpoint.mdAndUp"
            v-model="active"
            open
            class="md:w-[30vw] md:max-w-[30vw] lg:w-[24] lg:max-w-[24vw]"
            square
            :class="[
                {
                    'bg-[#1b253d]': theme === 'dark',
                },
            ]">
            <template #logo>
                <div class="flex justify-center">
                    <img
                        src="~/assets/images/logo.png"
                        class="w-[50px] relative left-0 rotate-45" />
                    <div class="font-semibold pl-2 tracking-tight text-3xl">
                        kekway
                    </div>
                </div>
            </template>
            <button @click="$router.push('/')">
                <vs-sidebar-item
                    id="home"
                    class="my-5 lg:text-xl"
                    :class="{ active: active === 'home' }">
                    <template #icon>
                        <i class="bx bx-home"></i>
                    </template>
                    Home
                </vs-sidebar-item>
            </button>
            <button @click="showDialog = !showDialog" v-if="$auth.user">
                <vs-sidebar-item id="close-friend" class="my-5 lg:text-xl">
                    <template #icon>
                        <i class="bx bx-group"></i>
                    </template>
                    Close Friends
                </vs-sidebar-item>
            </button>
            <button
                v-if="$auth.user"
                @click="$router.push(`/profile/${$auth.user.username}`)">
                <vs-sidebar-item id="profile" class="my-5 lg:text-xl">
                    <template #icon>
                        <vs-avatar circle size="30">
                            <img :src="getPhoto($auth.user)"
                        /></vs-avatar>
                    </template>
                    Profile
                </vs-sidebar-item>
            </button>
            <a v-else href="/login">
                <vs-sidebar-item id="profile" class="my-5 lg:text-xl">
                    <template #icon>
                        <i class="bx bx-user-circle"></i>
                    </template>
                    Login / Register
                </vs-sidebar-item>
            </a>
            <vs-sidebar-group class="my-5 min-w-full">
                <template #header>
                    <button
                        @click="showUserSearch = !showUserSearch"
                        class="w-full">
                        <vs-sidebar-item arrow class="lg:text-xl">
                            <template #icon>
                                <i class="bx bx-search-alt"></i>
                            </template>
                            Search
                        </vs-sidebar-item>
                    </button>
                </template>
                <Transition name="slide-fade">
                    <vs-sidebar-item v-if="showUserSearch" class="w-full">
                        <vs-input
                            border
                            :loading="isFetchingUsers"
                            v-model="userSearch"
                            placeholder="Search"
                            class="w-full px-5 lg:text-lg" />
                        <div ref="userTable" class="mt-3">
                            <div v-for="user in userSearchList" :key="user.id">
                                <ProfileUserBox
                                    class="p-2"
                                    :userId="user.id"
                                    :hoverable="true"
                                    :center="true" />
                            </div>
                        </div>
                    </vs-sidebar-item>
                </Transition>
            </vs-sidebar-group>

            <template #footer>
                <vs-row justify="space-between">
                    <vs-switch v-model="darkMode" class="">
                        <template #on>
                            <i class="bx bxs-moon"></i>
                        </template>
                        <template #off>
                            <i class="bx bxs-sun"></i>
                        </template>
                    </vs-switch>

                    <div
                        v-if="$auth.user"
                        class="cursor-pointer text-3xl mr-3 mb-2 text-red-600"
                        @click="logout">
                        <i
                            class="bx bx-log-out-circle hover:text-red-400 relative"></i>
                    </div>
                </vs-row>
            </template>
        </vs-sidebar>

        <div v-else>
            <vs-navbar
                shadow
                square
                center-collapsed
                v-model="active"
                class="w-screen fixed h-[50px] flex items-center drop-shadow-md"
                :class="[{
                    'bg-[#070e1f]': theme === 'dark',
                    'bg-white': theme === 'light',
                }]">
                <template #left>
                    <vs-button
                        @click="activeSidebar = !activeSidebar"
                        flat
                        icon>
                        <i class="bx bx-menu"></i>
                    </vs-button>
                </template>
                <template #right>
                    <a
                        v-if="$auth.user"
                        class="flex"
                        :href="`/profile/${$auth.user.username}`">
                        <vs-avatar circle size="30">
                            <img :src="getPhoto($auth.user)"
                        /></vs-avatar>
                    </a>
                    <div v-else>
                        <a href="/login">
                            <vs-button size="small">Login</vs-button>
                        </a>
                    </div>
                </template>
            </vs-navbar>
            <vs-sidebar
                square
                class="w-[70vw] h-[100vh]"
                v-model="active"
                :open.sync="activeSidebar">
                <template #logo>
                    <div class="flex justify-center">
                        <img
                            src="~/assets/images/logo.png"
                            class="w-[50px] relative left-0" />
                        <div class="font-semibold pl-2 text-3xl tracking-tight">
                            kekway
                        </div>
                    </div>
                </template>
                <Transition name="slide-fade">
                    <button v-if="!showUserSearch" @click="$router.push('/')">
                        <vs-sidebar-item
                            id="home h"
                            class="my-5"
                            :class="{ active: active === 'home' }">
                            <template #icon>
                                <i class="bx bx-home"></i>
                            </template>
                            Home
                        </vs-sidebar-item>
                    </button>
                </Transition>
                <Transition name="slide-fade">
                    <button
                        v-if="!showUserSearch && $auth.user"
                        @click="showDialog = !showDialog">
                        <vs-sidebar-item id="close-friend" class="my-5">
                            <template #icon>
                                <i class="bx bx-group"></i>
                            </template>
                            Close Friends
                        </vs-sidebar-item>
                    </button>
                </Transition>
                <Transition name="slide-fade">
                    <button
                        v-if="$auth.user && !showUserSearch"
                        @click="
                            $router.push(`/profile/${$auth.user.username}`)
                        ">
                        <vs-sidebar-item id="profile" class="my-5">
                            <template #icon>
                                <vs-avatar circle size="30">
                                    <img :src="getPhoto($auth.user)"
                                /></vs-avatar>
                            </template>
                            Profile
                        </vs-sidebar-item>
                    </button>
                    <a v-else-if="!showUserSearch" href="/login">
                        <vs-sidebar-item id="profile" class="my-5">
                            <template #icon>
                                <i class="bx bx-user-circle"></i>
                            </template>
                            Login / Register
                        </vs-sidebar-item>
                    </a>
                </Transition>
                <div class="w-full">
                    <vs-sidebar-group class="my-5 min-w-0">
                        <template #header>
                            <button
                                @click="showUserSearch = !showUserSearch"
                                class="w-full">
                                <vs-sidebar-item arrow>
                                    <template #icon>
                                        <i class="bx bx-search-alt"></i>
                                    </template>
                                    Search
                                </vs-sidebar-item>
                            </button>
                        </template>
                        <Transition name="slide-fade">
                            <vs-sidebar-item
                                v-if="showUserSearch"
                                class="w-full">
                                <vs-input
                                    border
                                    :loading="isFetchingUsers"
                                    v-model="userSearch"
                                    placeholder="Search"
                                    class="w-full px-5 text-lg text-white" />
                                <div ref="userTable" class="mt-3 min-h-[100px]">
                                    <div
                                        v-for="user in userSearchList"
                                        :key="user.id">
                                        <ProfileUserBox
                                            class="p-2"
                                            :userId="user.id"
                                            :hoverable="true"
                                            :center="true" />
                                    </div>
                                </div>
                            </vs-sidebar-item>
                        </Transition>
                    </vs-sidebar-group>
                </div>

                <template #footer class="p-0">
                    <vs-row justify="space-between">
                        <vs-switch v-model="darkMode" class="">
                            <template #on>
                                <i class="bx bxs-moon"></i>
                            </template>
                            <template #off>
                                <i class="bx bxs-sun"></i>
                            </template>
                        </vs-switch>

                        <div
                            v-if="$auth.user"
                            class="cursor-pointer text-3xl mr-3 mb-2 text-red-600"
                            @click="logout">
                            <i
                                class="bx bx-log-out-circle hover:text-red-400 relative"></i>
                        </div>
                    </vs-row>
                </template>
            </vs-sidebar>
        </div>

        <div
            :class="[
                {
                    'bg-[#1b253d]': theme === 'dark',
                },
            ]">
            <vs-dialog v-model="showDialog" :loading="isFetchingFriend" :auto-width="$vuetify.breakpoint.xs">
                <h1 class="text-md md:text-xl font-bold text-center w-full mb-4">
                    Your Close Friends
                </h1>

                <div v-for="friend in closeFriends" :key="friend.id">
                    <ProfileUserBox
                        class="p-2"
                        @input="input"
                        :userId="friend.id"
                        :hoverable="true"
                        :center="true" />
                </div>
            </vs-dialog>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";

    export default {
        data() {
            return {
                active: "home",
                darkMode: false,

                activeSidebar: false,

                showLogoutTooltip: false,
                showDialog: false,
                showUserSearch: false,

                isFetchingFriend: false,
                isFetchingUsers: false,

                userSearch: "",

                closeFriends: [],
                userSearchList: [],
            };
        },
        mounted() {
            this.darkMode = this.theme === "dark";
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
            input() {
                this.showDialog = false;
            },
            async logout() {
                await this.$auth.logout().catch((err) => {
                    this.$vs.notification({
                        progress: "auto",
                        color: "#146e27",
                        title: "Login Successful",
                        position: "top-center",
                    })
                });
                location.reload();
            },
            findUsers() {
                this.isFetchingUsers = true;
                
                this.$services.account
                    .getUsersBySubstring(
                        this.$auth.strategy.token.get("local"),
                        {
                            filter: this.userSearch,
                        }
                    )
                    .then((data) => {
                        this.userSearchList = data;
                    })
                    .catch((err) => {
                    })
                    .finally(() => {
                        this.isFetchingUsers = false;
                    })
            },
            getPhoto(user) {
                if (user.profile_photo)
                    return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/${user.profile_photo}`;
                return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqDOokdSSPwYnjA0qJUmuOwi53yPCySZ7WpqBCspRDew&s";
            },
        },
        watch: {
            darkMode() {
                if (this.darkMode) {
                    this.setTheme("dark");
                    this.$vs.setColor("background", "#1b253d");
                    this.$vs.setColor("text", "#FFF");
                } else {
                    this.setTheme("light");
                    this.$vs.setColor("background", "#FFF");
                    this.$vs.setColor("text", "rgb(44, 62, 80)");
                }
            },

            showDialog(val) {
                if (val) {
                    this.isFetchingFriend = true;

                    this.$services.account
                        .getCloseFriends(this.$auth.strategy.token.get("local"))
                        .then((data) => {
                            this.closeFriends = data;
                            this.isFetchingFriend = false;
                        })
                        .catch((err) => {
                            
                        });
                }
            },

            userSearch(val) {
                if (val) {
                    this.findUsers();
                }
            },
        },
    };
</script>

<style>
    .slide-fade-leave-active {
        transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateY(20px);
        opacity: 0;
    }
    .vs-input {
        width: 100%;
    }
    .vs-sidebar__item__text {
        font-size: inherit;
    }
    .vs-sidebar__item__icon {
        background-color: inherit;
        color: inherit;
    }
    .vs-sidebar__group__content {
        height: auto !important;
    }
</style>
