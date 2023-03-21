function blockSwitch(switchItem, switchBlock) {
  for (let n = 0; n < switchItem.length; n++) {
    let itemNav = switchItem[n].getAttribute("data-to");
    switchItem[n].addEventListener("click", () => {
      for (let i = 0; i < switchBlock.length; i++) {
        let blockNav = switchBlock[i].getAttribute("data-to");
        if (itemNav == blockNav) {
          switchItem.forEach(item => {
            item.classList.remove("active");
          })
          switchItem[n].classList.add("active")
          switchBlock[i].classList.add("active");
        } else {
          switchBlock[i].classList.remove("active");
        }
      }
    })
  }
}
if (document.querySelector(".images-product")) {
  let swiperSubImages = new Swiper(".images-product__subslider", {
    direction: "horizontal",
    slidesPerView: 4,
    spaceBetween: 10,
    breakpoints: {
      360: {
        spaceBetween: 30,
      }
    },
    observe: true,
    observeParents: true,
    freeMode: true,
    speed: 800
  })
  let swiperImages = new Swiper(".images-product__slider", {
    slidesPerView: 1,
    observe: true,
    observeParents: true,
    spaceBetween: 10,
    thumbs: {
      swiper: swiperSubImages,

    },
    speed: 800
  })
}
if (document.querySelector(".info-product")) {
  const switchItem = document.querySelectorAll(".info-product__navitem");
  const switchBlock = document.querySelectorAll(".info-product__block")
  const switchItemMobile = document.querySelectorAll(".info-product__navitem--mobile");
  blockSwitch(switchItem, switchBlock)
  switchItemMobile.forEach((item, idx) => {
    item.addEventListener("click", () => {
      if (!item.classList.contains("active")) {
        switchItemMobile.forEach(item => {
          item.classList.remove("active")
        })
        switchBlock.forEach(item => {
          item.classList.remove("active")
        })
        switchItemMobile[idx].classList.add("active")
        switchBlock[idx].classList.add("active")
      } else {
        switchItemMobile[idx].classList.remove("active")
        switchBlock[idx].classList.remove("active")
      }
    })
  })
}
//  poppup  
const fulfilledModal = document.querySelector(".fulfilled-modal")
const errorModal = document.querySelector(".error-modal")
function formSend(event, form, modal, modalInner) {
  event.preventDefault();
  let error = formValidate(form);
  if (error === 0) {
    form.classList.remove("error")
    closeModal(modal, modalInner)
    setTimeout(() => {
      openModal(fulfilledModal, fulfilledModal.querySelector(".modal__inner"))
    }, 500);
    //otpravlaem zapros
    // esli otvet neudachniy
   /*  setTimeout(() => {
      openModal(errorModal, errorModal.querySelector(".modal__inner"))
    }, 500); */

    // esli otvet uspeshniy
    /*  setTimeout(() => {
      openModal(errorModal, fulfilledModal.querySelector(".modal__inner"))
    }, 500); */
  } else {
    form.classList.add("error")
  }
}
function formValidate(form) {
  let formReg = form.querySelectorAll(".reg");
  let error = 0;
  formReg.forEach(item => {
    formRemoveError(item);
    if (item.classList.contains("phone")) {
      if (!/^((\+7|7|8)([\s\-])?)?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(item.value)) {
        formAddError(item);
        error++;
      }
    } else {
      if (item.value === "") {
        formAddError(item);
        error++;
      }
    }
  })
  return error
}
function formAddError(item) {
  item.parentElement.classList.add("error");
  item.classList.add("error")
}
function formRemoveError(item) {
  item.parentElement.classList.remove("error");
  item.classList.remove("error")
}
function openModal(modal, modalInner) {
  let paddingValue = window.innerWidth - document.documentElement.clientWidth + 'px'
  modal.classList.add("open")
  document.body.style.paddingRight = paddingValue
  document.body.classList.add("no-scroll");
  setTimeout(() => {
    modalInner.style.transform = "rotateX(0deg)"
  }, 200)
}
function closeModal(modal, modalInner) {
  modalInner.style.transform = "rotateX(90deg)"
  setTimeout(() => {
    modal.classList.remove("open")
    document.body.style.paddingRight = '0px'
    document.body.classList.remove("no-scroll")
  }, 500)
}
const modal = document.querySelectorAll(".modal");
modal.forEach(item => {
  const modalInner = item.querySelector(".modal__inner");
  let formCloseBtn = item.querySelector(".icon-close")
  formCloseBtn.addEventListener("click", e => {
    closeModal(item, modalInner)
  })
  item.addEventListener("click", e => {
    if (!modalInner.contains(e.target)) {
      closeModal(item, modalInner)
    }
  })
})
// pickup-modal
if (document.querySelector(".pickup-modal")) {
  const pickupModal = document.querySelector(".pickup-modal");
  const pickupModalInner = document.querySelector(".pickup-modal__inner");
  const form = pickupModalInner.querySelector(".form-modal");
  const formFile = document.querySelector(".file-modal__inp")
  const formFileInner = document.querySelector(".file-modal")
  let formOpenBtn = document.querySelector(".pickup-openBtn")
  formOpenBtn.addEventListener("click", () => openModal(pickupModal, pickupModalInner))
  formFile.addEventListener("change", () => {
    let files = formFile.files;
    for (let i = 0; i < files.length; i++) {
      let fileName = files[i].name;
      let fileDiv = document.createElement("div");
      fileDiv.textContent = fileName
      fileDiv.classList.add("file-name")
      formFileInner.append(fileDiv)
    }
  })
  form.addEventListener("submit", event => formSend(event, form, pickupModal, pickupModalInner));
}
//feedback-modal
if (document.querySelector(".feedback-modal")) {
  const feedbackModal = document.querySelector(".feedback-modal");
  const pickupModalInner = document.querySelector(".feedback-modal__inner");
  const form = pickupModalInner.querySelector(".form-modal");
  let formOpenBtn = document.querySelectorAll(".table-block__item--btn")
  formOpenBtn.forEach(item => {
    item.addEventListener("click", () => openModal(feedbackModal, pickupModalInner))
  })
  form.addEventListener("submit", event => formSend(event, form, feedbackModal, pickupModalInner));
}
window.addEventListener("scroll", () => {
  let windowTop = window.pageYOffset || document.documentElement.scrollTop;
  let animate = document.querySelectorAll(".animate");
  animate.forEach(item => {
    function offset(item) {
      let rect = item.getBoundingClientRect();
      return rect.top
    }
    let animation = item.getAttribute("data-animation");
    let itemTop = offset(item) + windowTop;
    let itemPoint = Math.abs(window.innerHeight - item.offsetHeight * 0.5);
    if (item.offsetHeight === undefined) {
      let itemParent = item.parentNode;
      itemPoint = window.innerHeight - itemParent.offsetHeight / 2;
    }
    if (windowTop > itemTop - itemPoint) {
      item.style.opacity = "1"
      item.classList.add(animation);
      item.classList.add("animated");
    } else if (window.innerHeight < offset(item)) {
      item.style.cssText += "opacity:0"
      item.classList.remove(animation);
    }
  })
})



