import { useParams } from "react-router";

const SinglePost = ({ posts }) => {
  const { id } = useParams();

  const SinglePost = posts.find((post) => {
    return post.id === id;
  });
  if (!SinglePost) {
    return <h4>Looking for Post...</h4>;
  }

  return (
    <div>
      <h2>{SinglePost.image}</h2>
    </div>
  );
};

export default SinglePost;
