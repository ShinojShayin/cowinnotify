function main() {
  console.log("main function");
  console.log("ajax request to the resource which will require cors enabled");
  var notification = new Notification("Notification title", {
    icon: "http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png",
    body: "Hey sdsds there! You've been notified!",
  });
  //   Notification.requestPermission().then(function (result) {
  //     console.log(result);
  //   });

  //   $.ajax({
  //     dataType: "json",
  //     url:
  //       "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=560066&date=08-05-2021",
  //     success: function (data) {
  //       var centerArray = data.centers;
  //       centerArray.forEach(function (e) {
  //         console.log(JSON.stringify(e));
  //         var centers = e.name;

  //         console.log(centers + "doneee");
  //       });
  //     },
  //   });
}
// request permission on page load
document.addEventListener("DOMContentLoaded", function () {
  if (!Notification) {
    alert("Desktop notifications not available in your browser. Try Chromium.");
    return;
  }

  if (Notification.permission !== "granted") Notification.requestPermission();
});

function notifyMe() {
  if (Notification.permission !== "granted") Notification.requestPermission();
  else {
    var notification = new Notification("Notification title", {
      icon: "http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png",
      body: "Hey sdsd there! You've been notified!",
    });
    notification.onclick = function () {
      window.open("http://stackoverflow.com/a/13328397/1269037");
    };
  }
}
