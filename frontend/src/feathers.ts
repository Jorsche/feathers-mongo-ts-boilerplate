import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import rx from 'feathers-reactive';

const socket = io('http://localhost:3030');
const client = feathers();

client.configure(feathers.socketio(socket));
client.configure(rx({ idField: '_id' }));


export default client;

// import feathers from '@feathersjs/client';
// import socketio from '@feathersjs/socketio-client';
// import rx from 'feathers-reactive';
// import io from 'socket.io-client';
//
// // const host = window.location.origin;
// // const port = '3030';
// // const socket = io(host+':'+port)
// // const socket = io(window.location.origin, { path: '/api' });
// // const socket = io('/', { transports: ['websocket'] });
// const app = feathers();
// const socket = io('http://localhost:3000');
// app.configure(socketio(socket, {
//     timeout: 30000,
// }));
// app.configure(rx({ idField: '_id' }));
//
// export enum SERVICE {
//     BOOKMARKS = 'bookmarks',
//         BOOKS = 'books',
//         BOOK_SETTINGS = 'book-settings',
//         GRAPHICS = 'graphics',
//         SETTINGS = 'settings',
//         SETTINGS_STORE = 'settings-store',
//         SERVICE_CHANNEL = 'service-channel',
//         SERVICE_TRAFFIC = 'service-traffic',
//         USERS = 'users',
//         BATCHER = 'batcher',
//         BROADCAST = 'broadcast',
//         SYNC = 'sync',
//         SYNCSTATES = 'sync-states',
//         CAMPAIGNS = 'campaigns',
//
//         DEFENCE_SENSORS = 'defence-sensors',
//         DEFENCE_SHOOTERS = 'defence-shooters',
//         DEFENCE_KINS = 'defence-kins',
//         DEFENCE_TARGETS = 'defence-targets',
//         DEFENCE_TRACKS = 'defence-tracks',
//         DEFENCE_TRACK_FOVS = 'defence-track-fovs',
// }
//
// export enum SERVICE_TYPE {
//     NEA_AIR_QUALITY = 'getNeaAirQuality',
//         NEA_WEATHER_24HRS = 'getNeaWeather24hrs',
//         NEA_RAIN_AREA_IMAGES = 'getNeaRainAreaImages',
//         NEA_WEATHER_FORECAST = 'getNeaWeatherForecast',
//         NEA_WEATHER_OUTLOOK = 'getNeaWeatherOutlook',
//         NEA_WARNING = 'getNeaWarning',
//         NEA_ULTRA_VIOLET = 'getNeaUltraviolet',
//         NEA_LIGHTNING = 'getNeaLightning',
//
//         PUB_WATER_LEVELS = 'getPUBWaterLevels',
//         PUB_WATER_CCTV = 'getPUBWaterCCTVs',
//
//         LTA_TRAFFIC_CAR = 'getLTATrafficCar',
//         LTA_TRAFFIC_BUS = 'getLTATrafficBus',
//         LTA_TRAFFIC_INCIDENTS = 'getLTATrafficIncidents',
//         LTA_TRAFFIC_CCTV = 'getLTATrafficCCTVs',
//         LTA_TRAFFIC_ROADS = 'getLTATrafficRoads',
//         LTA_TRAFFIC_ROADS_ENCODEDED = 'getLTATrafficRoadsEncoded',
//         LTA_TRAFFIC_BANDS = 'getLTATrafficBands',
//
//         ONE_MAP_ROUTE = 'getOneMapRoute', // (startPt, endPt);
//
//         ZIPPED_WEATHER = 'getZipWeather',
//         ZIPPED_TRAFFIC = 'getZipTraffic',
//         UNZIPPED_WEATHER = 'getUnzipWeather',
//         UNZIPPED_TRAFFIC = 'getUnzipTraffic',
// }
//
// export enum CHANNEL {
//     WEATHER = 'WEATHER_TRAFFIC',
//         TRAFFIC = 'TRAFFIC',
//         CONTACTS = 'CONTACTS',
//         BUS_INFO = 'BUS_INFO',
//         POLL_PROGRESS = 'POLL_PROGRESS',
//         INC_INFO = 'INC_INFO',
//         RESULT = 'RESULT',
//         BATCHER = 'BATCHER',
//         USER = 'USER',
// }
//
// export const joinChannel = (channel:string, GC_CODE?: string) => {
//     app.service(SERVICE.SERVICE_CHANNEL).timeout = 20000;
//     app.service(SERVICE.SERVICE_CHANNEL).create(
//         { type: 'JOIN', channel /* : CHANNEL.POLL_PROGRESS */, GC_CODE },
//     ).then(() => {
//         console.log(`...Joined ${channel}/${GC_CODE} Channel`);
//     }).catch((ee:any) => {
//         console.log(`Error! Join ${channel}/${GC_CODE}`, ee);
//     });
// };

// export const leaveChannel = (channel:string, GC_CODE?:string) => {
//     app.service(SERVICE.SERVICE_CHANNEL).timeout = 20000;
//     app.service(SERVICE.SERVICE_CHANNEL).create(
//         { type: 'LEAVE', channel/* : CHANNEL.POLL_PROGRESS */, GC_CODE },
//     ).then(() => {
//         console.log(`...Leaved ${channel}/${GC_CODE} Channel`);
//     }).catch((ee:any) => {
//         console.log(`Error! Leave ${channel}/${GC_CODE}`, ee);
//     });
// };

// app.service(SERVICE.SETTINGS).on('myEvent', (data) => {
//   console.log('Got event!!!', data);
// });
//
// export default app;
