// spinner.js
var spin = require('spinnies');

var spinnerConfig = { 
  "interval": 120,
  "frames": [
    "",
    "             B",
    "              Bo",
    "               Bot",
    "                Bot F",
    "                 Bot Fa",
    "                  Bot Fam",
    "                   Bot Fame",
    "                    Bot Fame",
    "                   Bot Fame",
    "                  Bot Fam",
    "                 Bot Fa",
    "                Bot F",
    "               Bot ",
    "              Bo",
    "             B",
    ""
  ]
};

let globalSpinner;

var getGlobalSpinner = (disableSpins = false) => {
  if (!globalSpinner) globalSpinner = new spin({ color: 'white', succeedColor: 'blue', spinner: spinnerConfig, disableSpins });
  return globalSpinner;
}

exports.getGlobalSpinner = getGlobalSpinner;

exports.start = (id) => {
  getGlobalSpinner().add(id);
}