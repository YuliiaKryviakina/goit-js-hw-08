// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const galleryCardList = createGalleryItems(galleryItems);

function createGalleryItems(galleryItems) {
    return galleryItems
        .map(({ preview, original, description }) => {
            return `<li class="gallery__item"><a class="gallery__link" ${original}>
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
        </a>
        </li>`;
        })
        .join('');
}

galleryContainer.insertAdjacentHTML('beforeend', galleryCardList);
galleryContainer.addEventListener('click', selectGalleryEl);

function selectGalleryEl(evt) {
    const galleryImage = evt.target.classList.contains('gallery__image');
    if (!galleryImage) {
        return;
    }

    const instance = basicLightbox.create(
        `<img src="${evt.target.dataset.source}" width="900" height="700">`,
        {
            onShow: () => {
                window.addEventListener('keydown', onKeydownEsc);
            },
            onClose: () => {
                window.removeEventListener('keydown', onKeydownEsc)
            },
        },
    );

    const onKeydownEsc = evt => {
        console.log(evt.code);
        if (evt.code === 'Escape') {
            instance.close();
        }
    };
    instance.show();
}
