function askForNPerm() {
    Notification.requestPermission(function(result) {
        console.log("User choice", result);
        if (result !== "granted") {
            console.log("No notification permission granted!");
        } else {
            console.log("Notification permission granted!");
            configurePushSub();
        }
    });
    console.log("HERE")
}

function configurePushSub() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').then(registration => {
            startWorker(registration)
        })
    }
}

askForNPerm()



var w;

function startWorker(reg) {
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker("./ww.js");
        }
        w.onmessage = function(event) {
            console.log(event.data);
            const title = 'Simple Title';
            const options = {
                body: 'Simple piece of body text.\nSecond line of body text 👍'
            };
            console.log(reg)
            reg.showNotification(title, options);
        };
    } else {
        console.log("Sorry, your browser does not support Web Workers...");
    }
}

function stopWorker() { 
    w.terminate();
    w = undefined;
}