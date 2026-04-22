const API_KEY = "ca370d51a054836007519a00ff4ce59e";
const PER_PAGE = 9;

const getBtn = document.getElementById("getBtn");
const gallery = document.getElementById("gallery");
const statusText = document.getElementById("status");

getBtn.addEventListener("click", getimg);

async function getimg() {
  gallery.innerHTML = "";
  statusText.textContent = "載入中，請稍候...";

  try {
    const recentUrl =
      "https://api.flickr.com/services/rest/?" +
      "method=flickr.photos.getRecent" +
      `&api_key=${API_KEY}` +
      `&per_page=${PER_PAGE}` +
      "&format=json" +
      "&nojsoncallback=1";

    const recentResponse = await fetch(recentUrl);

    if (!recentResponse.ok) {
      throw new Error("無法取得 Flickr 最近照片資料");
    }

    const recentData = await recentResponse.json();

    if (!recentData.photos || !recentData.photos.photo) {
      throw new Error("Flickr 回傳資料格式錯誤");
    }

    const photos = recentData.photos.photo;

    const imageList = await Promise.all(
      photos.map(async (photo) => {
        try {
          const sizeUrl =
            "https://api.flickr.com/services/rest/?" +
            "method=flickr.photos.getSizes" +
            `&api_key=${API_KEY}` +
            `&photo_id=${photo.id}` +
            "&format=json" +
            "&nojsoncallback=1";

          const sizeResponse = await fetch(sizeUrl);

          if (!sizeResponse.ok) {
            return null;
          }

          const sizeData = await sizeResponse.json();

          if (!sizeData.sizes || !sizeData.sizes.size) {
            return null;
          }

          const sizes = sizeData.sizes.size;

          let selected =
            sizes.find((item) => item.label === "Medium") ||
            sizes.find((item) => item.label === "Large") ||
            sizes[sizes.length - 1];

          if (!selected || !selected.source) {
            return null;
          }

          return {
            src: selected.source,
            title: photo.title ? photo.title : "Flickr Photo",
            pageUrl: `https://www.flickr.com/photos/${photo.owner}/${photo.id}`
          };
        } catch (error) {
          return null;
        }
      })
    );

    const validImages = imageList.filter((item) => item !== null);

    if (validImages.length === 0) {
      statusText.textContent = "找不到可顯示的圖片";
      return;
    }

    renderImages(validImages);
    statusText.textContent = `已載入 ${validImages.length} 張圖片`;
  } catch (error) {
    console.error(error);
    statusText.textContent = "載入失敗：" + error.message;
  }
}

function renderImages(images) {
  gallery.innerHTML = "";

  images.forEach((image) => {
    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.title;
    img.title = image.title;

    img.addEventListener("click", function () {
      window.open(image.pageUrl, "_blank");
    });

    gallery.appendChild(img);
  });
}