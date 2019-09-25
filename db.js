const data = [
  { id: 1, title: '1-10', content: ['1', '2', '3'] },
  { id: 2, title: '10-20', content: ['4', '5', '6'] },
  { id: 3, title: '20-30', content: ['7', '8', '9'] },
];

class Article {
  static all(cb) {
    cb(null, data);
  }

  static find(id, cb) {
    const item = data.find(a => a.id.toString() === id);
    if (!item) cb(new Error('Not found'), null);
    cb(null, item);
  }
}

module.exports.Article = Article;
