EPUBJS.reader = {};
EPUBJS.reader.plugins = {}; //-- Attach extra Controllers as plugins (like search?)
EPUBJS.oDStyles = {};
(function(root, $) {

	var previousReader = root.ePubReader || {};

	var ePubReader = root.ePubReader = function(path, options) {
		return new EPUBJS.Reader(path, options);
	};

	//exports to multiple environments
	if (typeof define === 'function' && define.amd) {
		//AMD
		define(function(){ return Reader; });
	} else if (typeof module != "undefined" && module.exports) {
		//Node
		module.exports = ePubReader;
	}

})(window, jQuery);

localforage.getItem('oDeStyles')
	.then(function (result) {
		var elStyle;
		elStyle = document.createElement('style');	
		if (result === null) {
			EPUBJS.oDStyles = {
				'fontFamily' : 'Lora, serif',
				'lineHeight' : '1.6',
				'fontSize' : '100%',
				'color' : 'black',
				'backgroundColor' : 'white',
				'backgroundImage' : 'none'
			};
			elStyle.innerHTML += 'body, #main, h1,h2,h3,h4,h5,h6 {background-image: '+ EPUBJS.oDStyles.backgroundImage +'; background-color: '+ EPUBJS.oDStyles.backgroundColor +'; color: ' + EPUBJS.oDStyles.color + ';} .arrow {opacity: .4; color: '+ EPUBJS.oDStyles.color +';}';		
			localforage.setItem('oDeStyles', EPUBJS.oDStyles )
			.then(function (result) {
						if (result === null) {
							console.log('Can\' store styles.');
						} else {
							console.log('Stored default styles.');
						}
					});
		} else {
							
			EPUBJS.oDStyles = result;
			elStyle = document.createElement('style');	

			elStyle.innerHTML += 'body, #main, h1,h2,h3,h4,h5,h6 {background-image: '+ result.backgroundImage +'; background-color: '+ result.backgroundColor +'; color: ' + result.color + ';} .arrow {opacity: .4; color: '+ result.color +';}';
			
		}
		document.head.appendChild(elStyle);
	});

EPUBJS.Reader = function(bookPath, _options) {
	var reader = this;
	var book;
	var plugin;
	var $viewer = $("#viewer");
	var search = window.location.search;
	var parameters;
	var oDefaultStyles = EPUBJS.oDStyles;
	

	


	

	this.settings = EPUBJS.core.defaults(_options || {}, {
		bookPath : bookPath,
		restore : true,
		reload : true,
		bookmarks : undefined,
		annotations : undefined,
		contained : undefined,
		bookKey : undefined,
		styles : oDefaultStyles,
		sidebarReflow: false,
		generatePagination: false,
		history: true
	});

	// Overide options with search parameters
	if(search) {
		parameters = search.slice(1).split("&");
		parameters.forEach(function(p){
			var split = p.split("=");
			var name = split[0];
			var value = split[1] || '';
			reader.settings[name] = decodeURIComponent(value);
		});
	}

	this.setBookKey(this.settings.bookPath); //-- This could be username + path or any unique string

	if(this.settings.restore && this.isSaved()) {
		this.applySavedSettings();
	}

	this.settings.styles = this.settings.styles || {
		fontSize : "100%"
	};

	this.book = book = new EPUBJS.Book(this.settings);

	if(this.settings.previousLocationCfi) {
		book.gotoCfi(this.settings.previousLocationCfi);
	}

	this.offline = false;
	this.sidebarOpen = false;
	if(!this.settings.bookmarks) {
		this.settings.bookmarks = [];
	}

	if(!this.settings.annotations) {
		this.settings.annotations = [];
	}

	if(this.settings.generatePagination) {
		book.generatePagination($viewer.width(), $viewer.height()).then( function() {
			// console.log(book.pagination.totalPages);
		}
		);
		
	}

	book.renderTo("viewer");

	reader.ReaderController = EPUBJS.reader.ReaderController.call(reader, book);
	reader.SettingsController = EPUBJS.reader.SettingsController.call(reader, book);
	reader.ControlsController = EPUBJS.reader.ControlsController.call(reader, book);
	reader.SidebarController = EPUBJS.reader.SidebarController.call(reader, book);
	reader.BookmarksController = EPUBJS.reader.BookmarksController.call(reader, book);
	reader.NotesController = EPUBJS.reader.NotesController.call(reader, book);

	// Call Plugins
	for(plugin in EPUBJS.reader.plugins) {
		if(EPUBJS.reader.plugins.hasOwnProperty(plugin)) {
			reader[plugin] = EPUBJS.reader.plugins[plugin].call(reader, book);
		}
	}

	book.ready.all.then(function() {
		reader.ReaderController.hideLoader();

		setInterval(function(){
			var has_focus = true;
			$(window).blur(function() {			   
			    has_focus = false;
			});

			if ( has_focus == false ) {
				return;
			}			

			var mOfRead = getCookie('mOfRead');
			mOfRead++;
			setCookie('mOfRead', mOfRead, 7);
			if ( mOfRead % 10 == 0 ) {
				var admAjx = '//' + window.location.host + '/wp-admin/admin-ajax.php';
				var nonce_s = jQuery( 'body' ).attr('data_nonce');
				if ( typeof nonce_s !== 'undefined' && nonce_s.length > 3 ) {
					jQuery.ajax({
					   type : "post",
					   dataType : "json",
					   timeout: 0,
					   url : admAjx,
					   data : {action: "svv_add_points", ptz : mOfRead, nonce_s : nonce_s },
					   success: function(response) {
					      if(response.type == "success") {
					      	mOfRead = 0;
					      	
					      	setCookie('mOfRead', mOfRead, 7);
					      }
					       else {
					       	fDisplayMsg('<p>KhĂ´ng káº¿t ná»‘i Ä‘Æ°á»£c vá»›i mĂ¡y chá»§. <span id="closeIVt">OK!</span></p>', '1000');
					      }
					        }
					   });
				}
				if ( mOfRead > 630 ) {
					mOfRead = 0;
					setCookie('mOfRead', mOfRead, 7);
					jQuery.ajax({
					   type : "post",
					   dataType : "json",
					   timeout: 0,
					   url : admAjx,
					   data : {action: "svv_guess_ivt", ptz : mOfRead },
					   success: function(response) {
					      if(response.type == "success") {

					      	fDisplayMsg('<p>Báº¡n Ä‘Æ°á»£c má»i Ä‘á»c toĂ n bá»™ sĂ¡ch táº¡i <span class="logo_s">eBookVie</span>. <a id="ivtLink" href="' +response.ivtLink + '">Báº¥m vĂ o Ä‘Ă¢y Ä‘á»ƒ tĂ¬m hiá»ƒu vĂ  tham gia!</a> <span id="closeIVt">OK!</span></p>');
					      }
					       else {
					         // Error
					      }
					        }
					   });
				}
					
			}
			
				
			
			

		}, 60000);
	});

	book.getMetadata().then(function(meta) {
		reader.MetaController = EPUBJS.reader.MetaController.call(reader, meta);
	});

	book.getToc().then(function(toc) {
		reader.TocController = EPUBJS.reader.TocController.call(reader, toc);
	});

	window.addEventListener("beforeunload", this.unload.bind(this), false);

	window.addEventListener("hashchange", this.hashChanged.bind(this), false);

	document.addEventListener('keydown', this.adjustFontSize.bind(this), false);

	document.getElementById('bigS').addEventListener('click', function(e){ e.preventDefault(); if (typeof window.classFS == 'undefined') { window.classFS = Date.now(); } else if( Date.now() - window.classFS < 200) {return;} else {window.classFS = Date.now(); } fontSizeBtns('+', book); var sCurrentLocation = book.getCurrentLocationCfi(); setTimeout(function () { book.renderer.reformat();}, 100); setTimeout(function() { book.gotoCfi(sCurrentLocation); }, 200) });
	document.getElementById('smalS').addEventListener('click', function(e){ e.preventDefault(); if (typeof window.classFS == 'undefined') { window.classFS = Date.now(); } else if( Date.now() - window.classFS < 200) {return;} else {window.classFS = Date.now(); } fontSizeBtns('-', book); var sCurrentLocation = book.getCurrentLocationCfi(); setTimeout(function () { book.renderer.reformat();}, 100); setTimeout(function() { book.gotoCfi(sCurrentLocation); }, 200) });
	document.getElementById('oriS').addEventListener('click', function(e){ e.preventDefault(); if (typeof window.classFS == 'undefined') { window.classFS = Date.now(); } else if( Date.now() - window.classFS < 200) {return;} else {window.classFS = Date.now(); } fontSizeBtns('0', book); var sCurrentLocation = book.getCurrentLocationCfi(); setTimeout(function () { book.renderer.reformat();}, 100); setTimeout(function() { book.gotoCfi(sCurrentLocation); }, 200) });

	document.getElementById('iLh').addEventListener('click', function(e){ e.preventDefault(); if (typeof window.classFS == 'undefined') { window.classFS = Date.now(); } else if( Date.now() - window.classFS < 200) {return;} else {window.classFS = Date.now(); } lineHeightBtns('+', book); var sCurrentLocation = book.getCurrentLocationCfi(); setTimeout(function () { book.renderer.reformat();}, 100); setTimeout(function() { book.gotoCfi(sCurrentLocation); }, 200) });
	document.getElementById('dLh').addEventListener('click', function(e){ e.preventDefault(); if (typeof window.classFS == 'undefined') { window.classFS = Date.now(); } else if( Date.now() - window.classFS < 200) {return;} else {window.classFS = Date.now(); } lineHeightBtns('-', book); var sCurrentLocation = book.getCurrentLocationCfi(); setTimeout(function () { book.renderer.reformat();}, 100); setTimeout(function() { book.gotoCfi(sCurrentLocation); }, 200) });
	document.getElementById('oriLh').addEventListener('click', function(e){ e.preventDefault(); if (typeof window.classFS == 'undefined') { window.classFS = Date.now(); } else if( Date.now() - window.classFS < 200) {return;} else {window.classFS = Date.now(); } lineHeightBtns('0', book); var sCurrentLocation = book.getCurrentLocationCfi(); setTimeout(function () { book.renderer.reformat();}, 100); setTimeout(function() { book.gotoCfi(sCurrentLocation); }, 200) });

	var oBgBtns = document.querySelectorAll("span.bg-btns");
	oBgBtns.forEach(function(oBtn) {
		oBtn.addEventListener('click', function() {
			var css,
				btnStyles = {};
				sCurrentLocation = book.getCurrentLocationCfi(); 

				if (typeof window.classFS == 'undefined') { window.classFS = Date.now(); } else if( Date.now() - window.classFS < 200) {return;} else {window.classFS = Date.now(); }


				btnStyles.color = window.getComputedStyle(oBtn).getPropertyValue('color');
				btnStyles.backgroundColor = window.getComputedStyle(oBtn).getPropertyValue('background-color');
				btnStyles.backgroundImage = window.getComputedStyle(oBtn).getPropertyValue('background-image');

				book.setStyle('color', btnStyles.color);
				book.setStyle('backgroundColor', btnStyles.backgroundColor);
				book.setStyle('backgroundImage', btnStyles.backgroundImage);

				
				
				
				css = document.getElementsByTagName('style')[0].innerHTML = 'body, #main, h1,h2,h3,h4,h5,h6 {background-image: '+ btnStyles.backgroundImage +'; background-color: '+ btnStyles.backgroundColor +'; color: ' + btnStyles.color + ';} .arrow { opacity: .4;  color: '+ btnStyles.color +';}';
				
				css = book.settings.styles;
				css.color = btnStyles.color;
				css.backgroundImage = btnStyles.backgroundImage;
				css.backgroundColor = btnStyles.backgroundColor;

				
				localforage.setItem('oDeStyles', css )
				.then(function (result) {
							if (result === null) {
								console.log('Can\' store background settings.');
							} else {
								console.log('New background settings applied.');
							}
						});

				setTimeout(function () { book.renderer.reformat();}, 100);
				setTimeout(function() { book.gotoCfi(sCurrentLocation); }, 200);
		});
			
	});

	book.on("renderer:keydown", this.adjustFontSize.bind(this));
	book.on("renderer:keydown", reader.ReaderController.arrowKeys.bind(this));

	book.on("renderer:selected", this.selectedRange.bind(this));

	book.on("book:ready", function() {
		jQuery('#copywrite').removeClass('dialog-box').addClass('hide');
		jQuery('#buynow').removeClass('hide');
	});

		
	// When the book is store
	book.on("book:stored", function() {
		fDisplayMsg('<p>SĂ¡ch Ä‘Ă£ Ä‘Æ°á»£c lÆ°u vá» vĂ  báº¡n cĂ³ thá»ƒ Ä‘á»c offline. HĂ£y bookmark Ä‘á»‹a chá»‰ láº¡i hoáº·c thĂªm vĂ o mĂ n hĂ¬nh chĂ­nh Ä‘á»ƒ Ä‘á»c khi khĂ´ng cĂ³ máº¡ng nhĂ©! <a href="//ebookvie.com/huong-dan-doc-sach#doc-offline">Xem hÆ°á»›ng dáº«n táº¡i Ä‘Ă¢y!</a>. <span id="closeIVt" class="msg-btns">OK!</span></p>', '180000');
	});

	return this;
};
function fDisplayMsg(oMsg, iTimeOut) {
	jQuery('#ivtID').html(oMsg);
  	jQuery('#ivtID').removeClass('hide');
  	jQuery('#closeIVt').click(function(){jQuery('#ivtID').addClass('hide');});

  	if (!iTimeOut) {
  		return;
  	} else {
  		setTimeout(function(){jQuery('#ivtID').addClass('hide');}, iTimeOut);
  	}
}
function lineHeightBtns(sBtn, oBook) {
	var lineHeight;
	var interval = 20;
	var oOStyles = oBook.settings.styles;

	// localforage.getItem('ReaderStyles', function (err, value) {
 //    if ( err === null ) {
    	lineHeight = parseFloat(oBook.settings.styles.lineHeight);
   //  } else {
   //  	fontSize = parseInt(value[fontSize].slice(0,-1));
   //  }
  	// });



  
	

	if (sBtn == '+') {
		oBook.setStyle("lineHeight", (lineHeight + (interval/100)));
		oOStyles.lineHeight = (lineHeight + (interval/100));
		localforage.setItem('oDeStyles', oOStyles )
		.then(function (result) {
					if (result === null) {
						console.log('Can\' increased line height.');
					} else {
						console.log('Increased line height.');
					}
				});		
	}

	if(sBtn == '-'){
		oBook.setStyle("lineHeight", (lineHeight - (interval/100)));
		oOStyles.lineHeight = (lineHeight - (interval/100));
		localforage.setItem('oDeStyles', oOStyles )
		.then(function (result) {
					if (result === null) {
						console.log('Can\' decreased line height.');
					} else {
						console.log('Decreased line height.');
					}
				});	
	}

	if(sBtn == '0'){
		oBook.setStyle("lineHeight", "1.6");
		oOStyles.lineHeight = '1.6';
		localforage.setItem('oDeStyles', oOStyles )
		.then(function (result) {
					if (result === null) {
						console.log('Can\' set base line height.');
					} else {
						console.log('Base line height.');
					}
				});	
	}
}


function fontSizeBtns(sBtn, oBook) {
	var fontSize;
	var interval = 10;
	var oOStyles = oBook.settings.styles;

	// localforage.getItem('ReaderStyles', function (err, value) {
 //    if ( err === null ) {
    	fontSize = parseInt(oBook.settings.styles.fontSize.slice(0, -1));
   //  } else {
   //  	fontSize = parseInt(value[fontSize].slice(0,-1));
   //  }
  	// });
	
	

	if (sBtn == '+') {
		oBook.setStyle("fontSize", (fontSize + interval) + "%");
		oOStyles.fontSize = (fontSize + interval) + "%";
		localforage.setItem('oDeStyles', oOStyles )
		.then(function (result) {
					if (result === null) {
						console.log('Can\' Increase font size.');
					} else {
						console.log('Increased font size.');						
					}
				});	
	}

	if(sBtn == '-'){
		oBook.setStyle("fontSize", (fontSize - interval) + "%");
		oOStyles.fontSize = (fontSize - interval) + "%";
		localforage.setItem('oDeStyles', oOStyles )
		.then(function (result) {
					if (result === null) {
						console.log('Can\' Decrease font size.');
					} else {
						console.log('Decreased font size.');
					}
				});	
	}

	if(sBtn == '0'){
		oBook.setStyle("fontSize", "100%");
		oOStyles.fontSize = "100%";
		localforage.setItem('oDeStyles', oOStyles )
		.then(function (result) {
					if (result === null) {
						console.log('Can\' store base font size.');
					} else {
						console.log('Base font size.');
					}
				});	
	}
}

function setCookie(cname, cvalue, exdays) {
		    var d = new Date();
		    d.setTime(d.getTime() + (exdays*24*60*60*1000));
		    var expires = "expires="+ d.toUTCString();
		    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		}
		
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

EPUBJS.Reader.prototype.adjustFontSize = function(e) {
	var fontSize;
	var interval = 2;
	var PLUS = 187;
	var MINUS = 189;
	var ZERO = 48;
	var MOD = (e.ctrlKey || e.metaKey );


	if(!this.settings.styles) return;

	if(!this.settings.styles.fontSize) {
		this.settings.styles.fontSize = "100%";
	}

	fontSize = parseInt(this.settings.styles.fontSize.slice(0, -1));

	if(MOD && e.keyCode == PLUS) {
		e.preventDefault();
		this.book.setStyle("fontSize", (fontSize + interval) + "%");

	}

	if(MOD && e.keyCode == MINUS){

		e.preventDefault();
		this.book.setStyle("fontSize", (fontSize - interval) + "%");
	}

	if(MOD && e.keyCode == ZERO){
		e.preventDefault();
		this.book.setStyle("fontSize", "100%");
	}
};

EPUBJS.Reader.prototype.addBookmark = function(cfi) {
	var present = this.isBookmarked(cfi);
	if(present > -1 ) return;

	this.settings.bookmarks.push(cfi);

	this.trigger("reader:bookmarked", cfi);
};

EPUBJS.Reader.prototype.removeBookmark = function(cfi) {
	var bookmark = this.isBookmarked(cfi);
	if( bookmark === -1 ) return;

	this.settings.bookmarks.splice(bookmark, 1);

	this.trigger("reader:unbookmarked", bookmark);
};

EPUBJS.Reader.prototype.isBookmarked = function(cfi) {
	var bookmarks = this.settings.bookmarks;

	return bookmarks.indexOf(cfi);
};

/*
EPUBJS.Reader.prototype.searchBookmarked = function(cfi) {
	var bookmarks = this.settings.bookmarks,
			len = bookmarks.length,
			i;

	for(i = 0; i < len; i++) {
		if (bookmarks[i]['cfi'] === cfi) return i;
	}
	return -1;
};
*/

EPUBJS.Reader.prototype.clearBookmarks = function() {
	this.settings.bookmarks = [];
};

//-- Notes
EPUBJS.Reader.prototype.addNote = function(note) {
	this.settings.annotations.push(note);
};

EPUBJS.Reader.prototype.removeNote = function(note) {
	var index = this.settings.annotations.indexOf(note);
	if( index === -1 ) return;

	delete this.settings.annotations[index];

};

EPUBJS.Reader.prototype.clearNotes = function() {
	this.settings.annotations = [];
};

//-- Settings
EPUBJS.Reader.prototype.setBookKey = function(identifier){
	if(!this.settings.bookKey) {
		this.settings.bookKey = "epubjsreader:" + EPUBJS.VERSION + ":" + window.location.host + ":" + identifier;
	}
	return this.settings.bookKey;
};

//-- Checks if the book setting can be retrieved from localStorage
EPUBJS.Reader.prototype.isSaved = function(bookPath) {
	var storedSettings;

	if(!localStorage) {
		return false;
	}

	storedSettings = localStorage.getItem(this.settings.bookKey);

	if(storedSettings === null) {
		return false;
	} else {
		return true;
	}
};

EPUBJS.Reader.prototype.removeSavedSettings = function() {
	if(!localStorage) {
		return false;
	}

	localStorage.removeItem(this.settings.bookKey);
};

EPUBJS.Reader.prototype.applySavedSettings = function() {
		var stored;

		if(!localStorage) {
			return false;
		}

	try {
		stored = JSON.parse(localStorage.getItem(this.settings.bookKey));
	} catch (e) { // parsing error of localStorage
		return false;
	}

		if(stored) {
			// Merge styles
			if(stored.styles) {
				this.settings.styles = EPUBJS.core.defaults(this.settings.styles || {}, stored.styles);
			}
			// Merge the rest
			this.settings = EPUBJS.core.defaults(this.settings, stored);
			return true;
		} else {
			return false;
		}
};

EPUBJS.Reader.prototype.saveSettings = function(){
	if(this.book) {
		this.settings.previousLocationCfi = this.book.getCurrentLocationCfi();
	}

	if(!localStorage) {
		return false;
	}

	localStorage.setItem(this.settings.bookKey, JSON.stringify(this.settings));
};

EPUBJS.Reader.prototype.unload = function(){
	if(this.settings.restore && localStorage) {
		this.saveSettings();
	}
};


EPUBJS.Reader.prototype.hashChanged = function(){
	var hash = window.location.hash.slice(1);
	this.book.goto(hash);
};

EPUBJS.Reader.prototype.selectedRange = function(range){
	var epubcfi = new EPUBJS.EpubCFI();
	var cfi = epubcfi.generateCfiFromRangeAnchor(range, this.book.renderer.currentChapter.cfiBase);
	var cfiFragment = "#"+cfi;

	// Update the History Location
	if(this.settings.history &&
			window.location.hash != cfiFragment) {
		// Add CFI fragment to the history
		history.pushState({}, '', cfiFragment);
		this.currentLocationCfi = cfi;
	}
};

//-- Enable binding events to reader
RSVP.EventTarget.mixin(EPUBJS.Reader.prototype);
EPUBJS.reader.BookmarksController = function() {
	var reader = this;
	var book = this.book;

	var $bookmarks = $("#bookmarksView"),
			$list = $bookmarks.find("#bookmarks");
	
	var docfrag = document.createDocumentFragment();
	
	var show = function() {
		$bookmarks.show();
	};

	var hide = function() {
		$bookmarks.hide();
	};
	
	var counter = 0;
	
	var createBookmarkItem = function(cfi) {
		var listitem = document.createElement("li"),
				link = document.createElement("a");
		
		listitem.id = "bookmark-"+counter;
		listitem.classList.add('list_item');
		
		//-- TODO: Parse Cfi
		link.textContent = cfi;
		link.href = cfi;

		link.classList.add('bookmark_link');
		
		link.addEventListener("click", function(event){
				var cfi = this.getAttribute('href');
				book.gotoCfi(cfi);
				event.preventDefault();
		}, false);
		
		listitem.appendChild(link);
		
		counter++;
		
		return listitem;
	};

	this.settings.bookmarks.forEach(function(cfi) { 
		var bookmark = createBookmarkItem(cfi);
		docfrag.appendChild(bookmark);
	});
	
	$list.append(docfrag);
	
	this.on("reader:bookmarked", function(cfi) {
		var item = createBookmarkItem(cfi);
		$list.append(item);
	});
	
	this.on("reader:unbookmarked", function(index) {
		var $item = $("#bookmark-"+index);
		$item.remove();
	});

	return {
		"show" : show,
		"hide" : hide
	};
};
EPUBJS.reader.ControlsController = function(book) {
	var reader = this;

	var $store = $("#store"),
			$fullscreen = $("#fullscreen"),
			$fullscreenicon = $("#fullscreenicon"),
			$cancelfullscreenicon = $("#cancelfullscreenicon"),
			$slider = $("#slider"),
			$main = $("#main"),
			$sidebar = $("#sidebar"),
			$settings = $("#setting"),
			$bookmark = $("#bookmark");

	var goOnline = function() {
		reader.offline = false;
		// $store.attr("src", $icon.data("save"));
	};

	var goOffline = function() {
		reader.offline = true;
		// $store.attr("src", $icon.data("saved"));
	};

	var fullscreen = false;

	book.on("book:online", goOnline);
	book.on("book:offline", goOffline);

	$slider.on("click", function () {
		if(reader.sidebarOpen) {
			reader.SidebarController.hide();
			$slider.addClass("icon-menu");
			$slider.removeClass("icon-right");
		} else {
			reader.SidebarController.show();
			$slider.addClass("icon-right");
			$slider.removeClass("icon-menu");
		}
	});

	
		

	if(typeof screenfull !== 'undefined') {
		$fullscreen.on("click", function() {
			screenfull.toggle($('#container')[0]);
		});
		if(screenfull.raw) {
			document.addEventListener(screenfull.raw.fullscreenchange, function() {
					fullscreen = screenfull.isFullscreen;
					if(fullscreen) {
						$fullscreen
							.addClass("icon-resize-small")
							.removeClass("icon-resize-full");
					} else {
						$fullscreen
							.addClass("icon-resize-full")
							.removeClass("icon-resize-small");
					}
			});
		}
	}

	$settings.on("click", function() {
		reader.SettingsController.show();
	});

	$bookmark.on("click", function() {
		var cfi = reader.book.getCurrentLocationCfi();
		var bookmarked = reader.isBookmarked(cfi);

		if(bookmarked === -1) { //-- Add bookmark
			reader.addBookmark(cfi);
			$bookmark
				.addClass("icon-bookmark")
				.removeClass("icon-bookmark-empty");
		} else { //-- Remove Bookmark
			reader.removeBookmark(cfi);
			$bookmark
				.removeClass("icon-bookmark")
				.addClass("icon-bookmark-empty");
		}

	});

	book.on('renderer:locationChanged', function(cfi){
		var cfiFragment = "#" + cfi;
		//-- Check if bookmarked
		var bookmarked = reader.isBookmarked(cfi);
		if(bookmarked === -1) { //-- Not bookmarked
			$bookmark
				.removeClass("icon-bookmark")
				.addClass("icon-bookmark-empty");
		} else { //-- Bookmarked
			$bookmark
				.addClass("icon-bookmark")
				.removeClass("icon-bookmark-empty");
		}

		reader.currentLocationCfi = cfi;

		// Update the History Location
		if(reader.settings.history &&
				window.location.hash != cfiFragment) {
			// Add CFI fragment to the history
			history.pushState({}, '', cfiFragment);
		}
	});

	book.on('book:pageChanged', function(location){
		// console.log("page", location.page, location.percentage)
	});

	return {

	};
};

EPUBJS.reader.MetaController = function(meta) {
	var title = meta.bookTitle,
			author = meta.creator;

	var $title = $("#book-title"),
			$author = $("#chapter-title"),
			$dash = $("#title-seperator");

		document.title = title+" â€“ "+author;

		$title.html(title);
		$author.html(author);
		$dash.show();
};
EPUBJS.reader.NotesController = function() {
	var book = this.book;
	var reader = this;
	var $notesView = $("#notesView");
	var $notes = $("#notes");
	var $text = $("#note-text");
	var $anchor = $("#note-anchor");
	var annotations = reader.settings.annotations;
	var renderer = book.renderer;
	var popups = [];
	var epubcfi = new EPUBJS.EpubCFI();

	var show = function() {
		$notesView.show();
	};

	var hide = function() {
		$notesView.hide();
	}
	
	var insertAtPoint = function(e) {
		var range;
		var textNode;
		var offset;
		var doc = book.renderer.doc;
		var cfi;
		var annotation;
		
		// standard
		if (doc.caretPositionFromPoint) {
			range = doc.caretPositionFromPoint(e.clientX, e.clientY);
			textNode = range.offsetNode;
			offset = range.offset;
		// WebKit
		} else if (doc.caretRangeFromPoint) {
			range = doc.caretRangeFromPoint(e.clientX, e.clientY);
			textNode = range.startContainer;
			offset = range.startOffset;
		}

		if (textNode.nodeType !== 3) {
			for (var i=0; i < textNode.childNodes.length; i++) {
				if (textNode.childNodes[i].nodeType == 3) {
					textNode = textNode.childNodes[i];
					break;
				}
			}
			}
		
		// Find the end of the sentance
		offset = textNode.textContent.indexOf(".", offset);
		if(offset === -1){
			offset = textNode.length; // Last item
		} else {
			offset += 1; // After the period
		}
		
		cfi = epubcfi.generateCfiFromTextNode(textNode, offset, book.renderer.currentChapter.cfiBase);

		annotation = {
			annotatedAt: new Date(),
			anchor: cfi,
			body: $text.val()
		}

		// add to list
		reader.addNote(annotation);

		// attach
		addAnnotation(annotation);
		placeMarker(annotation);

		// clear
		$text.val('');
		$anchor.text("Attach");
		$text.prop("disabled", false);
		
		book.off("renderer:click", insertAtPoint);
		
	};
	
	var addAnnotation = function(annotation){
		var note = document.createElement("li");
		var link = document.createElement("a");
		
		note.innerHTML = annotation.body;
		// note.setAttribute("ref", annotation.anchor);
		link.innerHTML = " context &#187;";
		link.href = "#"+annotation.anchor;
		link.onclick = function(){
			book.gotoCfi(annotation.anchor);
			return false;
		};
		
		note.appendChild(link);
		$notes.append(note);

	};
	
	var placeMarker = function(annotation){
		var doc = book.renderer.doc;
		var marker = document.createElement("span");
		var mark = document.createElement("a");
		marker.classList.add("footnotesuperscript", "reader_generated");
		
		marker.style.verticalAlign = "super";
		marker.style.fontSize = ".75em";
		// marker.style.position = "relative";
		marker.style.lineHeight = "1em";

		// mark.style.display = "inline-block";
		mark.style.padding = "2px";
		mark.style.backgroundColor = "#fffa96";
		mark.style.borderRadius = "5px";
		mark.style.cursor = "pointer";
		
		marker.id = "note-"+EPUBJS.core.uuid();
		mark.innerHTML = annotations.indexOf(annotation) + 1 + "[Reader]";
		
		marker.appendChild(mark);
		epubcfi.addMarker(annotation.anchor, doc, marker);
		
		markerEvents(marker, annotation.body);
	}
	
	var markerEvents = function(item, txt){
		var id = item.id;
		
		var showPop = function(){
			var poppos,
					iheight = renderer.height,
					iwidth = renderer.width,
			 		tip,
					pop,
					maxHeight = 225,
					itemRect,
					left,
					top,
					pos;
	

			//-- create a popup with endnote inside of it
			if(!popups[id]) {
				popups[id] = document.createElement("div");
				popups[id].setAttribute("class", "popup");
				
				pop_content = document.createElement("div"); 
				
				popups[id].appendChild(pop_content);
				
				pop_content.innerHTML = txt;
				pop_content.setAttribute("class", "pop_content");
		
				renderer.render.document.body.appendChild(popups[id]);
				
				//-- TODO: will these leak memory? - Fred 
				popups[id].addEventListener("mouseover", onPop, false);
				popups[id].addEventListener("mouseout", offPop, false);
		
				//-- Add hide on page change
				renderer.on("renderer:locationChanged", hidePop, this);
				renderer.on("renderer:locationChanged", offPop, this);
				// chapter.book.on("renderer:chapterDestroy", hidePop, this);
			}
			
			pop = popups[id];
			
			
			//-- get location of item
			itemRect = item.getBoundingClientRect();
			left = itemRect.left;
			top = itemRect.top;

			//-- show the popup
			pop.classList.add("show");
			
			//-- locations of popup
			popRect = pop.getBoundingClientRect();
			
			//-- position the popup
			pop.style.left = left - popRect.width / 2 + "px";
			pop.style.top = top + "px";
							
			
			//-- Adjust max height
			if(maxHeight > iheight / 2.5) {
				maxHeight = iheight / 2.5;
				pop_content.style.maxHeight = maxHeight + "px";
			}
							
			//-- switch above / below
			if(popRect.height + top >= iheight - 25) {
				pop.style.top = top - popRect.height  + "px";
				pop.classList.add("above");
			}else{
				pop.classList.remove("above");
			}
			
			//-- switch left
			if(left - popRect.width <= 0) {
				pop.style.left = left + "px";
				pop.classList.add("left");
			}else{
				pop.classList.remove("left");
			}
			
			//-- switch right
			if(left + popRect.width / 2 >= iwidth) {
				//-- TEMP MOVE: 300
				pop.style.left = left - 300 + "px";
				
				popRect = pop.getBoundingClientRect();
				pop.style.left = left - popRect.width + "px";
				//-- switch above / below again
				if(popRect.height + top >= iheight - 25) { 
					pop.style.top = top - popRect.height  + "px";
					pop.classList.add("above");
				}else{
					pop.classList.remove("above");
				}
				
				pop.classList.add("right");
			}else{
				pop.classList.remove("right");
			}
			
		}
		
		var onPop = function(){
			popups[id].classList.add("on");
		}
		
		var offPop = function(){
			popups[id].classList.remove("on");
		}
		
		var hidePop = function(){
			setTimeout(function(){
				popups[id].classList.remove("show");
			}, 100);	
		}
		
		var openSidebar = function(){
			reader.ReaderController.slideOut();
			show();
		};
		
		item.addEventListener("mouseover", showPop, false);
		item.addEventListener("mouseout", hidePop, false);
		item.addEventListener("click", openSidebar, false);
		
	}
	$anchor.on("click", function(e){
		
		$anchor.text("Cancel");
		$text.prop("disabled", "true");
		// listen for selection
		book.on("renderer:click", insertAtPoint);
				
	});
	
	annotations.forEach(function(note) {
		addAnnotation(note);
	});
	
	
	renderer.registerHook("beforeChapterDisplay", function(callback, renderer){
		var chapter = renderer.currentChapter;
		annotations.forEach(function(note) {
			var cfi = epubcfi.parse(note.anchor);
			if(cfi.spinePos === chapter.spinePos) {
				try {
					placeMarker(note);
				} catch(e) {
					console.log("anchoring failed", note.anchor);
				}
			}
		});
		callback();
	}, true);


	return {
		"show" : show,
		"hide" : hide
	};
};
EPUBJS.reader.ReaderController = function(book) {
	var $main = $("#main"),
			$divider = $("#divider"),
			$loader = $("#loader"),
			$next = $("#next"),
			$prev = $("#prev");
	var reader = this;
	var book = this.book;
	var slideIn = function() {
		var currentPosition = book.getCurrentLocationCfi();
		if (reader.settings.sidebarReflow){
			$main.removeClass('single');
			$main.one("transitionend", function(){
				book.gotoCfi(currentPosition);
			});
		} else {
			$main.removeClass("closed");
		}
	};

	var slideOut = function() {
		var currentPosition = book.getCurrentLocationCfi();
		if (reader.settings.sidebarReflow){
			$main.addClass('single');
			$main.one("transitionend", function(){
				book.gotoCfi(currentPosition);
			});
		} else {
			$main.addClass("closed");
		}
	};

	var showLoader = function() {
		$loader.show();
		hideDivider();
	};

	var hideLoader = function() {
		$loader.hide();
		
		//-- If the book is using spreads, show the divider
		// if(book.settings.spreads) {
		// 	showDivider();
		// }
	};

	var showDivider = function() {
		$divider.addClass("show");
	};

	var hideDivider = function() {
		$divider.removeClass("show");
	};

	var keylock = false;

	var arrowKeys = function(e) {		
		if(e.keyCode == 37) { 
			
			if(book.metadata.direction === "rtl") {
				book.nextPage();
			} else {
				book.prevPage();
			}

			$prev.addClass("active");

			keylock = true;
			setTimeout(function(){
				keylock = false;
				$prev.removeClass("active");
			}, 100);

			 e.preventDefault();
		}
		if(e.keyCode == 39) {

			if(book.metadata.direction === "rtl") {
				book.prevPage();
			} else {
				book.nextPage();
			}
			
			$next.addClass("active");

			keylock = true;
			setTimeout(function(){
				keylock = false;
				$next.removeClass("active");
			}, 100);

			 e.preventDefault();
		}
	}

	document.addEventListener('keydown', arrowKeys, false);

	$next.on("click", function(e){
		
		if(book.metadata.direction === "rtl") {
			book.prevPage();
		} else {
			book.nextPage();
		}

		e.preventDefault();
	});

	$prev.on("click", function(e){
		
		if(book.metadata.direction === "rtl") {
			book.nextPage();
		} else {
			book.prevPage();
		}

		e.preventDefault();
	});
	
	book.on("renderer:spreads", function(bool){
		if(bool) {
			showDivider();
		} else {
			hideDivider();
		}
	});

	// book.on("book:atStart", function(){
	// 	$prev.addClass("disabled");
	// });
	// 
	// book.on("book:atEnd", function(){
	// 	$next.addClass("disabled");	
	// });

	return {
		"slideOut" : slideOut,
		"slideIn"  : slideIn,
		"showLoader" : showLoader,
		"hideLoader" : hideLoader,
		"showDivider" : showDivider,
		"hideDivider" : hideDivider,
		"arrowKeys" : arrowKeys
	};
};
EPUBJS.reader.SettingsController = function() {
	var book = this.book;
	var reader = this;
	var $settings = $("#settings-modal"),
			$overlay = $(".overlay");

	var show = function() {
		$settings.addClass("md-show");
	};

	var hide = function() {
		$settings.removeClass("md-show");
	};

	var $sidebarReflowSetting = $('#sidebarReflow');

	$sidebarReflowSetting.on('click', function() {
		reader.settings.sidebarReflow = !reader.settings.sidebarReflow;
	});

	$settings.find(".closer").on("click", function() {
		hide();
	});

	$overlay.on("click", function() {
		hide();
	});

	return {
		"show" : show,
		"hide" : hide
	};
};
EPUBJS.reader.SidebarController = function(book) {
	var reader = this;

	var $sidebar = $("#sidebar"),
			$panels = $("#panels");

	var activePanel = "Toc";

	var changePanelTo = function(viewName) {
		var controllerName = viewName + "Controller";
		
		if(activePanel == viewName || typeof reader[controllerName] === 'undefined' ) return;
		reader[activePanel+ "Controller"].hide();
		reader[controllerName].show();
		activePanel = viewName;

		$panels.find('.active').removeClass("active");
		$panels.find("#show-" + viewName ).addClass("active");
	};
	
	var getActivePanel = function() {
		return activePanel;
	};
	
	var show = function() {
		reader.sidebarOpen = true;
		reader.ReaderController.slideOut();
		$sidebar.addClass("open");
	}

	var hide = function() {
		reader.sidebarOpen = false;
		reader.ReaderController.slideIn();
		$sidebar.removeClass("open");
	}

	$panels.find(".show_view").on("click", function(event) {
		var view = $(this).data("view");

		changePanelTo(view);
		event.preventDefault();
	});

	return {
		'show' : show,
		'hide' : hide,
		'getActivePanel' : getActivePanel,
		'changePanelTo' : changePanelTo
	};
};
EPUBJS.reader.TocController = function(toc) {
	var book = this.book;

	var $list = $("#tocView"),
			docfrag = document.createDocumentFragment();

	var currentChapter = false;

	var generateTocItems = function(toc, level) {
		var container = document.createElement("ul");

		if(!level) level = 1;

		toc.forEach(function(chapter) {
			var listitem = document.createElement("li"),
					link = document.createElement("a");
					toggle = document.createElement("a");

			var subitems;

			listitem.id = "toc-"+chapter.id;
			listitem.classList.add('list_item');

			link.textContent = chapter.label;
			link.href = chapter.href;

			link.classList.add('toc_link');

			listitem.appendChild(link);

			if(chapter.subitems.length > 0) {
				level++;
				subitems = generateTocItems(chapter.subitems, level);
				toggle.classList.add('toc_toggle');

				listitem.insertBefore(toggle, link);
				listitem.appendChild(subitems);
			}


			container.appendChild(listitem);

		});

		return container;
	};

	var onShow = function() {
		$list.show();
	};

	var onHide = function() {
		$list.hide();
	};

	var chapterChange = function(e) {
		var id = e.id,
				$item = $list.find("#toc-"+id),
				$current = $list.find(".currentChapter"),
				$open = $list.find('.openChapter');

		if($item.length){

			if($item != $current && $item.has(currentChapter).length > 0) {
				$current.removeClass("currentChapter");
			}

			$item.addClass("currentChapter");

			// $open.removeClass("openChapter");
			$item.parents('li').addClass("openChapter");
		}
	};

	book.on('renderer:chapterDisplayed', chapterChange);

	var tocitems = generateTocItems(toc);

	docfrag.appendChild(tocitems);

	$list.append(docfrag);
	$list.find(".toc_link").on("click", function(event){
			var url = this.getAttribute('href');

			event.preventDefault();

			//-- Provide the Book with the url to show
			//   The Url must be found in the books manifest
			book.goto(url);

			$list.find(".currentChapter")
					.addClass("openChapter")
					.removeClass("currentChapter");

			$(this).parent('li').addClass("currentChapter");

	});

	$list.find(".toc_toggle").on("click", function(event){
			var $el = $(this).parent('li'),
					open = $el.hasClass("openChapter");

			event.preventDefault();
			if(open){
				$el.removeClass("openChapter");
			} else {
				$el.addClass("openChapter");
			}
	});

	return {
		"show" : onShow,
		"hide" : onHide
	};
};
