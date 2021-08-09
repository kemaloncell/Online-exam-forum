let returnServer;
var connection = new XMLHttpRequest();
connection.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    returnServer = JSON.parse(connection.responseText);
    sendQuestions();
  }

  return returnServer;
};
connection.open("GET", "data.json", true);
connection.send();

const resultArea = document.getElementsByClassName("questionArea")[0];
const question = document.getElementById("question");
const options = document.getElementsByName("choose");

const explanationA = document.getElementById("explanationA");
const explanationB = document.getElementById("explanationB");
const explanationC = document.getElementById("explanationC");
const explanationD = document.getElementById("explanationD");

const sendButton = document.getElementById("send");

let score = 0;
let ordinary = 0;
function sendQuestions() {
  clearChoose();

  let nextQuestion = returnServer.questions[ordinary];

  question.innerHTML = nextQuestion.question;
  explanationA.innerText = nextQuestion.chooseA;
  explanationB.innerText = nextQuestion.chooseB;
  explanationC.innerText = nextQuestion.chooseC;
  explanationD.innerText = nextQuestion.chooseD;
}

function clearChoose() {
  options.forEach((choose) => (choose.checked = false));
}

function takeChoose() {
  let chosen;
  options.forEach((choose) => {
    if (choose.checked == true) {
      chosen = choose.id;
    }
  });
  return chosen;
}
let eksi = 0;
sendButton.addEventListener("click", () => {
  const chosen = takeChoose();
  if (chosen) {
    if (chosen === returnServer.questions[ordinary].answer) {
      score++;
    }
  }
  ordinary++;
  if (ordinary < returnServer.questions.length) {
    sendQuestions();
  } else {
    resultArea.innerHTML = `<h2>Your correct answers ${score}/${returnServer.questions.length}</h2>
                    <h3>1. Correct Answer => ${returnServer.questions[0].chooseC}</h3>
                    <h3>2. Correct Answer => ${returnServer.questions[0].chooseA}</h3>`;
    // resultArea.innerHTML = `<h2>1. seçtiğiniz şık ${chosen}</h2>`;
    // resultArea.innerHTML = `<h2>2. seçtiğiniz şık ${chosen}</h2>`;
    sendButton.setAttribute("onclick", "location.reload()");
    sendButton.innerText = "Start Again";
  }
});
