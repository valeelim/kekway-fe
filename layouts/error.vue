<template>
    <div class="flex flex-col justify-center items-center min-h-[95vh]">
        <h1 v-if="error.statusCode === 404" class="text-3xl">Page Not Found</h1>
        <h1 v-else>An error occurred</h1>
        <vs-button danger class="mt-5">
            <NuxtLink to='/'>Home Page</NuxtLink>
        </vs-button>
    </div>
</template>

<script>
export default {
    props: ['error'],
    layout: 'error',
}
</script>