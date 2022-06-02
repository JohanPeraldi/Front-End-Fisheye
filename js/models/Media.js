class Media {
  constructor(id, photographerId, title, likes, date, price) {
    this._id = id;
    this._photographerId = photographerId;
    this._title = title;
    this._likes = likes;
    this._date = date;
    this._price = price;
  }

  get allMediaInfo() {
    console.group('Media info');
    console.log('Id: ' + this.id());
    console.log('Photographer id: ' + this.photographerId());
    console.log('Title: ' + this.title());
    console.log('Number of likes: ' + this.likes());
    console.log('Date: ' + this.date());
    console.log('Price: ' + this.price());
    console.groupEnd();
  }

  get id() {
    return this._id;
  }

  get photographerId() {
    return this._photographerId;
  }

  get title() {
    return this._title;
  }

  get likes() {
    return this._likes;
  }

  get date() {
    return this._date;
  }

  get price() {
    return this._price;
  }
}
