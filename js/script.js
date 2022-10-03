$(document).ready(function(){

    //preloader
    if(document.body.clientWidth <= 750) {

        setTimeout(() => {
            $('.preloader').addClass('_preloader-active')
        }, 1000);
        

        setTimeout(() => {
            $('.preloader').addClass('_close-preloader')
        }, 3000);
        setTimeout(() => {
            $('.preloader').css('display', 'none')
        }, 4000);
    }

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


    //header scroll
    const headerInitialPos = $('.header').offset().top

    if(50 < $(window).scrollTop()){
        $('.header').addClass('_header-scroll')
    } else{
        $('.header').removeClass('_header-scroll')
    }

    $(window).scroll(function(){
        const scrolled = $(this).scrollTop()

        if(50 < scrolled){
            $('.header').addClass('_header-scroll')
        } else{
            $('.header').removeClass('_header-scroll')
        }
        
    })

    //header-search
    if(document.body.clientWidth >= 1150){
        $('.menu__form__container button[type=submit]').click(function(e) {
            console.log($(this))
            if($(this).parent().parent().hasClass('_search-active')) {
                return
            }
            e.preventDefault()
            $(this).parent().parent().addClass('_search-active')
        })
        $('.menu__form__container .form-close').click(function(e) {
            $(this).parent().parent().removeClass('_search-active')
        })
        
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

    //pop-up steps
    $('._open-help').click(function(e){
        e.preventDefault()
        $('.pop-up').addClass('_pop-up-opened')

        $('body').addClass('_lock')

        $('.menu-dropdown').slideUp(300)
    })

    $('.pop-up__close').click(function(e){
        $('.pop-up').removeClass('_pop-up-opened')
        $('body').removeClass('_lock')
    })
    $('.pop-up__bg').click(function(e){
        $('.pop-up').removeClass('_pop-up-opened')
        $('body').removeClass('_lock')
    })

    //anchor's

    $('.menu__link').click(function(e){
        if ($(this).hasClass('menu__item__with__dop')) return

        if (document.body.clientWidth <= 830 && $(this).hasClass('footer-main-category__title__dop')) return

        onAnchorClick(e)
    })

    function onAnchorClick(event){
        const menuLink = event.target;
	    const goto = $(menuLink).attr('data-goto');

        if(goto && $(goto)){
            $([document.documentElement, document.body]).animate({
                scrollTop: $(goto).offset().top /* - Math.round($('.header').height() )*/
            }, 500)
        }

        $('.menu-dropdown').slideUp(300)
        $('.menu__link').removeClass('_active-dropdown')

        if($('.menu-big').hasClass('_menu-big-opened') || $('.pop-up').hasClass('_pop-up-opened')){
            $('.menu-big').removeClass('_menu-big-opened')
            $('.pop-up').removeClass('_pop-up-opened')
            $('body').removeClass('_lock')
        }
    }


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

    //faq-toggle
    activateToggleSection('.faq-toggle')

    function activateToggleSection(section){
        $(`${section} .faq-toggle-content__item`).not($(`${section} .faq-toggle-content__item._active-page`)).fadeOut(200)

        $(`${section} .faq-toggle-head__item`).click(function(event){
            //console.log(1, this);
            //const menuLink = event.target;
            const goto = $(this).attr('data-toggle-page');
        // console.log(2, $(goto));
        if(goto && $(goto)){
                $(this).addClass("_active-page");
                $(`${section} ${goto}`).addClass("_active-page");

                $(`${section} .faq-toggle-head__item`).not($(this)).removeClass("_active-page");
                $(`${section} .faq-toggle-content__item`).not($(goto)).removeClass("_active-page");
                $(`${section} .faq-toggle-content__item`).not($(goto)).fadeOut(0)
            
                $(goto).fadeIn(400);
            }

            event.preventDefault();
        })
    }

    //faq-accordion

    $('.accordion-item .accordion-item__text .accordion-item__subtitle').slideUp(0)

    $('.accordion-item').click(function(e){
        //console.log( $(this).children('.accordion-item__text').children('.accordion-item__subtitle'));
        $(this).children('.accordion-item__text').children('.accordion-item__subtitle').slideToggle(300)
        $(this).toggleClass('_toggle-accordion')
        
        $('.accordion-item .accordion-item__text .accordion-item__subtitle').not($(this).children('.accordion-item__text').children('.accordion-item__subtitle')).slideUp(300)
        $('.accordion-item').not($(this)).removeClass('_toggle-accordion')
    })

    //insta-hover
    if(document.body.clientWidth > 830){
        $('.insta-item').hover(function(e){
            $(this).toggleClass('_hover')
        })    
    }

    //filters-dropdown
    $('.report-filter__list').fadeOut(0)
    if(document.body.clientWidth > 830){
        $('.report-filter').hover(function(e){
            $(this).toggleClass('active')
            const currentList = $(this).children('.report-filter__list')
            $(currentList).fadeToggle(300)
        })
    }else {
        $('.report-filter').click(function(e){
            $(this).toggleClass('active')
            const currentList = $(this).children('.report-filter__list')
            $(currentList).fadeToggle(300)
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
        //grabCursor: true,

        breakpoints: {
            830:{
                //freeMode: false,
                spaceBetween: 42,
                slidesPerView: 2,
                centeredSlides: false,
                grabCursor: true,
                //slidesPerGroup: 1,
            },
            1175:{
                slidesPerView: 3,
                centeredSlides: false,
                grabCursor: true,
                //slidesPerGroup: 1,

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
                //freeMode: false,
                spaceBetween: 16,
                slidesPerView: 2,
                centeredSlides: false,
                //slidesPerGroup: 1,
                grabCursor: true,
            },
            760:{
                slidesPerView: 3,
                spaceBetween: 16,
                centeredSlides: false,
                //slidesPerGroup: 1,
                grabCursor: true,
            },
        }
      });

    //swiper-news
    let nodeNewsSwiper = document.querySelector('.swiper.news-list')
    let newsSwiper = undefined

    if (document.documentElement.clientWidth <= 830) {
        newsSwiper = new Swiper(nodeNewsSwiper, {
            pagination: {
                el: ".news-list__pagination__container.swiper-pagination",
                type: "progressbar",
            },
            slidesPerView: 'auto',
            spaceBetween: 3,
            //grabCursor: true,

            autoHeight: false,
            //freeMode: true,
            loop: false,

        })
    }
    // else if(newsSwiper){
    //     newsSwiper.destroy(true, true);
    //     NewsnewsSwiperSwiper = null;
    // }


    //swiper-insta
    let nodeInstaSwiper = document.querySelector('.swiper.insta__wrapper')
    let instaSwiper = undefined

    if (document.documentElement.clientWidth <= 830) {
        instaSwiper = new Swiper(nodeInstaSwiper, {
            slidesPerView: 'auto',
            spaceBetween: 8,
            //grabCursor: true,

            autoHeight: false,
            //freeMode: true,
            loop: false,

        })
    }

    var swiperSteps = new Swiper(".swiper.pop-up-list", {

        pagination: {
          el: ".pop-up-list__pagination__container.swiper-pagination",
        },
        // navigation: {
        //   nextEl: ".projects__btns__container .swiper-button-next",
        //   prevEl: ".projects__btns__container .swiper-button-prev",
        // },

        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: false,
        //grabCursor: true,

        breakpoints: {
            1020:{
                //freeMode: false,
                spaceBetween: 42,
                slidesPerView: 2,
                centeredSlides: false,
                grabCursor: true,
                //slidesPerGroup: 1,
            },
            1175:{
                slidesPerView: 3,
                centeredSlides: false,
                grabCursor: true,
                pagination: false,
                //slidesPerGroup: 1,

            },
        }
      });

    $('.pop-up__skip').click(function(e){
        swiperSteps.slideTo(2, 300)
       // $(this).fadeOut(150)

        //$(this).next().fadeIn(150)
        $(this).addClass('_next-active')
        $(this).next().addClass('_next-active')
    })

    var swiperStepsParthner = new Swiper(".swiper.how-be-parthner-list", {

        pagination: {
          el: ".how-be-parthner-list__pagination__container.swiper-pagination",
          type: "progressbar",
        },
        // navigation: {
        //   nextEl: ".projects__btns__container .swiper-button-next",
        //   prevEl: ".projects__btns__container .swiper-button-prev",
        // },

        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: false,
        //grabCursor: true,

        breakpoints: {
            1020:{
                //freeMode: false,
                spaceBetween: 42,
                slidesPerView: 2,
                centeredSlides: false,
                grabCursor: true,
                //slidesPerGroup: 1,
            },
            1175:{
                slidesPerView: 3,
                centeredSlides: false,
                grabCursor: true,
                pagination: false,
                //slidesPerGroup: 1,

            },
        }
      });

    var swiperNewsBanner = new Swiper(".swiper.banner-news-swiper", {

        pagination: {
          el: ".banner-news__pagination__container.swiper-pagination",
        },

        slidesPerView: 1,
        spaceBetween: 0,
        freeMode: false,
        loop: false,
        on:{
            init: setCurrentCounter,
            slideChange: counterChange,
        }
    })

    function setCurrentCounter(swiper){
        let currentCounts = document.querySelectorAll('.banner-news__counter .current')
        let allCounts = document.querySelectorAll('.banner-news__counter .all')

        let index = swiper.activeIndex + 1;
        let swiperLength = swiper.slides.length

        currentCounts.forEach(currentCount => currentCount.innerHTML = index)
        allCounts.forEach( allCount => allCount.innerHTML = swiperLength)
    }
    function counterChange(swiper) {
        let currentCounts = document.querySelectorAll('.banner-news__counter .current')
        let index = swiper.activeIndex + 1;
        currentCounts.forEach(currentCount => currentCount.innerHTML = index)
    }


})