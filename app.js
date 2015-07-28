var faker = require('faker');
var randomWords = require('random-words');
var shuffle = require('knuth-shuffle').knuthShuffle;

var openingStatements = [
	'hi',
	'hi im $',
	'hi im $ nice to meet you',
	'hello',
	'hello im $',
	'whats up',
	'whats up my name is $',
	'hows it going',
	'hows it going im $',
	'nice to meet you',
	'nice to meet you im $',
];

var problemIntros = [
	'i need your help',
	'theres something i dont understand',
	'i have a problem with my device',
	'i have a problem with my phone',
	'im having trouble with my phone',
	'i need you to explain something to me',
	'will you be able to help me with something',
];

var actionByProblemDescriptions = [
	{ description: 'my kids keep telling me i have to install $', action: 'InstallApp:$' },
	{ description: 'id like to set up $', action: 'InstallApp:$' },
	{ description: 'i want to join $', action: 'InstallApp:$' },
	{ description: 'i cant find', action: 'RemoteAccess' },
	{ description: 'where can i find', action: 'RemoteAccess' },
	{ description: 'how do i set up a wifi network', action: 'RemoteNavigation:WifiSettings' },
	{ description: 'how do i set up an email account', action: 'RemoteNavigation:AccountSettings' },
	{ description: '$ is annoying me', action: 'UninstallApp:$' },
	{ description: 'i want to remove $', action: 'UninstallApp:$' },
	{ description: 'how can i turn on bluetooth', action: 'Settings:ToggleBluetooth' },
	{ description: 'how can i turn off bluetooth', action: 'Settings:ToggleBluetooth' },
	{ description: 'how do i make my screen brigher', action: 'Settings:SetBrightnessLevel' },
	{ description: 'i cant see anything on the display', action: 'Settings:SetBrightnessLevel' },
	{ description: 'the display is too dark', action: 'Settings:SetBrightnessLevel' },
	{ description: 'the display is too bright', action: 'Settings:SetBrightnessLevel' },
	{ description: 'gps doesnt work', action: 'Settings:ToggleGps' },
	{ description: 'the device cant find my location', action: 'Settings:ToggleGps' },
];

var appNames = [
	'whatsapp',
	'facebook',
	'instagram',
	'twitter',
	'linkedin',
];

var problemDescriptionAdditions = [
	'can you help me with this',
	'is this something you can solve',
	'is this something you can help me with',
	'what do you think',
	'what do you think i should do',
	'how do i solve this',
	'how can you help me',
	'what do i do now',
	'can you fix it',
	'can you remedy this',
];

var closingStatements = [
	'thanks',
	'thanks a lot',
	'i appreicate it',
	'that was great',
	'thanks for nothing',
	'that was not helpful',
	'that was helpful',
	'thanks for solving the problem',
	'im much happier now',
	'great job',
	'looks great, thanks',
];


function random(min, max) {
	return Math.floor(Math.random() * max) + min;
};

function sentence() {
	var words = '';
	for (var i = 0; i < random(0, 18); i++) {
		words = words + " " + randomWords();
	}
	return words;
};

function createText() {
	var text = '';
	for (var i = 0; i < arguments.length; i++) {
		text = text + " " + arguments[i];
	}

	return text;
};

var result = [];
for (var i1 = 0; i1 < openingStatements.length; i1++) {
	var opening = openingStatements[i1];
	for (var i2 = 0; i2 < problemIntros.length; i2++) {
		var intro = problemIntros[i2];
		for (var i3 = 0; i3 < actionByProblemDescriptions.length; i3++) {
			var action = actionByProblemDescriptions[i3].action;
			var description = actionByProblemDescriptions[i3].description;
			for (var i4 = 0; i4 < problemDescriptionAdditions.length; i4++) {
				var addition = problemDescriptionAdditions[i4];
				for (var i5 = 0; i5 < closingStatements.length; i5++) {
					var closing = closingStatements[i5];
					var appName = faker.random.arrayElement(appNames);

					var text = createText(
						opening.replace('$', faker.name.findName()),
						intro,
						sentence(),
						description.replace('$', appName),
						addition,
						closing);

					result.push({
						text: text,
						action: action.replace('$', appName),
					});
				}
			}
		}
	}
};

var randomizedResult = shuffle(result.slice(0));
for (var i = 0; i < randomizedResult.length; i++) {
	console.log(randomizedResult[i]);
}