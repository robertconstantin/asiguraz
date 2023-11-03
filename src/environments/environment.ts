// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  applicationVersion: 'V1',
  applicationCode: '33AA7EE0-F4E9-49D4-8C42-2910F2463935',

  // userApiLink: 'http://localhost:45369/',
  userApiLink: 'https://asiguraz-user.codeblocks.co/',
  // coreApiLink: 'http://localhost:62493/',
  coreApiLink: 'https://asiguraz-core.codeblocks.co/',

  mobilPayLink: 'http://sandboxsecure.mobilpay.ro'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
