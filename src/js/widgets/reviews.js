import Widget from './Widget';

class Reviews extends Widget {
  constructor(emitter, widgetTitle, rootSelector, reviews) {
    super(widgetTitle);

    this.emitter = emitter;

    this.reviews = reviews;
    this.root = document.querySelector(rootSelector);

    this.render();
    this.addListeners();
  }

  getReviewsTemplate() {
    const root = document.createElement('ul');

    const cutOffText = text => {
      const quantityOfChars = 220;

      return `${text.slice(0, text.indexOf(' ', quantityOfChars))} ...`;
    };

    const getReview = review => `
      <li class="review">
        <div class="info">
          <div class="rating">
            <span class="percent" style="width: ${review.rating}px;"></span>
          </div>
          <p class="time">${review.date}</p>
        </div>
        <p class="text">${cutOffText(review.text)}</p>
        <a href="#" class="btn-read-completely">Read Completely</a>
      </li>
    `;

    const template = this.reviews.map(review => getReview(review)).join('');

    root.classList.add('reviews');
    root.insertAdjacentHTML('afterbegin', template);

    return root;
  }

  render() {
    this.root.append(this.getHeaderTemplate());
    this.root.append(this.getReviewsTemplate());
  }

  addListeners() {
    this.addWidgetHeaderListener();
    this.addBtnOptionsEmitter();
  }
}

export default Reviews;
