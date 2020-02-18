export default (() => {
  const reviewsText = document.querySelectorAll('.widget-reviews .review .text');

  const quantityOfChars = 220;

  reviewsText.forEach(el => {
    el.textContent = `${el.textContent.slice(0, el.textContent.indexOf(' ', quantityOfChars))} ...`;
  });
})();
