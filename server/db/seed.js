import client from "./client.js";
import { createUser } from "./users.js";
import { createPost } from "./posts.js";
import { loadImage } from "../utills/loadImage.js";

export const seed = async () => {
  try {
    await client.query("TRUNCATE posts, users RESTART IDENTITY CASCADE;");
    const orlandopfp = await loadImage("../images/orlandopfp.jpg");
    const orlandobg = await loadImage("../images/orlandobanner.jpg");
    const zakpfp = await loadImage("../images/zakpfp.JPG");
    const zakbg = await loadImage("../images/zakbanner.jpg");
    const tylerpfp = await loadImage("../images/tylerpfp.jpg");
    const tylerbg = await loadImage("../images/tylerbanner.jpg");

    //Users Created//
    const [orlando, zak, tyler] = await Promise.all([
      createUser({
        username: "orlando123",
        displayname: "Orlando",
        biography: "Backend Developer",
        password: "or12345",
        profilePicture: orlandopfp,
        banner: orlandobg,
      }),
      createUser({
        username: "zak123",
        displayname: "Zak",
        biography: "Frontend Developer",
        password: "za12345",
        profilePicture: zakpfp,
        banner: zakbg,
      }),
      createUser({
        username: "tyler123",
        displayname: "Tyler",
        biography: "Software Engineer",
        password: "ty12345",
        profilePicture: tylerpfp,
        banner: tylerbg,
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
