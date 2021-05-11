var vaccine_master = {
  date: getDate(),
  pincode: "",
  centername: "",
  runningcheck: false,
};

function timerlog(cname, agelimit, vaccineType, availability) {
  lognow(
    "<b>Centername:</b> " +
      cname +
      "(" +
      agelimit +
      "+) <b>vaccine:</b> " +
      vaccineType +
      " <b>Availability:</b> " +
      availability
  );
}

var vchecker = null;
var vcheckLogic = function () {
  fetchCowin(vaccine_master.date, vaccine_master.pincode, function (data) {
    var centerArray = data.centers;

    var printbycenter = vaccine_master.centername.length > 0;

    if (printbycenter) {
      centerArray.forEach(function (e) {
        if (e.name == vaccine_master.centername) {
          if (e.sessions[0].available_capacity > 0) {
            notifyuser(
              e.name,
              e.sessions[0].available_capacity,
              e.sessions[0].vaccine,
              e.fee_type
            );
          }

          timerlog(
            e.name,
            e.sessions[0].min_age_limit,
            e.sessions[0].vaccine,
            e.sessions[0].available_capacity
          );
        }
      });
    } else {
      centerArray.forEach(function (e) {
        if (e.sessions[0].available_capacity > 0) {
          notifyuser(
            e.name,
            e.sessions[0].available_capacity,
            e.sessions[0].vaccine,
            e.fee_type
          );
        }
        timerlog(
          e.name,
          e.sessions[0].min_age_limit,
          e.sessions[0].vaccine,
          e.sessions[0].available_capacity
        );
      });
    }
  });
};

function resetTitle() {
  $("title").html("CoWin Notifier");
}

$("#vchecker").click(function () {
  if (vaccine_master.pincode != "") {
    if (!vaccine_master.runningcheck) {
      clearlog();
      $("title").html("Checking Vaccine availability...");
      $("#pincode").attr("disabled", true);
      $("#interval").attr("disabled", true);
      $("#vcenter").attr("disabled", true);
      $(this).html("Stop Checking");
      var interval = $("#interval").val();
      interval = parseInt(interval);
      console.log("interval: " + interval);
      vaccine_master.runningcheck = true;
      lognow("Started CoWin Notifier....");
      vchecker = setInterval(vcheckLogic, interval);
    } else {
      resetTitle();
      $("#pincode").attr("disabled", false);
      $("#interval").attr("disabled", false);
      $("#vcenter").attr("disabled", false);
      $(this).html("Start Checking");
      vaccine_master.runningcheck = false;
      if (vchecker) clearInterval(vchecker);
    }
  } else {
    alert("Provide valid pincode");
  }
});

function validatePIN(pin) {
  return /^(\d{6})$/.test(pin);
}
var logDiv = $("#log-area");

function lognow(log) {
  var time = new Date().toLocaleTimeString();
  logDiv.prepend("<div>" + time + " :: " + log + "</div>");
}

function clearlog() {
  logDiv.html("Monitoring Details Printed here once you start notifier");
}

function resetHospitalSelect() {
  var vcenter_select = $("#vcenter");
  vcenter_select.attr("disabled", true);
  vcenter_select
    .html("")
    .append("<option value=''>Specific Vaccine center (Optional)</option>");
  vaccine_master.pincode = "";
}

var loadhospitalselect = function (data) {
  if (data.error) {
    alert(data.error);
    resetHospitalSelect();
    $("#pincode").val("");
    return;
  }

  var centerArray = data.centers;

  if (centerArray.length == 0) {
    alert("No center available for this pincode");
    resetHospitalSelect();
    $("#pincode").val("");
    return;
  }

  var vcenter_select = $("#vcenter");
  vcenter_select.attr("disabled", false);
  vcenter_select
    .html("")
    .append("<option value=''>Specific Vaccine center (Optional)</option>");
  centerArray.forEach(function (e) {
    var centername = e.name;
    var agelimit = e.sessions[0].min_age_limit;
    vcenter_select.append(
      "<option value='" +
        centername +
        "'>" +
        centername +
        " (" +
        agelimit +
        "+)</option>"
    );
  });
};

$("#vcenter").change(function () {
  var val = $(this).val();
  if (val === "") {
    lognow("You will be notified for vaccine avaliable in all centers");
  } else {
    vaccine_master.centername = val;
    lognow("You will be notified for vaccine avaliable in '" + val + "' only");
  }
});

$("#pincode").keyup(function () {
  var pincode = $("#pincode").val();
  if (pincode.length > 0) {
    if (validatePIN(pincode)) {
      $("#hosp-select").html("Loading Vaccine Centers..");
      vaccine_master.pincode = pincode;
      fetchCowin(vaccine_master.date, pincode, loadhospitalselect);
    }
  }
});

$("#pincode").focusout(function () {
  var pincode = $("#pincode").val();
  if (pincode.length > 0) {
    if (!validatePIN(pincode)) {
      alert("Invalid pincode");
      $("#pincode").val("");
      resetHospitalSelect();
    }
  } else {
    resetHospitalSelect();
  }
});

function fetchCowin(date, pincode, callback) {
  $.ajax({
    dataType: "json",
    url:
      "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" +
      pincode +
      "&date=" +
      date,
    success: function (data) {
      callback(data);
    },
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if (!Notification) {
    alert("Desktop notifications not available in your browser. Try Chromium.");
    return;
  }

  if (Notification.permission !== "granted") Notification.requestPermission();
});

var audio = new Audio("notify.mp3");

function notifyuser(centername, available, vaccinetype, payment) {
  $("title").html("Vaccine Available!!!");
  audio.play();
  var notification = new Notification("Vaccine Available at " + centername, {
    icon: "vicon.png",
    body:
      " Availabile: " +
      available +
      " vaccine: " +
      vaccinetype +
      " Fee-Type:" +
      payment,
  });
}

$("#samplenotify").click(function () {
  notifyuser("XYZ Hospital", 11, "Covishield", "Free");
  setTimeout(function () {
    resetTitle();
  }, 3000);
});

console.log("Script v1.0");

function getDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  return dd + "-" + mm + "-" + yyyy;
}
