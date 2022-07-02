// self.addEventListener('install', e => {
//     console.log("Service Worker 1");
//     const title = 'Title';
//     const options = {
//         body: 'Body'
//     };
//     setInterval(() => {
//         self.registration.showNotification(title, options);
//     } ,10000);
// })

const title = 'Title';
const options = {
    body: 'Body'
};
setInterval(() => {
    self.registration.showNotification(title, options);
} ,10000);