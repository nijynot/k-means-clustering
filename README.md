# k-means clustering
> k-means clustering implemented in JavaScript.

## Usage
```js
const kmeans = require('./index');

const dataSet = [
  [11, 0, 128],
  [18, 3, 185],
  [56, 41, 216],
  [161, 153, 243],
];

const centroids = kmeans(dataSet, 3);
// => [[...], [...], [...]]
```

## License
MIT
