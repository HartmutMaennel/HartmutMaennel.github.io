function main() {
  const myQuestions = [
  	{
      question: "In mathematics you don't understand things. You just get used to them.",
      answers: {
        a: "Issac Newton",
        b: "Ludwig Wittgenstein",
        c: "John von Neumann"
      },
      correctAnswer: "c",
	  explanation: "<a href=\"https://en.wikiquote.org/wiki/John_von_Neumann\">Correct answer</a>: c"
    },
   {
      question: "The science of mathematics presents the most brilliant example of how pure reason may successfully enlarge its domain without the aid of experience.",
      answers: {
        a: "Bertrand Russell",
        b: "Immanuel Kant",
        c: "Kurt Gödel"
      },
      correctAnswer: "b",
	  explanation: "<a href=\"https://books.google.ch/books?id=7NcEIteAfyYC&pg=PA276&lpg=PA276&dq=The+science+of+mathematics+presents+the+most+brilliant+example+of+how+pure+reason+may+successfully+enlarge+its+domain+without+the+aid+of+experience.&source=bl&ots=nAhk-CC23i&sig=ACfU3U0Oee_8LTAIbUnCYNJvVr-oxieSUw&hl=en&sa=X&ved=2ahUKEwiP2dLm3sLmAhVR66YKHQAHClUQ6AEwBHoECAsQAQ#v=onepage&q=The%20science%20of%20mathematics%20presents%20the%20most%20brilliant%20example%20of%20how%20pure%20reason%20may%20successfully%20enlarge%20its%20domain%20without%20the%20aid%20of%20experience.&f=false\">Correct answer</a>: b"
    },
	{
      question: "Say what you know, do what you must, come what may.",
      answers: {
        a: "Sonja Kovalevsky",
        b: "Mahatma Gandhi",
        c: "Évariste Galois"
      },
      correctAnswer: "a",
	  explanation: "<a href=\"http://math.furman.edu/~mwoodard/ascquotk.html\">Correct answer</a>: a"
    },
  ];
  
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
		 </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }
  
  function showResults() {
    // gather answer containers from our quiz
    submitButton.style.display = "none";
	submitted = 1;
	
    const answerContainers = quizContainer.querySelectorAll(".answers");
	n = myQuestions.length;
	explanation = myQuestions[n-1].explanation;
	explanationContainer.innerHTML = `${explanation}`;

    // keep track of user's answers
    let numCorrect = 0;
    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;
        // color the answers green
        answerContainers[questionNumber].style.color = "green";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }
  
  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
 	if (submitted == 0) {
		explanationContainer.innerHTML = "";
	} else {
		explanation = myQuestions[n].explanation;
		explanationContainer.innerHTML = `${explanation}`;
	}
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
	  if (submitted == 0) {
        submitButton.style.display = "inline-block";
	  } else {
	   submitButton.style.display = "none";
	  }
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }
  
  
  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const explanationContainer = document.getElementById("explanation");
  const submitButton = document.getElementById("submit");

	
  // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  let submitted = 0;
  showSlide(0);
  
  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
 
};
