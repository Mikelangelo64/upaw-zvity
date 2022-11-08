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
            $('.menu-btns .menu__help').css('opacity', '0')
            $('.menu-btns .menu__burger').css('opacity', '0')
            $('.menu-btns .menu__lang').css('opacity', '0')
            $('.menu-btns .menu__contacts').css('opacity', '0')
        })
        $('.menu__form__container .form-close').click(function(e) {
            $(this).parent().parent().removeClass('_search-active')
            $('.menu-btns .menu__help').css('opacity', '1')
            $('.menu-btns .menu__burger').css('opacity', '1')
            $('.menu-btns .menu__lang').css('opacity', '1')
            $('.menu-btns .menu__contacts').css('opacity', '1')
        })
    }

    $(window).resize(function(){
        if(document.body.clientWidth < 1150 && $('.menu__form__container').hasClass('_search-active')) {
            $('.menu-btns .menu__help').css('opacity', '1')
            $('.menu-btns .menu__burger').css('opacity', '1')
            $('.menu-btns .menu__lang').css('opacity', '1')
            $('.menu-btns .menu__contacts').css('opacity', '1')
        }
        if(document.body.clientWidth >= 1150 && $('.menu__form__container').hasClass('_search-active')) {
            $('.menu-btns .menu__help').css('opacity', '0')
            $('.menu-btns .menu__burger').css('opacity', '0')
            $('.menu-btns .menu__lang').css('opacity', '0')
            $('.menu-btns .menu__contacts').css('opacity', '0')
        }
    })

    //header dropdown menu 
    $('.menu-dropdown').slideUp(300)

    if(isMobile.any()){
        $('.menu .menu__item__with__dop').click(function(e){
            e.preventDefault()
            if($(this).hasClass('_focus')) {
                appearDropDown.call(this, e)
            }

            if($(this).is(':focus')) {
                $(this).addClass('_focus')
                return
            }
        })
        $('.menu-big .menu__item__with__dop').click(function(e){
            e.preventDefault()
            if($(this).hasClass('_focus')) {
                appearDropDown.call(this, e)
            }

            if($(this).is(':focus')) {
                $(this).addClass('_focus')
                return
            }
            console.log('click');
            //appearDropDown.call(this, e)
        })
    }else{
        $('.menu .menu__item__with__dop').parent().hover(function(e){
            appearDropDown.call($(this).children($('.menu__item__with__dop')), e)
        })
        $('.menu-big .menu__item__with__dop').parent().hover(function(e){
            appearDropDown.call($(this).children($('.menu__item__with__dop')), e)
        })
    }
    $('.menu-big .menu__item__with__dop').focus(function(e){
        console.log('focus');
        //$(this).off('click')
        $('.menu-big .menu__item__with__dop').removeClass('_focus')
        appearDropDown.call(this, e)
        //$(this).on('click')
    })

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
        $('.pop-up._help').addClass('_pop-up-opened')

        $('body').addClass('_lock')

        $('.menu-dropdown').slideUp(300)
    })

    //popup request
    $('._popup-open').click(function(e){
        e.preventDefault()
        const popup = $(this).attr('data-popup')
        $(`.${popup}`).addClass('_pop-up-opened')

        $('body').addClass('_lock')

        $('.menu-dropdown').slideUp(300)
    })

    $('.pop-up__close').click(function(e){
        $(this).parent().parent().removeClass('_pop-up-opened')
        $('body').removeClass('_lock')
    })
    $('.pop-up__bg').click(function(e){
        $(this).parent().removeClass('_pop-up-opened')
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

    activateToggleProject('.project-toggle')

    function activateToggleProject(section){
        $(`${section} .project-toggle-content__item`).not($(`${section} .project-toggle-content__item._active-page`)).fadeOut(200)

        $(`${section} .project-toggle-head__item`).click(function(event){
            //console.log(1, this);
            //const menuLink = event.target;
            const goto = $(this).attr('data-toggle-page');
        // console.log(2, $(goto));
        if(goto && $(goto)){
                $(this).addClass("_active-page");
                $(`${section} ${goto}`).addClass("_active-page");

                $(`${section} .project-toggle-head__item`).not($(this)).removeClass("_active-page");
                $(`${section} .project-toggle-content__item`).not($(goto)).removeClass("_active-page");
                $(`${section} .project-toggle-content__item`).not($(goto)).fadeOut(0)
            
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

    //bank-more
    if(document.body.clientWidth <= 1250) {
        $('.transfer-list__item').not($('.transfer-list__item._first')).slideUp(0)
        $('.transfer-item').children('.transfer-item__title__container._additional').slideUp(0)
        $('.transfer-item').children('.transfer-list._additional .transfer-list__item').slideUp(0)
    }

    // $(window).resize(function(){
    //     if(document.body.clientWidth <= 1250) {
    //         $('.transfer-list__item').not($('.transfer-list__item._first')).slideUp(300)
    //     } else {
    //         $('.transfer-list__item').not($('.transfer-list__item._first')).slideDown(300)
    //         $('.transfer-list__more').parent().removeClass('_opened')
    //     }
    // })

    $('.transfer-list__more').click(function() {
        //$(this).parent().toggleClass('_opened')
        $(this).parent().parent().children('.transfer-list').toggleClass('_opened')
        $(this).parent().parent().children('.transfer-item__title__container._additional').slideToggle(300)
        //$(this).parent().children('.transfer-list__item').not($('.transfer-list__item._first')).slideToggle(300)
        $(this).parent().parent().children('.transfer-list').children('.transfer-list__item').not($('.transfer-list__item._first')).slideToggle(300)
    })

    //account more--------------------------
    if(document.body.clientWidth <= 1100) {
        $('.account-data__field._additional').slideUp(0)
    }

    $(window).resize(function(){
        if(document.body.clientWidth > 1100) {
        //     $('.account-data__field._additional').slideUp(0)
        //     $('.account-data').removeClass('_opened')
        // } else {
            $('.account-data__field._additional').slideDown(0)
        }
    })

    $('.account-data__more').click(function() {
        $(this).parent().parent().toggleClass('_opened')
        $(this).parent().parent().children('._additional').slideToggle(300)
    })

    //bank copy in buffer
    $('.transfer-item__btn').click(function(e) {
        e.preventDefault()
        const select = $(this).attr('data-get')
        let message = ''
        let popUp = null
        let items = []

        if($('.pop-up-buffer')[0]){
            popUp = $('.pop-up-buffer')
            $(popUp).removeClass('_active')
        }
        if(!select) {
            message = 'Oooops... something wrong'
            return null
        }

        const transfer = Array.from(document.querySelectorAll('.transfer-item')).filter(item => item.dataset.item === select)
        if(transfer.length === 0) {
            message = 'Oooops... something wrong'
            return null
        }

        const list = Array.from(transfer[0].children).filter(child => (
            Array.from(child.classList).includes('transfer-list')
        ))
        if(list.length === 0) {
            message = 'Oooops... something wrong'
            return null
        }

        list.forEach(item => (
            items.push(
                ...Array.from(item.children).filter(child => child.localName === 'a')
            )
        ))
        if(items.length === 0) {
            message = 'Oooops... something wrong'
            return null
        }
        
        navigator.clipboard.writeText(items.map(item => item.dataset.value).join(',\n '))
            .then(() => message = 'Copied!')
            .catch(() => message = 'Oooops... something wrong')
            .finally(() => {
                if(popUp){
                    $(popUp).addClass('_active')
                    $(popUp).children().children('.pop-up-buffer__text').html(message)
                }
                setTimeout(() => $(popUp).removeClass('_active'), 2000)
            })
    })

    $('.transfer-list__item').click(function(e) {
        e.preventDefault()
        const data = $(this).attr('data-value')
        let message = ''
        let popUp = null

        if($('.pop-up-buffer')[0]){
            popUp = $('.pop-up-buffer')
            $(popUp).removeClass('_active')
        }

        navigator.clipboard.writeText(data)
            .then(() => {
                if(data) {
                    message = 'Copied!'
                } else {
                    message = 'Oooops... something wrong'
                }
            })
            .catch(() => {
                message = 'Oooops... something wrong'
            })
            .finally(() => {
                if(popUp){
                    $(popUp).addClass('_active')
                    $(popUp).children().children('.pop-up-buffer__text').html(message)
                }
                setTimeout(() => $(popUp).removeClass('_active'), 2000)
            })
    })

    //form invalid
    $('.registration-form input').change(function(){
        if($(this).is(':invalid')) {
            $('.registration-form button[type=submit]').addClass('_disabled')
        }

        if($(this).is(':valid')) {
            $('.registration-form button[type=submit]').removeClass('_disabled')
        }
    })

    //form counter
    //COUNTER--------
    function makeMinus(e) {
        e.preventDefault()
        let $input = $(this).parent().find('input');
        let count = parseInt($input.val()) - 1;
        count = count < 1 ? 0 : count;
        $input.val(count);
        $input.change();
        return false;
    }

    function makePlus(e) {
        e.preventDefault()
        console.log(this);
        let $input = $(this).parent().find('input');
        console.log($input);

        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    }

    $('.minus').click(function(e) {
        makeMinus.call(this, e)
    });
    $('.plus').click(function(e) {
        makePlus.call(this, e)
    });

    //add more inputs
    let counter = 1
    $('.registration-form-more').click(addedInput)

    function addedInput(e){
        e.preventDefault()
        const containerClass = $(e.currentTarget).parent()
        
        $(
            `
            <div class="registration-form__section _pet">
              <div class="select__container">
                <select name="pet-${counter}">
                  <option value="cat">Кішка</option>
                  <option value="dog">Пес</option>
                </select>
              </div>

              <div class="registration-form__counter__container">
                <p>Кількість тварини</p>
                <div class="registration-form__counter">
                    <a href="#" class="minus">-</a>
                    <input type="number" required min="1" value="0">
                    <a href="#" class="plus">+</a>
                </div>
              </div>
            </div>
            `
        ).insertBefore($(e.currentTarget).parent())
        
        $('.minus').off('click')
        $('.plus').off('click')
        
        $('.minus').click(function(e) {
            makeMinus.call(this, e)
        });
        $('.plus').click(function(e) {
            makePlus.call(this, e)
        });

        counter++
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

    let swiperRequest = new Swiper(".pop-up._request .swiper.pop-up-list", {

        pagination: {
          el: ".pop-up._request .pop-up-list__pagination__container.swiper-pagination",
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

    var swiperSteps = new Swiper(".pop-up._help .swiper.pop-up-list", {

        pagination: {
          el: ".pop-up._help .pop-up-list__pagination__container.swiper-pagination",
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
        navigation: {
          nextEl: ".banner-news__btns__container .swiper-button-next",
          prevEl: ".banner-news__btns__container .swiper-button-prev",
        },
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


    let nodeBankSwiper = document.querySelector('.swiper.bank-list-swiper')
    let bankSwiper = undefined
    
    if(nodeBankSwiper) {
        $(window).ready(function(){
            if (document.documentElement.clientWidth < 830) {
                bankSwiper = new Swiper(nodeBankSwiper, {
                    navigation: {
                        nextEl: ".bank-list-swiper__btns__container .swiper-button-next",
                        prevEl: ".bank-list-swiper__btns__container .swiper-button-prev",
                    },
                    pagination: {
                        el: ".bank-list-swiper__pagination__container",
                        clickable: true,
                        renderBullet: function (index, className) {
                            return '<span class="' + className + '">' + (index + 1) + "</span>";
                        },
                    },
                    slidesPerView: 1,
                    spaceBetween: 0,
                    autoHeight: true,
                    loop: false,
                })
            }
        })
    
        $(window).resize(function(){
            if (document.documentElement.clientWidth < 830) {
                if(bankSwiper === undefined) {
                    bankSwiper = new Swiper(nodeBankSwiper, {
                        navigation: {
                            nextEl: ".bank-list-swiper__btns__container .swiper-button-next",
                            prevEl: ".bank-list-swiper__btns__container .swiper-button-prev",
                        },
                        pagination: {
                            el: ".bank-list-swiper__pagination__container",
                            clickable: true,
                            renderBullet: function (index, className) {
                                return '<span class="' + className + '">' + (index + 1) + "</span>";
                            },
                        },
                        slidesPerView: 1,
                        spaceBetween: 0,
                        autoHeight: true,
                        loop: false,
                    })
                }
            } else {
                if(bankSwiper) {
                    bankSwiper.destroy()
                    bankSwiper = undefined
                }
            }
        })
    }


    let nodeRequestSwiper = document.querySelector('.swiper.request-table')
    let requestSwiper = undefined
    
    if(nodeRequestSwiper) {
        $(window).ready(function(){
            if (document.documentElement.clientWidth >= 830) {
                requestSwiper = new Swiper(nodeRequestSwiper, {
                    navigation: {
                        nextEl: ".request-table__btns__container .swiper-button-next",
                        prevEl: ".request-table__btns__container .swiper-button-prev",
                    },
                    pagination: {
                        el: ".request-table__pagination__container",
                        clickable: true,
                        renderBullet: function (index, className) {
                            return '<span class="' + className + '">' + (index + 1) + "</span>";
                        },
                    },
                    slidesPerView: 1,
                    spaceBetween: 0,
                    autoHeight: true,
                    loop: false,
                })
            }
        })
    
        $(window).resize(function(){
            if (document.documentElement.clientWidth >= 830) {
                if(requestSwiper === undefined) {
                    requestSwiper = new Swiper(nodeRequestSwiper, {
                        navigation: {
                            nextEl: ".request-table__btns__container .swiper-button-next",
                            prevEl: ".request-table__btns__container .swiper-button-prev",
                        },
                        pagination: {
                            el: ".request-table__pagination__container",
                            clickable: true,
                            renderBullet: function (index, className) {
                                return '<span class="' + className + '">' + (index + 1) + "</span>";
                            },
                        },
                        slidesPerView: 1,
                        spaceBetween: 0,
                        autoHeight: true,
                        loop: false,
                    })
                }
            } else {
                if(requestSwiper) {
                    requestSwiper.destroy()
                    requestSwiper = undefined
                }
            }
        })
    }
})