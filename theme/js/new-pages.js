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
  switchItemMobile.forEach((item,idx) => {
    item.addEventListener("click",()=> {
      if (!item.classList.contains("active")) {
        switchItemMobile.forEach(item =>{
          item.classList.remove("active")
        })
        switchBlock.forEach(item =>{
          item.classList.remove("active")
        })
        switchItemMobile[idx].classList.add("active")
        switchBlock[idx].classList.add("active")
      }
    })   
  })
}
if (document.querySelector(".pickup-modal")) {
  const pickupModal = document.querySelector(".pickup-modal");
  const pickupModalInner = document.querySelector(".pickup-modal__inner");
  const form = document.querySelector(".form-pickup");
  let formReg = document.querySelectorAll(".reg");
  const formFile = document.querySelector(".file-modal__inp")
  const formFileInner = document.querySelector(".file-modal")
  let formOpenBtn = document.querySelector(".pickup-openBtn")
  let formCloseBtn = document.querySelector(".form-pickup__close")
  let paddingValue = window.innerWidth - document.documentElement.clientWidth + 'px'
  formOpenBtn.addEventListener("click",()=>{
    pickupModal.classList.add("open")
    document.body.style.paddingRight = paddingValue
    document.body.classList.add("no-scroll");
    setTimeout(() => {
      pickupModalInner.style.transform = "rotateX(0deg)"
     }, 200)
  })
  formCloseBtn.addEventListener("click",e => {
    e.preventDefault()
    closeModal()
  })
  pickupModal.addEventListener("click", e => {
    if (!pickupModalInner.contains(e.target)) {
      closeModal()
    }
  })
  function closeModal() {
    pickupModalInner.style.transform = "rotateX(90deg)"
      setTimeout(() => {
        pickupModal.classList.remove("open")
        document.body.style.paddingRight = '0px'
        document.body.classList.remove("no-scroll")
      }, 500)
  }
formFile.addEventListener("change", ()=>{
  let files = formFile.files;
  for (let i = 0; i < files.length; i++) {
    let fileName = files[i].name;
    let fileDiv = document.createElement("div");
    fileDiv.textContent = fileName
    fileDiv.classList.add("file-name")
    formFileInner.append(fileDiv)
  }
})
form.addEventListener("submit", formSend);
function formSend(event) {
  event.preventDefault();
  let error = formValidate(form);
  if (error === 0) {
    event.target.submit();
    form.classList.remove("error")
   // alert("Форма отправлена");
  } else {
    form.classList.add("error")
     // alert("Заполните обязательные поля");
  }
}
function formValidate(form) {
  let error = 0;
  formReg.forEach(function(item) {
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
 
}
window.addEventListener("scroll", () => {
  let windowTop = window.pageYOffset;
  let animate = document.querySelectorAll(".animate");
  animate.forEach(item => {
    if (!item.classList.contains("animated")) {
      item.style.cssText += "opacity:0"
    }
    function offset(item) {
      let rect = item.getBoundingClientRect();
      let scrollLeft = window.pageXOffsetLeft || document.documentElement.scrollLeft;
      let scrollTop = window.pageYOffsetLeft || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    let itemTop = offset(item).top;
    let itemPoint = Math.abs(window.innerHeight - item.offsetHeight * 0.5);
    if (item.offsetHeight === undefined) {
      let itemParent = item.parentNode;
      itemPoint = window.innerHeight - itemParent.offsetHeight / 2;
    }
    if (windowTop > itemTop - itemPoint) {
      let animation = item.getAttribute("data-animation");
      item.style.opacity = "1"
      //item.style.cssText += `animation-name: ${animation}; animation-fill-mode: both;animation-timing-function: ease-out;`
      item.classList.add(animation);
      item.classList.add("animated");
    }
  })
})
