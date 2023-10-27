EPUBJS.Hooks.register("beforeChapterDisplay").endnotes = function(callback, renderer){

		var notes = renderer.contents.querySelectorAll('a[href]'),
			items = Array.prototype.slice.call(notes), //[].slice.call()
			attr = "epub:type",
			type = "noteref",
			folder = EPUBJS.core.folder(location.pathname),
			cssPath = (folder + EPUBJS.cssPath) || folder,
			popups = {};

			
		// renderer.render.document.head.querySelectorAll('link').forEach(function(oL){ oL.disabled = true; });
		document.body.querySelectorAll('div.popup').forEach(function(epopup){ document.body.removeChild(epopup) });

		// document.head.querySelectorAll('link').forEach(function(oL){ oL.disabled = true; });

		// EPUBJS.core.addCss(EPUBJS.cssPath + "allstyles.css", function() {
		// 	callback();
		// }, renderer.render.document.head);

		// EPUBJS.replace.stylesheets('../Styles/Styles.css', 'https://ebookvie.com/wp-content/liteBook/read/css/allstyles.css');

		
		items.forEach(function(item){
			var epubType = item.getAttribute(attr),
				href = item.getAttribute('href'),
				id,
				el,
				pop,
				pos,
				left,
				top,
				txt,
				name,
				docEl;
				

			if(epubType == type || href.indexOf('note:') == 0) {
				
				id = href.replace("../Text/Endnotes.xhtml#", '');

				// console.log(id);
				// docEl = renderer.render.document.createElement("div");
				// docEl.setAttribute("id", id);
					// console.log(docEl);
				//el = renderer.render.document.getElementById(id);
				el = renderer.render.document.createElement("aside");
				el.setAttribute("id", id);
				el.setAttribute("epub:type", 'footnote');
				el.innerHTML = '<p>' + item.getAttribute('title') + '</p>';



				

				item.setAttribute('href', '#' + id);

				jQuery(item).click( function(e) {
					e.preventDefault();

				});
				item.addEventListener("mouseover", showPop, false);
				item.addEventListener("mouseout", hidePop, false);
				item.addEventListener("click", showPop, true);
				item.firstChild.addEventListener("click", stopP, true);
				return;
			} else if ( href.indexOf('_ftnref') == 1 ) {
				name = item.getAttribute('name');
				item.setAttribute('id', name);
				return;
			} else if ( href.indexOf('_ftn') == 1 ) {
				name = item.getAttribute('name');
				item.setAttribute('id', name);				
				id = href.replace("#", '');
				jQuery(item).on('click mouseover', function(e){
					el = renderer.render.document.getElementById(id).parentNode;
					txt = renderer.render.document.createElement('p');
					txt.innerHTML = '<p>'+el.innerHTML+'</p>';
					showPop(e);
				});
				jQuery(item).on('mouseout', function() {
					hidePop();
				});
				return;
				//el = renderer.render.document.getElementById(id);
				//console.log(el);
			} else {
				return;
			}

			
			// jQuery(item).replaceWith('<a href="#'+id+'" class="footnote" data-txt="'+item.getAttribute('title')+'">'+item.innerHTML+'</a>');
			


			function stopP(e){
				e.stopPropagation();
				var poppos,
					iheight = jQuery(document).height(),
					iwidth = jQuery(document).width(),
				 	tip,
					pop,
					maxHeight = 225,
					itemRect;

				if(!txt) {
					pop = el.cloneNode(true);
					txt = pop.querySelector("p");
				}

				// chapter.replaceLinks.bind(this) //TODO:Fred - update?
				//-- create a popup with endnote inside of it
				if(!popups[id]) {
					popups[id] = document.createElement("div");
					popups[id].setAttribute("class", "popup");

					pop_content = document.createElement("div");

					popups[id].appendChild(pop_content);

					pop_content.appendChild(txt);
					pop_content.setAttribute("class", "pop_content");

					renderer.render.document.body.appendChild(popups[id]);

					//-- TODO: will these leak memory? - Fred
					popups[id].addEventListener("mouseover", onPop, false);
					popups[id].addEventListener("mouseout", offPop, false);

					//-- Add hide on page change
					// chapter.book.listenUntil("book:pageChanged", "book:chapterDestroy", hidePop);
					// chapter.book.listenUntil("book:pageChanged", "book:chapterDestroy", offPop);
					renderer.on("renderer:pageChanged", hidePop, this);
					renderer.on("renderer:pageChanged", offPop, this);
					// chapter.book.on("renderer:chapterDestroy", hidePop, this);
				}

				pop = popups[id];


				//-- get location of item
				itemRect = item.getBoundingClientRect();
				console.log(itemRect);
				// console.log(itemRect);
				left = itemRect.left;
				top = itemRect.top;

				//-- show the popup
				pop.classList.add("show");

				//-- locations of popup
				popRect = pop.getBoundingClientRect();

				//-- position the popup
				pop.style.left = left - popRect.width / 2 + "px";
				console.log(pop.style.left);
				pop.style.top = top + "px";
				console.log(pop.style.top);


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
					pop.style.left = left - 150 + "px";

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

			function showPop(e){
				e.preventDefault();
				var poppos,
					iheight = jQuery(document).height(),
					iwidth = jQuery(document).width(),
				 	tip,
					pop,
					maxHeight = 225,
					itemRect;

				if(!txt) {
					pop = el.cloneNode(true);
					txt = pop.querySelector("p");
				}

				// chapter.replaceLinks.bind(this) //TODO:Fred - update?
				//-- create a popup with endnote inside of it
				if(!popups[id]) {
					popups[id] = document.createElement("div");
					popups[id].setAttribute("class", "popup");

					pop_content = document.createElement("div");

					popups[id].appendChild(pop_content);

					pop_content.appendChild(txt);
					pop_content.setAttribute("class", "pop_content");

					document.body.appendChild(popups[id]);
					// console.log(renderer);

					//-- TODO: will these leak memory? - Fred
					popups[id].addEventListener("mouseover", onPop, false);
					popups[id].addEventListener("mouseout", offPop, false);

					//-- Add hide on page change
					// chapter.book.listenUntil("book:pageChanged", "book:chapterDestroy", hidePop);
					// chapter.book.listenUntil("book:pageChanged", "book:chapterDestroy", offPop);
					renderer.on("renderer:pageChanged", hidePop, this);
					renderer.on("renderer:pageChanged", offPop, this);
					// chapter.book.on("renderer:chapterDestroy", hidePop, this);
				}

				pop = popups[id];


				//-- get location of item
				itemRect = item.getBoundingClientRect();
				// console.log(itemRect);
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

			function onPop(){
				popups[id].classList.add("on");
			}

			function offPop(){
				popups[id].classList.remove("on");
			}

			function hidePop(){
				setTimeout(function(){
					popups[id].classList.remove("show");
				}, 100);
			}

		});


		if(callback) callback();

}

EPUBJS.Hooks.register("beforeChapterDisplay").mathml = function(callback, renderer){

    // check of currentChapter properties contains 'mathml'
    if(renderer.currentChapter.manifestProperties.indexOf("mathml") !== -1 ){
        
        // Assign callback to be inside iframe window
        renderer.render.iframe.contentWindow.mathmlCallback = callback;
        
        // add MathJax config script tag to the renderer body
        var s = document.createElement("script");
        s.type = 'text/x-mathjax-config';
        s.innerHTML = '\
        MathJax.Hub.Register.StartupHook("End",function () { \
          window.mathmlCallback(); \
        });\
        MathJax.Hub.Config({jax: ["input/TeX","input/MathML","output/SVG"],extensions: ["tex2jax.js","mml2jax.js","MathEvents.js"],TeX: {extensions: ["noErrors.js","noUndefined.js","autoload-all.js"]},MathMenu: {showRenderer: false},menuSettings: {zoom: "Click"},messageStyle: "none"}); \
                ';
        renderer.doc.body.appendChild(s);
        // add MathJax.js to renderer head
        EPUBJS.core.addScript("http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML", null, renderer.doc.head);
    
    } else {
        if(callback) callback();
    }
}

EPUBJS.Hooks.register("beforeChapterDisplay").smartimages = function(callback, renderer){
		var images = renderer.contents.querySelectorAll('img'),
			items = Array.prototype.slice.call(images),
			iheight = renderer.height,//chapter.bodyEl.clientHeight,//chapter.doc.body.getBoundingClientRect().height,
			oheight;

		if(renderer.layoutSettings.layout != "reflowable") {
			callback();
			return; //-- Only adjust images for reflowable text
		}

		items.forEach(function(item){

			var size = function() {
				var itemRect = item.getBoundingClientRect(),
					rectHeight = itemRect.height,
					top = itemRect.top,
					oHeight = item.getAttribute('data-height'),
					height = oHeight || rectHeight,
					newHeight,
					fontSize = Number(getComputedStyle(item, "").fontSize.match(/(\d*(\.\d*)?)px/)[1]),
					fontAdjust = fontSize ? fontSize / 2 : 0;

				iheight = renderer.contents.clientHeight;
				if(top < 0) top = 0;

				if(height + top >= iheight) {

					if(top < iheight/2) {
						// Remove top and half font-size from height to keep container from overflowing
						newHeight = iheight - top - fontAdjust;
						item.style.maxHeight = newHeight + "px";
						item.style.width= "auto";
					}else{
						if(height > iheight) {
							item.style.maxHeight = iheight + "px";
							item.style.width= "auto";
							itemRect = item.getBoundingClientRect();
							height = itemRect.height;
						}
						item.style.display = "block";
						item.style["WebkitColumnBreakBefore"] = "always";
						item.style["breakBefore"] = "column";

					}

					item.setAttribute('data-height', newHeight);

				}else{
					item.style.removeProperty('max-height');
					item.style.removeProperty('margin-top');
				}
			}

			var unloaded = function(){
				// item.removeEventListener('load', size); // crashes in IE
				renderer.off("renderer:resized", size);
				renderer.off("renderer:chapterUnload", this);
			};

			item.addEventListener('load', size, false);

			renderer.on("renderer:resized", size);

			renderer.on("renderer:chapterUnload", unloaded);

			size();

		});

		if(callback) callback();

}

EPUBJS.Hooks.register("beforeChapterDisplay").transculsions = function(callback, renderer){
		/*
		<aside ref="http://www.youtube.com/embed/DUL6MBVKVLI?html5=1" transclusion="video" width="560" height="315">
			<a href="http://www.youtube.com/embed/DUL6MBVKVLI"> Watch the National Geographic: The Last Roll of Kodachrome</a>
		</aside>
		*/

		var trans = renderer.contents.querySelectorAll('[transclusion]'),
				items = Array.prototype.slice.call(trans);

		items.forEach(function(item){
			var src = item.getAttribute("ref"),
				iframe = document.createElement('iframe'),
				orginal_width = item.getAttribute("width"),
				orginal_height = item.getAttribute("height"),
				parent = item.parentNode,
				width = orginal_width, 
				height = orginal_height, 
				ratio;
		
			
			function size() {
				width = orginal_width;
				height = orginal_height;
				
				if(width > chapter.colWidth){
					ratio = chapter.colWidth / width; 
					
					width = chapter.colWidth;
					height = height * ratio;
				}
				
				iframe.width = width;
				iframe.height = height;
			}
			
			
			size();
			
			//-- resize event

			
			renderer.listenUntil("renderer:resized", "renderer:chapterUnloaded", size);
		
			iframe.src = src;
			
			//<iframe width="560" height="315" src="http://www.youtube.com/embed/DUL6MBVKVLI" frameborder="0" allowfullscreen="true"></iframe>
			parent.replaceChild(iframe, item);			
	
	
		});
		
		
		
	
		if(callback) callback();

	
}


 EPUBJS.Hooks.register('beforeChapterDisplay').pageAnimation = function (callback, renderer) {
              window.setTimeout(function () {
                  var style = renderer.doc.createElement("style");
                  style.innerHTML = "*{-webkit-transition: transform {t} ease;-moz-transition: tranform {t} ease;-o-transition: transform {t} ease;-ms-transition: transform {t} ease;transition: transform {t} ease;}";
                  style.innerHTML = style.innerHTML.split("{t}").join("0.5s");
                  renderer.doc.body.appendChild(style);
              }, 100)
              if (callback) {
                  callback();
              }
          };


          EPUBJS.Hooks.register('beforeChapterDisplay').swipeDetection = function (callback, renderer) {
              var script = renderer.doc.createElement('script');
              script.text = "!function(a,b,c){function f(a){d=a.touches[0].clientX,e=a.touches[0].clientY}function g(f){if(d&&e){var g=f.touches[0].clientX,h=f.touches[0].clientY,i=d-g,j=e-h;Math.abs(i)>Math.abs(j)&&(i>a?b():i<0-a&&c()),d=null,e=null}}var d=null,e=null;document.addEventListener('touchstart',f,!1),document.addEventListener('touchmove',g,!1)}";
              /* (threshold, leftswipe, rightswipe) */
              script.text += "(10,function(){ parent.jQuery('#next').trigger('click') },function(){ parent.jQuery('#prev').trigger('click') });"
              renderer.doc.head.appendChild(script);
              if (callback) {
                  callback();
              }
          };

