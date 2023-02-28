import VuexPersistence from "vuex-persist";

export default ({ store }) => {
    new VuexPersistence({
        key: ['theme'],
        storage: window.localStorage,
        modules: ['theme'],
    }).plugin(store);
};