const baseUrl = {
  urlMottu: 'https://hm-mottu-totem.azurewebsites.net/api/'
};

export const environment = {
  state: {
    production: false,
    homolog: true,
    development: false
  },

  apiUrl: {
    v2: {
      totemMottuCity: `${baseUrl.urlMottu}v2/totemmottucity/`
    }
  }
};
