$(document).ready(function(){

	waitForElement('#boxBonus > div > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(3)');

	var date = $('#boxBonus > div > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(3)').html().substring(13, 23);

	var dateInParts = date.split('/');

	var endDate = new Date(dateInParts[2], dateInParts[1]-1, dateInParts[0]);

	var year = (dateInParts[1] == 1) ?  dateInParts[2] - 1 : dateInParts[2];

	var initialDate = new Date(year, dateInParts[1]-2, 23);
	
	var initialDate = new Date(endDate.getTime() - 2802543000);

	var oneDay = 24*60*60*1000;

	var diffDays = Math.round(Math.abs((initialDate.getTime() - endDate.getTime())/(oneDay)));

	var diffInitialToToday = Math.round(Math.abs((initialDate.getTime() - new Date().getTime())/(oneDay)));

	var isMb = $('#boxBonus > div > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)').html().indexOf('MB');
	
	var literalMeasurement =  $('#boxBonus > div > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)').html().trim();
	var endOfMeasurement = $('#boxBonus > div > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)').html().trim().indexOf('&');
	var measurement = literalMeasurement.substring(0, endOfMeasurement);

	var mbRest;
	if(isMb>0) {
		mbRest = measurement;
	} else {
		mbRest = measurement * 1000;
	}

	var totalPlan = $('#boxPromocao > div > div > div > div:nth-child(3) > table > tbody > tr:nth-child(2) > td').html().trim().substring(258, 259) * 1000;
	
	var actualUsed = totalPlan - mbRest;

	var utopiaPerDay = totalPlan / diffDays;

	var utopiaUsed = Math.round(utopiaPerDay * diffInitialToToday);

	var utopiaPercent = (utopiaUsed / totalPlan ) * 100;

	var actualPercent = (actualUsed / totalPlan ) * 100;

	console.log('utopia = '+utopiaPercent+'%');
	console.log('used = '+actualPercent+'%');

	var color = actualPercent > utopiaPercent ? 'orange' : 'green';

	$('#boxBonus .table-responsive:last tr:last').after('<tr><td colspan="3"><div class="title">Utopia: uso = '+utopiaUsed +'Mb</div><div class="meter darkBlue"><span style="width: '+utopiaPercent+'%"></span></div></td></tr>');

	$('#boxBonus .table-responsive:last tr:last').after('<tr><td colspan="3"><div class="title">Atual: usado = '+actualUsed +'Mb</div><div class="meter '+ color +'"><span style="width: '+actualPercent+'%"></span></div></td></tr>');
});

function waitForElement(elementPath){
	window.setTimeout(function(){
		if(typeof $(elementPath) === "undefined" ){
			waitForElement(elementPath);
		}
	}, 100)
};
