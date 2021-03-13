import connectDB from "../../middleware/mongoDb";
import Blog from "../../models/blogs";
function compareLikes(a, b) {
  if (a.likes.legnth < b.likes.legnth) {
    return -1;
  }
  if (a.likes.legnth > b.likes.legnth) {
    return 1;
  }
  return 0;
}
function compareViews(a, b) {
  if (a.views.legnth < b.views.legnth) {
    return -1;
  }
  if (a.views.legnth > b.views.legnth) {
    return 1;
  }
  return 0;
}
function compareTop(a, b) {
  if (a.views.legnth < b.views.legnth) {
    return -1;
  }
  if (a.views.legnth > b.views.legnth) {
    return 1;
  }
  return 0;
}
const handler = async (req, res) => {
  Blog.find({}, (error, data) => {
    if (data.length >= 14) {
      console.log(data);
      const likesSorted = data;
      const viewsSorted = data;
      const topSorted = data;
      likesSorted.sort(compareLikes);
      viewsSorted.sort(compareViews);
      topSorted.sort(compareTop);
      data.reverse();
      const array = [[], [], [], [], []];
      array[0] = [likesSorted[0]];
      if (data.indexOf(likesSorted[0]) > -1) {
        data.splice(data.indexOf(likesSorted[0]), 1);
      }
      array[1] = data.slice(0, 4);
      if (viewsSorted.indexOf(likesSorted[0]) > -1) {
        data.splice(viewsSorted.indexOf(likesSorted[0]), 1);
      }

      if (viewsSorted.indexOf(data[0]) > -1) {
        data.splice(viewsSorted.indexOf(data[0]), 1);
      }

      if (viewsSorted.indexOf(data[1]) > -1) {
        data.splice(viewsSorted.indexOf(data[1]), 1);
      }

      if (viewsSorted.indexOf(data[2]) > -1) {
        data.splice(viewsSorted.indexOf(data[2]), 1);
      }

      if (viewsSorted.indexOf(data[3]) > -1) {
        data.splice(viewsSorted.indexOf(data[3]), 1);
      }
      array[2] = [];
      array[3] = viewsSorted.slice(0, 2);
      array[4] = data.slice(4, 44);
      res.status(200).send(array);
    } else {
      res.status(200).send([
        [
          {
            username: "username",
            tags: "tags",
            userdp: "/logo.webp",
            date: "date",
            _id: "6048646cb36f7b029c05210e",
            ddate: "display-date",
            image: "/logo.webp",
            blog: "blog",
            title: "title",
          },
        ],
        [
          {
            username: "username",
            tags: "tags",
            userdp: "/logo.webp",
            date: "date",
            _id: "6048646cb36f7b029c05210e",
            ddate: "display-date",
            image: "/logo.webp",
            blog: "blog",
            title: "title",
          },
          {
            username: "username",
            tags: "tags",
            userdp: "/logo.webp",
            date: "date",
            _id: "6048646cb36f7b029c05210e",
            ddate: "display-date",
            image: "/logo.webp",
            blog: "blog",
            title: "title",
          },
          {
            username: "username",
            tags: "tags",
            userdp: "/logo.webp",
            date: "date",
            _id: "6048646cb36f7b029c05210e",
            ddate: "display-date",
            image: "/logo.webp",
            blog: "blog",
            title: "title",
          },
        ],
        [
          {
            username: "username",
            tags: "tags",
            userdp: "/logo.webp",
            date: "date",
            _id: "6048646cb36f7b029c05210e",
            ddate: "display-date",
            image: "/logo.webp",
            blog: "blog",
            title: "title",
          },
          {
            username: "username",
            tags: "tags",
            userdp: "/logo.webp",
            date: "date",
            _id: "6048646cb36f7b029c05210e",
            ddate: "display-date",
            image: "/logo.webp",
            blog: "blog",
            title: "title",
          },
          {
            username: "username",
            tags: "tags",
            userdp: "/logo.webp",
            date: "date",
            _id: "6048646cb36f7b029c05210e",
            ddate: "display-date",
            image: "/logo.webp",
            blog: "blog",
            title: "title",
          },
          {
            username: "username",
            tags: "tags",
            userdp: "/logo.webp",
            date: "date",
            _id: "6048646cb36f7b029c05210e",
            ddate: "display-date",
            image: "/logo.webp",
            blog: "blog",
            title: "title",
          },
          {
            username: "username",
            tags: "tags",
            userdp: "/logo.webp",
            date: "date",
            _id: "6048646cb36f7b029c05210e",
            ddate: "display-date",
            image: "/logo.webp",
            blog: "blog",
            title: "title",
          },
          {
            username: "username",
            tags: "tags",
            userdp: "/logo.webp",
            date: "date",
            _id: "6048646cb36f7b029c05210e",
            ddate: "display-date",
            image: "/logo.webp",
            blog: "blog",
            title: "title",
          },
          {
            username: "username",
            tags: "tags",
            userdp: "/logo.webp",
            date: "date",
            _id: "6048646cb36f7b029c05210e",
            ddate: "display-date",
            image: "/logo.webp",
            blog: "blog",
            title: "title",
          },
        ],
        [
          {
            username: "username",
            tags: "tags",
            userdp: "/logo.webp",
            date: "date",
            _id: "6048646cb36f7b029c05210e",
            ddate: "display-date",
            image: "/logo.webp",
            blog: "blog",
            title: "title",
          },
          {
            username: "username",
            tags: "tags",
            userdp: "/logo.webp",
            date: "date",
            _id: "6048646cb36f7b029c05210e",
            ddate: "display-date",
            image: "/logo.webp",
            blog: "blog",
            title: "title",
          },
        ],
        [
          {
            username: "username",
            tags: "tags",
            userdp: "/logo.webp",
            date: "date",
            _id: "6048646cb36f7b029c05210e",
            ddate: "display-date",
            image: "/logo.webp",
            blog: "blog",
            title: "title",
          },
          {
            username: "username",
            tags: "tags",
            userdp: "/logo.webp",
            date: "date",
            _id: "6048646cb36f7b029c05210e",
            ddate: "display-date",
            image: "/logo.webp",
            blog: "blog",
            title: "title",
          },
          {
            username: "username",
            tags: "tags",
            userdp: "/logo.webp",
            date: "date",
            _id: "6048646cb36f7b029c05210e",
            ddate: "display-date",
            image: "/logo.webp",
            blog: "blog",
            title: "title",
          },
          {
            username: "username",
            tags: "tags",
            userdp: "/logo.webp",
            date: "date",
            _id: "6048646cb36f7b029c05210e",
            ddate: "display-date",
            image: "/logo.webp",
            blog: "blog",
            title: "title",
          },
          {
            username: "username",
            tags: "tags",
            userdp: "/logo.webp",
            date: "date",
            _id: "6048646cb36f7b029c05210e",
            ddate: "display-date",
            image: "/logo.webp",
            blog: "blog",
            title: "title",
          },
          {
            username: "username",
            tags: "tags",
            userdp: "/logo.webp",
            date: "date",
            _id: "6048646cb36f7b029c05210e",
            ddate: "display-date",
            image: "/logo.webp",
            blog: "blog",
            title: "title",
          },
          {
            username: "username",
            tags: "tags",
            userdp: "/logo.webp",
            date: "date",
            _id: "6048646cb36f7b029c05210e",
            ddate: "display-date",
            image: "/logo.webp",
            blog: "blog",
            title: "title",
          },
        ],
      ]);
    }
  });
};
export default connectDB(handler);
