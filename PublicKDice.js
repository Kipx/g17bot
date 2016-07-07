var Discord = require("discord.js");

var bot = new Discord.Client();

bot.on("message", function(message)
{
	var msg = message.content;
	//Dice roller
	if (msg.substr(0,1) === "(" & msg.substr(-1) === ")")
		rollDice(message, msg);
	if (msg.substr(0,1) === "!"){
		if (msg.slice(1,5).toLowerCase() === "ask8")
			eightBall(message);
	}
});

function rollDice(message, msg){
	var numDice = "";
	var numRoll = "";
	msg = msg.slice(1, -1);
	var stay = true;
	//Coinflip code
	if (msg.toLowerCase() === "coinflip"){
		var roll = Math.floor(Math.random() * 100 + 1);
		if (roll <= 50)
			bot.sendMessage(message.channel, message.author + " flips a coin:\n" + "Tails!");
		else
			bot.sendMessage(message.channel, message.author + " flips a coin:\n" + "Heads!");
		return true;
	}
	//End Coinflip Code
	while (stay){
		if (msg.length == 1)
			break;
		else if (!(isNaN(msg.substr(0,1))) & msg.substr(0,1) != " "){
			numDice += msg.substr(0,1);
			msg = msg.substr(1);
			numRoll = "1";
		}
		else if (msg.substr(0,1).toLowerCase() === "d"){
			if (numRoll != "1"){
				numDice = "1";
				stay = false;
				msg = msg.substr(1);
			}
			else{
				stay = false;
				msg = msg.substr(1);
			}
		}
		else
			break;
	}
	if (!stay){
		var mod = false;
		numDice = +numDice;
		stay = true;
		numRoll = "";
		while (stay){
			if (!(isNaN(msg.substr(0,1))) & msg.substr(0,1) != " "){
				numRoll += msg.substr(0,1);
				if (msg.length == 1)
					stay = false;
				else
					msg = msg.substr(1);
			}
			else if (msg.length != 1){
				switch (msg.substr(0,1)){
					case "+":
					case "-":
					case "/":
					case "*":
					case "%":
						mod = msg;
						break;
					default:
						break;
				}
				if (mod != false)
					stay = false;
				else
					return true;
			}
			else
				return true;
		}
		if (!stay){
			numRoll = +numRoll;
			msg = "";
			if (numDice === 1){
				var roll = Math.floor(Math.random() * (numRoll) + 1);
				if (roll === 1)
					msg += "__*" + roll + "*__";
				else if (roll === numRoll)
					msg += "**" + roll + "**";
				else
					msg += roll;
				if (mod){
					var numMod = "";
					var sNum = mod.substr(1);
					mod = mod.substr(0,1);
					stay = true;
					while (stay){
						if (!(isNaN(sNum.substr(0,1))) & sNum.substr(0,1) != " "){
							numMod += sNum.substr(0,1);
							if (sNum.length == 1)
								stay = false;
							else
								sNum = sNum.substr(1);
						}
						else
							return true;
					}
					numMod = +numMod;
					switch(mod){
						case "+":
							roll += numMod;
							msg += " + " + "__" + numMod + "__" + " = " + "__***" + roll + "***__";
							break;
						case "-":
							roll -= numMod;
							msg += " - " + "__" + numMod + "__" + " = " + "__***" + roll + "***__";
							break;
						case "/":
							roll /= numMod;
							msg += " / " + "__" + numMod + "__" + " = " + "__***" + roll + "***__";
							break;
						case "*":
							roll *= numMod;
							msg += " * " + "__" + numMod + "__" + " = " + "__***" + roll + "***__";
							break;
						case "%":
							roll %= numMod;
							msg += " % " + "__" + numMod + "__" + " = " + "__***" + roll + "***__";
							break;
						default:
							return true;
							break;
					}
				}
				bot.sendMessage(message, message.author + " rolls " + message.content + ":\n" 
					+ msg);
			}
			else{
				var total = 0;
				for (var i = 1; i <= numDice; i++){
					var roll = Math.floor(Math.random() * (numRoll) + 1)
					total += roll;
					if (roll === 1)
						msg += "__*" + roll + "*__";
					else if (roll === numRoll)
						msg += "**" + roll + "**";
					else
						msg += roll;
					if (i === numDice){
						if (mod){
							var numMod = "";
							var sNum = mod.substr(1);
							mod = mod.substr(0,1);
							stay = true;
							while (stay){
								if (!(isNaN(sNum.substr(0,1))) & sNum.substr(0,1) != " "){
									numMod += sNum.substr(0,1);
									if (sNum.length == 1)
										stay = false;
									else
										sNum = sNum.substr(1);
								}
								else
									return true;
							}
							numMod = +numMod;
							switch(mod){
								case "+":
									total += numMod;
									msg += " + " + "__" + numMod + "__";
									break;
								case "-":
									total -= numMod;
									msg += " - " + "__" + numMod + "__";
									break;
								case "/":
									total /= numMod;
									msg += " / " + "__" + numMod + "__";
									break;
								case "*":
									total *= numMod;
									msg += " * " + "__" + numMod + "__";
									break;
								case "%":
									total %= numMod;
									msg += " % " + "__" + numMod + "__";
									break;
								default:
									return true;
									break;
							}
						}
						msg += " = ";
					}
					else
						msg += " + ";
				}
				msg += "__***" + total + "***__";
				bot.sendMessage(message, message.author + " rolls " + message.content + ":\n"
					+ msg);
			}
		}
	}
}

function eightBall(message){
	var rand = Math.floor(Math.random() * 2000)
	switch(true){
		case rand < 100:
			bot.reply(message, "It is certain.");
			break;
		case rand >= 100 && rand < 200:
			bot.reply(message, "It is decidedly so.");
			break;
		case rand >= 200 && rand < 300:
			bot.reply(message, "Without a doubt.");
			break;
		case rand >= 300 && rand < 400:
			bot.reply(message, "Yes, definitely.");
			break;
		case rand >= 400 && rand < 500:
			bot.reply(message, "You may rely on it.");
			break;
		case rand >= 500 && rand < 600:
			bot.reply(message, "As I see it, yes.");
			break;
		case rand >= 600 && rand < 700:
			bot.reply(message, "Most likely.");
			break;
		case rand >= 700 && rand < 800:
			bot.reply(message, "Outlook good.");
			break;
		case rand >= 800 && rand < 900:
			bot.reply(message, "Yes.");
			break;
		case rand >= 900 && rand < 1000:
			bot.reply(message, "Signs point to yes.");
			break;
		case rand >= 1000 && rand < 1100:
			bot.reply(message, "Reply hazy try again.");
			break;
		case rand >= 1100 && rand < 1200:
			bot.reply(message, "Ask again later.");
			break;
		case rand >= 1200 && rand < 1300:
			bot.reply(message, "Better not tell you now.");
			break;
		case rand >= 1300 && rand < 1400:
			bot.reply(message, "Cannot predict now.");
			break;
		case rand >= 1400 && rand < 1500:
			bot.reply(message, "Concentrate and ask again.");
			break;
		case rand >= 1500 && rand < 1600:
			bot.reply(message, "Don't count on it.");
			break;
		case rand >= 1600 && rand < 1700:
			bot.reply(message, "My reply is no.");
			break;
		case rand >= 1700 && rand < 1800:
			bot.reply(message, "My sources say no.");
			break;
		case rand >= 1800 && rand < 1900:
			bot.reply(message, "Outlook not so good.");
			break;
		case rand >= 1900 && rand < 2000:
			bot.reply(message, "Very doubtful.");
			break;
		default:
			bot.reply(message, "Fuck you");
			break;
	}
}

bot.login("Bot Email", "Bot Password");