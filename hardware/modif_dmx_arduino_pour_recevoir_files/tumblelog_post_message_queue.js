/*! scripts/tumblelog_post_message_queue.js */
(function(a){if(a.postMessageQueue){return}a.postMessageQueue=[];a.postMessageCallback=function(b){a.postMessageQueue.push(b.data)};if(window.addEventListener){window.addEventListener("message",a.postMessageCallback)}else{window.attachEvent("onmessage",a.postMessageCallback)}})(window.Tumblr||(window.Tumblr={}));
/*
     FILE ARCHIVED ON 01:19:23 Feb 20, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 09:33:29 Jun 22, 2017.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/