function main() {
  const myQuestions = [
  	{
      question: "Mind-masses entering the soul appear to us as ideas, the quality of the latter depending on the inner state of the former.",
      answers: {
        a: "Bernhard Riemann",
        b: "Edmund Husserl",
        c: "Maryam Mirzakhani"
      },
      correctAnswer: "a",
	  explanation: "<a href=\"https://en.wikiquote.org/wiki/Bernhard_Riemann\">Correct answer</a>: a"
    },
   {
      question: "It is because the method of physics does not satisfy the comprehension that we have to go on further.",
      answers: {
        a: "Isaac Newton",
        b: "Georg Wilhelm Friedrich Hegel",
        c: "Edward Witten"
      },
      correctAnswer: "b",
	  explanation: "<a href=\"https://en.wikiquote.org/wiki/Georg_Wilhelm_Friedrich_Hegel\">Correct answer</a>: b"
    },
	{
      question: "If one proves the equality of two numbers \\(a\\) and \\(b\\) by showing first that \\(a\\leq b\\) and then that \\(a\\geq b\\), it is unfair; one should instead show that they are really equal by disclosing the inner ground for their equality.",
      answers: {
        a: "Leonhard Euler",
        b: "Baruch Spinoza",
        c: "Emmy Noether"
      },
      correctAnswer: "c",
	  explanation: "<a href=\"https://en.wikiquote.org/wiki/Emmy_Noether\">Correct answer</a>: c"
    }
  ];
  // If one proves the equality of two numbers a and b by showing first that a <=b and then that a >= b, it is unfair; one should instead show that they are really equal by disclosing the inner ground for their equality.
  // If one proves the equality of two numbers a and b by showing first that a&le; b and then that a&ge; b, it is unfair; one should instead show that they are really equal by disclosing the inner ground for their equality.
  // "If one proves the equality of two numbers \\(a\\) and \\(b\\) by showing first that \\(a\\leq b\\) and then that \\(a\\geq b\\), it is unfair; one should instead show that they are really equal by disclosing the inner ground for their equality.",
  
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
