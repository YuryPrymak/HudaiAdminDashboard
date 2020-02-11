export default (() => {
  const btnOptions = document.querySelector('.widget-reviews .btn-options');
  const optionsList = document.querySelector('.widget-reviews .options-list');
  const reviewsText = document.querySelectorAll('.widget-reviews .review .text');

  const quantityOfChars = 220;

  reviewsText.forEach(el => {
    el.textContent = `${el.textContent.slice(0, el.textContent.indexOf(' ', quantityOfChars))} ...`;
  });

  btnOptions.addEventListener('click', () => {
    optionsList.classList.toggle('show-options');
  });
})();
