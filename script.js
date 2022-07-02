// function askForNPerm() {
//     Notification.requestPermission(function(result) {
//         // console.log("User choice", result);
//         if (result !== "granted") {
//             // console.log("No notification permission granted!");
//         } else {
//             // console.log("Notification permission granted!");
//             configurePushSub();
//         }
//     });
//     // console.log("HERE")
// }

// function configurePushSub() {
//     if ('serviceWorker' in navigator) {
//         navigator.serviceWorker.register('./sw.js').then(registration => {
//             // startWorker(registration)
//         })
//     }
// }

// askForNPerm()



// var w;

// function startWorker(reg) {
//     if(typeof(Worker) !== "undefined") {
//         if(typeof(w) == "undefined") {
//             w = new Worker("./ww.js");
//         }
//         w.onmessage = function(event) {
//             console.log(event.data);
//             const title = 'Simple Title';
//             const options = {
//                 body: 'Simple piece of body text.\nSecond line of body text 👍'
//             };
//             console.log(reg)
//             reg.showNotification(title, options);
//         };
//     } else {
//         console.log("Sorry, your browser does not support Web Workers...");
//     }
// }

// function stopWorker() { 
//     w.terminate();
//     w = undefined;
// }



if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js');
    });
}

function isPushSupported() {
    //checks if user has granted permission to Push notifications
    if (Notification.permission === 'denied') {
      alert('User has blocked push notification.');
      return;
    }

    //Checks if current browser supports Push notification
    if (!('PushManager' in window)) {
      alert('Sorry, Push notification isn\'t supported in your browser.');
      return;
    }

    //Get `push notification` subscription id

    //If `serviceWorker` is registered and ready
    navigator.serviceWorker.ready
      .then(function (registration) {
        registration.pushManager.getSubscription()
        .catch(function (error) {
          console.error('Error occurred while enabling push ', error);
        });
      });
  }

  function subscribePush() {
    //Subscribes user to Push notifications
    registration.pushManager.subscribe({
      userVisibleOnly: true //Set user to see every notification
    })
    .then(function (subscription) {
      toast('Subscribed successfully.');
      console.info('Push notification subscribed.');
      console.log(subscription);
    })
    .catch(function (error) {
      console.error('Push notification subscription error: ', error);
    });
  }

  function unsubscribePush() {
    navigator.serviceWorker.ready
    .then(function(registration) {
      //Get subscription
      registration.pushManager.getSubscription()
      .then(function (subscription) {
        //If no `push subscription`, then return
        if(!subscription) {
          alert('Unable to unregister push notification.');
          return;
        }

        //Unsubscribes user
        subscription.unsubscribe()
          .then(function () {
            toast('Unsubscribed successfully.');
            console.info('Push notification unsubscribed.');
          })
          .catch(function (error) {
            console.error(error);
          });
      })
      .catch(function (error) {
        console.error('Failed to unsubscribe push notification.');
      });
    })
  }
