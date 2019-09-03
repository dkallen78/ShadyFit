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

function fadeOut() {

}
//
//The workout wrapper function
function workout() {
  //
  //Starts the workout logic
  function startWorkout() {
    //
    //Shows the individual exercise
    function showExercise(data) {
      //
      //Uses the data to fill the workoutWindow
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
      let exImg = setInterval(function() {
        imgCount++;
        exerciseImg.src = data.images[imgCount % 2];
      }, 500);
      //
      //Updates the timer aproximately ever 10 ms
      let timer = setInterval(function() {
        let timeCheck = new Date();
        let timeElapsed = (timeCheck - workoutStartTime) / 1000;
        timerDiv.innerHTML = timeElapsed.toFixed(2, 10);
      }, 10);
    }
    //
    //Shows the image preview of the exercise
    let exercisePreview = makeDiv("exercisePreview");
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
    //
    //The individual data for each exercise
    let exercise1 = {
      name: "Jumping Jacks",
      count: 10,
      images: ["jumpingJacks1.png", "jumpingJacks2.png"]
    }
    //
    //Removes my logo so I can put the other stuff there
    workoutWindow.removeChild(logoDiv);

    startButton.innerHTML = "Next Exercise";
    startButton.onclick = "";
    //
    //Starts the timer and shows the exercise
    let workoutStartTime = new Date();
    showExercise(exercise1);
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
  //
  //Show my logo
  setTimeout(function() {
    logoDiv.style.filter = "opacity(100%)";
  }, 10);
  //
  //The "Start Workout" button that's just outside
  //the workoutWindow
  let startButton = makeDiv("startButton");
  insertTextNode(startButton, "Start Workout");
  startButton.onclick = startWorkout;
  document.body.appendChild(startButton);
  //
  //Shows the startButton after the logo is done showing
  logoDiv.addEventListener("transitionend", function(event) {
    event.stopPropagation();
    startButton.style.filter = "opacity(100%)";
  });
}
