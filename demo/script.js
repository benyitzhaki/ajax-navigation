jQuery( document ).ready(function( $ ) {


$( "a[data-page]" ).on( "click", function(e) {

	// prevent it from handling the url as a regular link
	e.preventDefault();

	var map = JSON.parse($(this).attr("data-map"));
	var page = $(this).attr("data-page");

	 $.ajax({
	        url: page,
	        type: "get",
	        dataType: "html",
	        success: function (data) {

	        	var dataHtml = $($.parseXML(data)).children('html');

	        	// meta tags to replace
	        	$( "title" ).html( dataHtml.find("title").html() );
				$( "meta[name=description]" ).attr("content",dataHtml.find("meta[name]").attr("content"));

				for (var key in map) {
				   if (map.hasOwnProperty(key)) {
				   		$( "#"+key ).html( dataHtml.find("#"+map[key]).html() );
				    }
				}

     			if(window.history.pushState)
     				window.history.pushState({"html":data,"pageTitle":$( "title" ).html()},"", page);


	        }

	    });





});

});