const baseUrl = {
  urlMottu: 'https://hm-mottu-totem.azurewebsites.net/api/'
};

export const environment = {
  state: {
    production: false,
    homolog: false,
    development: true
  },

  apiUrl: {
    v2: {
      totemMottuCity: `${baseUrl.urlMottu}v2/totemmottucity/`
    }
  }
};
