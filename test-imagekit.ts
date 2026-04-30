import imagekit from "./lib/imagekit";

async function run() {
  try {
    const response = await imagekit.files.upload({
      file: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
      fileName: "test.png",
      folder: "/",
    });
    console.log("Success:", response.url);
  } catch (error) {
    console.error("Error:", error);
  }
}

run();
