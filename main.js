enchant(); // enchant.jsの有効化

var SCREEN_WIDTH = 1334;
var SCREEN_HEIGHT = 750;
var SCREEN_CENTER_X = SCREEN_WIDTH / 2;
var SCREEN_CENTER_Y = SCREEN_HEIGHT / 2;

//var SOUND_GREAT = 'sound/correct3.mp3';
var SOUND_GREAT = 'sound/button15.mp3';
var SOUND_GOOD  = 'sound/decision22.mp3';
//var SOUND_BAD   = 'sound/incorrect1.mp3';
var SOUND_BAD   = 'sound/button56.mp3';
var SOUND_ALERT = 'sound/warning2.mp3';

window.onload = function() {

	var core = new Core(1334, 750);
	core.preload('image/steering.png');

	core.preload(SOUND_GREAT);
	core.preload(SOUND_GOOD);
	core.preload(SOUND_BAD);
	core.preload(SOUND_ALERT);

	core.onload = function() {
		var bear = new Sprite(200, 200);
		bear.image = core.assets['image/steering.png'];
		bear.x = 0;
		bear.y = 0;
		core.rootScene.addChild(bear);

		var judgeLabel = new Label();
		judgeLabel.x = 280;
		judgeLabel.y = 128;
		judgeLabel.color = 'red';
		judgeLabel.font = '64px "Arial"';
		judgeLabel.text = 'GREAT';
		judgeLabel.visible = true;
		core.rootScene.addChild(judgeLabel);
		var comboCount = 0;

		var sleepDialog =　new Group();
		sleepDialog.x = SCREEN_WIDTH;
		sleepDialog.y = 100;
		{
			dialogWidth  = 500;
			dialogHeight = 500;
			sprite = new Sprite(dialogWidth, dialogHeight);
			surf = new Surface(dialogWidth, dialogHeight);
			surf.context.beginPath();
			surf.context.fillStyle = 'rgba(32, 32, 32, 0.5)';
			surf.context.fillRect(0, 0, dialogWidth, dialogHeight);
			sprite.image = surf;
			sleepDialog.addChild(sprite);

			label = new Label();
			label.y = 100;
			label.width = dialogWidth;
			label.color = 'red';
			label.font = '32px "Arial"';
			label.textAlign = 'center';
			label.text = 'ねむそうだよ。起こせ';
			sleepDialog.addChild(label);

			label = new Label();
			label.y = 200;
			label.width = dialogWidth;
			label.color = 'white';
			label.font = '32px "Arial"';
			label.textAlign = 'center';
			label.text = 'いい感じの画像';
			sleepDialog.addChild(label);

			label = new Label();
			label.y = 300;
			label.width = dialogWidth;
			label.color = 'black';
			label.font = '32px "Arial"';
			label.textAlign = 'center';
			label.text = '消す';
			label.addEventListener('touchstart', function(){
				sleepDialog.tl.fadeOut(20);
				sleepDialog.x = SCREEN_WIDTH;
			})
			sleepDialog.addChild(label);

		}

		sleepDialog.visible = false;
		core.rootScene.addChild(sleepDialog);

		var label = new Label();
		label.x = 280;
		label.y = 5;
		label.color = 'red';
		label.font = '64px "Arial"';
		label.text = 'TOUCH';
		label.addEventListener('touchstart', function(){
			console.log('touched');
			//judgeLabel.visible = true;
			judge = randomJudge();
			seFile = '';
			if (judge == 'GREAT') {
				comboCount++;
				judgeLabel.text = 'GREAT ' + comboCount;
				judgeLabel.color = 'red';
				seFile = SOUND_GREAT;
			}
			else if (judge == 'GOOD') {
				comboCount++;
				judgeLabel.text = 'GOOD ' + comboCount;
				judgeLabel.color = 'orange';
				seFile = SOUND_GOOD;
			}
			else {
				comboCount = 0;
				judgeLabel.text = 'BAD'
				judgeLabel.color = 'gray';
				seFile = SOUND_BAD;
			}
			se = core.assets[seFile].clone();
			se.play();
			var dy = 20;
			judgeLabel.tl.fadeIn(1).moveBy(0, dy, 10, enchant.Easing.BOUNCE_EASEOUT).delay(10).hide();
			judgeLabel.y -= dy;
			//judgeLabel.visible = false;
		});
		core.rootScene.addChild(label);

		var label2 = new Label();
		label2.x = 600;
		label2.y = 5;
		label2.color = 'red';
		label2.font = '64px "Arial"';
		label2.text = 'SLEEP';
		label2.addEventListener('touchstart', function(){
			console.log('touched2');
			se = core.assets[SOUND_ALERT].clone();
			se.play();
			sleepDialog.visible = true;
			sleepDialog.tl.fadeIn(1).moveTo(SCREEN_CENTER_X-250, sleepDialog.y, 20);
		});
		core.rootScene.addChild(label2);

	};
	core.start();
};

function randomJudge() {
	var r = Math.floor(Math.random() * 100);
	if (r < 40) {
		return 'GREAT';
	}
	else if (r < 80) {
		return 'GOOD';
	}
	else {
		return 'Bad';
	}
}
