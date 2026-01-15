import client from "./client.js";
import { createUser } from "./users.js";
import { createPost } from "./posts.js";

export const seed = async () => {
  try {
    await client.query("TRUNCATE posts, users RESTART IDENTITY CASCADE;");

    //Users Created//
    const [orlando, zak, tyler] = await Promise.all([
      createUser({
        username: "orlando123",
        displayname: "Orlando",
        biography: "Backend Developer",
        password: "or12345",
        profilePicture: "../images/orlandopfp.jpg",
        banner: "../images/orlandobanner.jpg",
      }),
      createUser({
        username: "zak123",
        displayname: "Zak",
        biography: "Frontend Developer",
        password: "za12345",
        profilePicture: "../images/zakpfp.JPG",
        banner: "../images/zakbanner.jpg",
      }),
      createUser({
        username: "tyler123",
        displayname: "Tyler",
        biography: "Software Engineer",
        password: "ty12345",
        profilePicture: "../images/tylerpfp.jpg",
        banner: "../images/tylerbanner.jpg",
      }),
    ]);

    //Create Posts//

    await Promise.all([
      createPost({
        user_id: zak.id,
        title: "New Beginnings",
        description: "This is the start to my journey as an engineer.",
      }),
      createPost({
        user_id: tyler.id,
        title: "Making my Mark",
        description: "As my journey continues, I keep working hard.",
      }),
      createPost({
        user_id: orlando.id,
        title: "My Other Passion",
        description:
          "I enjoy soccer a lot and here is a moment I'd like to share.",
      }),
    ]);
    console.log("You've made it");
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Database seeded");
  }
};
