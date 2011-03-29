(function() {
	var lol_smiley = 'http://i.imgur.com/KuGsj.gif',
	grin_smiley = 'http://i.imgur.com/3AQmK.gif',
	smilies = '<p class="smallfont">Smilies</p><img src="' + lol_smiley + '" id="lol_smiley" alt="Laughing" title=":lol">' + '<img src="' + grin_smiley + '" id="grin_smiley" alt="Grin" title=":D">';
	
	$('#smiliebox').append(smilies);
	$('#smiliebox').css('display', 'block');
	
	$('#lol_smiley').click(function () {
		$('textarea').val($('textarea').val() + '[img]' + lol_smiley + '[/img]');
		$('textarea').focus();
	});
	
	$('#grin_smiley').click(function () {
		$('textarea').append($('textarea').val() + '[img]' + grin_smiley + '[/img]');
		$('textarea').focus();
	});
})();