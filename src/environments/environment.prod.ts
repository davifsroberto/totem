const baseUrl = {
  urlMottu: 'https://TODO:ENDPOINT_PROD/api/'
};

export const environment = {
  state: {
    production: true,
    homolog: false,
    development: false
  },

  apiUrl: {
    v2: {
      totemMottuCity: `${baseUrl.urlMottu}v2/totemmottucity/`
    }
  }
};
