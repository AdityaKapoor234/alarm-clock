// Event Listener for  Clock Execution
document.addEventListener('DOMContentLoaded', function () {
  updateClock();
  setInterval(updateClock, 1000);
});

// Function to Excute Clock & Check For Alarm
function updateClock() {
  // Execution of Clock
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  document.getElementById('clockDisplay').innerText = `${formatTime(hours) > 12 ? formatTime(hours) - 12 : formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)} ${formatTimeDayNight(hours)}`;

  const listAlarms = document.querySelectorAll('.alarm-item');

  // Checking for Alarms
  for (let i of listAlarms) {
    if (checkHour(parseInt(formatTime(hours)), parseInt(i.querySelector('#alarmHour').innerHTML), i.querySelector('#alarmAMPM').innerHTML) &&
      parseInt(i.querySelector('#alarmMin').innerHTML) === parseInt(minutes) &&
      parseInt(i.querySelector('#alarmSec').innerHTML) === parseInt(seconds) &&
      formatTimeDayNight(hours) === i.querySelector('#alarmAMPM').innerHTML) {
      const alarmRing = document.createElement('div');
      alarmRing.className = 'alarm-ring';
      alarmRing.innerHTML = `
            <div id="alarmRingRowBox1">
              <div id="alarmRingRowBox">
                <img src="alarm.png" class="alarmImg" alt="">
                <h1 id="alarmRingData">Alarm: ${i.querySelector('#alarmHour').innerHTML}:${i.querySelector('#alarmMin').innerHTML}:${i.querySelector('#alarmSec').innerHTML}&nbsp;${i.querySelector('#alarmAMPM').innerHTML}</h1>
                <div>
                  <button class="stop-alarm-btn" onclick="stopAlarm(this)">Stop Alarm</button>
                </div>
              </div>
              <audio controls autoplay>
                <source src="alarm-ring.mp3" type="audio/mp3">
              </audio>
            </div>
        `;
      document.getElementById('alarmRingRow').appendChild(alarmRing);
    }
  }
}

// Function to Match Hour for Alarm Execution
function checkHour(hr, hoursAlarm, ampmAlarm) {
  if (ampmAlarm === "PM") {
    if (hoursAlarm !== 12) {
      if (hoursAlarm + 12 === hr) {
        return true;
      } else {
        return false;
      }
    } else {
      if (hoursAlarm === hr) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    if (hoursAlarm === hr) {
      return true;
    } else {
      return false;
    }
  }
}

// Function to Make Single Digit to Double Digit
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Function to check whether it is AM or PM
function formatTimeDayNight(time) {
  return time < 12 ? `AM` : `PM`;
}

// Validation for Correct Time Format
function validateTime(hour, minute, second) {
    // Check Hour Value
    if (hour === true) {
    const hoursAlarm = document.getElementById('hr');
    const enteredValueHr = parseFloat(hoursAlarm.value);

    if (enteredValueHr < 0 || enteredValueHr > 12) {
      alert('Please enter Hours (Valid number between 0 and 12).'); // Error Message
      hoursAlarm.value = ''; // Clear the input field
      hoursAlarm.focus(); // Bring the Focus back on same input field
      return false;
    }
  }

    // Check Minute Value
    if (minute === true) {
    const minAlarm = document.getElementById('min');
    const enteredValueMin = parseFloat(minAlarm.value);

    if (enteredValueMin < 0 || enteredValueMin > 59) {
      alert('Please enter Min (Valid number from 0 to 59).'); // Error Message
      minAlarm.value = ''; // Clear the input field
      minAlarm.focus(); // Bring the Focus back on same input field
      return false;
    }
  }

    // Check Second Value
    if (second === true) {
    const secAlarm = document.getElementById('sec');
    const enteredValueSec = parseFloat(secAlarm.value);

    if (enteredValueSec < 0 || enteredValueSec > 59) {
      alert('Please enter Seconds (Valid number from 0 to 59).'); // Error Message
      secAlarm.value = ''; // Clear the input field
      secAlarm.focus(); // Bring the Focus back on same input field
      return false;
    }
  }

  return true;
}

// Validation Function to Check Hour
function hourChange() {
  validateTime(true, false, false);
}

// Validation Function to Check Minute
function minChange() {
  validateTime(false, true, false);
}

// Validation Function to Check Second
function secChange() {
  validateTime(false, false, true);
}

// Function to Set Alarm
function setAlarm() {
  if (validateTime(true, true, true)) {
    const hours = document.getElementById('hr').value;
    const minutes = document.getElementById('min').value;
    const seconds = document.getElementById('sec').value;
    const ampm = document.getElementById('dayNight').value;

    const alarmItem = document.createElement('div');
    alarmItem.className = 'alarm-item';
    alarmItem.id = 'alarm-item';
    alarmItem.innerHTML = `
        <span id="alarmHour">${formatTime(hours)}</span>:<span id="alarmMin">${formatTime(minutes)}</span>:<span id="alarmSec">${formatTime(seconds)}</span>&nbsp;<span id="alarmAMPM">${ampm}</span>
        <button class="delete-btn" onclick="deleteAlarm(this)">Delete</button>
    `;

    document.getElementById('hr').value = "";
    document.getElementById('min').value = "";
    document.getElementById('sec').value = "";

    document.getElementById('alarmList').appendChild(alarmItem);
  }
}

// Function to Delete Alarm
function deleteAlarm(button) {
  const alarmItem = button.parentElement;
  alarmItem.remove();
}

// Function to Stop Alarm
function stopAlarm(button) {
  const alarmItem = button.parentElement.parentElement.parentElement;
  alarmItem.remove();
}