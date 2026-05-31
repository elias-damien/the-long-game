const STORAGE_KEY = "theLongGameData";

let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  xp: 0,
  level: 1,
  totalSteps: 0,
  totalDistance: 0,
  totalDuration: 0,
  totalSessions: 0
};

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function updateLevel() {

  if (data.xp < 100) {
    data.level = 1;
  } else if (data.xp < 250) {
    data.level = 2;
  } else if (data.xp < 500) {
    data.level = 3;
  } else if (data.xp < 800) {
    data.level = 4;
  } else {
    data.level = 5;
  }

}

function refreshDashboard() {

  document.getElementById("level").textContent = data.level;
  document.getElementById("xp").textContent = data.xp;

  document.getElementById("stepsTotal").textContent =
    data.totalSteps.toLocaleString();

  document.getElementById("distanceTotal").textContent =
    data.totalDistance.toFixed(1);

  document.getElementById("durationTotal").textContent =
    data.totalDuration;

  document.getElementById("sessionsTotal").textContent =
    data.totalSessions;

}

function saveDay() {

  let xp = 0;

  const steps =
    Number(document.getElementById("steps").value) || 0;

  const junkFood =
    document.getElementById("junkFood").value === "true";

  const alcohol =
    document.getElementById("alcohol").value === "true";

  const training =
    document.getElementById("training").value === "true";

  xp += Math.floor(steps / 1000);

  if (!junkFood) {
    xp += 5;
  }

  if (!alcohol) {
    xp += 5;
  }

  data.totalSteps += steps;

  if (training) {

    const distance =
      Number(document.getElementById("distance").value) || 0;

    const duration =
      Number(document.getElementById("duration").value) || 0;

    xp += duration;

    xp += distance * 5;

    data.totalDistance += distance;
    data.totalDuration += duration;
    data.totalSessions += 1;
  }

  data.xp += Math.round(xp);

  updateLevel();
  saveData();
  refreshDashboard();

  alert(`Journée enregistrée : +${Math.round(xp)} XP`);
}

document
  .getElementById("saveBtn")
  .addEventListener("click", saveDay);

document
  .getElementById("training")
  .addEventListener("change", function () {

    const visible =
      this.value === "true";

    document.getElementById("trainingFields").style.display =
      visible ? "block" : "none";

  });

updateLevel();
refreshDashboard();

document.getElementById("trainingFields").style.display = "none";
