function main() {
  const myQuestions = [
  	{
      question: "Every accomplishment starts with the decision to try.",
	  answers: {
        a: "John F. Kennedy",
        b: "Adidas",
        c: "S&oslash;ren Kierkegaard"
      },
      correctAnswer: "a",
	  explanation: "<a href=\"https://www.irishpost.com/news/john-f-kennedy-quotes-168652\">Correct answer</a>: a"
    },
    {
      question: "To break the rules, you first have to master them.",
      answers: {
        a: "Dmitri Dmitrijewitsch Schostakowitsch",
        b: "Audemars Piguet Watches",
        c: "Nikola Tesla" 
      },
      correctAnswer: "b",
	  explanation: "<a href=\"https://filip.modderie.be/to-break-the-rules-you-must-first-master-them/\">Correct Answer</a>: b"
    },
    {
      question: "Reach out and touch someone.",
      answers: {
        a: "Mahatma Gandhi",
        b: "AT&T",
        c: "Mother Theresa" 
      },
      correctAnswer: "b",
	  explanation: "<a href=\"https://www.youtube.com/watch?v=OapWdclVqEY\"> Correct Answer</a>: b"
    }
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
