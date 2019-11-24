function main() {
  const myQuestions = [
    {
      question: "To break the rules, you first have to master them.",
      answers: {
        a: "Dmitri Dmitrijewitsch Schostakowitsch",
        b: "Audemars Piguet",
        c: "Stanislav Grof" 
      },
      correctAnswer: "a"
    },
    {
      question: "Reach out and touch someone.",
      answers: {
        a: "Mahatma Gandhi",
        b: "AT&T",
        c: "Mother Theresa" 
      },
      correctAnswer: "b"
    },
	{
      question: "To Read Too Many Books is Harmful.",
      answers: {
        a: "Albert Einstein",
        b: "MTV",
        c: "Mao Zedong" 
      },
      correctAnswer: "c"
    },
	{
      question: "I believe in standardizing automobiles. I do not believe in standardizing human beings.",
      answers: {
        a: "Michel Foucault",
        b: "Ferdinand Porsche",
        c: "Albert Einstein" 
      },
      correctAnswer: "a"
    },
    {
      question: "If you can dream it, you can do it",
      answers: {
        a: "Walt Disney",
        b: "Coca cola",
        c: "Stanislav Grof" 
      },
      correctAnswer: "a"
    },
    {
      question: "Don't be a Maybe",
      answers: {
        a: "Che Guevarra",
        b: "Marlboro",
        c: "Jean Paul Sartre"
      },
      correctAnswer: "b"
    },
    {
      question: "Unless you dream, you are not going to achieve anything.",
      answers: {
        a: "Richard Branson",
        b: "Gitanes",
        c: "Karl Marx",
      },
      correctAnswer: "a"
    },
	{
      question: "Think small.",
      answers: {
        a: "Volkswagen, 1959",
        b: "Green Party, Germany 1982",
        c: "Muhammad Yunus, Nobel Prize 2006"
      },
      correctAnswer: "a"
    },
    {
      question: "Just do it.",
      answers: {
        a: "Frank Sinatra",
        b: "Nike",
        c: "Albert Camus"
      },
      correctAnswer: "b"
    },
	{
      question: "Small is beautiful.",
      answers: {
        a: "E. F. Schumacher",
        b: "Piaget watches / jewelry",
        c: "Aristotele"
      },
      correctAnswer: "a"
    },
	{
      question: "Everything flows.",
      answers: {
        a: "Jacques-Yves Cousteau",
        b: "Pepsi",
        c: "Heraclitus"
      },
      correctAnswer: "c"
    },
	{
      question: "Ask for more.",
      answers: {
        a: "Michel Foucault",
        b: "Pepsi",
        c: "Che Guevara"
      },
      correctAnswer: "b"
    },
	{
      question: "Tell me how you read and I'll tell you who you are.",
      answers: {
        a: "Thomas Jefferson",
        b: "New York Times",
        c: "Martin Heidegger"
      },
      correctAnswer: "c"
    },
	{
      question: "The only one who can tell you \"You can't\" is you. And you don't have to listen.",
      answers: {
        a: "Friedrich Nietzsche",
        b: "Nike",
        c: "Thomas Alva Edison"
      },
      correctAnswer: "b"
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

    const answerContainers = quizContainer.querySelectorAll(".answers");

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
        answerContainers[questionNumber].style.color = "lightgreen";
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
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
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
  const submitButton = document.getElementById("submit");
  
  // display quiz right away
  buildQuiz();
  
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);
  
  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
 
};
