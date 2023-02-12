"use strict";

import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryRef = document.querySelector(".gallery");
const itemsMarkap = makeGalleryItems(galleryItems);

galleryRef.insertAdjacentHTML("beforeend", itemsMarkap);

function makeGalleryItems(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>
    `;
    })
    .join("");
}

galleryRef.addEventListener("click", selectImg);

function selectImg(e) {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") {
    return;
  }
  const instance = basicLightbox.create(
    `<img src="${e.target.dataset.source}"/>`,
    {
      onShow: () => {
        document.addEventListener("keydown", onEscKeyPress);
      },
      onClose: () => {
        document.removeEventListener("keydown", onEscKeyPress);
      },
    }
  );
  instance.show();

  function onEscKeyPress(e) {
    if (e.code === "Escape") {
      return instance.close();
    }
  }
}