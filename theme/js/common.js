$(function() {

  // input mask
  $('[name=PHONE]').mask('+7 (000) 000-00-00');

	// swipers
	let swiperMain = new Swiper('#main-slider .swiper-container', {
		speed: 900,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: '.main-slider .swiper-pagination',
      clickable: true,
    },
  });
  // for blog swipers
  if($('.sbi-slider').length > 0) {
    let swiperArray = [];
    $('.sbi-slider').each(function(index, element){ 
      const $this = $(this);

      $this.addClass(`sbi-${index}`)
      swiperArray[index] = new Swiper(`.sbi-slider.sbi-${index} .swiper-container`, {
        slidesPerView: 'auto',
        spaceBetween: 60,
        freeMode: true,
        navigation: {
          nextEl: `.sbi-slider.sbi-${index} .swiper-button-next`,
          prevEl: `.sbi-slider.sbi-${index} .swiper-button-prev`,
        },
      });
    });
  }
  // slideTo firs slide
  $('.main-slider .swiper-container .ms-itm .ms-dots .ms-back').click(function() {
  	swiperMain.slideTo(1, 900)
  });


  let activeNumCheck = true;
  // waypoints
  if($('div').is('.s-four')) {
    new Waypoint({
      element: document.querySelector('.s-four'),
      handler: function(direction) {
        // animate numbers
        if(activeNumCheck) {
          $('#num_1').animateNumber(
            {
              number: $('#num_1').attr("data-number")
            },
            {
              easing: 'swing',
              duration: 2500
            }
          );
          $('#num_2').animateNumber(
            {
              number: $('#num_2').attr("data-number")
            },
            {
              easing: 'swing',
              duration: 2500
            }
          );
          $('#num_3').animateNumber(
            {
              number: $('#num_3').attr("data-number")
            },
            {
              easing: 'swing',
              duration: 2500
            }
          );
          $('#num_4').animateNumber(
            {
              number: $('#num_4').attr("data-number")
            },
            {
              easing: 'swing',
              duration: 2500
            }
          );
          activeNumCheck = false
        }
      },
      offset: '60%',
    });
  }

  

  // open/close mobile-mnu
  $('header .h-adap-mnu').click(function() {
    $(this).toggleClass('active');
    $('header .h-mnu').toggleClass('active');
  });


});
