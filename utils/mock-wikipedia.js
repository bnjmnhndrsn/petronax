const mock1 = {
  "page_id": 1,
  "title": "File:image1.jpg",
  "index": 1,
  "image_url": "http://localhost:3000/image1.jpg",
  "description_url": "http://example.com",
  "scaled_url": "http://localhost:3000/image1.jpg",
}

const mock2 = {
  "page_id": 2,
  "title": "File:image2.jpg",
  "index": 2,
  "image_url": "http://localhost:3000/image2.jpg",
  "description_url": "http://example.com",
  "scaled_url": "http://localhost:3000/image2.jpg",
}

const mock3 = {
  "page_id": 3,
  "title": "File:image3.jpg",
  "index": 3,
  "image_url": "http://localhost:3000/image3.jpg",
  "description_url": "http://example.com",
  "scaled_url": "http://localhost:3000/image3.jpg",
}

const mocks = [mock1, mock2, mock3];

module.exports = {
    searchByDate: function(date) {
        const photoIdx = date.split('').reduce((acc, item) => {
            acc += item.codePointAt(0);
            return acc;
        }, 0) % mocks.length;
        const photo = mocks[photoIdx];
        return Promise.resolve([photo]);
    }
}
