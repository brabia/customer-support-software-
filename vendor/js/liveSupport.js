/** 
	@ ------------------------------------------------------
	@	Live Support
	@	Bassem Rabia | bassem.rabia@gmail.com
	@ ------------------------------------------------------  
**/

var liveSupport = {
	apiName: 'Live Support', 
	apiVersion: '1.0',
	apiUrl: 'http://127.0.0.1/support/vendor/',
	
	s4: function(){
		return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
	},
	setUserId: function(){
		localStorage.setItem('userId', liveSupport.s4()+liveSupport.s4()+'-'+liveSupport.s4()+'-'+liveSupport.s4()+'-'+liveSupport.s4()+'-'+liveSupport.s4()+liveSupport.s4()+liveSupport.s4());
	},
	setConversionId: function(){
		localStorage.setItem('conversionId', liveSupport.s4()+liveSupport.s4()+'-'+liveSupport.s4()+'-'+liveSupport.s4()+'-'+liveSupport.s4()+'-'+liveSupport.s4()+liveSupport.s4()+liveSupport.s4());
	},
	isUserOnline: function(userId){
		return (Math.floor(Math.random()*(2))==1)?true:false;
	},
	autoScroll: function(){
		$('#liveSupport .liveSupport_converstaion ul').animate({
			scrollTop: $('#liveSupport .liveSupport_converstaion ul').prop('scrollHeight')
		}, 0);	
	},
	getMessages: function(){
		console.log(liveSupport.apiUrl)
		$.getJSON(liveSupport.apiUrl+'get_json.php?conversionId='+localStorage.getItem('conversionId'), function(response){
			if(response.messages.length > parseFloat($('#liveSupport .header .header_title').attr('l')||0)){
				var latest = $('.liveSupport_converstaion ul li:last').attr('mid');
				$.each(response.messages, function(k, v){
					// console.log(v, $('.liveSupport_converstaion ul li[mid="'+v.mId+'"]').length)
					if($('.liveSupport_converstaion ul li[mid="'+v.mId+'"]').length == 0){
						var u = (liveSupport.isUserOnline(v.userId))?'chat_u_status_online':'chat_u_status_offline';
						var li = (v.userId == localStorage.getItem('userId'))?'you':'me';
						$('.liveSupport_converstaion ul').append('<li mid="'+v.mId+'" class="'+li+'">'
							+'<span class="chat_u_message">'
								+''+v.userMessage+''
								+'<span class="chat_u_message_time">'+v.time+'</span>'
							+'</span>'
							+'<span uid="'+v.userId+'" class="chat_avatar">'
								+'<span class="chat_u_status '+u+'"></span>'
								+'<img src="'+liveSupport.apiUrl+'avatar/'+v.userAvatar+'" alt="Avatar">'
							+'</span>'
						+'</li>');
					}					
				});		
				$('#liveSupport .header .header_title').attr('l', $('.liveSupport_converstaion ul li').length);
				liveSupport.autoScroll();				
			}			
		})
	},
	sendMessages: function(){		
		$('#liveSupportMessage').keypress(function(e){
			 var key = e.which;
			 if(key == 13){
				$('.footer_options').trigger('click')
			}
		}); 
		$('.footer_options').click(function(){
			$.ajax
			({
				type: 'GET',
				url: liveSupport.apiUrl+'save_json.php',
				data: 
				{
					conversionId: localStorage.getItem('conversionId'),
					userMessage: $('#liveSupportMessage').val(),
					userName: (localStorage.getItem('userId')=='814b6a18-6b0a-57f4-08d4-ed7d4cf348f9')?'Chrome':'Firefox',
					userAvatar: (localStorage.getItem('userId')=='814b6a18-6b0a-57f4-08d4-ed7d4cf348f9')?'1463849745.png':'1463849805.png',
					userId: localStorage.getItem('userId'),
				},
				success: function (){
					liveSupport.autoScroll();
					$('#liveSupportMessage').val('');
					liveSupport.getMessages();
				},
				failure: function(){
					alert("Error!");
				}
			});
		})
	},
	inject: function(){
		$("head link[rel='stylesheet']").last().after('<link rel="stylesheet" href="'+liveSupport.apiUrl+'css/liveSupport.css?v=1.0" type="text/css" media="screen">');
		$('body').prepend(
			'<div id="liveSupport_trigger">'
			+'</div>'
			
			
			+'<div id="liveSupport">'
				+'<div class="header">'
				+'<span class="header_options">Exit</span><span class="header_title">'+liveSupport.apiName+'</span>'
				+'</div>'				
				+'<div class="liveSupport_converstaion">'
					+'<ul></ul>'
				+'</div>'
				+'<div class="footer">'
					+'<span class="footer_options">Send</span><input type="text" id="liveSupportMessage" />'
				+'</div>'
			+'</div>');
		liveSupport.sendMessages();
		liveSupport.getMessages();
		setInterval(function(){
			liveSupport.getMessages();
		}, 1000*2)
		var h = ($(window).height()-($('#liveSupport .header').height()+$('#liveSupport .footer').height()))-50;
		$('#liveSupport .liveSupport_converstaion ul').attr('style', 'max-height:'+h+'px');		
		liveSupport.autoScroll();
		
		
		$('.header_options').click(function(){
			if($(this).hasClass('closed')){
				$('#liveSupport .footer, #liveSupport .liveSupport_converstaion').fadeIn();
				$('#liveSupport').animate({
					height: '100%'
				}, 500);	
				$(this).removeClass('closed');
			}else{
				$('#liveSupport .footer, #liveSupport .liveSupport_converstaion').fadeOut();
				$('#liveSupport').animate({
					right: '-'+$('#liveSupport').width()+'px'
				}, 500);
				$(this).addClass('closed');
			}			
		});
		
		$('#liveSupport_trigger').click(function(){
			$('#liveSupport').fadeIn()
			.animate({
				height: '100%',
				right: '0'
			}, 500);	
			$('#liveSupport .footer, #liveSupport .liveSupport_converstaion').fadeIn();
			$('.header_options').removeClass('closed');
		});
		
	},
	init: function(){
		console.log(
		'------------------------------------------------------'
		+'\n'+liveSupport.apiName+' '+liveSupport.apiVersion+''
		+'\n------------------------------------------------------');
		
		if(localStorage.getItem('userId') == null)
			liveSupport.setUserId();
		if(localStorage.getItem('conversionId') == null)
			liveSupport.setConversionId();
		liveSupport.inject();
	}
}