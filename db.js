const data = require('./data.json');

class Article {
  static all(cb) {
    cb(null, data);
  }

  static find(cid, id, cb) {
    const course = data.find(a => a.id == cid);
    if (course) {
      const item = course.weeks.find(a => a.name === id);
      if (!item) cb(new Error('Not found'), null);
      cb(null, item);
    }
  }
}

module.exports.Article = Article;
