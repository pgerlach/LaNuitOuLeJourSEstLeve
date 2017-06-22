/*!
// Infinite Scroll jQuery plugin
// copyright Paul Irish, licensed GPL & MIT
// version 1.5.101207

// home and docs: https://web.archive.org/web/20160220001551/http://www.infinite-scroll.com/
*/

(function(a){a.fn.infinitescroll=function(d,f){function l(){if(j.debug){window.console&&console.log.call(console,arguments)}}function w(y){for(var x in y){if(x.indexOf&&x.indexOf("Selector")>-1&&a(y[x]).length===0){l("Your "+x+" found no elements.");return false}return true}}function t(x){if(x.match(/^(.*?)\b2\b(.*?$)/)){x=x.match(/^(.*?)\b2\b(.*?$)/).slice(1)}else{if(x.match(/^(.*?)2(.*?$)/)){if(x.match(/^(.*?page=)2(\/.*|$)/)){x=x.match(/^(.*?page=)2(\/.*|$)/).slice(1);return x}l("Trying backup next selector parse technique. Treacherous waters here, matey.");x=x.match(/^(.*?)2(.*?$)/).slice(1)}else{if(x.match(/^(.*?page=)1(\/.*|$)/)){x=x.match(/^(.*?page=)1(\/.*|$)/).slice(1);return x}if(a.isFunction(j.pathParse)){return[x]}else{l("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.");c.isInvalidPage=true}}}return x}function e(){j.isFiltered=true;return a(window).trigger("error.infscr."+j.infid,[302])}function i(){var x=0+a(document).height()-(a(c.container).scrollTop()||a(c.container.ownerDocument.body).scrollTop())-a(window).height();l("math:",x,c.pixelsFromNavToBottom);return(x-j.bufferPx<c.pixelsFromNavToBottom)}function k(){c.loadingMsg.find("img").hide().parent().find("div").html(j.donetext).animate({opacity:1},2000,function(){a(this).parent().fadeOut("normal")});j.errorCallback()}function q(){if(j.isDuringAjax||j.isInvalidPage||j.isDone||j.isFiltered||j.isPaused){return}if(!i(j,c)){return}a(document).trigger("retrieve.infscr."+j.infid)}function r(){j.isDuringAjax=true;c.loadingMsg.appendTo(j.loadMsgSelector).show(j.loadingMsgRevealSpeed,function(){a(j.navSelector).hide();j.currPage++;l("heading into ajax",m);h=a(j.contentSelector).is("table")?a("<tbody/>"):a("<div/>");b=document.createDocumentFragment();if(a.isFunction(j.pathParse)){u=j.pathParse(m.join("2"),j.currPage)}else{u=m.join(j.currPage)}h.load(u+" "+j.itemSelector,null,g)})}function g(){if(j.isDone){k();return false}else{var y=h.children();if(y.length==0||y.hasClass("error404")){return a(window).trigger("error.infscr."+j.infid,[404])}while(h[0].firstChild){b.appendChild(h[0].firstChild)}a(j.contentSelector)[0].appendChild(b);c.loadingMsg.fadeOut("normal");if(j.animate){var x=a(window).scrollTop()+a("#infscr-loading").height()+j.extraScrollPx+"px";a("html,body").animate({scrollTop:x},800,function(){j.isDuringAjax=false})}f.call(a(j.contentSelector)[0],y.get(),j.currPage);if(!j.animate){j.isDuringAjax=false}}}function v(x){if(x=="pause"){j.isPaused=true}else{if(x=="resume"){j.isPaused=false}else{j.isPaused=!j.isPaused}}l("Paused: "+j.isPaused);return false}function s(x){if(!j.isDone&&x==404){l("Page not found. Self-destructing...");k();j.isDone=true;j.currPage=1;a(window).unbind("scroll.infscr."+j.infid);a(document).unbind("retrieve.infscr."+j.infid)}if(j.isFiltered&&x==302){l("Filtered. Going to next instance...");j.isDone=true;j.currPage=1;j.isPaused=false;a(window).unbind("scroll.infscr."+j.infid,q).unbind("pause.infscr."+j.infid).unbind("filter.infscr."+j.infid).unbind("error.infscr."+j.infid);a(document).unbind("retrieve.infscr."+j.infid,r)}}a.browser.ie6=a.browser.msie&&a.browser.version<7;var j=a.extend({},a.infinitescroll.defaults,d),c=a.infinitescroll,h,b,u,n,p;f=f||function(){};if(!w(j)){return false}c.container=document.documentElement;j.contentSelector=j.contentSelector||this;j.loadMsgSelector=j.loadMsgSelector||j.contentSelector;var o=/(.*?\/\/).*?(\/.*)/,m=a(j.nextSelector).attr("href");if(!m){l("Navigation selector not found");return}m=t(m);c.pixelsFromNavToBottom=a(document).height()+(c.container==document.documentElement?0:a(c.container).offset().top)-a(j.navSelector).offset().top;c.loadingMsg=a('<div id="infscr-loading" style="text-align: center;"><img alt="Loading..." src="'+j.loadingImg+'" /><div>'+j.loadingText+"</div></div>");(new Image()).src=j.loadingImg;a(window).bind("scroll.infscr."+j.infid,q).bind("filter.infscr."+j.infid,e).bind("error.infscr."+j.infid,function(y,x){s(x)}).bind("pause.infscr."+j.infid,function(y,x){v(x)}).trigger("scroll.infscr."+j.infid);a(document).bind("retrieve.infscr."+j.infid,r);return this};a.infinitescroll={defaults:{debug:false,preload:false,nextSelector:"div.navigation a:first",loadingImg:"https://web.archive.org/web/20160220001551/http://www.infinite-scroll.com/loading.gif",loadingText:"<em>Loading the next set of posts...</em>",donetext:"<em>Congratulations, you've reached the end of the internet.</em>",navSelector:"div.navigation",contentSelector:null,loadMsgSelector:null,loadingMsgRevealSpeed:"fast",extraScrollPx:150,itemSelector:"div.post",animate:false,pathParse:undefined,bufferPx:40,errorCallback:function(){},infid:1,currPage:1,isDuringAjax:false,isInvalidPage:false,isFiltered:false,isDone:false,isPaused:false},loadingImg:undefined,loadingMsg:undefined,container:undefined,currDOMChunk:null}})(jQuery);

/*!
    --------------------------------
    PXU Photoset Extended
    --------------------------------
    + https://web.archive.org/web/20160220001551/https://github.com/PixelUnion/Extended-Tumblr-Photoset
    + https://web.archive.org/web/20160220001551/http://pixelunion.net/
    + Version 1.7.0
    + Copyright 2013 Pixel Union
    + Licensed under the MIT license
*/
(function(a){a.fn.pxuPhotoset=function(b,f){var e={lightbox:true,highRes:true,rounded:"corners",borderRadius:"5px",exif:true,captions:true,gutter:"10px",photoset:".photo-slideshow",photoWrap:".photo-data",photo:".pxu-photo"};var c=a.extend(e,b);if(c.lightbox){a(".tumblr-box").on("click",function(i){i.preventDefault();var h=a(this);var g=h.parents(c.photoset).attr("id");d(h,g)});var d=function(h,j){var g=h.parents(c.photoWrap).find(c.photo+" img").data("count");var i=[];a("#"+j).find(c.photoWrap).each(function(){var m=a(this).find(c.photo+" img");var l=m.data("width");var k=m.data("height");var n=m.attr("src");var o=m.data("highres");var p={width:l,height:k,low_res:n,high_res:o};i.push(p)});Tumblr.Lightbox.init(i,g)}}a(c.photoWrap).on("mouseenter",function(){a(this).find(".icons").css("visibility","visible")}).on("mouseleave",function(){a(this).find(".icons").css("visibility","hidden")});a("span.info").on("mouseenter",function(){var g=a(this);var h=g.children(".pxu-data");h.css("display","block").stop(true,false).animate({opacity:1},200)});a("span.info").on("mouseleave",function(){var g=a(this);var h=g.children(".pxu-data");h.stop(true,false).animate({opacity:0},200,function(){a(this).css("display","none")})});return this.each(function(){var r=a(this);var g=r.data("layout");var n=JSON.stringify(g).split("");var s=n.length;var w=r.find(c.photo+" img");for(l=0;l<w.length;l++){var k=w.eq(l);k.attr("data-count",l+1)}var t=[];for(l=1;l<=s;++l){var v=0;for(var h=0;h<l;++h){var u=parseInt(n[h],10);v+=u}var m=parseInt(n[l-1],10);t[l]=Array(l,m,v)}for(var l=1;l<=s;l++){var q;if(l===1){q=0}else{q=t[l-1][2]}r.find(c.photoWrap).slice(q,t[l][2]).addClass("count-"+t[l][1]).wrapAll('<div class="row clearit" />')}a(this).find(".row").css("margin-bottom",c.gutter);a(this).find(c.photoWrap+":not(:first-child) "+c.photo+" img").css("margin-left",c.gutter);Array.min=function(i){return Math.min.apply(Math,i)};function j(A){var L=A.find(".row");var F=L.length;var E;var D;var H;var C;var p;for(var K=0;K<F;K++){currentRow=L.eq(K);images=currentRow.find(c.photoWrap+" img");photoCount=images.length;if(photoCount>1){var J=currentRow.find(c.photo+" img").map(function(){E=a(this);D=E.data("width");H=E.data("height");C=E.parent().width();p=(C/D)*H;E.data("new-height",p);return p}).get();var z=Array.min(J);currentRow.height(z).find(c.photo).height(z);for(l=0;l<photoCount;l++){var G=images.eq(l);var I=G.data("new-height");var i=z;if(I>i){var B=(I-i)/2;G.css("margin-top",-B)}}}}}j(r);a(window).resize(function(){j(r)});if(c.exif&&c.captions){r.find(c.photoWrap).each(function(){var F=a(this).find("img");var p;var z;if(F.hasClass("exif-yes")){var E=F.data("camera")||"-";var A=F.data("iso")||"-";var B=F.data("aperture")||"-";var i=F.data("exposure")||"-";var C=F.data("focal")||"-";p='<table class="exif"><tr><td colspan="2"><span class="label">Camera</span><br>'+E+'</td></tr><tr><td><span class="label">ISO</span><br>'+A+'</td><td><span class="label">Aperture</span><br>'+B+'</td></tr><tr><td><span class="label">Exposure</span><br>'+i+'</td><td><span class="label">Focal Length</span><br>'+C+"</td></tr></table>"}else{p=""}if(F.hasClass("caption-yes")){var D=F.data("caption");z='<p class="pxu-caption">'+D+"</p>"}else{z=""}if(z!==""||p!==""){a(this).find(".info").append('<div class="pxu-data">'+z+p+'<span class="arrow-down"></span></div>');if(p===""){a(this).find(".pxu-data").addClass("caption-only")}a(this).find("span.info").css("display","block")}})}else{if(c.exif){r.find(c.photoWrap).each(function(){var C=a(this).find("img");if(C.hasClass("exif-yes")){var p=C.data("camera")||"-";var i=C.data("iso")||"-";var D=C.data("aperture")||"-";var B=C.data("exposure")||"-";var A=C.data("focal")||"-";var z='<table class="exif"><tr><td colspan="2"><span class="label">Camera</span><br>'+p+'</td></tr><tr><td><span class="label">ISO</span><br>'+i+'</td><td><span class="label">Aperture</span><br>'+D+'</td></tr><tr><td><span class="label">Exposure</span><br>'+B+'</td><td><span class="label">Focal Length</span><br>'+A+'</td></tr></table><span class="arrow-down"></span>';a(this).find(".info").append('<div class="pxu-data">'+z+"</div>");a(this).find("span.info").css("display","block")}})}else{if(c.captions){r.find(c.photoWrap).each(function(){var i=a(this).find("img");if(i.hasClass("caption-yes")){var p=i.data("caption");var z='<p class="pxu-caption" style="margin:0;">'+p+"</p>";a(this).find(".info").append('<div class="pxu-data caption-only">'+z+'<span class="arrow-down"></span></div>');a(this).find("span.info").css("display","block")}})}}}if(c.highRes){r.find(c.photoWrap).each(function(){var i=a(this).find(c.photo+" img");var p=i.data("highres");i.attr("src",p)})}if(c.rounded=="corners"){var y=r.find(".row");if(s==1){y.find(c.photoWrap+":first-child "+c.photo).css({borderRadius:c.borderRadius+" 0 0 "+c.borderRadius});y.find(c.photoWrap+":last-child "+c.photo).css({borderRadius:"0 "+c.borderRadius+" "+c.borderRadius+" 0"})}else{for(var x=0;x<s;x++){var o;if(x===0){o=y.eq(x).find(c.photo).size();if(o==1){y.eq(x).find(c.photo).css({borderRadius:c.borderRadius+" "+c.borderRadius+" 0 0"})}else{y.eq(x).find(c.photoWrap+":first-child "+c.photo).css({borderRadius:c.borderRadius+" 0 0 0"});y.eq(x).find(c.photoWrap+":last-child "+c.photo).css({borderRadius:"0 "+c.borderRadius+" 0 0"})}}if(x==s-1){o=y.eq(x).find(c.photo).size();if(o==1){y.eq(x).find(c.photo).css({borderRadius:"0 0 "+c.borderRadius+" "+c.borderRadius})}else{y.eq(x).find(c.photoWrap+":first-child "+c.photo).css({borderRadius:"0 0 0 "+c.borderRadius});y.eq(x).find(c.photoWrap+":last-child "+c.photo).css({borderRadius:"0 0 "+c.borderRadius+" 0"})}}}}}if(c.rounded=="all"){r.find(c.photo).css({borderRadius:c.borderRadius})}if(!c.rounded){r.find(c.photo).css({borderRadius:0})}r.addClass("processed");if(typeof f=="function"){f.call(this)}})}})(jQuery);

/*
* Slides, A Slideshow Plugin for jQuery
* Intructions: https://web.archive.org/web/20160220001551/http://slidesjs.com/
* By: Nathan Searles, https://web.archive.org/web/20160220001551/http://nathansearles.com/
* Version: 1.1.9
* Updated: September 5th, 2011
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* https://web.archive.org/web/20160220001551/http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
(function($){
    $.fn.slides = function( option ) {
        // override defaults with specified option
        option = $.extend( {}, $.fn.slides.option, option );

        return this.each(function(){
            // wrap slides in control container, make sure slides are block level
            $('.' + option.container, $(this)).children().wrapAll('<div class="slides_control"/>');

            var elem = $(this),
                control = $('.slides_control',elem),
                total = control.children().size(),
                width = control.children().outerWidth(),
                height = control.children().outerHeight(),
                start = option.start - 1,
                effect = option.effect.indexOf(',') < 0 ? option.effect : option.effect.replace(' ', '').split(',')[0],
                paginationEffect = option.effect.indexOf(',') < 0 ? effect : option.effect.replace(' ', '').split(',')[1],
                next = 0, prev = 0, number = 0, current = 0, loaded, active, clicked, position, direction, imageParent, pauseTimeout, playInterval;

            // is there only one slide?
            if (total < 2) {
                // Fade in .slides_container
                $('.' + option.container, $(this)).fadeIn(option.fadeSpeed, option.fadeEasing, function(){
                    // let the script know everything is loaded
                    loaded = true;
                    // call the loaded funciton
                    option.slidesLoaded();
                });
                // Hide the next/previous buttons
                $('.' + option.next + ', .' + option.prev).fadeOut(0);
                return false;
            }

            // animate slides
            function animate(direction, effect, clicked) {
                if (!active && loaded) {
                    active = true;
                    // start of animation
                    option.animationStart(current + 1);
                    switch(direction) {
                        case 'next':
                            // change current slide to previous
                            prev = current;
                            // get next from current + 1
                            next = current + 1;
                            // if last slide, set next to first slide
                            next = total === next ? 0 : next;
                            // set position of next slide to right of previous
                            position = width*2;
                            // distance to slide based on width of slides
                            direction = -width*2;
                            // store new current slide
                            current = next;
                        break;
                        case 'prev':
                            // change current slide to previous
                            prev = current;
                            // get next from current - 1
                            next = current - 1;
                            // if first slide, set next to last slide
                            next = next === -1 ? total-1 : next;
                            // set position of next slide to left of previous
                            position = 0;
                            // distance to slide based on width of slides
                            direction = 0;
                            // store new current slide
                            current = next;
                        break;
                        case 'pagination':
                            // get next from pagination item clicked, convert to number
                            next = parseInt(clicked,10);
                            // get previous from pagination item with class of current
                            prev = $('.' + option.paginationClass + ' li.'+ option.currentClass +' a', elem).attr('href').match('[^#/]+$');
                            // if next is greater then previous set position of next slide to right of previous
                            if (next > prev) {
                                position = width*2;
                                direction = -width*2;
                            } else {
                            // if next is less then previous set position of next slide to left of previous
                                position = 0;
                                direction = 0;
                            }
                            // store new current slide
                            current = next;
                        break;
                    }

                    // fade animation
                    if (effect === 'fade') {
                        // fade animation with crossfade
                        if (option.crossfade) {
                            // put hidden next above current
                            control.children(':eq('+ next +')', elem).css({
                                zIndex: 10
                            // fade in next
                            }).fadeIn(option.fadeSpeed, option.fadeEasing, function(){
                                if (option.autoHeight) {
                                    // animate container to height of next
                                    control.animate({
                                        height: control.children(':eq('+ next +')', elem).outerHeight()
                                    }, option.autoHeightSpeed, function(){
                                        // hide previous
                                        control.children(':eq('+ prev +')', elem).css({
                                            display: 'none',
                                            zIndex: 0
                                        });
                                        // reset z index
                                        control.children(':eq('+ next +')', elem).css({
                                            zIndex: 0
                                        });
                                        // end of animation
                                        option.animationComplete(next + 1);
                                        active = false;
                                    });
                                } else {
                                    // hide previous
                                    control.children(':eq('+ prev +')', elem).css({
                                        display: 'none',
                                        zIndex: 0
                                    });
                                    // reset zindex
                                    control.children(':eq('+ next +')', elem).css({
                                        zIndex: 0
                                    });
                                    // end of animation
                                    option.animationComplete(next + 1);
                                    active = false;
                                }
                            });
                        } else {
                            // fade animation with no crossfade
                            control.children(':eq('+ prev +')', elem).fadeOut(option.fadeSpeed,  option.fadeEasing, function(){
                                // animate to new height
                                if (option.autoHeight) {
                                    control.animate({
                                        // animate container to height of next
                                        height: control.children(':eq('+ next +')', elem).outerHeight()
                                    }, option.autoHeightSpeed,
                                    // fade in next slide
                                    function(){
                                        control.children(':eq('+ next +')', elem).fadeIn(option.fadeSpeed, option.fadeEasing);
                                    });
                                } else {
                                // if fixed height
                                    control.children(':eq('+ next +')', elem).fadeIn(option.fadeSpeed, option.fadeEasing, function(){
                                        // fix font rendering in ie, lame
                                        if($.browser.msie) {
                                            $(this).get(0).style.removeAttribute('filter');
                                        }
                                    });
                                }
                                // end of animation
                                option.animationComplete(next + 1);
                                active = false;
                            });
                        }
                    // slide animation
                    } else {
                        // move next slide to right of previous
                        control.children(':eq('+ next +')').css({
                            left: position,
                            display: 'block'
                        });
                        // animate to new height
                        if (option.autoHeight) {
                            control.animate({
                                left: direction,
                                height: control.children(':eq('+ next +')').outerHeight()
                            },option.slideSpeed, option.slideEasing, function(){
                                control.css({
                                    left: -width
                                });
                                control.children(':eq('+ next +')').css({
                                    left: width,
                                    zIndex: 5
                                });
                                // reset previous slide
                                control.children(':eq('+ prev +')').css({
                                    left: width,
                                    display: 'none',
                                    zIndex: 0
                                });
                                // end of animation
                                option.animationComplete(next + 1);
                                active = false;
                            });
                            // if fixed height
                            } else {
                                // animate control
                                control.animate({
                                    left: direction
                                },option.slideSpeed, option.slideEasing, function(){
                                    // after animation reset control position
                                    control.css({
                                        left: -width
                                    });
                                    // reset and show next
                                    control.children(':eq('+ next +')').css({
                                        left: width,
                                        zIndex: 5
                                    });
                                    // reset previous slide
                                    control.children(':eq('+ prev +')').css({
                                        left: width,
                                        display: 'none',
                                        zIndex: 0
                                    });
                                    // end of animation
                                    option.animationComplete(next + 1);
                                    active = false;
                                });
                            }
                        }
                    // set current state for pagination
                    if (option.pagination) {
                        // remove current class from all
                        $('.'+ option.paginationClass +' li.' + option.currentClass, elem).removeClass(option.currentClass);
                        // add current class to next
                        $('.' + option.paginationClass + ' li:eq('+ next +')', elem).addClass(option.currentClass);
                    }
                }
            } // end animate function

            function stop() {
                // clear interval from stored id
                clearInterval(elem.data('interval'));
            }

            function pause() {
                if (option.pause) {
                    // clear timeout and interval
                    clearTimeout(elem.data('pause'));
                    clearInterval(elem.data('interval'));
                    // pause slide show for option.pause amount
                    pauseTimeout = setTimeout(function() {
                        // clear pause timeout
                        clearTimeout(elem.data('pause'));
                        // start play interval after pause
                        playInterval = setInterval( function(){
                            animate("next", effect);
                        },option.play);
                        // store play interval
                        elem.data('interval',playInterval);
                    },option.pause);
                    // store pause interval
                    elem.data('pause',pauseTimeout);
                } else {
                    // if no pause, just stop
                    stop();
                }
            }

            // 2 or more slides required
            if (total < 2) {
                return;
            }

            // error corection for start slide
            if (start < 0) {
                start = 0;
            }

            if (start > total) {
                start = total - 1;
            }

            // change current based on start option number
            if (option.start) {
                current = start;
            }

            // randomizes slide order
            if (option.randomize) {
                control.randomize();
            }

            // make sure overflow is hidden, width is set
            $('.' + option.container, elem).css({
                overflow: 'hidden',
                // fix for ie
                position: 'relative'
            });

            // set css for slides
            control.children().css({
                position: 'absolute',
                top: 0,
                left: control.children().outerWidth(),
                zIndex: 0,
                display: 'none'
             });

            // set css for control div
            control.css({
                position: 'relative',
                // size of control 3 x slide width
                width: (width * 3),
                // set height to slide height
                height: height,
                // center control to slide
                left: -width
            });

            // show slides
            $('.' + option.container, elem).css({
                display: 'block'
            });

            // if autoHeight true, get and set height of first slide
            if (option.autoHeight) {
                control.children().css({
                    height: 'auto'
                });
                control.animate({
                    height: control.children(':eq('+ start +')').outerHeight()
                },option.autoHeightSpeed);
            }

            // checks if image is loaded
            if (option.preload && control.find('img:eq(' + start + ')').length) {
                // adds preload image
                $('.' + option.container, elem).css({
                    background: 'url(' + option.preloadImage + ') no-repeat 50% 50%'
                });

                // gets image src, with cache buster
                var img = control.find('img:eq(' + start + ')').attr('src') + '?' + (new Date()).getTime();

                // check if the image has a parent
                if ($('img', elem).parent().attr('class') != 'slides_control') {
                    // If image has parent, get tag name
                    imageParent = control.children(':eq(0)')[0].tagName.toLowerCase();
                } else {
                    // Image doesn't have parent, use image tag name
                    imageParent = control.find('img:eq(' + start + ')');
                }

                // checks if image is loaded
                control.find('img:eq(' + start + ')').attr('src', img).load(function() {
                    // once image is fully loaded, fade in
                    control.find(imageParent + ':eq(' + start + ')').fadeIn(option.fadeSpeed, option.fadeEasing, function(){
                        $(this).css({
                            zIndex: 5
                        });
                        // removes preload image
                        $('.' + option.container, elem).css({
                            background: ''
                        });
                        // let the script know everything is loaded
                        loaded = true;
                        // call the loaded funciton
                        option.slidesLoaded();
                    });
                });
            } else {
                // if no preloader fade in start slide
                control.children(':eq(' + start + ')').fadeIn(option.fadeSpeed, option.fadeEasing, function(){
                    // let the script know everything is loaded
                    loaded = true;
                    // call the loaded funciton
                    option.slidesLoaded();
                });
            }

            // click slide for next
            if (option.bigTarget) {
                // set cursor to pointer
                control.children().css({
                    cursor: 'pointer'
                });
                // click handler
                control.children().click(function(){
                    // animate to next on slide click
                    animate('next', effect);
                    return false;
                });
            }

            // pause on mouseover
            if (option.hoverPause && option.play) {
                control.bind('mouseover',function(){
                    // on mouse over stop
                    stop();
                });
                control.bind('mouseleave',function(){
                    // on mouse leave start pause timeout
                    pause();
                });
            }

            // generate next/prev buttons
            if (option.generateNextPrev) {
                $('.' + option.container, elem).after('<a href="#" class="'+ option.prev +'">Prev</a>');
                $('.' + option.prev, elem).after('<a href="#" class="'+ option.next +'">Next</a>');
            }

            // next button
            $('.' + option.next ,elem).click(function(e){
                e.preventDefault();
                if (option.play) {
                    pause();
                }
                animate('next', effect);
            });

            // previous button
            $('.' + option.prev, elem).click(function(e){
                e.preventDefault();
                if (option.play) {
                     pause();
                }
                animate('prev', effect);
            });

            // generate pagination
            if (option.generatePagination) {
                // create unordered list
                if (option.prependPagination) {
                    elem.prepend('<ul class='+ option.paginationClass +'></ul>');
                } else {
                    elem.append('<ul class='+ option.paginationClass +'></ul>');
                }
                // for each slide create a list item and link
                control.children().each(function(){
                    $('.' + option.paginationClass, elem).append('<li><a href="#'+ number +'">'+ (number+1) +'</a></li>');
                    number++;
                });
            } else {
                // if pagination exists, add href w/ value of item number to links
                $('.' + option.paginationClass + ' li a', elem).each(function(){
                    $(this).attr('href', '#' + number);
                    number++;
                });
            }

            // add current class to start slide pagination
            $('.' + option.paginationClass + ' li:eq('+ start +')', elem).addClass(option.currentClass);

            // click handling
            $('.' + option.paginationClass + ' li a', elem ).click(function(){
                // pause slideshow
                if (option.play) {
                     pause();
                }
                // get clicked, pass to animate function
                clicked = $(this).attr('href').match('[^#/]+$');
                // if current slide equals clicked, don't do anything
                if (current != clicked) {
                    animate('pagination', paginationEffect, clicked);
                }
                return false;
            });

            // click handling
            $('a.link', elem).click(function(){
                // pause slideshow
                if (option.play) {
                     pause();
                }
                // get clicked, pass to animate function
                clicked = $(this).attr('href').match('[^#/]+$') - 1;
                // if current slide equals clicked, don't do anything
                if (current != clicked) {
                    animate('pagination', paginationEffect, clicked);
                }
                return false;
            });

            if (option.play) {
                // set interval
                playInterval = setInterval(function() {
                    animate('next', effect);
                }, option.play);
                // store interval id
                elem.data('interval',playInterval);
            }
        });
    };

    // default options
    $.fn.slides.option = {
        preload: false, // boolean, Set true to preload images in an image based slideshow
        preloadImage: '/img/loading.gif', // string, Name and location of loading image for preloader. Default is "/img/loading.gif"
        container: 'slides_container', // string, Class name for slides container. Default is "slides_container"
        generateNextPrev: false, // boolean, Auto generate next/prev buttons
        next: 'next', // string, Class name for next button
        prev: 'prev', // string, Class name for previous button
        pagination: true, // boolean, If you're not using pagination you can set to false, but don't have to
        generatePagination: true, // boolean, Auto generate pagination
        prependPagination: false, // boolean, prepend pagination
        paginationClass: 'pagination', // string, Class name for pagination
        currentClass: 'current', // string, Class name for current class
        fadeSpeed: 350, // number, Set the speed of the fading animation in milliseconds
        fadeEasing: '', // string, must load jQuery's easing plugin before https://web.archive.org/web/20160220001551/http://gsgd.co.uk/sandbox/jquery/easing/
        slideSpeed: 350, // number, Set the speed of the sliding animation in milliseconds
        slideEasing: '', // string, must load jQuery's easing plugin before https://web.archive.org/web/20160220001551/http://gsgd.co.uk/sandbox/jquery/easing/
        start: 1, // number, Set the speed of the sliding animation in milliseconds
        effect: 'slide', // string, '[next/prev], [pagination]', e.g. 'slide, fade' or simply 'fade' for both
        crossfade: false, // boolean, Crossfade images in a image based slideshow
        randomize: false, // boolean, Set to true to randomize slides
        play: 0, // number, Autoplay slideshow, a positive number will set to true and be the time between slide animation in milliseconds
        pause: 0, // number, Pause slideshow on click of next/prev or pagination. A positive number will set to true and be the time of pause in milliseconds
        hoverPause: false, // boolean, Set to true and hovering over slideshow will pause it
        autoHeight: false, // boolean, Set to true to auto adjust height
        autoHeightSpeed: 350, // number, Set auto height animation time in milliseconds
        bigTarget: false, // boolean, Set to true and the whole slide will link to next slide on click
        animationStart: function(){}, // Function called at the start of animation
        animationComplete: function(){}, // Function called at the completion of animation
        slidesLoaded: function() {} // Function is called when slides is fully loaded
    };

    // Randomize slide order on load
    $.fn.randomize = function(callback) {
        function randomizeOrder() { return(Math.round(Math.random())-0.5); }
            return($(this).each(function() {
            var $this = $(this);
            var $children = $this.children();
            var childCount = $children.length;
            if (childCount > 1) {
                $children.hide();
                var indices = [];
                for (i=0;i<childCount;i++) { indices[indices.length] = i; }
                indices = indices.sort(randomizeOrder);
                $.each(indices,function(j,k) {
                    var $child = $children.eq(k);
                    var $clone = $child.clone(true);
                    $clone.show().appendTo($this);
                    if (callback !== undefined) {
                        callback($child, $clone);
                    }
                $child.remove();
            });
            }
        }));
    };
})(jQuery);

// IMAGES LOADED
(function(c,n){var k="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///web.archive.org/web/20160220001551/http://ywAAAAAAQABAAACAUwAOw==/";c.fn.imagesLoaded=function(l){function m(){var b=c(h),a=c(g);d&&(g.length?d.reject(e,b,a):d.resolve(e));c.isFunction(l)&&l.call(f,e,b,a)}function i(b,a){b.src===k||-1!==c.inArray(b,j)||(j.push(b),a?g.push(b):h.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),o&&d.notifyWith(c(b),[a,e,c(h),c(g)]),e.length===j.length&&(setTimeout(m),e.unbind(".imagesLoaded")))}var f=this,d=c.isFunction(c.Deferred)?c.Deferred():
0,o=c.isFunction(d.notify),e=f.find("img").add(f.filter("img")),j=[],h=[],g=[];e.length?e.bind("load.imagesLoaded error.imagesLoaded",function(b){i(b.target,"error"===b.type)}).each(function(b,a){var e=a.src,d=c.data(a,"imagesLoaded");if(d&&d.src===e)i(a,d.isBroken);else if(a.complete&&a.naturalWidth!==n)i(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=k,a.src=e}):m();return d?d.promise(f):f}})(jQuery);

/*
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: https://web.archive.org/web/20160220001551/http://fancybox.net/
 *
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 *
 * Version: 1.3.1 (05/03/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   https://web.archive.org/web/20160220001551/http://www.opensource.org/licenses/mit-license.php
 *   https://web.archive.org/web/20160220001551/http://www.gnu.org/licenses/gpl.html
 */

(function(b){var m,u,x,g,D,i,z,A,B,p=0,e={},q=[],n=0,c={},j=[],E=null,s=new Image,G=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,S=/[^\.]\.(swf)\s*$/i,H,I=1,k,l,h=false,y=b.extend(b("<div/>")[0],{prop:0}),v=0,O=!b.support.opacity&&!window.XMLHttpRequest,J=function(){u.hide();s.onerror=s.onload=null;E&&E.abort();m.empty()},P=function(){b.fancybox('<p id="fancybox_error">The requested content cannot be loaded.<br />Please try again later.</p>',{scrolling:"no",padding:20,transitionIn:"none",transitionOut:"none"})},
K=function(){return[b(window).width(),b(window).height(),b(document).scrollLeft(),b(document).scrollTop()]},T=function(){var a=K(),d={},f=c.margin,o=c.autoScale,t=(20+f)*2,w=(20+f)*2,r=c.padding*2;if(c.width.toString().indexOf("%")>-1){d.width=a[0]*parseFloat(c.width)/100-40;o=false}else d.width=c.width+r;if(c.height.toString().indexOf("%")>-1){d.height=a[1]*parseFloat(c.height)/100-40;o=false}else d.height=c.height+r;if(o&&(d.width>a[0]-t||d.height>a[1]-w))if(e.type=="image"||e.type=="swf"){t+=r;
w+=r;o=Math.min(Math.min(a[0]-t,c.width)/c.width,Math.min(a[1]-w,c.height)/c.height);d.width=Math.round(o*(d.width-r))+r;d.height=Math.round(o*(d.height-r))+r}else{d.width=Math.min(d.width,a[0]-t);d.height=Math.min(d.height,a[1]-w)}d.top=a[3]+(a[1]-(d.height+40))*0.5;d.left=a[2]+(a[0]-(d.width+40))*0.5;if(c.autoScale===false){d.top=Math.max(a[3]+f,d.top);d.left=Math.max(a[2]+f,d.left)}return d},U=function(a){if(a&&a.length)switch(c.titlePosition){case "inside":return a;case "over":return'<span id="fancybox-title-over">'+
a+"</span>";default:return'<span id="fancybox-title-wrap"><span id="fancybox-title-left"></span><span id="fancybox-title-main">'+a+'</span><span id="fancybox-title-right"></span></span>'}return false},V=function(){var a=c.title,d=l.width-c.padding*2,f="fancybox-title-"+c.titlePosition;b("#fancybox-title").remove();v=0;if(c.titleShow!==false){a=b.isFunction(c.titleFormat)?c.titleFormat(a,j,n,c):U(a);if(!(!a||a==="")){b('<div id="fancybox-title" class="'+f+'" />').css({width:d,paddingLeft:c.padding,
paddingRight:c.padding}).html(a).appendTo("body");switch(c.titlePosition){case "inside":v=b("#fancybox-title").outerHeight(true)-c.padding;l.height+=v;break;case "over":b("#fancybox-title").css("bottom",c.padding);break;default:b("#fancybox-title").css("bottom",b("#fancybox-title").outerHeight(true)*-1);break}b("#fancybox-title").appendTo(D).hide()}}},W=function(){b(document).unbind("keydown.fb").bind("keydown.fb",function(a){if(a.keyCode==27&&c.enableEscapeButton){a.preventDefault();b.fancybox.close()}else if(a.keyCode==
37){a.preventDefault();b.fancybox.prev()}else if(a.keyCode==39){a.preventDefault();b.fancybox.next()}});if(b.fn.mousewheel){g.unbind("mousewheel.fb");j.length>1&&g.bind("mousewheel.fb",function(a,d){a.preventDefault();h||d===0||(d>0?b.fancybox.prev():b.fancybox.next())})}if(c.showNavArrows){if(c.cyclic&&j.length>1||n!==0)A.show();if(c.cyclic&&j.length>1||n!=j.length-1)B.show()}},X=function(){var a,d;if(j.length-1>n){a=j[n+1].href;if(typeof a!=="undefined"&&a.match(G)){d=new Image;d.src=a}}if(n>0){a=
j[n-1].href;if(typeof a!=="undefined"&&a.match(G)){d=new Image;d.src=a}}},L=function(){i.css("overflow",c.scrolling=="auto"?c.type=="image"||c.type=="iframe"||c.type=="swf"?"hidden":"auto":c.scrolling=="yes"?"auto":"visible");if(!b.support.opacity){i.get(0).style.removeAttribute("filter");g.get(0).style.removeAttribute("filter")}b("#fancybox-title").show();c.hideOnContentClick&&i.one("click",b.fancybox.close);c.hideOnOverlayClick&&x.one("click",b.fancybox.close);c.showCloseButton&&z.show();W();b(window).bind("resize.fb",
b.fancybox.center);c.centerOnScroll?b(window).bind("scroll.fb",b.fancybox.center):b(window).unbind("scroll.fb");b.isFunction(c.onComplete)&&c.onComplete(j,n,c);h=false;X()},M=function(a){var d=Math.round(k.width+(l.width-k.width)*a),f=Math.round(k.height+(l.height-k.height)*a),o=Math.round(k.top+(l.top-k.top)*a),t=Math.round(k.left+(l.left-k.left)*a);g.css({width:d+"px",height:f+"px",top:o+"px",left:t+"px"});d=Math.max(d-c.padding*2,0);f=Math.max(f-(c.padding*2+v*a),0);i.css({width:d+"px",height:f+
"px"});if(typeof l.opacity!=="undefined")g.css("opacity",a<0.5?0.5:a)},Y=function(a){var d=a.offset();d.top+=parseFloat(a.css("paddingTop"))||0;d.left+=parseFloat(a.css("paddingLeft"))||0;d.top+=parseFloat(a.css("border-top-width"))||0;d.left+=parseFloat(a.css("border-left-width"))||0;d.width=a.width();d.height=a.height();return d},Q=function(){var a=e.orig?b(e.orig):false,d={};if(a&&a.length){a=Y(a);d={width:a.width+c.padding*2,height:a.height+c.padding*2,top:a.top-c.padding-20,left:a.left-c.padding-
20}}else{a=K();d={width:1,height:1,top:a[3]+a[1]*0.5,left:a[2]+a[0]*0.5}}return d},N=function(){u.hide();if(g.is(":visible")&&b.isFunction(c.onCleanup))if(c.onCleanup(j,n,c)===false){b.event.trigger("fancybox-cancel");h=false;return}j=q;n=p;c=e;i.get(0).scrollTop=0;i.get(0).scrollLeft=0;if(c.overlayShow){O&&b("select:not(#fancybox-tmp select)").filter(function(){return this.style.visibility!=="hidden"}).css({visibility:"hidden"}).one("fancybox-cleanup",function(){this.style.visibility="inherit"});
x.css({"background-color":c.overlayColor,opacity:c.overlayOpacity}).unbind().show()}l=T();V();if(g.is(":visible")){b(z.add(A).add(B)).hide();var a=g.position(),d;k={top:a.top,left:a.left,width:g.width(),height:g.height()};d=k.width==l.width&&k.height==l.height;i.fadeOut(c.changeFade,function(){var f=function(){i.html(m.contents()).fadeIn(c.changeFade,L)};b.event.trigger("fancybox-change");i.empty().css("overflow","hidden");if(d){i.css({top:c.padding,left:c.padding,width:Math.max(l.width-c.padding*
2,1),height:Math.max(l.height-c.padding*2-v,1)});f()}else{i.css({top:c.padding,left:c.padding,width:Math.max(k.width-c.padding*2,1),height:Math.max(k.height-c.padding*2,1)});y.prop=0;b(y).animate({prop:1},{duration:c.changeSpeed,easing:c.easingChange,step:M,complete:f})}})}else{g.css("opacity",1);if(c.transitionIn=="elastic"){k=Q();i.css({top:c.padding,left:c.padding,width:Math.max(k.width-c.padding*2,1),height:Math.max(k.height-c.padding*2,1)}).html(m.contents());g.css(k).show();if(c.opacity)l.opacity=
0;y.prop=0;b(y).animate({prop:1},{duration:c.speedIn,easing:c.easingIn,step:M,complete:L})}else{i.css({top:c.padding,left:c.padding,width:Math.max(l.width-c.padding*2,1),height:Math.max(l.height-c.padding*2-v,1)}).html(m.contents());g.css(l).fadeIn(c.transitionIn=="none"?0:c.speedIn,L)}}},F=function(){m.width(e.width);m.height(e.height);if(e.width=="auto")e.width=m.width();if(e.height=="auto")e.height=m.height();N()},Z=function(){h=true;e.width=s.width;e.height=s.height;b("<img />").attr({id:"fancybox-img",
src:s.src,alt:e.title}).appendTo(m);N()},C=function(){J();var a=q[p],d,f,o,t,w;e=b.extend({},b.fn.fancybox.defaults,typeof b(a).data("fancybox")=="undefined"?e:b(a).data("fancybox"));o=a.title||b(a).title||e.title||"";if(a.nodeName&&!e.orig)e.orig=b(a).children("img:first").length?b(a).children("img:first"):b(a);if(o===""&&e.orig)o=e.orig.attr("alt");d=a.nodeName&&/^(?:javascript|#)/i.test(a.href)?e.href||null:e.href||a.href||null;if(e.type){f=e.type;if(!d)d=e.content}else if(e.content)f="html";else if(d)if(d.match(G))f=
"image";else if(d.match(S))f="swf";else if(b(a).hasClass("iframe"))f="iframe";else if(d.match(/#/)){a=d.substr(d.indexOf("#"));f=b(a).length>0?"inline":"ajax"}else f="ajax";else f="inline";e.type=f;e.href=d;e.title=o;if(e.autoDimensions&&e.type!=="iframe"&&e.type!=="swf"){e.width="auto";e.height="auto"}if(e.modal){e.overlayShow=true;e.hideOnOverlayClick=false;e.hideOnContentClick=false;e.enableEscapeButton=false;e.showCloseButton=false}if(b.isFunction(e.onStart))if(e.onStart(q,p,e)===false){h=false;
return}m.css("padding",20+e.padding+e.margin);b(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){b(this).replaceWith(i.children())});switch(f){case "html":m.html(e.content);F();break;case "inline":b('<div class="fancybox-inline-tmp" />').hide().insertBefore(b(a)).bind("fancybox-cleanup",function(){b(this).replaceWith(i.children())}).bind("fancybox-cancel",function(){b(this).replaceWith(m.children())});b(a).appendTo(m);F();break;case "image":h=false;b.fancybox.showActivity();
s=new Image;s.onerror=function(){P()};s.onload=function(){s.onerror=null;s.onload=null;Z()};s.src=d;break;case "swf":t='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+e.width+'" height="'+e.height+'"><param name="movie" value="'+d+'"></param>';w="";b.each(e.swf,function(r,R){t+='<param name="'+r+'" value="'+R+'"></param>';w+=" "+r+'="'+R+'"'});t+='<embed src="'+d+'" type="application/x-shockwave-flash" width="'+e.width+'" height="'+e.height+'"'+w+"></embed></object>";m.html(t);
F();break;case "ajax":a=d.split("#",2);f=e.ajax.data||{};if(a.length>1){d=a[0];if(typeof f=="string")f+="&selector="+a[1];else f.selector=a[1]}h=false;b.fancybox.showActivity();E=b.ajax(b.extend(e.ajax,{url:d,data:f,error:P,success:function(r){if(E.status==200){m.html(r);F()}}}));break;case "iframe":b('<iframe id="fancybox-frame" name="fancybox-frame'+(new Date).getTime()+'" frameborder="0" hspace="0" scrolling="'+e.scrolling+'" src="'+e.href+'"></iframe>').appendTo(m);N();break}},$=function(){if(u.is(":visible")){b("div",
u).css("top",I*-40+"px");I=(I+1)%12}else clearInterval(H)},aa=function(){if(!b("#fancybox-wrap").length){b("body").append(m=b('<div id="fancybox-tmp"></div>'),u=b('<div id="fancybox-loading"><div></div></div>'),x=b('<div id="fancybox-overlay"></div>'),g=b('<div id="fancybox-wrap"></div>'));if(!b.support.opacity){g.addClass("fancybox-ie");u.addClass("fancybox-ie")}D=b('<div id="fancybox-outer"></div>').appendTo(g);D.append(i=b('<div id="fancybox-inner"></div>'),z=b('<a id="fancybox-close"></a>'),A=b('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),B=b('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));z.click(b.fancybox.close);u.click(b.fancybox.cancel);A.click(function(a){a.preventDefault();b.fancybox.prev()});B.click(function(a){a.preventDefault();b.fancybox.next()});if(O){x.get(0).style.setExpression("height",
"document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'");u.get(0).style.setExpression("top","(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'");D.prepend('<iframe id="fancybox-hide-sel-frame" src="javascript:\'\';" scrolling="no" frameborder="0" ></iframe>')}}};
b.fn.fancybox=function(a){b(this).data("fancybox",b.extend({},a,b.metadata?b(this).metadata():{})).unbind("click.fb").bind("click.fb",function(d){d.preventDefault();if(!h){h=true;b(this).blur();q=[];p=0;d=b(this).attr("rel")||"";if(!d||d==""||d==="nofollow")q.push(this);else{q=b("a[rel="+d+"], area[rel="+d+"]");p=q.index(this)}C();return false}});return this};b.fancybox=function(a,d){if(!h){h=true;d=typeof d!=="undefined"?d:{};q=[];p=d.index||0;if(b.isArray(a)){for(var f=0,o=a.length;f<o;f++)if(typeof a[f]==
"object")b(a[f]).data("fancybox",b.extend({},d,a[f]));else a[f]=b({}).data("fancybox",b.extend({content:a[f]},d));q=jQuery.merge(q,a)}else{if(typeof a=="object")b(a).data("fancybox",b.extend({},d,a));else a=b({}).data("fancybox",b.extend({content:a},d));q.push(a)}if(p>q.length||p<0)p=0;C()}};b.fancybox.showActivity=function(){clearInterval(H);u.show();H=setInterval($,66)};b.fancybox.hideActivity=function(){u.hide()};b.fancybox.next=function(){return b.fancybox.pos(n+1)};b.fancybox.prev=function(){return b.fancybox.pos(n-
1)};b.fancybox.pos=function(a){if(!h){a=parseInt(a,10);if(a>-1&&j.length>a){p=a;C()}if(c.cyclic&&j.length>1&&a<0){p=j.length-1;C()}if(c.cyclic&&j.length>1&&a>=j.length){p=0;C()}}};b.fancybox.cancel=function(){if(!h){h=true;b.event.trigger("fancybox-cancel");J();e&&b.isFunction(e.onCancel)&&e.onCancel(q,p,e);h=false}};b.fancybox.close=function(){function a(){x.fadeOut("fast");g.hide();b.event.trigger("fancybox-cleanup");i.empty();b.isFunction(c.onClosed)&&c.onClosed(j,n,c);j=e=[];n=p=0;c=e={};h=false}
if(!(h||g.is(":hidden"))){h=true;if(c&&b.isFunction(c.onCleanup))if(c.onCleanup(j,n,c)===false){h=false;return}J();b(z.add(A).add(B)).hide();b("#fancybox-title").remove();g.add(i).add(x).unbind();b(window).unbind("resize.fb scroll.fb");b(document).unbind("keydown.fb");i.css("overflow","hidden");if(c.transitionOut=="elastic"){k=Q();var d=g.position();l={top:d.top,left:d.left,width:g.width(),height:g.height()};if(c.opacity)l.opacity=1;y.prop=1;b(y).animate({prop:0},{duration:c.speedOut,easing:c.easingOut,
step:M,complete:a})}else g.fadeOut(c.transitionOut=="none"?0:c.speedOut,a)}};b.fancybox.resize=function(){var a,d;if(!(h||g.is(":hidden"))){h=true;a=i.wrapInner("<div style='overflow:auto'></div>").children();d=a.height();g.css({height:d+c.padding*2+v});i.css({height:d});a.replaceWith(a.children());b.fancybox.center()}};b.fancybox.center=function(){h=true;var a=K(),d=c.margin,f={};f.top=a[3]+(a[1]-(g.height()-v+40))*0.5;f.left=a[2]+(a[0]-(g.width()+40))*0.5;f.top=Math.max(a[3]+d,f.top);f.left=Math.max(a[2]+
d,f.left);g.css(f);h=false};b.fn.fancybox.defaults={padding:10,margin:20,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.3,overlayColor:"#666",titleShow:true,titlePosition:"outside",titleFormat:null,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",
easingIn:"swing",easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,onStart:null,onCancel:null,onComplete:null,onCleanup:null,onClosed:null};b(document).ready(function(){aa()})})(jQuery);

/*
 * jQuery Easing v1.3 - https://web.archive.org/web/20160220001551/http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - https://web.archive.org/web/20160220001551/http://css-tricks.com/ + Dave Rupert - https://web.archive.org/web/20160220001551/http://daverupert.com/
* Credit to Thierry Koblentz - https://web.archive.org/web/20160220001551/http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - https://web.archive.org/web/20160220001551/http://sam.zoy.org/wtfpl/
*
*/

!function(t){"use strict";t.fn.fitVids=function(e){var i={customSelector:null,ignore:null};if(!document.getElementById("fit-vids-style")){var r=document.head||document.getElementsByTagName("head")[0],a=".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",d=document.createElement("div");d.innerHTML='<p>x</p><style id="fit-vids-style">'+a+"</style>",r.appendChild(d.childNodes[1])}return e&&t.extend(i,e),this.each(function(){var e=['iframe[src*="player.vimeo.com"]','iframe[src*="youtube.com"]','iframe[src*="youtube-nocookie.com"]','iframe[src*="kickstarter.com"][src*="video.html"]',"object","embed"];i.customSelector&&e.push(i.customSelector);var r=".fitvidsignore";i.ignore&&(r=r+", "+i.ignore);var a=t(this).find(e.join(","));a=a.not("object object"),a=a.not(r),a.each(function(e){var i=t(this);if(!(i.parents(r).length>0||"embed"===this.tagName.toLowerCase()&&i.parent("object").length||i.parent(".fluid-width-video-wrapper").length)){i.css("height")||i.css("width")||!isNaN(i.attr("height"))&&!isNaN(i.attr("width"))||(i.attr("height",9),i.attr("width",16));var a="object"===this.tagName.toLowerCase()||i.attr("height")&&!isNaN(parseInt(i.attr("height"),10))?parseInt(i.attr("height"),10):i.height(),d=isNaN(parseInt(i.attr("width"),10))?i.width():parseInt(i.attr("width"),10),o=a/d;if(!i.attr("id")){var h="fitvid"+e;i.attr("id",h)}i.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",100*o+"%"),i.removeAttr("height").removeAttr("width")}})})}}(window.jQuery||window.Zepto);

var isCustomize = window.location.href.indexOf('safe.tumblr.com') >= 0;
var disqusEnabled = typeof disqusEnabled !== 'undefined';
var lteIE8 = $('html').is('.lte-ie8');
var showFollowing = typeof showFollowing !== 'undefined';
var showTweets = typeof showTweets !== 'undefined';
var showTwitterProfile = typeof showTwitterProfile !== 'undefined';
var isPermalink = typeof isPermalink !== 'undefined';
var collapseNotes = typeof collapseNotes !== 'undefined';
var fixedBar = typeof fixedBar !== 'undefined';
var followedRows = window.followedRows || 3;
var customPhotosets = typeof customPhotosets !== 'undefined';
var infiniteScroll = typeof infiniteScroll !== 'undefined';
var IOS = navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod';
var isMobile = $('html').hasClass('touch');
var twitterJSLoading = false;
var fancyboxArgs = {
    'type': 'image',
    'padding': 0,
    'overlayColor': '#000',
    'overlayOpacity': 0.85,
    'titleShow': false
};
var sliderArgs = {
    container: 'slides',
    autoHeight: true,
    generatePagination: false,
    effect: 'slide'
};

(function($) {

    $(document).ready(function() {

        // Initial Setup
        posts();

        var header = $('#header');
        if (isMobile) {
            fixedBar = false;
        }

        if (fixedBar) {
            var pinnedTO = false,
                fixedTO = false;
            var triggerH = 750;
            var isFixed = false;
            var isPinned = true;
            var y = $(window).scrollTop();
            if (y > triggerH) {
                isFixed = true;
                isPinned = false;
                header.removeClass('pinned').addClass('fixed').css({
                    'top': '0px'
                }).find('.shadow').show();
            }
        }

        if (showFollowing) {
            setupFollowing();
        }
        if (showTweets && twitterUsername !== '') {
            getTweets();
        }
        if (showInstagram && accessToken !== '') {
            getInstagram();
        }
        if (isPermalink) {
            setupNotes();
        }
        if (disqusEnabled) {
            setupDisqus();
        }

        // Search Box
        if (searchValue !== '') {
            $('#search-form').find('input').val(searchValue)
                .focus(function() {
                    if ($(this).val() == searchValue) {
                        $(this).val('');
                    }
                })
                .blur(function() {
                    if ($(this).val() == '') {
                        $(this).val(searchValue);
                    }
                });
        }

        // share toggle
        $("article .toggle").live('click', function() {
            var toggle = $(this);
            var widget = toggle.next('.widget');

            if (toggle.hasClass('open')) {
                toggle.removeClass('open').html('Share');
                widget.animate({
                    opacity: 0,
                    top: -5
                }, 200, 'easeOutQuart', function() {
                    $(this).removeClass('open').css({
                        display: 'none'
                    });
                });
            } else {
                $('article .toggle.open').removeClass('open').next('.widget').animate({
                    opacity: 0,
                    top: -5
                }, 200, 'easeOutQuart', function() {
                    $(this).removeClass('open').css({
                        display: 'none'
                    });
                });
                toggle.addClass('open').html('Close');
                widget.css('display', 'block').animate({
                    opacity: 1,
                    top: 30
                }, 200, 'easeOutQuart', function() {
                    $(this).addClass('open');
                });
            }

            var article = $(this).parents('article');
            var pinLink = article.find('.share-pinterest');
            var pinHref = article.find('.share-pinterest').attr('href');
            var media = '';

            if (!pinLink.hasClass('appended')) {

                // photo post
                if (article.hasClass('type-photo')) {
                    media = article.find('.photo-panel img').attr('src');
                    appendMedia(media);
                } else if (article.hasClass('type-photoset')) {
                    media = article.find('.photo:first img').attr('src');
                    appendMedia(media);
                } else if (article.hasClass('type-text') || article.hasClass('type-chat') || article.hasClass('type-quote') || article.hasClass('type-ask')) {
                    media = article.find(':not(#comments) img:first');
                    if (media.parents('#comments') || media === undefined) {
                        disablePinterest();
                    } else {
                        media = media.attr('src');
                        appendMedia(media);
                    }

                } else if (article.hasClass('type-video')) {
                    var videoURL = article.find('.video iframe').attr('src');
                    if (videoURL.indexOf("youtu") != -1) {
                        var youTubeID = videoURL.match(/embed\/([a-zA-Z0-9]*)\?/);
                        if (youTubeID != null) {
                            media = 'https://web.archive.org/web/20160220001551/http://img.youtube.com/vi/' + youTubeID[1] + '/maxresdefault.jpg'
                            appendMedia(media);
                        }
                    } else if (videoURL.indexOf("vimeo") != -1) {
                        var vimeoID = videoURL.match(/video\/([a-zA-Z0-9]*)/);
                        $.ajax({
                            type: 'GET',
                            url: 'https://web.archive.org/web/20160220001551/http://vimeo.com/api/v2/video/' + vimeoID[1] + '.json',
                            jsonp: 'callback',
                            dataType: 'jsonp',
                            success: function(data) {
                                var vimeoThumbnail = data[0].thumbnail_large;
                                media = vimeoThumbnail;
                                appendMedia(media);
                            }
                        });
                    }
                } else if (article.hasClass('type-audio')) {
                    if (article.find('.album').length > 0) {
                        media = article.find('.album').css('background-image').replace(/"/g, "").replace(/url\(|\)$/ig, "");
                        appendMedia(media);
                    } else {
                        disablePinterest();
                    }
                }

                function appendMedia(media) {
                    var newLink = pinHref + media
                    pinLink.attr('href', newLink);
                    pinLink.addClass('appended');
                }

                function disablePinterest() {
                    pinLink.addClass('disabled').attr('href', 'javascript:void(0)');
                }

            }

        });

        // close any share boxes when you click outside of it
        $('html').live("click", function(e) {
            if (!$(e.target).parents('.share').get(0)) {
                $('.widget').each(function() {
                    if ($(this).hasClass('open')) {
                        $(this).prev('.toggle').removeClass('open').html('Share');
                        $(this).animate({
                            opacity: 0,
                            top: -5
                        }, 200, 'easeOutQuart', function() {
                            $(this).removeClass('open').css({
                                display: 'none'
                            });
                        });
                    }
                });
            }
        });

        $('.short-link input').live('click', function() {
            $(this).focus().select();
        });

        $('.photo-panel').live('mouseenter', function() {
            $(this).find('.photo-btns').stop(true, true).fadeIn(150);
        }).live('mouseleave', function() {
            $(this).find('.photo-btns').stop(true, true).fadeOut(150);
        });

        $('.type-photoset').find('.photo-panel').find('a.lightbox').live('click', function() {
            $(this).parent().prev('a:has(img)').click();
            return false;
        });

        $(window).scroll(function() {
            if (fixedBar) {
                y = $(window).scrollTop();
                if (y > triggerH) {
                    if (!isFixed) {
                        if (fixedTO !== false) {
                            clearTimeout(fixedTO);
                            clearTimeout(pinnedTO);
                        }
                        isFixed = true;
                        isPinned = false;
                        fixedTO = setTimeout(function() {
                            header.stop(true, true).removeClass('pinned').addClass('fixed').css({
                                'top': '-50px'
                            }).animate({
                                'top': '0px'
                            }, 300).find('.shadow').show();
                        }, 100);
                    }
                } else if (y < triggerH) {
                    if (!isPinned) {
                        if (pinnedTO !== false) {
                            clearTimeout(fixedTO);
                            clearTimeout(pinnedTO);
                        }
                        isFixed = false;
                        isPinned = true;
                        pinnedTO = setTimeout(function() {
                            header.stop(true, true).animate({
                                'top': '-60px'
                            }, 300, function() {
                                $(this).hide().css({
                                    'top': '30px'
                                }).find('.shadow').hide().end().removeClass('fixed').addClass('pinned').fadeIn('fast');
                            });
                        }, 100);
                    }

                }
            }
        });

        // Sidebar Tabs (Twitter & Instagram)
        $("#tabs .tab:first").css({
            left: 0,
            opacity: 1
        }).addClass('active');
        $("#tabs #tabs-nav span:first").addClass('active');
        $('#tabs-nav span').click(function() {

            var currentNav = $('#tabs-nav span.active');
            var currentTab = $('.tab.active');

            var nextNav = $(this);
            var findTab = nextNav.attr('id').replace('tab-', '');
            var nextTab = $('#tabs #' + findTab);

            if (nextNav.hasClass('active')) {
                // do nada, we're already on that tab!
            } else {
                if (isMobile) {
                    // just fade in/out for smartphones
                    currentTab.animate({
                        opacity: 0
                    }, 200, function() {
                        currentTab.removeClass('active');
                        currentNav.removeClass('active')
                        nextTab.addClass('active').css({
                            left: 0
                        }).animate({
                            opacity: 1
                        }, 200);
                        nextNav.addClass('active');
                    });
                } else {
                    currentTab.animate({
                        left: 200,
                        opacity: 0
                    }, 200, function() {
                        currentTab.removeClass('active');
                        currentNav.removeClass('active')
                        nextTab.addClass('active').animate({
                            left: 0,
                            opacity: 1
                        }, 200);
                        nextNav.addClass('active');
                    });
                }
            }
        });

        // If only one tab...
        if ($('#tabs .tab').length == 1) {
            $('#tabs #tabs-nav h2').prependTo($('.tab'));
            $('#tabs #tabs-nav').remove();

            $('#tabs .tab').addClass('ruled-top');
            var content = $("#tabs").contents();
            $('#tabs').replaceWith(content);
        }

        // If no tabs
        if (showInstagram == false && showTweets == '') {
            $("#tabs").remove();
        }

        // Infinite Scrolling

        if ((window.location.href.indexOf('/page/') > -1) || isMobile) {
            infiniteScroll = false;
            $('body').removeClass('infscroll');
        }
        if (infiniteScroll && !isPermalink) {
            $('#content').infinitescroll({
                navSelector: "#pagination",
                nextSelector: "#pagination a.next",
                itemSelector: ".post",
                loadingImg: "https://web.archive.org/web/20160220001551/http://static.tumblr.com/xgwqnql/iLQleupcf/infscroll_loader.gif",
                loadingText: "",
                donetext: "No more posts to load."
            }, function(newPosts, page) {
                $(newPosts).eq(0).before('<div class="page-sep">Page ' + page + '</div>');
                posts($(newPosts), true);
                if (disqusEnabled) {
                    setupDisqus();
                }
            });
        }

        // Back to Top

        function backTop() {
            var scrollPosition = $('body').scrollTop() ? $('body').scrollTop() : $('html').scrollTop();

            if (scrollPosition > 500) {
                $('#back-to-top').addClass('snippet');
            } else {
                $('#back-to-top').removeClass('snippet');
            }
        }
        $(document).scroll(function(e) {
            backTop();
        });
        $("#back-to-top").click(function() {
            $('body, html').animate({
                scrollTop: 0
            });
        });
        // kill it on mobile
        if (isMobile) {
            $('#back-to-top').remove();
        }

        // Hide Sidebar
        if ($('body').hasClass('hide-sidebar')) {
            $('#sidebar').remove();
        }

        // Group Members
        // Align Tooltip
        $('#group-members li span').each(function() {
            var span = $(this);
            var spanW = span.innerWidth();
            span.css({
                marginLeft: -(spanW / 2),
                display: 'none'
            })
        });

        $('#group-members li, #followed li').hover(function() {
            var member = $(this);
            var span = $(this).find('span');
            if (Modernizr.mq('only screen and (-webkit-min-device-pixel-ratio: 2)') == true) {
                span.stop().css('display', 'block').animate({
                    opacity: 1,
                    bottom: 60
                }, 200);
            } else {
                span.stop().css('display', 'block').animate({
                    opacity: 1,
                    bottom: 39
                }, 200);
            }
        }, function() {
            var member = $(this);
            var span = $(this).find('span');
            if (Modernizr.mq('only screen and (-webkit-min-device-pixel-ratio: 2)') == true) {
                span.stop().fadeOut(100, function() {
                    span.css({
                        bottom: 50,
                        opacity: 0
                    })
                });
            } else {
                span.stop().fadeOut(100, function() {
                    span.css({
                        bottom: 29,
                        opacity: 0
                    })
                });
            }
        });

        // Likes (Footer) on iPad
        if (Modernizr.mq('only screen and (min-device-width : 768px) and (max-device-width : 1024px)') == true) {
            $('#footer #likes .like_post').eq(4).remove();
        };

        // Retina Displays
        if (Modernizr.mq('only screen and (-webkit-min-device-pixel-ratio: 2)') == true) {

            // Replace Group Members Icons
            $('#group-members li a img, #followed li a img').each(function() {
                var oldURL = $(this).attr('src');
                var newURL = oldURL.replace('_24', '_64');
                $(this).attr('src', newURL);
            })

        }

    }); // end document ready

    function posts(items, appended) {
        var posts = items ? items : $('.post:not(.loaded)');
        if (customPhotosets) {
            posts.find('.media:not(.loaded) .slides').each(function() {
                $(this).imagesLoaded(function() {
                    var id = $(this).parents('article').attr('id').split('-')[1];
                    var animateCaption = {
                        animationStart: function() {
                            $('#photoset-' + id + ' .caption').animate({
                                height: "0"
                            }, 200);
                        },
                        animationComplete: function() {
                            $('#photoset-' + id + ' .caption').animate({
                                height: "40px"
                            }, 200);
                        }
                    }
                    $(this).parent().slides($.extend(sliderArgs, animateCaption));
                    $(this).find('.photo-panel a[rel^=gallery]').fancybox(fancyboxArgs);
                    $(this).parent().parent().animate({
                        opacity: 1
                    });
                    $(this).parent().addClass('loaded');
                });
            });
        } else {
            posts
                .find('.photo-slideshow:not(.processed)').pxuPhotoset({
                    rounded: false,
                    highRes: (contentWidth >= 600),
                    gutter: '1px'
                }, function() {
                    $(this).siblings('.post-panel').animate({
                        opacity: 1
                    });
                });
            posts.find('.photo-data .photo a').fancybox(fancyboxArgs);
            posts.find('.view').each(function() {
                $(this).click(function(e) {
                    e.preventDefault();
                    $(this).parents('.photo-data').find('.photo a').click();

                })
            })
        }
        posts.each(function() {
            var post = $(this);
            var id = post.attr('id').split('-')[1];

            if (post.hasClass('type-photo')) {
                setupPhoto(post);
                $(this).find('.photo-panel a').removeAttr('onclick');
            }
            if (post.hasClass('type-audio')) {
                if (!isMobile) {
                    if (post.find('.spotify iframe').length > 0) {
                        var audioEmbed = post.find('.spotify iframe');

                        var embedWidth = audioEmbed.width();
                        var embedHeight = audioEmbed.height();
                        var embedRatio = (embedHeight / embedWidth);
                        var newWidth = contentWidth;

                        if (audioEmbed.hasClass('spotify_audio_player')) {
                            audioEmbed.css({
                                width: newWidth,
                                height: newWidth + 80
                            });
                        } else if (audioEmbed.hasClass('soundcloud_audio_player')) {
                            audioEmbed.css({
                                width: newWidth
                            });
                        }

                        var audioEmbedData = post.find('.spotify').html();
                        post.data('spotify-data', audioEmbedData);
                        var newAudioEmbed = post.data('spotify-data');
                        audioEmbed.remove();
                        post.find('.spotify').html(newAudioEmbed);
                    }
                } else {
                    post.find('.player-btn').remove();
                }

            }
            if (post.hasClass('type-video')) {
                post
                    .fitVids({ customSelector: '.tumblr_video_iframe'})
                    .find('.media').removeClass('loading');
            }
            if (post.hasClass('type-quote')) {
                var quote = post.find('.quote-text');
                var firstChild = quote.find(':first-child');
                var lastChild = quote.find(':last-child');
                var ldquo = '<span class="ldquo">&ldquo;</span>';
                var rdquo = '<span class="rdquo">&rdquo;</span>';
                if ((firstChild.length > 0) && firstChild.is('p')) {
                    firstChild.prepend(ldquo);
                } else {
                    quote.prepend(ldquo);
                }
                if ((lastChild.length > 0) && (/<\/[a-zA-Z]+>$/.test(quote.html()))) {
                    lastChild.append(rdquo);
                } else {
                    quote.append(rdquo);
                }
            }
            post.addClass('loaded');
        });

        if (!twitterJSLoading) {
            twitterJS();
        }

    }

    function setupPhoto(post) {
        var panel = post.find('.photo-panel');
        var photo = panel.find('img');
        var zoom = panel.find('.lightbox');
        var parent = photo.parent('a');

        $(photo).click(function(e) {
            if (e.metaKey) {
                window.open($(photo).parents('a').attr('href'));
                return false;
            }
        });

        photo.addClass('shadowed');
        zoom.fancybox(fancyboxArgs);

        if (parent.length > 0) {
            if (parent.attr('href') == zoom.attr('href')) {
                // click through is hi-res img
                parent.click(function() {
                    zoom.click();
                    return false;
                });
            } else {
                // click through is a url
                $('<a>', {
                    'class': 'photo-link-url',
                    'href': parent.attr('href'),
                    'text': 'Go to Link'
                }).prependTo(panel.find('.photo-btns'));

                if (zoom.length > 0) {
                    parent.click(function() {
                        zoom.click();
                        return false;
                    });
                }
            }
        }
    }

    function setupNotes() {
        var speed = 300;
        var notes = $('ol.notes');
        var toggler = $('#notes-toggle');
        toggler.toggle(
            function() {
                notes.slideUp(speed * 1.5);
                $(this).removeClass('up');
                $(this).find('.label').text('Show');
            },
            function() {
                notes.slideDown(speed * 1.5);
                $(this).addClass('up');
                $(this).find('.label').text('Hide');
            }
        );
        if (collapseNotes && (window.location.href.indexOf('#notes') == -1)) {
            toggler.click();
        }
        $('#content').find('.meta-list').find('li.notes a').click(function(e) {
            e.preventDefault();
            if ($('#notes').find('ol.notes').is(':not(:visible)')) {
                toggler.click();
            }
        });
    }

    function setupFollowing() {
        var parent = $('#followed');
        var list = parent.find('#followed-list');
        var count = list.children('li').size();
        parent.find('h2').append(' <span>(' + count + ')</span>');
        if (count <= (followedRows * 5)) {
            return true;
        }
        var wrap = parent.find('#followed-wrap');
        var minWrapH = followedRows * list.find('li').eq(0).outerHeight(true);
        var maxWrapH = wrap.outerHeight(true);
        var showFollowers = followedRows * 5;
        wrap.css('height', minWrapH + 'px');

        $(list).find('li span').each(function() {
            var span = $(this);
            var spanW = span.innerWidth();
            span.css({
                marginLeft: -(spanW / 2),
                display: 'none'
            })
        }).parent().hide().slice(0, showFollowers).show();

        $("<a>", {
            "class": "show-more-followed",
            "href": "#",
            "html": "Show All &darr;"
        })
            .appendTo(parent)
            .toggle(function() {
                wrap.css({
                    height: maxWrapH + 'px'
                });
                $(list).children('li').fadeIn(100);
                $(this).html('Show Less &uarr;');
            }, function() {
                wrap.css({
                    height: minWrapH + 'px'
                });
                $(list).children('li').hide().slice(0, showFollowers).show();
                $(this).html('Show All &darr;');
            });
    }

    function setupDisqus() {
        var query = '?';
        var links = $('li.comments a');
        links.each(function(i) {
            if ($(this).attr('href').indexOf('#disqus_thread') >= 0) {
                query += 'url' + i + '=' + encodeURIComponent(this.href) + '&';
            }
        });
        $.getScript('https://web.archive.org/web/20160220001551/http://disqus.com/forums/' + disqusShortname + '/get_num_replies.js' + query, function() {
            links.each(function(i) {
                $(this).prepend('<span class="icon"></span>').parent().removeClass('hidden');
            });
        });
    }

    function twitterJS() {
        twitterJSLoading = true;
        $.ajax({
            url: 'https://web.archive.org/web/20160220001551/http://platform.twitter.com/widgets.js',
            dataType: 'script',
            cache: true,
            success: function() {
                twitterJSLoading = false;
            }
        });
    }

    function getTweets() {
        numTweets = (numTweets > 4) ? 4 : numTweets;
        $('#twitter .loading-text').replaceWith('<ul class="tweets" />')

        var tweets = window.tweet_data.slice(0, numTweets);
        var tweetsWrap = $('.tweets');

        if (showTwitterProfile) {
            var user = tweets[0]['user'];
            var bio = user["description"];
            var profile = '<div class="profile"><h3><a href="https://web.archive.org/web/20160220001551/http://www.twitter.com/' + twitterUsername + '">@' + twitterUsername + '</a><br/> <span class="name">' + user["name"] + '</span></h3>';
            profile += (bio) ? '<p class="bio">' + bio + '</p></div>' : '';
        }

        $('#twitter .tweets').before(profile);

        $.each(tweets, function() {
            var tweetID = this.id_str;
            var tweetText = linkifyTweet(this.text);
            var timeago = relative_time(this.created_at);
            var twitterAvatar = this.user['profile_image_url'];
            var permalink = 'https://web.archive.org/web/20160220001551/http://twitter.com/' + twitterUsername + '/status/' + tweetID;
            var completeTweet = '<li><p class="tweet">' + tweetText + ' <span class="tweet-meta"><a class="timestamp" href="' + permalink + '" time="' + this.created_at + '" target="_blank">' + timeago + '</a> • <a class="reply" href="https://web.archive.org/web/20160220001551/https://twitter.com/intent/tweet?in_reply_to=' + tweetID + '">Reply</a></span></p></li>';
            tweetsWrap.append(completeTweet);
        });
    }

    function getInstagram() {
        instaCount = (instaCount > 4) ? 4 : instaCount;
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            cache: false,
            timeout: 5000,
            url: 'https://web.archive.org/web/20160220001551/https://api.instagram.com/v1/users/self/media/recent?access_token=' + accessToken + '&count=' + instaCount,
            success: function(data) {

                if (data.meta.error_type == 'OAuthAccessTokenException') {
                    $('#instagram .loading-text').html('Error fetching photos, incorrect access token used.');
                }

                $("#instagram").append('<div id="instagram-photos" />');

                var instagramPhotos = $("#instagram-photos");

                var photos = data.data;

                // loop through each of the photos and get all data
                for (i = 0; i < 4; i++) {

                    if (photos[i] !== undefined) {
                        var photo = photos[i];

                        var photoUrl = photo.images.low_resolution.url;
                        var photoID = photo.id;
                        var photoLink = photo.link;
                        var photoLikes = photo.likes.count;
                        var photoComments = photo.comments.count;

                        var photoCaption;
                        if (photo.caption != null) {
                            photoCaption = '<p class="caption">' + photo.caption.text + '</p>';
                        } else {
                            photoCaption = '';
                        }

                        var likesText;
                        if (photoLikes == 1) {
                            likesText = photoLikes + ' like'
                        } else {
                            likesText = photoLikes + ' likes'
                        }

                        var commentsText;
                        if (photoComments == 1) {
                            commentsText = photoComments + ' comment'
                        } else {
                            commentsText = photoComments + ' comments'
                        }

                        var instaImage = '<img src="' + photoUrl + '" />';

                        var instagramPhoto = '<div class="instagram-photo ' + photoID + '">' + instaImage + '<aside>' + photoCaption + '<p><span class="insta-likes">' + likesText + '</span> • <span class="insta-comments">' + commentsText + '</span></p></aside></div>';

                        instagramPhotos.append(instagramPhoto);

                        if (photoLink != null) {
                            photoLink = '<a href="' + photoLink + '" />'
                            $('.' + photoID).find('.insta-likes').wrapInner(photoLink);
                            $('.' + photoID).find('.insta-comments').wrapInner(photoLink);
                            $('.' + photoID).find('> img').wrap(photoLink);
                        }

                    }
                } // end for loop
                $("#instagram-photos").imagesLoaded(function() {
                    $("#instagram .loading-text").remove();

                    $('.instagram-photo').each(function() {
                        $(this).animate({
                            opacity: 1
                        });
                    });
                });
            }, // end success data
            error: function() {
                $('#instagram-photos').append('<p>Instagram&rsquo;s API service is experiencing some technical difficulties. Please try again later.</p>').css('background', 'none');
                $('.more-instagram').html('').css('background', 'none');
            } // end error data
        }); // end ajax
    }

    $.preloadImages = function() {
        for (var i = 0; i < arguments.length; i++) {
            img = new Image();
            img.src = arguments[i];
        }
    }

    $.preloadImages(
        "https://web.archive.org/web/20160220001551/http://static.tumblr.com/xgwqnql/fMLlbpj9t/header_shadow.png",
        "https://web.archive.org/web/20160220001551/http://static.tumblr.com/njty47g/Omoleufdi/topbar_bg.png",
        "https://web.archive.org/web/20160220001551/http://static.tumblr.com/njty47g/x1Ild1iih/photo_btns_med.png"
    );

})(window.jQuery); // end remap jQuery

function linkifyTweet(tweet_text) {
    return tweet_text
        .replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi, '<a href="$1">$1</a>')
        .replace(/(^|\s)#(\w+)/g, '$1<a href="https://web.archive.org/web/20160220001551/https://twitter.com/search?q=%23$2">#$2</a>')
        .replace(/(^|\s)@(\w+)/g, '$1<a href="https://web.archive.org/web/20160220001551/http://twitter.com/$2">@$2</a>');
}

function relative_time(time_value) {
    var parsed_date = parseDate(time_value);
    var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
    var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
    if (delta < 60) {
        return 'less than a minute ago';
    } else if (delta < 120) {
        return 'about a minute ago';
    } else if (delta < (45 * 60)) {
        return (parseInt(delta / 60)).toString() + ' minutes ago';
    } else if (delta < (90 * 60)) {
        return 'about an hour ago';
    } else if (delta < (24 * 60 * 60)) {
        return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
    } else if (delta < (48 * 60 * 60)) {
        return '1 day ago';
    } else {
        return (parseInt(delta / 86400)).toString() + ' days ago';
    }
}

function parseDate(str) {
    var v = str.split(' '),
        year, time;
    // date string from tumblr's tweet data is slightly different from twitter timeline data
    if (/\+0000/.test(v[5])) {
        year = v[3];
        time = v[4]
    } else {
        year = v[5]
        time = v[3]
    }
    return new Date(Date.parse(v[1] + " " + v[2] + ", " + year + " " + time + " UTC"));
}

// usage: log('inside coolFunc',this,arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function() {
    log.history = log.history || []; // store logs to an array for reference
    log.history.push(arguments);
    if (this.console) {
        console.log(Array.prototype.slice.call(arguments));
    }
};

/*
     FILE ARCHIVED ON 00:15:51 Feb 20, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 09:33:25 Jun 22, 2017.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/