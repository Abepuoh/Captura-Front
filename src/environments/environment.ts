// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase:{
  apiKey: "AIzaSyA050SBYxDImUavQDbzRTu9Vm7gQfb4tcQ",
  authDomain: "captura-1e121.firebaseapp.com",
  projectId: "captura-1e121",
  storageBucket: "captura-1e121.appspot.com",
  messagingSenderId: "360661644710",
  appId: "1:360661644710:web:26ce3a916e3397f47d8b67",
  measurementId: "G-5YE3NH852L"},

  apiEnviroment: {
    endpoint: 'https://frozen-crag-51318.herokuapp.com',
    obra: '/obra',
    visita: '/visita',
    usuario: '/usuario',
    foto: '/foto',
  }
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
