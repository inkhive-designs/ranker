/*!
    SlickNav Responsive Mobile Menu v1.0.2
    (c) 2015 Josh Cope
    licensed under MIT
*/
;(function ($, document, window) {
    var
    // default settings object.
        defaults = {
            label: 'MENU',
            duplicate: true,
            duration: 200,
            easingOpen: 'swing',
            easingClose: 'swing',
            closedSymbol: '&#9658;',
            openedSymbol: '&#9660;',
            prependTo: 'body',
            parentTag: 'a',
            closeOnClick: false,
            allowParentLinks: false,
            nestedParentLinks: true,
            showChildren: false,
			brand: '',
            init: function () {},
            open: function () {},
            close: function () {}
        },
        mobileMenu = 'slicknav',
        prefix = 'slicknav';

    function Plugin(element, options) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = mobileMenu;

        this.init();
    }

    Plugin.prototype.init = function () {
        var $this = this,
            menu = $(this.element),
            settings = this.settings,
            iconClass,
            menuBar;

        // clone menu if needed
        if (settings.duplicate) {
            $this.mobileNav = menu.clone();
            //remove ids from clone to prevent css issues
            $this.mobileNav.removeAttr('id');
            $this.mobileNav.find('*').each(function (i, e) {
                $(e).removeAttr('id');
            });
        } else {
            $this.mobileNav = menu;
        }

        // styling class for the button
        iconClass = prefix + '_icon';

        if (settings.label === '') {
            iconClass += ' ' + prefix + '_no-text';
        }

        if (settings.parentTag == 'a') {
            settings.parentTag = 'a href="#"';
        }

        // create menu bar
        $this.mobileNav.attr('class', prefix + '_nav');
        menuBar = $('<div class="' + prefix + '_menu"></div>');
		if (settings.brand !== '') {
			var brand = $('<div class="' + prefix + '_brand">'+settings.brand+'</div>');
			$(menuBar).append(brand);
		}
        $this.btn = $(
            ['<' + settings.parentTag + ' aria-haspopup="true" tabindex="0" class="' + prefix + '_btn ' + prefix + '_collapsed">',
                '<span class="' + prefix + '_menutxt">' + settings.label + '</span>',
                '<span class="' + iconClass + '">',
                    '<span class="' + prefix + '_icon-bar"></span>',
                    '<span class="' + prefix + '_icon-bar"></span>',
                    '<span class="' + prefix + '_icon-bar"></span>',
                '</span>',
            '</' + settings.parentTag + '>'
            ].join('')
        );
        $(menuBar).append($this.btn);
        $(settings.prependTo).prepend(menuBar);
        menuBar.append($this.mobileNav);

        // iterate over structure adding additional structure
        var items = $this.mobileNav.find('li');
        $(items).each(function () {
            var item = $(this),
                data = {};
            data.children = item.children('ul').attr('role', 'menu');
            item.data('menu', data);

            // if a list item has a nested menu
            if (data.children.length > 0) {

                // select all text before the child menu
                // check for anchors

                var a = item.contents(),
                    containsAnchor = false;
                    nodes = [];

                $(a).each(function () {
                    if (!$(this).is('ul')) {
                        nodes.push(this);
                    } else {
                        return false;
                    }

                    if($(this).is("a")) {
                        containsAnchor = true;
                    }
                });

                var wrapElement = $(
                    '<' + settings.parentTag + ' role="menuitem" aria-haspopup="true" tabindex="-1" class="' + prefix + '_item"/>'
                );

                // wrap item text with tag and add classes unless we are separating parent links
                if ((!settings.allowParentLinks || settings.nestedParentLinks) || !containsAnchor) {
                    var $wrap = $(nodes).wrapAll(wrapElement).parent();
                    $wrap.addClass(prefix+'_row');
                } else
                    $(nodes).wrapAll('<span class="'+prefix+'_parent-link '+prefix+'_row"/>').parent();

                item.addClass(prefix+'_collapsed');
                item.addClass(prefix+'_parent');

                // create parent arrow. wrap with link if parent links and separating
                var arrowElement = $('<span class="'+prefix+'_arrow">'+settings.closedSymbol+'</span>');

                if (settings.allowParentLinks && !settings.nestedParentLinks && containsAnchor)
                    arrowElement = arrowElement.wrap(wrapElement).parent();

                //append arrow
                $(nodes).last().after(arrowElement);


            } else if ( item.children().length === 0) {
                 item.addClass(prefix+'_txtnode');
            }

            // accessibility for links
            item.children('a').attr('role', 'menuitem').click(function(event){
                //Ensure that it's not a parent
                if (settings.closeOnClick && !$(event.target).parent().closest('li').hasClass(prefix+'_parent')) {
                        //Emulate menu close if set
                        $($this.btn).click();
                    }
            });

            //also close on click if parent links are set
            if (settings.closeOnClick && settings.allowParentLinks) {
                item.children('a').children('a').click(function (event) {
                    //Emulate menu close
                    $($this.btn).click();
                });

                item.find('.'+prefix+'_parent-link a:not(.'+prefix+'_item)').click(function(event){
                    //Emulate menu close
                        $($this.btn).click();
                });
            }
        });

        // structure is in place, now hide appropriate items
        $(items).each(function () {
            var data = $(this).data('menu');
            if (!settings.showChildren){
                $this._visibilityToggle(data.children, null, false, null, true);
            }
        });

        // finally toggle entire menu
        $this._visibilityToggle($this.mobileNav, null, false, 'init', true);

        // accessibility for menu button
        $this.mobileNav.attr('role','menu');

        // outline prevention when using mouse
        $(document).mousedown(function(){
            $this._outlines(false);
        });

        $(document).keyup(function(){
            $this._outlines(true);
        });

        // menu button click
        $($this.btn).click(function (e) {
            e.preventDefault();
            $this._menuToggle();
        });

        // click on menu parent
        $this.mobileNav.on('click', '.' + prefix + '_item', function (e) {
            e.preventDefault();
            $this._itemClick($(this));
        });

        // check for enter key on menu button and menu parents
        $($this.btn).keydown(function (e) {
            var ev = e || event;
            if(ev.keyCode == 13) {
                e.preventDefault();
                $this._menuToggle();
            }
        });

        $this.mobileNav.on('keydown', '.'+prefix+'_item', function(e) {
            var ev = e || event;
            if(ev.keyCode == 13) {
                e.preventDefault();
                $this._itemClick($(e.target));
            }
        });

        // allow links clickable within parent tags if set
        if (settings.allowParentLinks && settings.nestedParentLinks) {
            $('.'+prefix+'_item a').click(function(e){
                    e.stopImmediatePropagation();
            });
        }
    };

    //toggle menu
    Plugin.prototype._menuToggle = function (el) {
        var $this = this;
        var btn = $this.btn;
        var mobileNav = $this.mobileNav;

        if (btn.hasClass(prefix+'_collapsed')) {
            btn.removeClass(prefix+'_collapsed');
            btn.addClass(prefix+'_open');
        } else {
            btn.removeClass(prefix+'_open');
            btn.addClass(prefix+'_collapsed');
        }
        btn.addClass(prefix+'_animating');
        $this._visibilityToggle(mobileNav, btn.parent(), true, btn);
    };

    // toggle clicked items
    Plugin.prototype._itemClick = function (el) {
        var $this = this;
        var settings = $this.settings;
        var data = el.data('menu');
        if (!data) {
            data = {};
            data.arrow = el.children('.'+prefix+'_arrow');
            data.ul = el.next('ul');
            data.parent = el.parent();
            //Separated parent link structure
            if (data.parent.hasClass(prefix+'_parent-link')) {
                data.parent = el.parent().parent();
                data.ul = el.parent().next('ul');
            }
            el.data('menu', data);
        }
        if (data.parent.hasClass(prefix+'_collapsed')) {
            data.arrow.html(settings.openedSymbol);
            data.parent.removeClass(prefix+'_collapsed');
            data.parent.addClass(prefix+'_open');
            data.parent.addClass(prefix+'_animating');
            $this._visibilityToggle(data.ul, data.parent, true, el);
        } else {
            data.arrow.html(settings.closedSymbol);
            data.parent.addClass(prefix+'_collapsed');
            data.parent.removeClass(prefix+'_open');
            data.parent.addClass(prefix+'_animating');
            $this._visibilityToggle(data.ul, data.parent, true, el);
        }
    };

    // toggle actual visibility and accessibility tags
    Plugin.prototype._visibilityToggle = function(el, parent, animate, trigger, init) {
        var $this = this;
        var settings = $this.settings;
        var items = $this._getActionItems(el);
        var duration = 0;
        if (animate) {
            duration = settings.duration;
        }

        if (el.hasClass(prefix+'_hidden')) {
            el.removeClass(prefix+'_hidden');
            el.slideDown(duration, settings.easingOpen, function(){

                $(trigger).removeClass(prefix+'_animating');
                $(parent).removeClass(prefix+'_animating');

                //Fire open callback
                if (!init) {
                    settings.open(trigger);
                }
            });
            el.attr('aria-hidden','false');
            items.attr('tabindex', '0');
            $this._setVisAttr(el, false);
        } else {
            el.addClass(prefix+'_hidden');
            el.slideUp(duration, this.settings.easingClose, function() {
                el.attr('aria-hidden','true');
                items.attr('tabindex', '-1');
                $this._setVisAttr(el, true);
                el.hide(); //jQuery 1.7 bug fix

                $(trigger).removeClass(prefix+'_animating');
                $(parent).removeClass(prefix+'_animating');

                //Fire init or close callback
                if (!init){
                    settings.close(trigger);
                }
                else if (trigger == 'init'){
                    settings.init();
                }
            });
        }
    };

    // set attributes of element and children based on visibility
    Plugin.prototype._setVisAttr = function(el, hidden) {
        var $this = this;

        // select all parents that aren't hidden
        var nonHidden = el.children('li').children('ul').not('.'+prefix+'_hidden');

        // iterate over all items setting appropriate tags
        if (!hidden) {
            nonHidden.each(function(){
                var ul = $(this);
                ul.attr('aria-hidden','false');
                var items = $this._getActionItems(ul);
                items.attr('tabindex', '0');
                $this._setVisAttr(ul, hidden);
            });
        } else {
            nonHidden.each(function(){
                var ul = $(this);
                ul.attr('aria-hidden','true');
                var items = $this._getActionItems(ul);
                items.attr('tabindex', '-1');
                $this._setVisAttr(ul, hidden);
            });
        }
    };

    // get all 1st level items that are clickable
    Plugin.prototype._getActionItems = function(el) {
        var data = el.data("menu");
        if (!data) {
            data = {};
            var items = el.children('li');
            var anchors = items.find('a');
            data.links = anchors.add(items.find('.'+prefix+'_item'));
            el.data('menu', data);
        }
        return data.links;
    };

    Plugin.prototype._outlines = function(state) {
        if (!state) {
            $('.'+prefix+'_item, .'+prefix+'_btn').css('outline','none');
        } else {
            $('.'+prefix+'_item, .'+prefix+'_btn').css('outline','');
        }
    };

    Plugin.prototype.toggle = function(){
        var $this = this;
        $this._menuToggle();
    };

    Plugin.prototype.open = function(){
        var $this = this;
        if ($this.btn.hasClass(prefix+'_collapsed')) {
            $this._menuToggle();
        }
    };

    Plugin.prototype.close = function(){
        var $this = this;
        if ($this.btn.hasClass(prefix+'_open')) {
            $this._menuToggle();
        }
    };

    $.fn[mobileMenu] = function ( options ) {
        var args = arguments;

        // Is the first parameter an object (options), or was omitted, instantiate a new instance
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {

                // Only allow the plugin to be instantiated once due to methods
                if (!$.data(this, 'plugin_' + mobileMenu)) {

                    // if it has no instance, create a new one, pass options to our plugin constructor,
                    // and store the plugin instance in the elements jQuery data object.
                    $.data(this, 'plugin_' + mobileMenu, new Plugin( this, options ));
                }
            });

        // If is a string and doesn't start with an underscore or 'init' function, treat this as a call to a public method.
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

            // Cache the method call to make it possible to return a value
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + mobileMenu);

                // Tests that there's already a plugin-instance and checks that the requested public method exists
                if (instance instanceof Plugin && typeof instance[options] === 'function') {

                    // Call the method of our plugin instance, and pass it the supplied arguments.
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }
            });

            // If the earlier cached method gives a value back return the value, otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
    };
}(jQuery, document, window));

/*
 * https://github.com/mattkersley/Responsive-Menu
 */
 
 (function($){
	
	//plugin's default options
	var settings = {
		combine: true,					//combine multiple menus into a single select
		groupPageText: 'Main',			//optgroup's aren't selectable, make an option for it
		nested: true,					//create optgroups by default
		prependTo: 'body',				//insert at top of page by default
		switchWidth: 480,				//width at which to switch to select, and back again
		topOptionText: 'Select a page'	//default "unselected" state
	},
	
	//used to store original matched menus
	$menus,
	
	//used as a unique index for each menu if no ID exists
	menuCount = 0,
	
	//used to store unique list items for combining lists
	uniqueLinks = [];


	//go to page
	function goTo(url){
		document.location.href = url;
	}
	
	//does menu exist?
	function menuExists(){
		return ($('.mnav').length) ? true : false;
	}

	//validate selector's matched list(s)
	function isList($this){
		var pass = true;
		$this.each(function(){
			if(!$(this).is('ul') && !$(this).is('ol')){
				pass=false;
			}
		});
		return pass;
	}//isList()


	//function to decide if mobile or not
	function isMobile(){
		return ($(window).width() < settings.switchWidth);
	}
	
	
	//function to get text value of element, but not it's children
	function getText($item){
		return $.trim($item.clone().children('ul, ol').remove().end().text());
	}
	
	//function to check if URL is unique
	function isUrlUnique(url){
		return ($.inArray(url, uniqueLinks) === -1) ? true : false;
	}
	
	
	//function to do duplicate checking for combined list
	function checkForDuplicates($menu){
		
		$menu.find(' > li').each(function(){
		
			var $li = $(this),
				link = $li.find('a').attr('href'),
				parentLink = function(){
					if($li.parent().parent().is('li')){
						return $li.parent().parent().find('a').attr('href');
					} else {
						return null;
					}
				};
						
			//check nested <li>s before checking current one
			if($li.find(' ul, ol').length){
				checkForDuplicates($li.find('> ul, > ol'));
			}
		
			//remove empty UL's if any are left by LI removals
			if(!$li.find(' > ul li, > ol li').length){
				$li.find('ul, ol').remove();
			}
		
			//if parent <li> has a link, and it's not unique, append current <li> to the "unique parent" detected earlier
			if(!isUrlUnique(parentLink(), uniqueLinks) && isUrlUnique(link, uniqueLinks)){
				$li.appendTo(
					$menu.closest('ul#mmnav').find('li:has(a[href="'+parentLink()+'"]):first ul')
				);
			}
			
			//otherwise, check if the current <li> is unique, if it is, add it to the unique list
			else if(isUrlUnique(link)){
				uniqueLinks.push(link);
			}
			
			//if it isn't, remove it. Simples.
			else{
				$li.remove();
			}
		
		});
	}
	
	
	//function to combine lists into one
	function combineLists(){
		
		//create a new list
		var $menu = $('<ul id="mmnav" />');
		
		//loop through each menu and extract the list's child items
		//then append them to the new list
		$menus.each(function(){
			$(this).children().clone().appendTo($menu);
		});
		
		//de-duplicate any repeated items
		checkForDuplicates($menu);
				
		//return new combined list
		return $menu;
		
	}//combineLists()
	
	
	
	//function to create options in the select menu
	function createOption($item, $container, text){
		
		//if no text param is passed, use list item's text, otherwise use settings.groupPageText
		if(!text){
			$('<option value="'+$item.find('a:first').attr('href')+'">'+$.trim(getText($item))+'</option>').appendTo($container);
		} else {
			$('<option value="'+$item.find('a:first').attr('href')+'">'+text+'</option>').appendTo($container);
		}
	
	}//createOption()
	
	
	
	//function to create option groups
	function createOptionGroup($group, $container){
		
		//create <optgroup> for sub-nav items
		var $optgroup = $('<optgroup label="'+$.trim(getText($group))+'" />');
		
		//append top option to it (current list item's text)
		createOption($group,$optgroup, settings.groupPageText);
	
		//loop through each sub-nav list
		$group.children('ul, ol').each(function(){
		
			//loop through each list item and create an <option> for it
			$(this).children('li').each(function(){
				createOption($(this), $optgroup);
			});
		});
		
		//append to select element
		$optgroup.appendTo($container);
		
	}//createOptionGroup()

	
	
	//function to create <select> menu
	function createSelect($menu){
	
		//create <select> to insert into the page
		var $select = $('<select id="mm'+menuCount+'" class="mnav" />');
		menuCount++;
		
		//create default option if the text is set (set to null for no option)
		if(settings.topOptionText){
			createOption($('<li>'+settings.topOptionText+'</li>'), $select);
		}
		
		//loop through first list items
		$menu.children('li').each(function(){
		
			var $li = $(this);

			//if nested select is wanted, and has sub-nav, add optgroup element with child options
			if($li.children('ul, ol').length && settings.nested){
				createOptionGroup($li, $select);
			}
			
			//otherwise it's a single level select menu, so build option
			else {
				createOption($li, $select);			
			}
						
		});
		
		//add change event and prepend menu to set element
		$select
			.change(function(){goTo($(this).val());})
			.prependTo(settings.prependTo);
	
	}//createSelect()

	
	//function to run plugin functionality
	function runPlugin(){
	
		//menu doesn't exist
		if(isMobile() && !menuExists()){
			
			//if user wants to combine menus, create a single <select>
			if(settings.combine){
				var $menu = combineLists();
				createSelect($menu);
			}
			
			//otherwise, create a select for each matched list
			else{
				$menus.each(function(){
					createSelect($(this));
				});
			}
		}
		
		//menu exists, and browser is mobile width
		if(isMobile() && menuExists()){
			$('.mnav').show();
			$menus.hide();
		}
			
		//otherwise, hide the mobile menu
		if(!isMobile() && menuExists()){
			$('.mnav').hide();
			$menus.show();
		}
		
	}//runPlugin()

	
	
	//plugin definition
	$.fn.mobileMenu = function(options){

		//override the default settings if user provides some
		if(options){$.extend(settings, options);}
		
		//check if user has run the plugin against list element(s)
		if(isList($(this))){
			$menus = $(this);
			runPlugin();
			$(window).resize(function(){runPlugin();});
		} else {
			alert('mobileMenu only works with <ul>/<ol>');
		}
				
	};//mobileMenu()
	
})(jQuery);

jQuery(document).ready( function() {
    jQuery('#top-menu ul.menu').mobileMenu({
        switchWidth: 768
    });
    jQuery('#top-menu div.menu ul').mobileMenu({
        switchWidth: 768
    });
});

/*! bigSlide - v0.12.0 - 2016-08-01
* http://ascott1.github.io/bigSlide.js/
* Copyright (c) 2016 Adam D. Scott; Licensed MIT */
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

        // CSS for how the menu will be positioned off screen
        var positionOffScreen = {
          'position': 'fixed',
          'top': '0',
          'bottom': '0',
          'height': '100%'
        };

        // css for the sliding animation
        var animateSlide = {
          '-webkit-transition': settings.side + ' ' + settings.speed + 'ms ease',
          '-moz-transition': settings.side + ' ' + settings.speed + 'ms ease',
          '-ms-transition': settings.side + ' ' + settings.speed + 'ms ease',
          '-o-transition': settings.side + ' ' + settings.speed + 'ms ease',
          'transition': settings.side + ' ' + settings.speed + 'ms ease'
        };

        // css for the shrink animation
        var animateShrink = {
          '-webkit-transition': 'all ' + settings.speed + 'ms ease',
          '-moz-transition': 'all ' + settings.speed + 'ms ease',
          '-ms-transition': 'all ' + settings.speed + 'ms ease',
          '-o-transition': 'all ' + settings.speed + 'ms ease',
          'transition': 'all ' + settings.speed + 'ms ease'
        };

        // we want to add the css sliding animation when the page is loaded (on the first menu link click)
        var animationApplied = false;

        // manually add the settings values
        positionOffScreen[settings.side] = '-' + settings.menuWidth;
        positionOffScreen.width = settings.menuWidth;

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
        this.$menu.css(positionOffScreen);

        var initialScreenWidth = $(window).width();
        if (initialState === 'closed') {
          if (settings.semiOpenStatus && initialScreenWidth > settings.semiOpenScreenWidth) {
            this.$hiddenThin.hide();
            this.$menu.css(settings.side, '0');
            this.$menu.css('width', this.semiOpenMenuWidth);
            this.$push.css(settings.side, this.semiOpenMenuWidth);
            this.$shrink.css({
              'width': 'calc(100% - ' + this.semiOpenMenuWidth + ')'
            });
            this.$menu.addClass('semiOpen');
          } else {
            this.$push.css(settings.side, '0');
          }
        } else if (initialState === 'open') {
          this.$menu.css(settings.side, '0');
          this.$push.css(settings.side, this.width);
          this.$shrink.css({
            'width': 'calc(100% - ' + this.width + ')'
          });
          menuLink.addClass(settings.activeBtn);
        }

        var that = this;

        // register a click listener for desktop & touchstart for mobile
        menuLink.on('click.bigSlide touchstart.bigSlide', function(e) {
          // add the animation css if not present
          if (!animationApplied) {
            that.$menu.css(animateSlide);
            that.$push.css(animateSlide);
            that.$shrink.css(animateShrink);
            animationApplied = true;
          }

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
                        that.$hiddenThin.hide();
                        that.$menu.css({ width: that.semiOpenMenuWidth});
                        that.$menu.css(settings.side, '0');
                        that.$push.css(settings.side, that.semiOpenMenuWidth);
                        that.$shrink.css({
                          'width': 'calc(100% - ' + that.semiOpenMenuWidth + ')'
                        });
                        that.$menu.addClass('semiOpen');
                    }
                } else {
                    that.$menu.removeClass('semiOpen');
                    if (controller.getState() === 'closed') {
                        that.$menu.css(settings.side, '-' + that.width).css({width: that.width});
                        that.$push.css(settings.side, '0');
                        that.$shrink.css('width', '100%');
                        that.$hiddenThin.show();
                    }
                }
            });
        }

        // this makes my eyes bleed, but adding it back in as it's a highly requested feature
        if (settings.easyClose) {
          $(document).on('click.bigSlide', function(e) {
           if (!$(e.target).parents().addBack().is(menuLink) && !$(e.target).closest(settings.menu).length && controller.getState() === 'open')  {
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
          this.$hiddenThin.show();
          this.$menu.animate({ width: this.width}, {duration: Math.abs(settings.speed - 100), easing: 'linear'});
          this.$push.css(settings.side, this.width);
          this.$shrink.css({
            'width': 'calc(100% - ' + this.width + ')'
          });
          this.$menu.removeClass('semiOpen');
        } else {
          this.$menu.css(settings.side, '0');
          this.$push.css(settings.side, this.width);
          this.$shrink.css({
            'width': 'calc(100% - ' + this.width + ')'
          });
        }
      },

      applyClosedStyles: function() {
        var screenWidth = $(window).width();
        if (settings.semiOpenStatus && screenWidth > settings.semiOpenScreenWidth) {
          this.$hiddenThin.hide();
          this.$menu.animate({ width: this.semiOpenMenuWidth}, {duration: Math.abs(settings.speed - 100), easing: 'linear'});
          this.$push.css(settings.side, this.semiOpenMenuWidth);
          this.$shrink.css({
            'width': 'calc(100% - ' + this.semiOpenMenuWidth + ')'
          });
          this.$menu.addClass('semiOpen');
        } else {
          this.$menu.css(settings.side, '-' + this.width);
          this.$push.css(settings.side, '0');
          this.$shrink.css('width', '100%');
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


