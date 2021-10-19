db.movies.aggregate([
  {
    $match: {
      countries: "USA",
      "tomatoes.viewer.rating": { $gte: 3 },
    },
  },
  {
    $project: {
      _id: false,
      title: true,
      "tomatoes.viewer.rating": true,
      favs: {
        $setIntersection: [
          "$cast",
          [
            "Sandra Bullock",
            "Tom Hanks",
            "Julia Roberts",
            "Kevin Spacey",
            "George Clooney",
          ],
        ],
      },
    },
  },
  {
    $match: {
      favs: { $ne: null },
    },
  },
  {
    $project: {
      _id: false,
      title: true,
      "tomatoes.viewer.rating": true,
      num_favs: {
        $size: "$favs",
      },
    },
  },
  {
    $sort: {
      num_favs: -1,
      "tomatoes.viewer.rating": -1,
      title: -1,
    },
  },
  {
    $skip: 24,
  },
  {
    $limit: 1,
  },
  {
    $project: {
      title: true,
    },
  },
]);
