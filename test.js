const test = require('ava');
const kmeans = require('./index');

test('kmeans returns centroids', t => {
  const dataSet = [
    [11, 0, 128],
    [18, 3, 185],
    [56, 41, 216],
    [161, 153, 243],
    [100, 88, 228],
    [88, 109, 228],
    [4, 125, 73],
    [250, 196, 147],
    [20, 141, 100],
    [83, 17, 75],
    [240, 187, 93],
    [8, 23, 200],
    [140, 223, 227],
    [100, 63, 8],
    [247, 121, 249],
    [86, 138, 150],
    [42, 47, 151],
    [162, 216, 22],
    [76, 184, 69],
    [247, 242, 33],
    [53, 126, 206],
    [235, 10, 73],
    [116, 93, 155],
    [127, 204, 202],
    [220, 159, 173],
    [245, 34, 58],
    [194, 53, 210],
  ];
  // const randomCentroids = [[18, 133, 135], [104, 216, 75]];
  const randomCentroids = [[60, 127, 130], [167, 92, 76]];
  const convergedCentroid1 = [214, 128.1, 106.6];
  const convergedCentroid2 = [69.94117647058823, 100.88235294117646, 166.8235294117647];
  t.deepEqual(
    kmeans(dataSet, 2, { centroids: randomCentroids }),
    [convergedCentroid1, convergedCentroid2]
  );
});
