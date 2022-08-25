$(document).ready(function(){

    const isMobile = {
        Android: function(){
            return navigator.userAgent.match(/Android/i)
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i)
        },
        iOS: function(){
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        Opera: function(){
            return navigator.userAgent.match(/Opera mini/i)
        },
        Windows: function(){
            return navigator.userAgent.match(/IEMobile/i)
        },
        any: function(){
            return(
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows()
            )
        }
    }

    if(isMobile.any()){
        $('body').addClass('_touch')

    }else{
        $('body').addClass('_pc')
    }



    //header dropdown menu 
    $('.menu-dropdown').slideUp(300)

    if(isMobile.any()){
        $('.menu .menu__item__with__dop').click(function(e){
            e.preventDefault()
            appearDropDown.call(this, e)
        })
        $('.menu-big .menu__item__with__dop').click(function(e){
            e.preventDefault()
            appearDropDown.call(this, e)
        })
    }else{
        $('.menu .menu__item__with__dop').parent().hover(function(e){
            appearDropDown.call($(this).children($('.menu__item__with__dop')), e)
        })
        $('.menu-big .menu__item__with__dop').parent().hover(function(e){
            appearDropDown.call($(this).children($('.menu__item__with__dop')), e)
        })
    }

    function appearDropDown(e){
        $(this).toggleClass('_active-dropdown')
        $(this).next($('.menu-dropdown')).slideToggle(300)

        //if(isMobile.any()){
            $('.menu__item__with__dop').not($(this)).removeClass('_active-dropdown')
            $('.menu-dropdown').not($(this).next($('.menu-dropdown'))).slideUp(300)
            //return
        //}

        // $('.menu .menu__item__with__dop').not($(this)).removeClass('_active-dropdown')
        // $('.menu-dropdown').not($(this).next($('.menu-dropdown'))).slideUp(300)
    }

    //header big-menu opened
    $('.menu__burger').click(function(e){
        $('.menu-big').addClass('_menu-big-opened')

        $('body').addClass('_lock')

        $('.menu-dropdown').slideUp(300)
    })
    $('.menu-big__close').click(function(e){
        $('.menu-big').removeClass('_menu-big-opened')
        $('body').removeClass('_lock')
        $('.menu-dropdown').slideUp(300)
    })



    //footer dropdown menu 
    
    if(document.body.clientWidth <= 830){
        $('.footer-main-category__list').slideUp(300)

        $('.footer-main-category__title.footer-main-category__title__dop').click(function(e){
            e.preventDefault()
            $(this).toggleClass('_active-dropdown')
            $(this).next($('.footer-main-category__list')).slideToggle(300)

            $('.footer-main-category__title.footer-main-category__title__dop').not($(this)).removeClass('_active-dropdown')
            $('.footer-main-category__list').not($(this).next($('.footer-main-category__list'))).slideUp(300)
        })
    }

    //swipers

    //swiper-projects

    let dopHeightPojects = $('.swiper.swiper-projects .swiper-wrapper').outerHeight(true) - $('.swiper.swiper-projects .swiper-wrapper').outerHeight()
    document.documentElement.style.setProperty('--dop-height-projects', dopHeightPojects +'px')


    var swiperProjects = new Swiper(".swiper.swiper-projects", {

        pagination: {
          el: ".projects__pagination__container.swiper-pagination",
          type: "progressbar",
        },
        navigation: {
          nextEl: ".projects__btns__container .swiper-button-next",
          prevEl: ".projects__btns__container .swiper-button-prev",
        },

        slidesPerView: 'auto',
        spaceBetween: 18,
        freeMode: true,
        loop: false,
        grabCursor: true,

        breakpoints: {
            830:{
                freeMode: false,
                spaceBetween: 42,
                slidesPerView: 2,
                centeredSlides: false,
                slidesPerGroup: 1,
            },
            1175:{
                slidesPerView: 3,
                centeredSlides: false,
                slidesPerGroup: 1,

            },
        }
      });

    //swiper-team

    let dopHeightTeam = $('.swiper.swiper-team .swiper-wrapper').outerHeight(true) - $('.swiper.swiper-team .swiper-wrapper').outerHeight()
    document.documentElement.style.setProperty('--dop-height-team', dopHeightTeam +'px')

    var swiperTeam = new Swiper(".swiper.swiper-team", {

        pagination: {
          el: ".team__pagination__container.swiper-pagination",
          type: "progressbar",
        },
        navigation: {
          nextEl: ".team__btns__container .swiper-button-next",
          prevEl: ".team__btns__container .swiper-button-prev",
        },

        slidesPerView: 'auto',
        spaceBetween: 24,
        freeMode: true,
        loop: false,
        

        breakpoints: {
            560:{
                freeMode: false,
                spaceBetween: 16,
                slidesPerView: 2,
                centeredSlides: false,
                slidesPerGroup: 1,
                grabCursor: true,
            },
            760:{
                slidesPerView: 3,
                spaceBetween: 16,
                centeredSlides: false,
                slidesPerGroup: 1,
                grabCursor: true,
            },
        }
      });

    //swiper-news
    let nodeNewsSwiper = document.querySelector('.swiper.news-list')
    let newsSwiper = undefined

    if (document.documentElement.clientWidth <= 830) {
        newsSwiper = new Swiper(nodeNewsSwiper, {
            slidesPerView: 'auto',
            spaceBetween: 3,
            grabCursor: true,
            autoHeight: false,
            freeMode: true,
            loop: false,

        })
    }else if(newsSwiper){
        newsSwiper.destroy(true, true);
        NewsnewsSwiperSwiper = null;
    }


})