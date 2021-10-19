db.movies.aggregate([
  {
    $project: {
      _id: false,
      title_split: {
        $split: ["$title", " "],
      },
    },
  },
  {
    $project: {
      title_split: true,
      size: {
        $size: "$title_split",
      },
    },
  },
  {
    $match: {
      size: 1,
    },
  },
  {
    $project: {
      title_split: true,
    },
  },
  {
    $sort: {
      title_split: 1,
    },
  },
]);
