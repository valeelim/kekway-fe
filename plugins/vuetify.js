import Vue from 'vue';
import Vuetify from 'vuetify';

import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
Vue.use(Vuetify);

export default ctx => {
    const vuetify = new Vuetify({
        theme: {
            themes: {
                dark: {
                },
                light: {
                },
            }
        },
        breakpoint: {
            thresholds: {
                xs: 640,
                sm: 768,
                md: 1024,
                lg: 1280,
                xl: 1920,
            },
        },
    })

    ctx.app.vuetify = vuetify;
    ctx.$vuetify = vuetify.framework;
}
