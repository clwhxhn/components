const VueAxios = {
  vm: {},
  install(Vue, router = {}, instance) {
    if (this.installed) {
      return;
    }
    this.installed = true;

    if (!instance) {
      console.error("You have to install axios");
      return;
    }

    Vue.axios = instance;

    Object.defineProperties(Vue.prototype, {
      axios: {
        get: function get() {
          return instance;
        },
      },
      $http: {
        get: function get() {
          return instance;
        },
      },
    });
  },
};

export { VueAxios };
