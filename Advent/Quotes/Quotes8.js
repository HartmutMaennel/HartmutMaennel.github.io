function main() {
  const myQuestions = [
	{
      question: "All men by nature desire to know.",
      answers: {
        a: "Aristotele",
        b: "Encyclopedia Britannica",
        c: "Abraham Lincoln"
      },
      correctAnswer: "a",
	  explanation: "<a href=\"https://classicalwisdom.com/greek_books/metaphysics-by-aristotle-book-i/\">Correct answer</a>: a"
    },
	{
      question: "The only one who can tell you \"You can't\" is you. And you don't have to listen.",
      answers: {
        a: "Friedrich Nietzsche",
        b: "Nike",
        c: "Thomas Alva Edison"
      },
      correctAnswer: "b",
	  explanation: "<a href=\"https://daringtolivefully.com/nike-quotes-and-videos\">Correct answer</a>: b"
    },
    {
      question: "The best life is the one in which the creative impulses play the largest part and the possessive impulses the smallest.",
      answers: {
        a: "Plato",
        b: "UBS Impact Hub",
        c: "Bertrand Russell"
      },
      correctAnswer: "c",
	  explanation: "<a href=\"https://books.google.ch/books?id=arct6OpfXJ0C&pg=PA133&lpg=PA133&dq=The+best+life+is+the+one+in+which+the+creative+impulses+play+the+largest+part+and+the+possessive+impulses+the+smallest.&source=bl&ots=ffiKTZPpSE&sig=ACfU3U37cACyIkguipXbWikATzRb-BvMRA&hl=en&sa=X&ved=2ahUKEwj6q7z51aTmAhVBwcQBHaIXB8UQ6AEwBnoECA4QAQ#v=onepage&q=The%20best%20life%20is%20the%20one%20in%20which%20the%20creative%20impulses%20play%20the%20largest%20part%20and%20the%20possessive%20impulses%20the%20smallest.&f=false\">Correct answer</a>: c"
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
