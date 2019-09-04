function clearElement() {
  for (let i = 0; i < arguments.length; i++) {
    arguments[i].innerHTML = "";
  }
}

function insertTextNode(element, text) {
  let node = document.createTextNode(text);
  element.appendChild(node);
}

function makeDiv() {
  let div = document.createElement("div");
  if (arguments.length > 0) {div.id = arguments[0]}
  if (arguments.length > 1) {
    for (let i = 1; i < arguments.length; i++) {
      div.classList.add(arguments[i]);
    }
  }
  return div;
}

function makeImg(src) {
  let img = document.createElement("img");
  img.src = src;
  if (arguments.length > 1) {
    img.id = arguments[1];
  }
  if (arguments.length > 2) {
    for (let i = 2; i < arguments.length; i++) {
      img.classList.add(arguments[i]);
    }
  }
  return img;
}

function makeButton(callback, text, id = "") {
  const button = document.createElement("button");
  insertTextNode(button, text);
  button.type = "button";
  button.onclick = callback;
  button.id = id;
  if (arguments.length > 3) {
    for (let i = 3; i < arguments.length; i++) {
      button.classList.add(arguments[i]);
    }
  }
  return button;
}

function makeTime(ms) {
  let minutes = Math.floor(ms / 60000);
  let seconds = Math.floor(ms / 1000) % 60;
  seconds = (seconds > 9) ? "" + seconds : "0" + seconds;
  let milliseconds = (ms % 100).toFixed(0, 10);
  return minutes + ":" + seconds + "<span id=\"milliseconds\">" + milliseconds + "</span>";
}

//
//The workout wrapper function
function workout() {
  //
  //Starts the workout logic
  function startWorkout(totalSets) {
    //
    //Shows the individual exercise
    function showExercise(data) {
      exerciseCount++;
      if (exerciseCount === 6 && sets === 3) {
        startButton.innerHTML = "Finish";
      } else if (exerciseCount === 6) {
        startButton.innerHTML = "Rest";
      } else {
        startButton.innerHTML = "Next Exercise";
      }
      //
      //Uses the data to fill the workoutWindow
      setCountBox.style.filter = "opacity(100%)";
      setCount.innerHTML = sets + " / " + totalSets;
      exerciseImg.src = data.images[0];
      exerciseNumber.innerHTML = data.count;
      exerciseName.innerHTML = data.name;
      //
      //Puts the elements on the screen
      workoutWindow.appendChild(exercisePreview);
      workoutWindow.appendChild(exerciseInfo);
      workoutWindow.appendChild(timerDiv);
      //
      //Cycles between the workout preview images
      let imgCount = 0;
      clearInterval(exImg);
      exImg = setInterval(function() {
        imgCount++;
        exerciseImg.src = data.images[imgCount % data.images.length];
      }, 500);

      //
      //Updates the timer aproximately ever 10 ms
      clearInterval(timer);
      timer = setInterval(function() {
        let timeCheck = new Date();
        let timeElapsed = (timeCheck - workoutStartTime);
        timerDiv.innerHTML = makeTime(timeElapsed);
      }, 50);
    }
    //
    //The rest between exercise sets
    function exerciseRest(time) {
      exerciseCount = 0;
      //
      //Sets up the rest screen
      startButton.innerHTML = "Next Exercise";
      setCountBox.style.filter = "opacity(0%)";
      exerciseImg.src = "water.png";
      exerciseNumber.innerHTML = "2 min";
      exerciseName.innerHTML = "Take a break";
      clearInterval(exImg);
      clearInterval(timer);

      let restTimerStart = new Date();
      //
      //Countdown timer for the rest
      timer = setInterval(function() {
        let timeCheck = new Date();
        let timeElapsed = timeCheck - restTimerStart;
        if (120000 - timeElapsed <= 0) {
          clearInterval(timer);
          timerDiv.innerHTML = "00:00";
        } else {
          timerDiv.innerHTML = makeTime(120000 - timeElapsed);
        }
      }, 50);
      sets++;
    }

    function exerciseSummary() {
      let finalTime = new Date();
      clearElement(workoutWindow);

      let timeText = makeDiv("timeText");
        timeText.innerHTML = "Total Time";
      workoutWindow.appendChild(timeText);

      let totalTime = makeDiv("totalTime");
        totalTime.innerHTML = makeTime(finalTime - workoutStartTime);
      workoutWindow.appendChild(totalTime);

      let summaryDiv = makeDiv("summaryDiv");

      for (let i = 0; i < exercises.length; i++) {
        let summary = makeDiv("", "workoutSummary");
          let summaryNumber = makeDiv("", "summaryNumber");
            summaryNumber.innerHTML = exercises[i].count;
          summary.appendChild(summaryNumber);
          let summaryExercise = makeDiv("", "summaryExercise");
            summaryExercise.innerHTML = exercises[i].name;
          summary.appendChild(summaryExercise);
        summaryDiv.appendChild(summary);
      }

      workoutWindow.appendChild(summaryDiv);

    }
    //
    //Shows the image preview of the exercise
    let exercisePreview = makeDiv("exercisePreview");
      let setCountBox = makeDiv("setCountBox");
        let setText = makeDiv("setText");
          setText.innerHTML = "Set: ";
      setCountBox.appendChild(setText);
        let setCount = makeDiv("setCount");
          let sets = 1;
          setCount.innerHTML = sets;
      setCountBox.appendChild(setCount);
    exercisePreview.appendChild(setCountBox);
      let exerciseImg = makeImg("", "exerciseImg");
    exercisePreview.appendChild(exerciseImg);
    //
    //Shows the name and number to do of the exercise
    let exerciseInfo = makeDiv("exerciseInfo");
      let exerciseNumber = makeDiv("exerciseNumber");
      let exerciseName = makeDiv("exerciseName");
    exerciseInfo.appendChild(exerciseNumber);
    exerciseInfo.appendChild(exerciseName);
    //
    //A container for the timer
    let timerDiv = makeDiv("timerDiv");
    let timer = null;
    let exImg = null;
    //
    //The individual data for each exercise
    let exercise1 = {
      name: "Jumping Jacks",
      count: 10,
      images: ["jumpingJacks1.png", "jumpingJacks2.png"]
    };
    let exercise2 = {
      name: "Squats",
      count: 5,
      images: ["squats1.png", "squats2.png"]
    };
    let exercise3 = {
      name: "Push-ups",
      count: 5,
      images: ["pushUps1.png", "pushUps2.png"]
    };
    let exercise4 = {
      name: "High Knees",
      count: 10,
      images: ["highKnees1.png", "highKnees2.png"]
    };
    let exercise5 = {
      name: "Climbers",
      count: 10,
      images: ["climbers1.png", "climbers2.png", "climbers1.png", "climbers4.png"]
    };
    let exercise6 = {
      name: "Plank Jump-ins",
      count: 5,
      images: ["plankJumpIns1.png", "plankJumpIns2.png"]
    };
    let exercises = [exercise1, exercise2, exercise3, exercise4, exercise5, exercise6];

    let exerciseCount = 0
    //
    //Removes my logo so I can put the other stuff there
    workoutWindow.removeChild(logoDiv);
    //
    //Defines what the "start" button does
    startButton.innerHTML = "Next Exercise";
    startButton.onclick = function() {
      if (exerciseCount <= exercises.length - 1) {
        showExercise(exercises[exerciseCount]);
      } else {
        if (sets === totalSets) {
          exerciseSummary();
        } else {
          exerciseRest(120000);
        }
      }

    }
    //
    //Starts the timer and shows the exercise
    let workoutStartTime = new Date();
    showExercise(exercises[0]);
  }
  //
  //Makes the window that shows the workout information
  const workoutWindow = makeDiv("workoutWindow");
  document.body.appendChild(workoutWindow);
  //
  //My logo
  let logoDiv = makeDiv("logoDiv");
  insertTextNode(logoDiv, "ShadyFit");
  workoutWindow.appendChild(logoDiv);
  setTimeout(function() {
    logoDiv.style.filter = "opacity(100%)";
  }, 10);
  //
  //The "Start Workout" button that's just outside
  //the workoutWindow
  let startButton = makeDiv("startButton");
  insertTextNode(startButton, "Start Workout");

  document.body.appendChild(startButton);
  //
  //Shows the startButton after the logo is done showing
  logoDiv.addEventListener("transitionend", function(event) {
    event.stopPropagation();
    startButton.style.filter = "opacity(100%)";
    startButton.onclick = function() {
      startWorkout(3);
    }
  });
}
