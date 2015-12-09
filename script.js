$(document).ready(function(){
	$(".info").hide();
/*	$("#info-home").hide();
	$("#info-about-me").hide();
	$("#info-projects").hide();
	$("#info-contact").hide();
	*/$(".home").fadeTo(0,0.5);
	$(".about-me").fadeTo(0,0.5);
	$(".projects").fadeTo(0,0.5);
	$(".contact").fadeTo(0,0.5);
	
	$(".about-me").hover(function(){
		$(".about-me").fadeTo(0,1);
	},function(){
		$(".about-me").fadeTo(0,0.5);
		});
	$(".projects").hover(function(){
		$(".projects").fadeTo(0,1);
	},function(){
		$(".projects").fadeTo(0,0.5);
		});
	
	$(".contact").hover(function(){
		$(".contact").fadeTo(0,1);
	},function(){
		$(".contact").fadeTo(0,0.5);
		});
	
	$(".home").hover(function(){
		$(".home").fadeTo(0,1);
	},function(){
		$(".home").fadeTo(0,0.5);
		});
			
    $(".home").click(function(){
		$(".home").fadeTo(0,1);
		$(".about-me").fadeTo(0,0.5);
		$(".projects").fadeTo(0,0.5);
		$(".contact").fadeTo(0,0.5);
		$(".info").hide();
        $("#info-home").fadeIn("slow");      
    });
    
    $(".about-me").click(function(){
		$(".home").fadeTo(0,0.5);
		$(".about-me").fadeTo(0,1);
		$(".projects").fadeTo(0,0.5);
		$(".contact").fadeTo(0,0.5);
		$(".info").hide();
		$("#info-about-me").fadeIn("slow");
    });
    $(".projects").click(function(){
		$(".home").fadeTo(0,0.5);
		$(".about-me").fadeTo(0,0.5);
		$(".projects").fadeTo(0,1);
		$(".contact").fadeTo(0,0.5);
		$(".info").hide();
		$("#info-projects").fadeIn("slow");
    });
    $(".contact").click(function(){
		$(".home").fadeTo(0,0.5);
		$(".about-me").fadeTo(0,0.5);
		$(".projects").fadeTo(0,0.5);
		$(".contact").fadeTo(0,1);
		$(".info").hide();
		$("#info-contact").fadeIn("slow");
    });        
});
