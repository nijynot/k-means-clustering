const _ = require('lodash');

/**
 * Returns random integer in the given interval.
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get a random centroid given min, max and dimension.
 *
 * @param {number} min
 * @param {number} max
 * @param {number} d - dimension
 * @returns {Array<Array<number>>}
 */
function getRandomCentroid(min, max, d) {
  const centroid = [];
  for (let i = 0; i < d; i++) {
    centroid.push(getRandomInt(min, max));
  }
  return centroid;
}

/**
 * Returns random centroids.
 *
 * @param {number} k
 * @returns {Array<Array<number>>}
 */
function getRandomCentroids(data, k) {
  const min = Math.min.apply(null, _.flatMapDeep(data));
  const max = Math.max.apply(null, _.flatMapDeep(data));
  const centroids = [];
  for (let i = 0; i < k; i++) {
    centroids.push(getRandomCentroid(min, max, data[0].length));
  }
  return centroids;
}

function shouldStop(prevCentroids, centroids, iterations, maxIterations) {
  if (iterations > maxIterations) return true;
}

/**
 * Adds to vectors
 *
 * @param {Array<number>} x
 * @param {Array<number>} y
 */
function add(x, y) {
  if (x.length !== y.length) {
    console.log(x, y);
    throw new Error('Expected vector `x` to be of the same lenght as `y`');
  };

  const sum = [];
  for(let i = 0; i < x.length; i++) {
    sum.push(x[i] + y[i]);
  }
  return sum;
}

/**
 * Returns euclidean distance of two vectors.
 *
 * @param {Array<number>} x
 * @param {Array<number>} y
 * @returns {number}
 */
function euclideanDistance(x, y) {
  // TODO: Optimize
  if (x.length !== y.length) {
    console.log(x, y);
    throw new Error('Expected vector `x` to be of the same lenght as `y`')
  };
  const diff = [];
  for (let i = 0; i < x.length; i++) {
    diff[i] = x[i] - y[i];
  }

  const squared = [];
  for (let i = 0; i < diff.length; i++) {
    squared[i] = diff[i]**2;
  }

  const d = squared.reduce((a, b) => a + b, 0);
  return d;
}

/**
 * Returns the index of the closest centroid of the given `datapoint`.
 *
 * @param {Array<number>} datapoint
 * @param {Array<Array<number>>} centroids
 * @return {number}
 */
// Return an index for which centroids is the closest to the given point.
function getLabel(datapoint, centroids) {
  // Max distance for color
  let min = 361;
  let index = -1;
  for (let i = 0; i < centroids.length; i++) {
    if (euclideanDistance(datapoint, centroids[i]) > min) {
      min = euclideanDistance(datapoint, centroids[i]);
      index = i;
    }
  }
  return index;
}

/**
 * Returns indexes for the closest centroids of the given data set.
 *
 * @param {Array<Array<number>>} data
 * @param {Array<Array<number>>} centroids
 * @param {Array<number>}
 */
// Returns all indexes of which centroid is the closest.
function getLabels(data, centroids) {
  const labels = [];
  for (let i = 0; i < data.length; i++) {
    labels[i] = getLabel(data[i], centroids);
  }
  return labels;
}

/**
 * Return the next iterated centroid.
 *
 * @param {Array<Array<number>>} data
 * @param {Array<number>} labels
 * @param {number} j - index of a centroid
 */
function getCentroid(data, labels, j) {
  let numerator = [0, 0, 0];
  let denominator = 0;
  for (let i = 0; i < data.length; i++) {
    if (labels[i] === j) {
      centroidExists = true;
      numerator = add(numerator, data[i]);
      denominator += 1;
    }
  }

  if (denominator === 0) {
    denominator = 1;
  }

  return numerator.map((n) => n / denominator);
}

/**
 * Returns all iterated centroids.
 *
 * @param {Array<Array<number>>} data
 * @param {Array<number>} labels
 * @param {number} k
 * @returns {Array<Array<number>>}
 */
function getCentroids(data, labels, k) {
  const centroids = [];
  for (let i = 0; i < k; i++) {
    centroids.push(getCentroid(data, labels, i));
  }
  return centroids;
}

/**
 * k-means clustering
 *
 * @param {Array<number>} data
 * @param {number} k - Number of centroids
 * @param {Object} options
 * @param {Array<Array<number>>} options.centroids
 * @return {Array<Array<number>>} - Returns the centroids
 */
function kmeans(data, k, options) {
  const optionsCopy = Object.assign({}, options);
  let iterations = 0;
  let centroids = optionsCopy.centroids || getRandomCentroids(data, k);
  let prevCentroids = [];
  while (!shouldStop(prevCentroids, centroids, iterations, 10000)) {
    prevCentroids = centroids;
    iterations += 1;

    let labels = getLabels(data, centroids);
    centroids = getCentroids(data, labels, k);
  }
  return centroids;
}

module.exports = kmeans;
