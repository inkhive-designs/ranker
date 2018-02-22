(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function($) {
  'use strict';

  // where inlineCSS is the string value of an element's style attribute
  // and toRemove is a string of space-separated CSS properties,
  // _cleanInlineCSS removes the CSS declaration for each property in toRemove from inlineCSS
  // and returns the resulting string
  function _cleanInlineCSS(inlineCSS, toRemove){
    var inlineCSSArray  = inlineCSS.split(';');
    var toRemoveArray   = toRemove.split(' ');

    var cleaned         = '';
    var keep;

    for (var i = 0, j = inlineCSSArray.length; i < j; i++) {
      keep = true;
      for (var a = 0, b = toRemoveArray.length; a < b; a++) {
        if (inlineCSSArray[i] === '' || inlineCSSArray[i].indexOf(toRemoveArray[a]) !== -1) {
          keep = false;
        }
      }
      if(keep) {cleaned += inlineCSSArray[i] + '; ';}
    }

    return cleaned;
  }


  $.fn.bigSlide = function(options) {
    // store the menuLink in a way that is globally accessible
    var menuLink = this;

    // plugin settings
    var settings = $.extend({
      'menu': ('#menu'),
      'push': ('.push'),
      'shrink': ('.shrink'),
      'hiddenThin': ('.hiddenThin'),
      'side': 'left',
      'menuWidth': '15.625em',
      'semiOpenMenuWidth': '4em',
      'speed': '300',
      'state': 'closed',
      'activeBtn': 'active',
      'easyClose': false,
      'saveState': false,
      'semiOpenStatus': false,
      'semiOpenScreenWidth': 480,
      'beforeOpen': function () {},
      'afterOpen': function() {},
      'beforeClose': function() {},
      'afterClose': function() {}
    }, options);

    // CSS properties set by bigSlide.js on all implicated DOM elements
    var baseCSSDictionary = 'transition -o-transition -ms-transition -moz-transitions webkit-transition ' + settings.side;

    var model = {
      //CSS properties set by bigSlide.js on this.$menu
      menuCSSDictionary: baseCSSDictionary + ' position top bottom height width',
      //CSS properties set by bigSlide.js on this.$push
      pushCSSDictionary: baseCSSDictionary,
      // store the menu's state in the model
      'state': settings.state
    };

    // talk back and forth between the view and state
    var controller = {
      init: function(){
        view.init();
      },

      // remove bigSlide behavior from the menu
      _destroy: function(){
        view._destroy();

        delete menuLink.bigSlideAPI;

        // return a reference to the DOM selection bigSlide.js was called on
        // so that the destroy method is chainable
        return menuLink;
      },

      // update the menu's state
      changeState: function(){
        if (model.state === 'closed') {
          model.state = 'open'
        } else {
          model.state = 'closed'
        }
      },

      // set the menu's state
      setState: function(state){
        model.state = state;
      },

      // check the menu's state
      getState: function(){
        return model.state;
      }
    };

    // the view contains all of the visual interactions
    var view = {
      init: function(){
        // cache DOM values
        this.$menu = $(settings.menu);
        this.$push = $(settings.push);
        this.$shrink = $(settings.shrink);
        this.$hiddenThin = $(settings.hiddenThin);
        this.width = settings.menuWidth;
        this.semiOpenMenuWidth = settings.semiOpenMenuWidth;

        // get the initial state based on the last saved state or on the state option
        var initialState = 'closed';
        if (settings.saveState) {
          initialState = localStorage.getItem('bigSlide-savedState');
          if (!initialState) initialState = settings.state;
        } else {
          initialState = settings.state;
        }

        // set the initial state on the controller
        controller.setState(initialState);

        // add the css values to position things offscreen or inscreen depending on the initial state value
        var initialScreenWidth = $(window).width();
        if (initialState === 'closed') {
          if (settings.semiOpenStatus && initialScreenWidth > settings.semiOpenScreenWidth) {
            this.$menu.addClass('semiOpen');
            this.$push.addClass('semiOpen');
          } else {
            this.$menu.addClass('closed');
            this.$push.addClass('closed');
          }
        } else if (initialState === 'open') {
          menuLink.addClass(settings.activeBtn);
          this.$menu.addClass('open');
          this.$push.addClass('open');
        }

        var that = this;

        // register a click listener for desktop & touchstart for mobile
        menuLink.on('click.bigSlide touchstart.bigSlide', function(e) {
          e.preventDefault();
          if (controller.getState() === 'open') {
            view.toggleClose();
          } else {
            view.toggleOpen();
          }
        });

        // register a window resize listener for tracking the semi open status states
        // This could be more efficently or even there are people that could consider it unnecessary. We can think about it
        if (settings.semiOpenStatus) {
            $(window).resize(function() {
                var screenWidth = $(window).width();
                if (screenWidth > settings.semiOpenScreenWidth) {
                    if (controller.getState() === 'closed') {
                      that.$menu.addClass('semiOpen').removeClass('open closed');
                      that.$push.addClass('semiOpen').removeClass('open closed');
                    }
                } else {
                    that.$menu.removeClass('semiOpen');
                    if (controller.getState() === 'closed') {
                      that.$menu.addClass('closed').removeClass('open semiOpen');
                      that.$push.addClass('closed').removeClass('open semiOpen');
                    }
                }
            });
        }

        // this makes my eyes bleed, but adding it back in as it's a highly requested feature
        if (settings.easyClose) {
          $(document).on('click.bigSlide', function(e) {
           if (!$(e.target).parents().andSelf().is(menuLink) && !$(e.target).closest(settings.menu).length && controller.getState() === 'open')  {
             view.toggleClose();
           }
          });
        }
      },

      _destroy: function(){
        //remove inline styles generated by bigSlide.js while preserving any other inline styles
        this.$menu.each(function(){
          var $this = $(this);
          $this.attr( 'style', _cleanInlineCSS($this.attr('style'), model.menuCSSDictionary).trim() );
        });

        this.$push.each(function(){
          var $this = $(this);
          $this.attr( 'style', _cleanInlineCSS($this.attr('style'), model.pushCSSDictionary).trim() );
        });

        this.$shrink.each(function(){
          var $this = $(this);
          $this.attr( 'style', _cleanInlineCSS($this.attr('style'), model.pushCSSDictionary).trim() );
        });

        //remove active class and unbind bigSlide event handlers
        menuLink
          .removeClass(settings.activeBtn)
          .off('click.bigSlide touchstart.bigSlide');

        //release DOM references to avoid memory leaks
        this.$menu = null;
        this.$push = null;
        this.$shrink = null;

        //remove the local storage state
        localStorage.removeItem('bigSlide-savedState');
      },

      // toggle the menu open
      toggleOpen: function() {
        settings.beforeOpen();
        controller.changeState();
        view.applyOpenStyles();
        menuLink.addClass(settings.activeBtn);
        settings.afterOpen();

        // save the state
        if (settings.saveState) {
          localStorage.setItem('bigSlide-savedState', 'open');
        }
      },

      // toggle the menu closed
      toggleClose: function() {
        settings.beforeClose();
        controller.changeState();
        view.applyClosedStyles();
        menuLink.removeClass(settings.activeBtn);
        settings.afterClose();

        // save the state
        if (settings.saveState) {
          localStorage.setItem('bigSlide-savedState', 'closed');
        }
      },

      applyOpenStyles: function() {
        var screenWidth = $(window).width();
        if (settings.semiOpenStatus && screenWidth > settings.semiOpenScreenWidth) {
          this.$menu.addClass('open').removeClass('semiOpen closed');
          this.$push.addClass('open').removeClass('semiOpen closed');
        } else {
          this.$menu.addClass('open').removeClass('semiOpen closed');
          this.$push.addClass('open').removeClass('semiOpen closed');
        }
      },

      applyClosedStyles: function() {
        var screenWidth = $(window).width();
        if (settings.semiOpenStatus && screenWidth > settings.semiOpenScreenWidth) {
          this.$menu.addClass('semiOpen').removeClass('open closed');
          this.$push.addClass('semiOpen').removeClass('open closed');
        } else {
          this.$menu.addClass('closed').removeClass('open semiOpen');
          this.$push.addClass('closed').removeClass('open semiOpen');
        }
      }

    }

    controller.init();

    this.bigSlideAPI = {
      settings: settings,
      model: model,
      controller: controller,
      view: view,
      destroy: controller._destroy
    };

    return this;
  };

}));
