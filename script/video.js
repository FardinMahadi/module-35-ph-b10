// 1 - Fetch, Load and Show Categories on html

function getTimeString(time) {
  // get hour and rest seconds
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;

  return `${hour}h ${minute}m ${remainingSecond}s`;
}

// create loadCategories
const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// {
//   category_id: "1001",
//   category: "Music",
// };

// create displayCategories
const displayCategories = (category) => {
  const categoryContainer = document.getElementById("categories");

  category.forEach((item) => {
    console.log(item);

    // create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button onclick="loadCategoryVideos(${item.category_id})" class="btn focus:bg-red-500 focus:text-white">
    ${item.category}
    </button>
    `;
    // add button to category container
    categoryContainer.append(buttonContainer);
  });
};

// create loadVideos
const loadVideos = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const loadCategoryVideos = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category))
    .catch((error) => console.log(error));
};

const cardDemo = {
  category_id: "1001",
  video_id: "aaab",
  thumbnail: "https://i.ibb.co/QPNzYVy/moonlight.jpg",
  title: "Midnight Serenade",
  authors: [
    {
      profile_picture: "https://i.ibb.co/fDbPv7h/Noha.jpg",
      profile_name: "Noah Walker",
      verified: false,
    },
  ],
  others: {
    views: "543K",
    posted_date: "",
  },
  description:
    "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night.",
};

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div
          class="min-h-[300px] flex flex-col gap-5 justify-center items-center"
        >
          <img src="./assets/Icon.png" />
          <h2 class="text-center text-xl font-bold">
            No Content Here in this Category
          </h2>
        </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = ` 
    <figure class="w-full aspect-[16/9] relative">
        <img
          src="${video.thumbnail}"
          alt="Shoes"
          class="h-full w-full object-cover rounded-lg"
        />
        ${
          video.others.posted_date?.length == 0
            ? ""
            : `<span class='absolute right-2 bottom-2 bg-black text-white p-1 rounded-lg border-none text-xs'>${getTimeString(
                video.others.posted_date
              )}</span>`
        }
        
      </figure>
        <div class="px-0 py-2 flex gap-2">
      <div>
        <img
          class="w-10 h-10 rounded-full object-cover"
          src="${video.authors[0].profile_picture}"
          alt=""
        />
      </div>
      <div>
        <h2 class="font-bold">${video.title}</h2>
        <div class="flex items-center gap-2">
          <p class="text-xs text-gray-400">${video.authors[0].profile_name}</p>
          ${
            video.authors[0].verified === true
              ? `<img
            class="w-5"
            src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"
          />`
              : ""
          }
        </div>
        <p class="text-xs text-gray-400">${video.others.views} views</p>
      </div>
    </div>`;
    videoContainer.append(card);
  });
};

loadCategories();
loadVideos();
