function main() {
  const myQuestions = [
   {
      question: "Things are pretty, graceful, rich, elegant, handsome, but, until they speak to the imagination, not yet beautiful.",
      answers: {
        a: "Ralph Waldo Emerson",
        b: "Tiffany &amp; Co",
        c: "William Butler Yeats"
      },
      correctAnswer: "a",
	  explanation: "<a href=\"https://books.google.ch/books?id=66QNAwAAQBAJ&pg=PA478&lpg=PA478&dq=Things+are+pretty,+graceful,+rich,+elegant,+handsome,+but,+until+they+speak+to+the+imagination,+not+yet+beautiful&source=bl&ots=JPoGDIDqTp&sig=ACfU3U0emu3A4S4PqO_LZV1AsSGAU3g0Mw&hl=en&sa=X&ved=2ahUKEwiur4Ph273mAhUbysQBHa24DFcQ6AEwEXoECAoQAQ#v=onepage&q=Things%20are%20pretty%2C%20graceful%2C%20rich%2C%20elegant%2C%20handsome%2C%20but%2C%20until%20they%20speak%20to%20the%20imagination%2C%20not%20yet%20beautiful&f=false\">Correct answer</a>: a"
    },
	{
      question: "You're only as young as the last time you changed your mind.",
      answers: {
        a: "Albert Einstein",
        b: "Swatch",
        c: "Timothy Leary"
      },
      correctAnswer: "c",
	  explanation: "<a href=\"https://en.wikiquote.org/wiki/Timothy_Leary\">Correct answer</a>: c"
    },
	{
      question: "You never get a second chance to make a first impression.",
      answers: {
        a: "Oscar Wilde",
        b: "Head &amp; sholders",
        c: "Emily Brontë"
      },
      correctAnswer: "b",
	  explanation: "<a href=\"https://en.wikipedia.org/wiki/Head_%26_Shoulders\">Correct answer</a>: b"
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
