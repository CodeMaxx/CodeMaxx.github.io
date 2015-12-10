$(document).ready(function(){
	$(".info").hide();
	$(".home").fadeTo(0,0.65);
	$(".about-me").fadeTo(0,0.65);
	$(".projects").fadeTo(0,0.65);
	$(".contact").fadeTo(0,0.65);
	$(".home").css("background-color","#eeeff2");	
	$(".home").css({ boxShadow : "5px 5px 3px 0 rgba(100,100,100,0.4)" });
	$("#info-home").fadeIn(1000);	
	$(".about-me").hover(function(){
		$(".about-me").fadeTo(0,1);
	},function(){
		$(".about-me").fadeTo(0,0.65);
		});
	$(".projects").hover(function(){
		$(".projects").fadeTo(0,1);
	},function(){
		$(".projects").fadeTo(0,0.65);
		});
	
	$(".contact").hover(function(){
		$(".contact").fadeTo(0,1);
	},function(){
		$(".contact").fadeTo(0,0.65);
		});
	
	$(".home").hover(function(){
		$(".home").fadeTo(0,1);
	},function(){
		$(".home").fadeTo(0,0.65);
		});
			
    $(".home").click(function(){
		$(".headings").css({ boxShadow : "0 0 0 0 rgba(100,100,100,0.4)" });	
		$(".headings").css("background-color","");	
		$(".home").css("background-color","#eeeff2");	
		$(".home").css({ boxShadow : "5px 5px 3px 0 rgba(100,100,100,0.4)" });
		$(".info").hide();
        $("#info-home").fadeIn("slow");      
    });
    
    $(".about-me").click(function(){
		$(".headings").css("background-color","");	
		$(".about-me").css("background-color","#eeeff2");	
		$(".headings").css({ boxShadow : "0 0 0 0 rgba(100,100,100,0.4)" });		
		$(".about-me").css({ boxShadow : "5px 5px 3px 0 rgba(100,100,100,0.4)" });
		$(".info").hide();
		$("#info-about-me").fadeIn("slow");
    });
    $(".projects").click(function(){
		$(".headings").css("background-color","");	
		$(".projects").css("background-color","#eeeff2");	
		$(".headings").css({ boxShadow : "0 0 0 0 rgba(100,100,100,0.4)" });		
		$(".projects").css({ boxShadow : "5px 5px 3px 0 rgba(100,100,100,0.4)" });
		$(".info").hide();
		$("#info-projects").fadeIn("slow");
    });
    $(".contact").click(function(){
		$(".headings").css("background-color","");	
		$(".contact").css("background-color","#eeeff2");	
		$(".headings").css({ boxShadow : "0 0 0 0 rgba(100,100,100,0.4)" });		
		$(".contact").css({ boxShadow : "5px 5px 3px 0 rgba(100,100,100,0.4)" });
		$(".info").hide();
		$("#info-contact").fadeIn("slow");
    });        
});
