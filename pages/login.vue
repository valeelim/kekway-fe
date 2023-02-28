<template>
    <div class="w-1/2 h-screen flex justify-center items-center">
        <div
            class="absolute top-3 left-3 text-gray-200 flex items-center hover:text-opacity-60 cursor-pointer"
            @click="$router.push('/')">
            <i class="bx bx-left-arrow-alt text-2xl md:text-4xl"></i>
            <i class="bx bx-home ml-[-3px] text-3xl md:text-5xl"></i>
        </div>
        <div
            class="rounded-lg flex flex-initial flex-col md:h-auto md:w-[450px] text-black bg-white/60 shadow-md px-1 py-1"
            :class="[
                {
                    'shadow-white': theme === 'dark',
                },
            ]">
            <div
                class="flex justify-around font-semibold text-md md:text-lg pt-2 max-h-[50px]">
                <div
                    @click="active = 'login'"
                    class="ml-5 text-black bg-white w-1/2 border shadow-inner text-center py-2 hover:cursor-pointer hover:bg-gray-100/80"
                    :class="{ 'bg-opacity-80': active === 'login' }">
                    Login
                </div>
                <div
                    @click="active = 'signup'"
                    class="mr-5 text-black w-1/2 border shadow-inner text-center py-2 hover:cursor-pointer hover:bg-gray-100/80 bg-white"
                    :class="{ 'bg-opacity-80': active === 'signup' }">
                    Sign Up
                </div>
            </div>
            <div
                v-if="active === 'login'"
                class="mx-2 mb-3 py-10 border shadow-2xl grow flex flex-col justify-center items-center bg-white rounded-md text-black text-sm md:text-base">
                <div class="mx-4 md:mx-0">
                    <p class="ml-3">Email</p>
                    <vs-input
                        border
                        v-model="email"
                        placeholder="Type your email"
                        class="mb-7 md:mb-10">
                        <template #icon>
                            <i class="bx bx-envelope"></i>
                        </template>
                    </vs-input>
                </div>
                <div>
                    <p class="ml-3">Password</p>
                    <vs-input
                        border
                        v-model="password"
                        placeholder="Type your password"
                        type="password"
                        :visiblePassword="hasVisiblePassword"
                        @click-icon="hasVisiblePassword = !hasVisiblePassword">
                        <template #icon>
                            <i
                                v-if="!hasVisiblePassword"
                                class="bx bx-show-alt"></i>
                            <i v-else class="bx bx-hide"></i>
                        </template>
                    </vs-input>
                </div>
                <vs-button
                    :loading="isLoading"
                    @click="login"
                    square
                    class="rounded-sm mt-10 md:mt-12 w-40 text-sm md:w-60 md:text-base shadow-xl">
                    <p class="tracking-widest">LOGIN</p>
                </vs-button>
            </div>
            <div
                v-else
                class="mx-2 mb-3 py-10 border shadow-2xl grow flex flex-col justify-center items-center bg-white rounded-md text-black text-sm md:text-base">
                <div class="mx-4 md:mx-0">
                    <p class="ml-3">Email</p>
                    <vs-input
                        border
                        v-model="email"
                        placeholder="Type your email"
                        class="mb-5 md:mb-10">
                        <template #icon>
                            <i class="bx bx-envelope"></i>
                        </template>
                    </vs-input>
                </div>
                <div class="mx-3 md:mx-0">
                    <p class="ml-3">Username</p>
                    <vs-input
                        border
                        v-model="username"
                        placeholder="Type your username"
                        class="mb-5 md:mb-10 custom">
                        <template #icon>
                            <i class="bx bx-at"></i>
                        </template>
                    </vs-input>
                </div>
                <div class="mx-3 md:mx-0">
                    <p class="ml-3">Name</p>
                    <vs-input
                        border
                        v-model="name"
                        placeholder="Type your name"
                        class="mb-5 md:mb-10">
                        <template #icon>
                            <i class="bx bx-user"></i>
                        </template>
                    </vs-input>
                </div>
                <div>
                    <p class="ml-3">Password</p>
                    <vs-input
                        border
                        v-model="password"
                        placeholder="Type your password"
                        type="password"
                        :visiblePassword="hasVisiblePassword"
                        @click-icon="hasVisiblePassword = !hasVisiblePassword">
                        <template #icon>
                            <i
                                v-if="!hasVisiblePassword"
                                class="bx bx-show-alt"></i>
                            <i v-else class="bx bx-hide"></i>
                        </template>
                    </vs-input>
                </div>
                <vs-button
                    :loading="isLoading"
                    @click="register"
                    square
                    class="rounded-sm mt-8 w-40 md:mt-12 md:w-60 text-sm md:text-base shadow-xl">
                    <p class="tracking-widest">REGISTER</p>
                </vs-button>
            </div>
        </div>
    </div>
</template>
<script scoped>
    import { mapGetters } from "vuex";

    export default {
        layout: "guest",
        data() {
            return {
                email: "",
                password: "",
                username: "",
                name: "",
                active: "login",

                isLoading: false,
                hasVisiblePassword: false,
            };
        },
        mounted() {},
        computed: {
            ...mapGetters({
                theme: "theme/getTheme",
            }),
        },
        methods: {
            login() {
                this.isLoading = true;

                this.$auth
                    .loginWith("local", {
                        data: {
                            email: this.email,
                            password: this.password,
                        },
                    })
                    .then((data) => {
                        this.$router.push("/");
                        this.$vs.notification({
                            progress: "auto",
                            color: "#146e27",
                            title: "Login Successful",
                            position: "top-center",
                        });
                    })
                    .catch((err) => {
                        this.$vs.notification({
                            progress: "auto",
                            color: "#EF4444",
                            title: "Credentials Not Found",
                            position: "top-center",
                            text: "Make sure your enter the correct credentials, or sign up if you have not done so.",
                        });
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            register() {
                this.isLoading = true;

                this.$services.account
                    .registerAccount({
                        email: this.email,
                        username: this.username,
                        name: this.name,
                        password: this.password,
                    })
                    .then((data) => {
                        this.active = "login";
                        this.username = "";
                        this.name = "";
                        this.email = "";
                        this.password = "";
                        this.$vs.notification({
                            progress: "auto",
                            color: "#146e27",
                            title: "Account Successfully Registered!",
                            position: "top-center",
                            text: `You can proceed to login to your account :D`,
                        });
                    })
                    .catch((err) => {
                        this.$vs.notification({
                            progress: "auto",
                            color: "#EF4444",
                            title: "Invalid Credentials",
                            position: "top-center",
                            text: `Make sure your filled out the entire form or check any of the following: ${JSON.stringify(
                                err.response.data
                            )}`,
                        });
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },
    };
</script>
