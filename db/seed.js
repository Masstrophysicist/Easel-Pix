import client from "./client.js";
import { createUser } from "./users.js";
import { createPost } from "./posts.js";

export const seed = async () => {
  try {
    await client.connect();

    // Users Created //
    const [orlando, zach, tyler] = await Promise.all([
      createUser({
        username: "orlando123",
        displayname: "Orlando",
        biography: "Backend Developer",
        password: "or12345",
      }),
      createUser({
        username: "zach123",
        displayname: "Zach",
        biography: "Frontend Developer",
        password: "za12345",
      }),
      createUser({
        username: "tyler123",
        displayname: "Tyler",
        biography: "Software Engineer",
        password: "ty12345",
      }),
    ]);

    // Create Posts //

    await Promise.all([
      createPost({
        user_id: zach.id,
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
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
    console.log("Database seeded");
  }
};

await seed();
