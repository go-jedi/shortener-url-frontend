import { defineStore } from "pinia";

import { api } from "boot/axios";

export const useUrlStore = defineStore("url", {
  state: () => {
    return {
      isAddUrl: false,
      uidLink: "",
    };
  },
  getters: {},
  actions: {
    async actAddUrl(formData) {
      try {
        const response = await api.post(`/a?url=${formData.link}`);
        console.log("response.data -->", response.data);
        if (response.data.status === 200) {
          if (response.data.result.length > 0) {
            this.isAddUrl = true;
            this.uidLink = response.data.result;
          }
        }
      } catch (error) {
        console.log("error in actAddUrl -->", error);
      }
    },
  },
});
