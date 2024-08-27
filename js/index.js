// Counter component
const textAreaEl = document.querySelector(".textarea");
const textAreaCounter = document.querySelector(".textcounter");
const formEl = document.querySelector(".form");
const feedbackListEl = document.querySelector(".feedback-list");

const inputHandler = () => {
  const maxChar = 150;
  const charsLeft = maxChar - parseInt(textAreaEl.value.length);
  textAreaCounter.textContent = charsLeft;
};

textAreaEl.addEventListener("input", inputHandler);

const submitHandler = () => {
  const text = textAreaEl.value;
  if (text.includes("#") && text.length > 4) {
    textAreaEl.classList.add("form-valid");
    setTimeout(() => {
      textAreaEl.classList.remove("form-valid");
    }, 3000);
    console.log(text);
  } else {
    textAreaEl.classList.add("form-invalid");
    setTimeout(() => {
      textAreaEl.classList.remove("form-invalid");
    }, 3000);
    textAreaEl.focus();

    return;
  }
  const hashtag = text.split(" ").find((word) => word.includes("#"));
  const company = hashtag.substring(1);
  const badgeLetter = company.charAt(0).toUpperCase();
  const upVoteCount = 0;
  const daysAgo = 0;

  const feedbackItemHTML = `
    <li class="border-b-2 cursor-pointer  bg-slate-100 hover:bg-white">
                <div
                    class="flex flex-row items-center py-3 gap-3 transform origin-left transition-transform duration-200 hover:scale-x-custom hover:ease-in-out">
                    <div class="flex flex-col items-center py-1 ml-4 text-gray-500">
                        <svg class="w-6 h-6 text-gray-800 dark:text-gray-500 cursor-pointer hover:text-gray-800 hover:ease-in-out"
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M5.575 13.729C4.501 15.033 5.43 17 7.12 17h9.762c1.69 0 2.618-1.967 1.544-3.271l-4.881-5.927a2 2 0 0 0-3.088 0l-4.88 5.927Z"
                                clip-rule="evenodd" />
                        </svg>
                        <div>${upVoteCount}</div>
                    </div> <!--- Like counter-->
                    <div class="bg-purple-950 py-1 rounded-lg px-3 ml-4 text-2xl text-white">${badgeLetter}</div>
                    <!-- Initial letter for for company-->
                    <div class="w-full max-w-96 pl-8">
                        <h2 class="text-gray-400 font-bold text-sm">${company}</h2>
                        <p class="text-gray-800 text-sm">${textAreaEl.value}</p>
                    </div> <!-- Inout comment-->
                    <div class="text-gray-500 text-sm flex pl-24">${
                      daysAgo === 0 ? "NEW" : `${daysAgo}d`
                    }</div> <!-- posted x ago -->
                </div> <!-- Model for JS-->
            </li>
  
  `;

  feedbackListEl.insertAdjacentHTML("beforeend", feedbackItemHTML);
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  submitHandler();
});
