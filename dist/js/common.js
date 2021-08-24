var Career = window.Career || {};
Career = (function ($) {
    'use strict';
    var common = {
        layerOpen: function (target, focusSelector) {
            var el = $(target);
            var body = $('body');
            el.removeClass('is-hidden').addClass('is-open');
            var buttonClose = el.find('.close');
            if( !body.hasClass('layer-opens')) body.addClass('layer-opens');
            el.find('.inner').attr('tabindex','0');
            setTimeout(function(){
                el.find('.inner').focus();
            }, 150);
            buttonClose.on('click', function () {
                common.layerClose(target, focusSelector);
            });
        },

        layerClose: function (target, focusSelector) {
            var el = $(target);
            var body = $('body');
            var layer = $('.mirae__event-layer');
            el.removeClass('is-open').addClass('is-hidden');
            if( !layer.hasClass('is-open')) body.removeClass('layer-opens');
            setTimeout(function () {
                $(focusSelector).focus();
            }, 150);
            return false;
        },

        focusSelector: '',

        layerConfirm: function(text, focus){
            common.focusSelector = focus;
            var str = '<div class="mirae__event-layer layer-confirm is-hidden" id="layer_confirm">';
            str += '<div class="overlay"></div>';
            str += '<div class="inner"><div class="wrap"><div class="desc"><span>'+ text +'</span></div><div class="group"><button type="button" class="button close_btn" onclick="Mirae.layerFocus();">확인</button></div></div></div>';
            str += '</div>';
            var $body = $('body');
            $body.append(str);
            var $layer = $('#layer_confirm');
            $layer.find('.button.close_btn').focus();
            $body.addClass('layer-opens');
            $layer.removeClass('is-hidden').addClass('is-open');

            setTimeout(function(){
                $layer.find('.close_btn').focus();
            },200);

        },

        layerFocus: function(target){
            var $body = $('body'),
                $layer = $('#layer_confirm');
            var $focus;
            if( target === undefined ) $focus = common.focusSelector;
            if( typeof $focus === 'string') $focus = $(common.focusSelector);
            $layer.remove();
            if( $('.mirae__event-layer.is-open').length < 1 ) $body.removeClass('layer-opens');
            if( $focus ){
                $focus.focus();
            }
        },

        pageTo: function(address){
            location.href = address;
        },

        phoneInputCheck: function(target){
            // 연락처에 숫자 이외 넣지 못하게..
            target.value = target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
        },

        motion: function () {
            $('.is-motion').each(function () {
                var top = $(this).offset().top;
                var scrollTop = $(window).scrollTop();
                var windowHeight = $(window).height();

                if (scrollTop > top - (windowHeight - (windowHeight * 0.15))) {
                    $(this).addClass('on');
                } else if (scrollTop < top) {
                    $(this).removeClass('on');
                }
            });
        },

        floatingIcon: function(){
            var text = $('.floating .text');
            var icon = $('.floating .icon');
            gsap.to(text, {marginTop: '-100%', duration: 1, onComplete:function(){text.css('margin-top', '100%')}});
            gsap.to(icon, {marginTop: 0, duration: 1});
        },

        floatingText: function(){
            var text = $('.floating .text');
            var icon = $('.floating .icon');
            gsap.to(icon, {marginTop: '-100%', duration: 1, onComplete:function(){icon.css('margin-top', '100%')}});
            gsap.to(text, {marginTop: 0, duration: 1});
        },

        floatingButton: function(){
            var index = 0;
            var timer1 = setInterval(function(){
                if( index % 2 === 0 ){
                    common.floatingIcon();
                }else{
                    common.floatingText();
                }
                index++;
            }, 8000);
        },

        init: function () {
            setTimeout(function () {
                common.motion();
            }, 100);
            $(window).on('scroll', function () {
                common.motion();
            });

            if( $('.floating').length > 0 ){
                common.floatingButton();
            }

        },
    };

    var nav = {
        navToggle: function(){
            var body = $('body');
            if( body.hasClass('nav-opens')){
                body.removeClass('nav-opens');
            }else{
                body.addClass('nav-opens');
            }
        },

        navSubEvent: function(){
            var button = $('.nav__main-title');
            button.on('click', function(){
                var main = $(this).parent();
                if( !main.hasClass('current')){
                    main.addClass('current');
                }else{
                    main.removeClass('current');
                }
            })
        },

        searchToggle: function(){
            var menu = $('header .menu');
            var input = menu.find('.input-text');
            if( menu.hasClass('search-opens')){
                menu.removeClass('search-opens');
            }else{
                menu.addClass('search-opens');
                setTimeout(function(){
                    input.focus();
                }, 300);
            }
        },

        floatingButton: function(){
            var footerTop = $('footer').offset().top;
            var scrollTop = $(window).scrollTop();
            var windowHeight = $(window).innerHeight();
            var $floating = $('.floating');
            if( scrollTop > footerTop - windowHeight ){
                $floating.css({
                    'position': 'absolute',
                    'bottom': $('footer').innerHeight()
                })
                if($floating.hasClass('form')){
                    if(window.innerWidth < 768){
                        $floating.css({
                            'paddingBottom':7
                        })
                    }else{
                        $floating.attr('style', '');
                        $floating.css({
                            'position': 'absolute',
                            'bottom': $('footer').innerHeight()
                        })
                    }
                }
            }else{
                $floating.attr('style', '');
            }
        },

        init: function(){
            nav.navSubEvent();

            if( $('.floating').length > 0 ) {
                nav.floatingButton();
                $(window).on('scroll', function() {
                    nav.floatingButton();
                });
            }
        }
    }

    $(document).ready(function () {
        common.init();
        nav.init();

        if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > -1) {
            $('body').addClass('ie');
        }
    });

    return {
        layerOpen: common.layerOpen,
        layerClose: common.layerClose,
        layerFocus: common.layerFocus,
        layerConfirm: common.layerConfirm,
        pageTo: common.pageTo,
        phoneInputCheck: common.phoneInputCheck,

        searchToggle: nav.searchToggle,
        navToggle: nav.navToggle,

    };
})($);