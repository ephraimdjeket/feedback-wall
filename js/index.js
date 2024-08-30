// -- GLOBAL --
const MAX_CHARS = 150;

// Select DOM elements
const textAreaEl = document.querySelector(".textarea");
const textAreaCounter = document.querySelector(".textcounter");
const formEl = document.querySelector(".form");
const feedbackListEl = document.querySelector(".feedback-list");
const spinnerEl = document.querySelector(".spinner");
const BASE_API_URL = "https://bytegrad.com/course-assets/js/1/api";
const hashtagListEl = document.querySelector(".hashtag");

// Function to render feedback item
const renderFeedbackItem = (feedbackItem) => {
  const feedbackItemHTML = `
    <li class="border-b-2 cursor-pointer bg-slate-100 hover:bg-white">
      <div class="flex flex-row items-center py-3 gap-3 transform origin-left transition-transform duration-200 hover:scale-x-custom hover:ease-in-out">
      <div class="flex flex-col items-center py-1 ml-4 text-gray-500">
      <button class="upvote">
          <svg class="upvote w-6 h-6 text-gray-800 dark:text-gray-500 cursor-pointer hover:text-gray-800 hover:ease-in-out"
              aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd"
                  d="M5.575 13.729C4.501 15.033 5.43 17 7.12 17h9.762c1.69 0 2.618-1.967 1.544-3.271l-4.881-5.927a2 2 0 0 0-3.088 0l-4.88 5.927Z"
                  clip-rule="evenodd" />
          </svg>
          </button>
          <div class="count">${feedbackItem.upvoteCount}</div>
        </div> <!--- Like counter-->
        <div class="bg-purple-950 py-1 rounded-lg px-3 ml-4 text-2xl text-white">${
          feedbackItem.badgeLetter
        }</div>
        <!-- Initial letter for company -->
        <div class="w-full max-w-96 pl-8">
          <h2 class="text-gray-400 font-bold text-sm company">${
            feedbackItem.company
          }</h2>
          <p class="text-gray-800 text-sm">${feedbackItem.text}</p>
        </div> <!-- Input comment-->
        <div class="text-gray-500 text-sm flex pl-24">${
          feedbackItem.daysAgo === 0 ? "NEW" : `${feedbackItem.daysAgo}d`
        }</div> <!-- posted x ago -->
      </div> <!-- Model for JS-->
    </li>`;
  feedbackListEl.insertAdjacentHTML("beforeend", feedbackItemHTML);
};

// Function to handle input and update character counter
const inputHandler = () => {
  const charsLeft = MAX_CHARS - textAreaEl.value.length;
  textAreaCounter.textContent = charsLeft;
};

// Function to show validation state
const showCurrentValidation = (textCheck) => {
  const className = textCheck === "valid" ? "form-valid" : "form-invalid";
  textAreaEl.classList.add(className);
  setTimeout(() => {
    textAreaEl.classList.remove(className);
  }, 2000);
};

// Add event listener for input
textAreaEl.addEventListener("input", inputHandler);

const submitHandler = (e) => {
  e.preventDefault();

  const text = textAreaEl.value;
  if (text.includes("#") && text.length > 4) {
    showCurrentValidation("valid");
  } else {
    showCurrentValidation("invalid");
    textAreaEl.focus();
    return;
  }

  const hashtag = text.split(" ").find((word) => word.includes("#"));
  const company = hashtag.substring(1);
  const badgeLetter = company.charAt(0).toUpperCase();
  const upvoteCount = 0;
  const daysAgo = 0;

  const feedbackItem = {
    upvoteCount,
    company,
    badgeLetter,
    daysAgo,
    text,
  };

  renderFeedbackItem(feedbackItem);

  fetch(`${BASE_API_URL}/feedbacks`),
    {
      method: "POST",
      body: JSON.stringify(feedbackItem),
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
      },
    }
      .then((res) => {
        if (!res.ok) {
          throw new Error(console.log("Unsuccessful"));
        }
        console.log("Successful");
      })
      .catch((e) => {
        console.log(`Failed to fetch items: ${e.message}`);
      });

  textAreaEl.value = "";
  textAreaCounter.textContent = MAX_CHARS;
};

formEl.addEventListener("submit", submitHandler);

const clickHandler = (e) => {
  const clickedEl = e.target;

  if (upvoteIntention) {
    const upvoteCountEl = upvote.querySelector(".count");
    const upvoteCount = upvoteCountEl.textContent;
    console.log(upvoteCount);
  } else {
    clickedEl.closest("li").classList.toggle("feedback--expand");
  }
};

feedbackListEl.addEventListener("click", clickHandler);

fetch(`${BASE_API_URL}/feedbacks`)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  })
  .then((data) => {
    spinnerEl.remove();
    data.feedbacks.forEach((feedbackItem) => {
      renderFeedbackItem(feedbackItem);
    });
  })
  .catch((error) => {
    feedbackListEl.textContent = `Failed to fetch feedback items. Error message: ${error.message}`;
  });

const $clickHandler = (e) => {
  const clickedEl = e.target;

  // Check if clicked element has class 'hashtags'
  if (clickedEl.classList.contains("hashtags")) {
    return;
  }

  const companyNameFromItem = clickedEl.textContent
    .substring(1)
    .toLowerCase()
    .trim();

  feedbackListEl.querySelectorAll("li").forEach((listItem) => {
    const companyNameFromHashtag = listItem
      .querySelector(".company")
      .textContent.toLowerCase()
      .trim();

    // Compare company names and hide non-matching items
    if (companyNameFromHashtag !== companyNameFromItem) {
      listItem.style.display = "none";
    } else {
      listItem.style.display = ""; // Ensure matching items are shown
    }
  });
};

hashtagListEl.addEventListener("click", $clickHandler);
