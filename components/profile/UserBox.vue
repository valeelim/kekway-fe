<template>
    <div
        class="flex cursor-default"
        @click="reroute"
        :class="[
            {
                'hover:bg-gray-400/20 cursor-pointer': hoverable,
            },
        ]">
        <div class="mt-1">
            <vs-avatar circle :size="$vuetify.breakpoint.smAndUp ? '60' : '40'">
                <img :src="getPhoto(profile)" />
            </vs-avatar>
        </div>
        <div
            class="ml-3 mt-1 flex flex-col max-w-[70%]"
            :class="{ 'justify-center': center }"
            v-if="profile.email">
            <a
                class="block truncate font-semibold mb-[-1px] hover:underline cursor-pointer text-sm sm:text-lg"
                :href="`/profile/${profile.username}`"
                :class="[
                    {
                        'pointer-events-none': hoverable,
                    },
                ]">
                {{ profile.name }}
            </a>
            <div class="text-gray-400 font-thin text-xs sm:text-base">
                @{{ profile.username }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            hoverable: {
                type: Boolean,
                default: false,
            },
            userId: {
                type: Number,
                required: true,
            },
            center: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                profile: {
                    email: "",
                    id: 0,
                    name: "",
                    profile_photo: "",
                    role: "",
                    username: "",
                },
            };
        },
        mounted() {
            if (this.userId) {
                this.$services.account
                    .getUserById(this.$auth.strategy.token.get(), this.userId)
                    .then((data) => {
                        this.profile = {
                            email: data.email,
                            id: data.id,
                            name: data.name,
                            profile_photo: data.profile_photo,
                            role: data.role,
                            username: data.username,
                        };
                    })
                    .catch((err) => {
                        
                    });
            }
        },
        methods: {
            getPhoto(user) {
                if (user.profile_photo) {
                    return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/${user.profile_photo}`;
                }
                return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqDOokdSSPwYnjA0qJUmuOwi53yPCySZ7WpqBCspRDew&s";
            },
            reroute() {
                if (this.hoverable) {
                    this.$emit("input");
                    this.$router.push(`/profile/${this.profile.username}`);
                }
            },
        },
    };
</script>

<style></style>
