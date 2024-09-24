
const { Idiomas } = require('./enums/Idiomas.js');
const { translationsDictionary } = require('./strings/AnswerStrings.js');
const { States } = require('./enums/States.js');
const mongoObj = require('./MongoFacade.js');
const { Monedas } = require('./enums/Monedas.js');
const { Actions } = require('./enums/Actions.js');
const Utils = require('./Utils.js');
const { guideTranslations } = require('./strings/GuideStrings.js');

function Start()
{
	return translationsDictionary.HelpMessage[Idiomas.english];
}
function NoStart(userLanguage)
{
	switch(userLanguage)
	{
		case Idiomas.spanish:
			return translationsDictionary['AlreadyStartedMessage'][Idiomas.spanish];
		case Idiomas.english:
		default:
			return translationsDictionary['AlreadyStartedMessage'][Idiomas.english];
	}
}

async function ChangeLang(userLanguage, text, userConvState)
{
	let response = {};
	switch (userConvState.name)
	{
		case States.normal:
			userConvState.name=States.waiting1;
			response.text = translationsDictionary.SelectYourLanguage[userLanguage];
			response.reply_keyboard = {
				reply_markup: {
					inline_keyboard: 
					[
						[{ text: 'English', callback_data: Idiomas.english }],
						[{ text: 'Español', callback_data: Idiomas.spanish }],
						[{ text: translationsDictionary.KeyboardCancelOption[userLanguage], callback_data: 'option_of_cancel' }],
					],
				}
			};
			return response;
		case States.waiting1:
			userConvState.name=States.normal;
			if(text==='option_of_cancel')
			{
				response.text = [];
				response.text.push(translationsDictionary.CancelledSuccessfully[userLanguage]);
				response.text.push(translationsDictionary.HelpMessage[userLanguage]);
				response.mark = true;
				return response;
			}
			let varLang = parseInt(text);
			if(varLang == NaN || !Idiomas.esUnIdioma(varLang))
			{
				response.text = translationsDictionary.UserIsStupid[userLanguage];
				response.mark = true;
				return response;
			}
			await mongoObj.uncommitSelectedAccount();
			await mongoObj.updateSelectedAccount({"misc.lang": varLang});
			await mongoObj.commitSelectedAccount();
			userLanguage = varLang;
			response.text = translationsDictionary.ChangedLangCorrectly[userLanguage];
			return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function ChangeCurrency(userLanguage, text, userConvState)
{
	let response = {};
	switch (userConvState.name)
	{
		case States.normal:
			userConvState.name=States.waiting1;
			response.text = translationsDictionary.SelectYourCurrency[userLanguage];
			response.reply_keyboard = {
				reply_markup: {
				  inline_keyboard: 
				  [
					[{ text: 'Euro (€)', callback_data: Monedas.euro }],
					[{ text: 'Dollar ($)', callback_data: Monedas.dolar }],
					[{ text: 'Libra (£)', callback_data: Monedas.libra }],
					[{ text: 'Yen (¥)', callback_data: Monedas.yen }],
					[{ text: translationsDictionary.KeyboardCancelOption[userLanguage], callback_data: 'option_of_cancel' }],
				  ],
				}
			};
			return response;
		case States.waiting1:
			userConvState.name=States.normal;
			if(text==='option_of_cancel')
			{
				response.text = [];
				response.text.push(translationsDictionary.CancelledSuccessfully[userLanguage]);
				response.text.push(translationsDictionary.HelpMessage[userLanguage]);
				response.mark = true;
				return response;
			}
			if(text == null || text == '' || !Monedas.esUnaMoneda(text))
			{
				response.text = translationsDictionary.UserIsStupid[userLanguage];
				response.mark = true;
				return response;
			}
			await mongoObj.uncommitSelectedAccount();
			await mongoObj.updateSelectedAccount({"misc.currency": text});
			await mongoObj.commitSelectedAccount();
			response.text = translationsDictionary.ChangedCurrencyCorrectly[userLanguage] + text;
			return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

function Help(userLanguage)
{
	let response = [];
	response.push({text: translationsDictionary.HelpMessage[userLanguage], mark: true});
	response.push({text: translationsDictionary.MyContact[userLanguage], mark: false});
	return response;
}

async function Guide(userLanguage, text, userConvState)
{
	let responseKeyBoardPrincipal = {
		text: translationsDictionary.SelectYourGuide[userLanguage],
		reply_keyboard: {
			reply_markup: {
				inline_keyboard: 
				[
					[{ text: guideTranslations.GeneralSummaryTag[userLanguage], callback_data: '/guideSummary' }],
					[{ text: guideTranslations.DisclaimerTag[userLanguage], callback_data: '/guideDisclaimer' }],
					[{ text: guideTranslations.AboutLanguageAndCurrencyTag[userLanguage], callback_data: '/guideLanguageCurrency' }],
					[{ text: guideTranslations.AboutMoneyAndBoxesTag[userLanguage], callback_data: '/guideBoxesMoney' }],
					[{ text: guideTranslations.AboutPeriodicalPaymentsTag[userLanguage], callback_data: '/guidePeriodicalPayments' }],
					[{ text: guideTranslations.ExitTag[userLanguage], callback_data: '/guideExit' }],
				],
			}
		}
	};
	let responseKeyBoardBoxesMoney = {
		text: translationsDictionary.SelectYourGuide[userLanguage],
		reply_keyboard: {
			reply_markup: {
				inline_keyboard: 
				[
					[{ text: guideTranslations.AboutAddingMoneyTag[userLanguage], callback_data: '/guideAddMoney' }],
					[{ text: guideTranslations.AboutMoneyBoxesTag[userLanguage], callback_data: '/guideMoneyBoxes' }],
					[{ text: guideTranslations.AboutDebtsTag[userLanguage], callback_data: '/guideDebts' }],
					[{ text: guideTranslations.AboutFuturePurchasesTag[userLanguage], callback_data: '/guideFutures' }],
					[{ text: guideTranslations.GoBackTag[userLanguage], callback_data: '/guideGoBack' }],
				],
			}
		}
	};
	let responseKeyBoardPeriodical = {
		text: translationsDictionary.SelectYourGuide[userLanguage],
		reply_keyboard: {
			reply_markup: {
				inline_keyboard: 
				[
					[{ text: guideTranslations.SpecificSummaryTag[userLanguage], callback_data: '/guideSpecificSummary' }],
					[{ text: guideTranslations.SpecificDifferencesTag[userLanguage], callback_data: '/guideDifferences' }],
					[{ text: guideTranslations.SpecificExampleTag[userLanguage], callback_data: '/guideExample' }],
					[{ text: guideTranslations.GoBackTag[userLanguage], callback_data: '/guideGoBack' }],
				],
			}
		}
	};
	let responseKeyBoardThirdLevel = {
		text: translationsDictionary.SelectYourGuide[userLanguage],
		reply_keyboard: {
			reply_markup: {
				inline_keyboard: 
				[
					[{ text: guideTranslations.SpecificSummaryTag[userLanguage], callback_data: '/guideSpecificSummary' }],
					[{ text: guideTranslations.SpecificExampleTag[userLanguage], callback_data: '/guideExample' }],
					[{ text: guideTranslations.GoBackTag[userLanguage], callback_data: '/guideGoBack' }],
				],
			}
		}
	};
	let response = {};
	let responseMultiple = [];
	let varTemp="";
	console.log(userConvState.name);
	switch (userConvState.name)
	{
		case States.normal:
			userConvState.name=States.waiting1;
			return responseKeyBoardPrincipal;
		case States.waiting1:
			switch(text)
			{
				case '/guideSummary':
					response.text = guideTranslations.GeneralSummary[userLanguage];
					response.mark=true;
					responseMultiple.push(response);
					responseMultiple.push(responseKeyBoardPrincipal);
					return responseMultiple;
				case '/guideDisclaimer':
					response.text = guideTranslations.Disclaimer[userLanguage];
					response.mark=true;
					responseMultiple.push(response);
					responseMultiple.push(responseKeyBoardPrincipal);
					return responseMultiple;
				case '/guideLanguageCurrency':
					response.text = guideTranslations.AboutLanguageAndCurrency[userLanguage];
					response.mark=true;
					responseMultiple.push(response);
					responseMultiple.push(responseKeyBoardPrincipal);
					return responseMultiple;
				case '/guideBoxesMoney':
					await mongoObj.updateSelectedAccount({"misc.temp": '/guideBoxesMoney'});
					userConvState.name=States.waiting2;
					return responseKeyBoardBoxesMoney;
				case '/guidePeriodicalPayments':
					await mongoObj.updateSelectedAccount({"misc.temp": '/guidePeriodicalPayments'});
					userConvState.name=States.waiting2;
					return responseKeyBoardPeriodical;
				case '/guideExit':
					userConvState.name=States.normal;
					return Help(userLanguage);
			}
		case States.waiting2:
			varTemp = (await mongoObj.getSelectedAccount()).misc.temp;
			if(varTemp == '/guideBoxesMoney')
			{
				switch(text)
				{
					case '/guideAddMoney':
						response.text = guideTranslations.AboutAddingMoney[userLanguage];
						response.mark=true;
						responseMultiple.push(response);
						responseMultiple.push(responseKeyBoardBoxesMoney);
						return responseMultiple;
					case '/guideMoneyBoxes':
						await mongoObj.updateSelectedAccount({"misc.temp": '/guideMoneyBoxes'});
						userConvState.name=States.waiting3;
						return responseKeyBoardThirdLevel;
					case '/guideDebts':
						await mongoObj.updateSelectedAccount({"misc.temp": '/guideDebts'});
						userConvState.name=States.waiting3;
						return responseKeyBoardThirdLevel;
					case '/guideFutures':
						await mongoObj.updateSelectedAccount({"misc.temp": '/guideFutures'});
						userConvState.name=States.waiting3;
						return responseKeyBoardThirdLevel;
					case '/guideGoBack':
						userConvState.name = States.waiting1;
						return responseKeyBoardPrincipal;
				}
			} else if (varTemp == '/guidePeriodicalPayments')
			{
				switch(text)
				{
					case '/guideSpecificSummary':
						response.text = guideTranslations.SpecificSummaryPeriodical[userLanguage];
						response.mark=true;
						responseMultiple.push(response);
						responseMultiple.push(responseKeyBoardPeriodical);
						return responseMultiple;
					case '/guideDifferences':
						response.text = guideTranslations.SpecificDifferencesPeriodical[userLanguage];
						response.mark=true;
						responseMultiple.push(response);
						responseMultiple.push(responseKeyBoardPeriodical);
						return responseMultiple;
					case '/guideExample':
						response.text = guideTranslations.SpecificExamplePeriodical[userLanguage];
						response.mark=true;
						responseMultiple.push(response);
						responseMultiple.push(responseKeyBoardPeriodical);
						return responseMultiple;
					case '/guideGoBack':
						userConvState.name = States.waiting1;
						return responseKeyBoardPrincipal;
				}
			} else
			{
				response.text = translationsDictionary.UserIsStupid[userLanguage];
				response.mark = true;
				return response;
			}
		case States.waiting3:
			varTemp = (await mongoObj.getSelectedAccount()).misc.temp;
			if(varTemp == '/guideMoneyBoxes')
			{
				switch(text)
				{
					case '/guideSpecificSummary':
						response.text = guideTranslations.SpecificSummaryBoxes[userLanguage];
						response.mark=true;
						responseMultiple.push(response);
						responseMultiple.push(responseKeyBoardThirdLevel);
						return responseMultiple;
					case '/guideExample':
						response.text = guideTranslations.SpecificExampleBoxes[userLanguage];
						response.mark=true;
						responseMultiple.push(response);
						responseMultiple.push(responseKeyBoardThirdLevel);
						return responseMultiple;
					case '/guideGoBack':
						userConvState.name = States.waiting2;
						await mongoObj.updateSelectedAccount({"misc.temp": '/guideBoxesMoney'});
						return responseKeyBoardBoxesMoney;
				}
			} else if (varTemp == '/guideDebts')
			{
				switch(text)
				{
					case '/guideSpecificSummary':
						response.text = guideTranslations.SpecificSummaryDebts[userLanguage];
						response.mark=true;
						responseMultiple.push(response);
						responseMultiple.push(responseKeyBoardThirdLevel);
						return responseMultiple;
					case '/guideExample':
						response.text = guideTranslations.SpecificExampleDebts[userLanguage];
						response.mark=true;
						responseMultiple.push(response);
						responseMultiple.push(responseKeyBoardThirdLevel);
						return responseMultiple;
					case '/guideGoBack':
						userConvState.name = States.waiting2;
						await mongoObj.updateSelectedAccount({"misc.temp": '/guideBoxesMoney'});
						return responseKeyBoardBoxesMoney;
				}
			}else if (varTemp == '/guideFutures')
			{
				switch(text)
				{
					case '/guideSpecificSummary':
						response.text = guideTranslations.SpecificSummaryFutures[userLanguage];
						response.mark=true;
						responseMultiple.push(response);
						responseMultiple.push(responseKeyBoardThirdLevel);
						return responseMultiple;
					case '/guideExample':
						response.text = guideTranslations.SpecificExampleFutures[userLanguage];
						response.mark=true;
						responseMultiple.push(response);
						responseMultiple.push(responseKeyBoardThirdLevel);
						return responseMultiple;
					case '/guideGoBack':
						userConvState.name = States.waiting2;
						await mongoObj.updateSelectedAccount({"misc.temp": '/guideBoxesMoney'});
						return responseKeyBoardBoxesMoney;
				}
			}else
			{
				response.text = translationsDictionary.UserIsStupid[userLanguage];
				response.mark = true;
				return response;
			}
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function MyWallet(userLanguage)
{
	const user = await mongoObj.getSelectedAccount();
	let response = {};
	response.mark = true;
	const currentcurrency = user.misc.currency;
	let text = "";
	let userTotalMoney = user.money.total;
	let totalmoneyused = 0;
	let totalDebt = 0;
	switch(userLanguage)
	{
		case Idiomas.spanish:
			text += "Tienes *" + userTotalMoney + currentcurrency + "* totales en la cuenta.\n\n";
			if(user.boxes.counter === 0)
			{
				text += "No tienes ninguna hucha guardando dinero actualmente.\n\n"
			}else
			{
				text += "Tus huchas son las siguientes:\n";
				for(let h of user.boxes.boxes)
				{
					text += "  · Nombre: *"+ h.name + "*\n    · Dinero actual: " + h.value + currentcurrency +
						"\n    · Tope: " + h.maxValue + currentcurrency + "\n    · Restante: " + Utils.getPriceFormat(h.maxValue - h.value) + currentcurrency + "\n";
					totalmoneyused += h.value;
				}
				text += "\n";
			}
			if(user.debts.counter === 0)
			{
				text += "No tienes ninguna deuda pendiente de cobrar actualmente.\n\n"
			}else
			{
				text += "Tus deudas pendientes son:\n";
				for(let h of user.debts.debts)
				{
					text += "  · Nombre de quien te debe: *"+ h.name + "*\n    · Dinero a recibir: " + h.value + currentcurrency + "\n";
					totalDebt += h.value;
				}
				text += "\n";
			}
			if(user.monthly.counter === 0)
			{
				text += "No tienes ningún pago mensual registrado.\n\n"
			}else
			{
				text += "Tus pagos mensuales son los siguientes:\n";
				for(let h of user.monthly.taxes)
					text += "  · Nombre del pago: *"+ h.name + "*\n    · Coste: " + h.value + currentcurrency + "\n";
				text += "El total de dinero a pagar cada mes es " + Utils.getPriceFormat(user.monthly.moneyneeded/2) + currentcurrency + "\n";
				text += "El máximo de dinero permitido para destinar a estos gastos es " + user.monthly.moneyneeded + currentcurrency + "\n";
				text += "El dinero depositado para el próximo mes es " + user.monthly.currentmoney + currentcurrency + "\n";
				text += "Todavía puedes depositar " + Utils.getPriceFormat(user.monthly.moneyneeded - user.monthly.currentmoney) + currentcurrency + " más para estos gastos\n\n";
				totalmoneyused += user.monthly.currentmoney;
			}
			if(user.yearly.counter === 0)
			{
				text += "No tienes ningún pago anual registrado.\n\n"
			}else
			{
				text += "Tus pagos anuales son los siguientes:\n";
				for(let h of user.yearly.taxes)
					text += "  · Nombre del pago: *"+ h.name + "*\n    · Coste: " + h.value + currentcurrency + "\n";
				text += "El total de dinero a pagar cada año es " + user.yearly.moneyneeded + currentcurrency + "\n";
				text += "El dinero depositado a para el próximo año es " + user.yearly.currentmoney + currentcurrency + "\n";
				text += "El dinero restante para los pagos del próximo año es " + Utils.getPriceFormat(user.yearly.moneyneeded - user.yearly.currentmoney) + currentcurrency + "\n\n";
				totalmoneyused += user.yearly.currentmoney;
			}
			if(user.others.counter === 0)
			{
				text += "No tienes ningún pago no periódico registrado.\n\n"
			}else
			{
				text += "Tus pagos no periódicos son los siguientes:\n";
				for(let h of user.others.taxes)
					text += "  · Nombre del pago: *"+ h.name + "*\n    · Coste: " + h.value + currentcurrency + "\n";
				text += "El total de dinero a pagar es " + Utils.getPriceFormat(user.others.moneyneeded/2) + currentcurrency + "\n";
				text += "El máximo de dinero permitido para destinar a estos gastos es " + user.others.moneyneeded + currentcurrency + "\n";
				text += "El dinero depositado a pagar es " + user.others.currentmoney + currentcurrency + "\n";
				text += "Todavía puedes depositar " + Utils.getPriceFormat(user.others.moneyneeded - user.others.currentmoney) + currentcurrency + " más para estos gastos\n\n";
				totalmoneyused += user.others.currentmoney;
			}
			if(user.futures.counter === 0)
			{
				text += "No tienes ninguna compra futura registrada.\n\n"
			}else
			{
				text += "Tus compras futuras son las siguientes:\n";
				for(let h of user.futures.purchases)
					text += "  · Nombre del producto: *"+ h.name + "*\n    · Precio: " + h.value + currentcurrency + "\n";
				text += "El total de dinero a pagar es " + user.futures.moneyneeded + currentcurrency + "\n";
				text += "El dinero depositado a pagar es " + user.futures.currentmoney + currentcurrency + "\n";
				text += "El dinero restante para los momentos de pago es " + Utils.getPriceFormat(user.futures.moneyneeded - user.futures.currentmoney) + currentcurrency + "\n\n";
				totalmoneyused += user.futures.currentmoney;
			}
			totalmoneyused = Utils.getPriceFormat(totalmoneyused);
			text += "El dinero total organizado es de *" + totalmoneyused + currentcurrency + "*\n";
			text += "El dinero sobrante es de *" + Utils.getPriceFormat(userTotalMoney - totalmoneyused) + currentcurrency + "*\n";
			text += "El dinero sobrante después de cobrar las deudas sería de *" + Utils.getPriceFormat(userTotalMoney - totalmoneyused + totalDebt) + currentcurrency + "*";
			break;
		case Idiomas.english:
		default:
			text += "You've got a total of *" + userTotalMoney + currentcurrency + "* in your account.\n\n";
			if(user.boxes.counter === 0)
			{
				text += "You currently have no money boxes.\n\n"
			}else
			{
				text += "You've got the following money boxes:\n";
				for(let h of user.boxes.boxes)
				{
					text += "  · Name: *"+ h.name + "*\n    · Current money in: " + h.value + currentcurrency +
						"\n    · Limit: " + h.maxValue + currentcurrency + "\n    · Remaining: " + Utils.getPriceFormat(h.maxValue - h.value) + currentcurrency + "\n";
					totalmoneyused += h.value;
				}
			}
			if(user.debts.counter === 0)
			{
				text += "You currently have no pending debts.\n\n"
			}else
			{
				text += "Your pending debts are:\n";
				for(let h of user.debts.debts)
				{
					text += "  · Name of the one who owes you: *"+ h.name + "*\n    · Money to receive: " + h.value + currentcurrency + "\n";
					totalDebt += h.value;
				}
				text += "\n";
			}
			if(user.monthly.counter === 0)
			{
				text += "You currently have no monthly payments registered.\n\n"
			}else
			{
				text += "Your monthly payments are:\n";
				for(let h of user.monthly.taxes)
					text += "  · Name of the tax: *"+ h.name + "*\n    · Cost: " + h.value + currentcurrency + "\n";
				text += "Total money to pay every month is " + Utils.getPriceFormat(user.monthly.moneyneeded/2) + currentcurrency + "\n";
				text += "Money you can store only for these taxes is " + user.monthly.moneyneeded + currentcurrency + "\n";
				text += "Money stored for the next month is " + user.monthly.currentmoney + currentcurrency + "\n";
				text += "You can store " + Utils.getPriceFormat(user.monthly.moneyneeded - user.monthly.currentmoney) + currentcurrency + " more in these taxes\n\n";
				totalmoneyused += user.monthly.currentmoney;
			}
			if(user.yearly.counter === 0)
			{
				text += "You currently have no yearly payments registered.\n\n"
			}else
			{
				text += "Your yearly payments are:\n";
				for(let h of user.yearly.taxes)
					text += "  · Name of the tax: *"+ h.name + "*\n    · Cost: " + h.value + currentcurrency + "\n";
				text += "Total money to pay every year is " + Utils.getPriceFormat(user.yearly.moneyneeded/2) + currentcurrency + "\n";
				text += "Money stored for next year is " + user.yearly.currentmoney + currentcurrency + "\n";
				text += "Remaining money for next year taxes is " + Utils.getPriceFormat(user.yearly.moneyneeded - user.yearly.currentmoney) + currentcurrency + "\n\n";
				totalmoneyused += user.yearly.currentmoney;
			}
			if(user.others.counter === 0)
			{
				text += "You currently have no non-periodically payments registered.\n\n"
			}else
			{
				text += "Your non-periodical payments are:\n";
				for(let h of user.others.taxes)
					text += "  · Name of the tax: *"+ h.name + "*\n    · Cost: " + h.value + currentcurrency + "\n";
				text += "Total money to pay is " + Utils.getPriceFormat(user.others.moneyneeded/2) + currentcurrency + "\n";
				text += "Money you can store only for these taxes is " + user.others.moneyneeded + currentcurrency + "\n";
				text += "Money stored to pay is " + user.others.currentmoney + currentcurrency + "\n";
				text += "You can store " + Utils.getPriceFormat(user.others.moneyneeded - user.others.currentmoney) + currentcurrency + " more in these taxes\n\n";
				totalmoneyused += user.others.currentmoney;
			}
			if(user.futures.counter === 0)
			{
				text += "You have no future purchases registered.\n\n"
			}else
			{
				text += "Your future purchases are:\n";
				for(let h of user.futures.purchases)
					text += "  · Name of the product: *"+ h.name + "*\n    · Price: " + h.value + currentcurrency + "\n";
				text += "Total money to pay is " + user.futures.moneyneeded + currentcurrency + "\n";
				text += "Money stored to pay is " + user.futures.currentmoney + currentcurrency + "\n";
				text += "Remaining money for when the payments come is " + Utils.getPriceFormat(user.futures.moneyneeded - user.futures.currentmoney) + currentcurrency + "\n\n";
				totalmoneyused += user.futures.currentmoney;
			}
			totalmoneyused = Utils.getPriceFormat(totalmoneyused);
			text += "Total money stored and organised is *" + totalmoneyused + currentcurrency + "*\n";
			text += "The available money you have yet to store is *" + Utils.getPriceFormat(userTotalMoney - totalmoneyused) + currentcurrency + "*\n";
			text += "The available money you would have when you were paid the debts is *" + Utils.getPriceFormat(userTotalMoney - totalmoneyused + totalDebt) + currentcurrency + "*";
			break;
	}

	if(userTotalMoney !== Utils.getPriceFormat(user.money.remaining + totalmoneyused))
	{
		response.text = translationsDictionary.NoWalletMoneyCoincidence[userLanguage];
		response.mark = false;
		return response;
	}
	response.text = text;
	return response;
}

async function AddMoney(userLanguage, text, userConvState)
{
	let response = {};
	let user = await mongoObj.getSelectedAccount();
	switch (userConvState.name)
	{
		case States.normal:
			userConvState.name=States.waiting1;
			response.text = translationsDictionary.HowMuchMoney[userLanguage];
			return response;
		case States.waiting1:
			userConvState.name=States.normal;
			const currentcurrency = user.misc.currency;
			let textInput = text.replace(',', '.').replace('\'', '.');
			if(!Utils.validateMoneyNumber(textInput))
			{
				response.text = translationsDictionary.UserIsStupid[userLanguage];
				response.mark = true;
				return response;
			}
			let numberInput = Utils.getPriceFormat(textInput);
			let totalNumber = user.money.total;
			let remainingNumber = user.money.remaining;
			totalNumber += numberInput;
			remainingNumber += numberInput;
			totalNumber = Utils.getPriceFormat(totalNumber);
			remainingNumber = Utils.getPriceFormat(remainingNumber);
			await mongoObj.uncommitSelectedAccount();
			await mongoObj.updateSelectedAccount({"money.total": totalNumber, "money.remaining": remainingNumber});
			await mongoObj.commitSelectedAccount();
			response.mark = true;
			response.text = translationsDictionary.MoneyReceived1[userLanguage] + numberInput + currentcurrency + translationsDictionary.MoneyReceived2[userLanguage] + totalNumber + currentcurrency + "*.";
			return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function CreateHucha(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		switch(userConvState.name)
		{
			case States.normal:
				if(user.boxes.counter >= mongoObj.MAX_TOKENS)
				{
					response.text = translationsDictionary.AlreadyEnoughMoneyBoxes[userLanguage];
					return response;
				}
				response.text = translationsDictionary.TypeNewMoneyBoxName[userLanguage];
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.TypeNewMoneyBoxLimit[userLanguage];
				userConvState.name = States.waiting2;
				return response;
			case States.waiting2:
				let objectName = user.misc.temp;
				let textInput = text.replace(',', '.').replace('\'', '.');
				if(!Utils.validateMoneyNumber(textInput))
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				let numberInput = Utils.getPriceFormat(textInput);
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.incrementListCountofSelectedAccount("boxes");
				await mongoObj.pushToSelectedAccount("boxes.boxes", {name: objectName, value: 0, maxValue: numberInput});
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.MoneyBoxCreated1[userLanguage] + objectName + translationsDictionary.MoneyBoxCreated2[userLanguage];
				response.mark = true;
				userConvState.name = States.normal;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function AddMoneyToHucha(userLanguage, text, userConvState)
{
	let response = {};
	try{
		let user = await mongoObj.getSelectedAccount();
		let dbArrayObject = user.boxes.boxes;
		const currentcurrency = user.misc.currency;
		let dbObject;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.boxes.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoBoxesToOperateWith[userLanguage];
					return response;
				}
				if(user.money.remaining === 0)
				{
					response.text = translationsDictionary.YouHaveNoMoneyToOperateWith[userLanguage];
					return response;
				}
				response.text = translationsDictionary.SelectBoxToOperate1[userLanguage] + user.money.total + currentcurrency + translationsDictionary.SelectBoxToOperate2[userLanguage];
				response.mark = true;
				let keyboardbuttons = [];
				for(let dbElement of dbArrayObject)
					keyboardbuttons.push([{
						text: dbElement.name + ": " + dbElement.value + currentcurrency + "/" + dbElement.maxValue + currentcurrency, 
						callback_data: dbElement.name
					}]);
				keyboardbuttons.push([{
					text: translationsDictionary.KeyboardCancelOption[userLanguage],
					callback_data: 'option_of_cancel'
				}]);
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: keyboardbuttons,
					}
				};
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				if(text==='option_of_cancel')
				{
					userConvState.name = States.normal;
					response.text = [];
					response.text.push(translationsDictionary.CancelledSuccessfully[userLanguage]);
					response.text.push(translationsDictionary.HelpMessage[userLanguage]);
					response.mark = true;
					return response;
				}
				dbObject = user.boxes.boxes.find(obj => obj.name === text);
				if(dbObject == undefined)
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					userConvState.name = States.normal;
					return response;
				}
				if(dbObject.value === dbObject.maxValue)
				{
					response.text = translationsDictionary.MoneyBoxAlreadyFull[userLanguage];
					userConvState.name = States.normal;
					return response;
				}
				response.text = translationsDictionary.HowMuchMoneyToBox[userLanguage];
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				userConvState.name = States.waiting2;
				return response;
			case States.waiting2:
				userConvState.name = States.normal;
				dbObject = user.boxes.boxes.find(obj => obj.name === user.misc.temp);
				let textInput = text.replace(',', '.').replace('\'', '.');
				if(!Utils.validateMoneyNumber(textInput))
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				let numberInput = Utils.getPriceFormat(textInput);
				if(numberInput > user.money.remaining)
				{
					response.text = translationsDictionary.YouDontHaveThatMuchMoney[userLanguage];
					return response;
				}
				if(dbObject.value + numberInput > dbObject.maxValue)
				{
					response.text = translationsDictionary.MoneyBoxOverflows[userLanguage];
					return response;
				}
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"money.remaining": Utils.getPriceFormat(user.money.remaining - numberInput)});
				await mongoObj.changeValueFromListOfSelectedAccount("boxes.boxes", dbObject.name, Utils.getPriceFormat(dbObject.value + numberInput));
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.AddedMoneySuccesfully1[userLanguage] + numberInput + currentcurrency + 
					translationsDictionary.AddedMoneySuccesfully2[userLanguage] + dbObject.name + 
					translationsDictionary.AddedMoneySuccesfully3[userLanguage];
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function AddAllMoneyToHucha(userLanguage, text, userConvState)
{
	let response = {};
	try{
		let user = await mongoObj.getSelectedAccount();
		let dbArrayObject = user.boxes.boxes;
		let dbObject;
		const currentcurrency = user.misc.currency;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.boxes.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoBoxesToOperateWith[userLanguage];
					return response;
				}
				if(user.money.remaining === 0)
				{
					response.text = translationsDictionary.YouHaveNoMoneyToOperateWith[userLanguage];
					return response;
				}
				response.text = translationsDictionary.SelectBoxToOperate1[userLanguage] + user.money.total + currentcurrency + translationsDictionary.SelectBoxToOperate2[userLanguage];
				let keyboardbuttons = [];
				for(let dbElement of dbArrayObject)
					keyboardbuttons.push([{
						text: dbElement.name + ": " + dbElement.value + currentcurrency + "/" + dbElement.maxValue + currentcurrency, 
						callback_data: dbElement.name
					}]);
				keyboardbuttons.push([{
					text: translationsDictionary.KeyboardCancelOption[userLanguage],
					callback_data: 'option_of_cancel'
				}]);
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: keyboardbuttons,
					}
				};
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				if(text==='option_of_cancel')
				{
					userConvState.name = States.normal;
					response.text = [];
					response.text.push(translationsDictionary.CancelledSuccessfully[userLanguage]);
					response.text.push(translationsDictionary.HelpMessage[userLanguage]);
					response.mark = true;
					return response;
				}
				userConvState.name = States.waiting2;
				dbObject = user.boxes.boxes.find(obj => obj.name === text);

				if(dbObject.value === dbObject.maxValue)
				{
					response.text = translationsDictionary.MoneyBoxAlreadyFull[userLanguage];
					userConvState.name = States.normal;
					return response;
				}
				response.text = (user.money.remaining + dbObject.value < dbObject.maxValue) 
					?
					translationsDictionary.WeWillTransfer1[userLanguage] + user.money.remaining + currentcurrency +
					translationsDictionary.WeWillTransfer2[userLanguage] + Utils.getPriceFormat(user.money.remaining + dbObject.value) + currentcurrency +
					translationsDictionary.WeWillTransfer3[userLanguage]
					:
					translationsDictionary.WeWillTransfer1[userLanguage] + Utils.getPriceFormat(dbObject.maxValue - dbObject.value) + currentcurrency +
					translationsDictionary.WeWillTransfer2[userLanguage] + dbObject.maxValue + currentcurrency +
					translationsDictionary.WeWillTransfer2p5[userLanguage] +
					translationsDictionary.WeWillTransfer3[userLanguage];
				response.mark = true;
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: [ [
								{ text: translationsDictionary.KeyboardYesOption[userLanguage], callback_data: 'option_of_yes' },
								{ text: translationsDictionary.KeyboardNoOption[userLanguage], callback_data: 'option_of_no' },
							],
						]
					}
				};
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				return response;
			case States.waiting2:
				userConvState.name = States.normal;
				if(text === 'option_of_no')
				{
					response.text = '';
					return response;
				}
				if(text !== 'option_of_yes')
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				dbObject = user.boxes.boxes.find(obj => obj.name === user.misc.temp);
				let numberInput = (user.money.remaining + dbObject.value < dbObject.maxValue) ?
					user.money.remaining :
					dbObject.maxValue - dbObject.value;
				numberInput = Utils.getPriceFormat(numberInput);
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"money.remaining": Utils.getPriceFormat(user.money.remaining - numberInput)});
				await mongoObj.changeValueFromListOfSelectedAccount("boxes.boxes", dbObject.name, Utils.getPriceFormat(dbObject.value + numberInput));
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.AddedMoneySuccesfully1[userLanguage] + numberInput + currentcurrency + 
					translationsDictionary.AddedMoneySuccesfully2[userLanguage] + dbObject.name + 
					translationsDictionary.AddedMoneySuccesfully3[userLanguage];
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function RetireMoneyFromHucha(userLanguage, text, userConvState)
{
	let response = {};
	try{
		let user = await mongoObj.getSelectedAccount();
		let dbArrayObject = user.boxes.boxes;
		let dbObject;
		const currentcurrency = user.misc.currency;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.boxes.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoBoxesToOperateWith[userLanguage];
					return response;
				}
				response.text = translationsDictionary.SelectBoxToOperate1[userLanguage] + user.money.total + user.misc.currency + translationsDictionary.SelectBoxToOperate2[userLanguage];
				let keyboardbuttons = [];
				for(let dbElement of dbArrayObject)
					if(dbElement.value !== 0)
						keyboardbuttons.push([{
							text: dbElement.name + ": " + dbElement.value + currentcurrency + "/" + dbElement.maxValue + currentcurrency,
							callback_data: dbElement.name
						}]);
				keyboardbuttons.push([{
					text: translationsDictionary.KeyboardCancelOption[userLanguage],
					callback_data: 'option_of_cancel'
				}]);
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: keyboardbuttons,
					}
				};
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				if(text==='option_of_cancel')
				{
					userConvState.name = States.normal;
					response.text = [];
					response.text.push(translationsDictionary.CancelledSuccessfully[userLanguage]);
					response.text.push(translationsDictionary.HelpMessage[userLanguage]);
					response.mark = true;
					return response;
				}
				dbObject = user.boxes.boxes.find(obj => obj.name === text);
				if(dbObject == undefined)
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					userConvState.name = States.normal;
					return response;
				}
				response.text = translationsDictionary.HowMuchMoneyToGet[userLanguage];
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				userConvState.name = States.waiting2;
				return response;
			case States.waiting2:
				userConvState.name = States.normal;
				dbObject = user.boxes.boxes.find(obj => obj.name === user.misc.temp);
				let textInput = text.replace(',', '.').replace('\'', '.');
				if(!Utils.validateMoneyNumber(textInput))
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				let numberInput = Utils.getPriceFormat(textInput);
				if(numberInput > dbObject.value)
				{
					response.text = translationsDictionary.YouCantTakeThatMuchMoney[userLanguage];
					return response;
				}
				let newMoney = Utils.getPriceFormat(user.money.remaining + numberInput);
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"money.remaining": newMoney});
				await mongoObj.changeValueFromListOfSelectedAccount("boxes.boxes", dbObject.name, Utils.getPriceFormat(dbObject.value - numberInput));
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.RetiredMoneySuccessfully1[userLanguage] + numberInput + currentcurrency + 
					translationsDictionary.RetiredMoneySuccessfully2[userLanguage] + dbObject.name + 
					translationsDictionary.RetiredMoneySuccessfully3[userLanguage] + newMoney +
					translationsDictionary.RetiredMoneySuccessfully4[userLanguage];
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function SpendMoneyFromHucha(userLanguage, text, userConvState)
{
	let response = {};
	try{
		let user = await mongoObj.getSelectedAccount();
		let dbArrayObject = user.boxes.boxes;
		let dbObject;
		const currentcurrency = user.misc.currency;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.boxes.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoBoxesToOperateWith[userLanguage];
					return response;
				}
				response.text = translationsDictionary.SelectBoxToSubstract[userLanguage];
				let keyboardbuttons = [];
				for(let dbElement of dbArrayObject)
					if(dbElement.value !== 0)
						keyboardbuttons.push([{
							text: dbElement.name + ": " + dbElement.value + currentcurrency + "/" + dbElement.maxValue + currentcurrency,
							callback_data: dbElement.name
						}]);
				keyboardbuttons.push([{
					text: translationsDictionary.KeyboardCancelOption[userLanguage],
					callback_data: 'option_of_cancel'
				}]);
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: keyboardbuttons,
					}
				};
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				if(text==='option_of_cancel')
				{
					userConvState.name = States.normal;
					response.text = [];
					response.text.push(translationsDictionary.CancelledSuccessfully[userLanguage]);
					response.text.push(translationsDictionary.HelpMessage[userLanguage]);
					response.mark = true;
					return response;
				}
				dbObject = user.boxes.boxes.find(obj => obj.name === text);
				if(dbObject == undefined)
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					userConvState.name = States.normal;
					return response;
				}
				response.text = translationsDictionary.HowMuchMoneyToSpend[userLanguage];
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				userConvState.name = States.waiting2;
				return response;
			case States.waiting2:
				userConvState.name = States.normal;
				dbObject = user.boxes.boxes.find(obj => obj.name === user.misc.temp);
				let textInput = text.replace(',', '.').replace('\'', '.');
				if(!Utils.validateMoneyNumber(textInput))
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				let numberInput = Utils.getPriceFormat(textInput);
				if(numberInput > dbObject.value)
				{
					response.text = translationsDictionary.YouCantTakeThatMuchMoney[userLanguage];
					return response;
				}
				let newMoneyTotal = Utils.getPriceFormat(user.money.total - numberInput);
				let newMoneyBox = Utils.getPriceFormat(dbObject.value - numberInput);
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"money.total": newMoneyTotal});
				await mongoObj.changeValueFromListOfSelectedAccount("boxes.boxes", dbObject.name, newMoneyBox);
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.SpentMoneySuccessfully1[userLanguage] + numberInput + currentcurrency + 
					translationsDictionary.SpentMoneySuccessfully2[userLanguage] + dbObject.name + 
					translationsDictionary.SpentMoneySuccessfully3[userLanguage] + newMoneyBox + currentcurrency +
					translationsDictionary.SpentMoneySuccessfully4[userLanguage] + newMoneyTotal + currentcurrency +
					translationsDictionary.SpentMoneySuccessfully5[userLanguage];
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function DeleteHucha(userLanguage, text, userConvState)
{
	let response = {};
	try{
		let user = await mongoObj.getSelectedAccount();
		let dbArrayObject = user.boxes.boxes;
		let dbObject;
		const currentcurrency = user.misc.currency;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.boxes.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoBoxesToOperateWith[userLanguage];
					return response;
				}
				response.text = translationsDictionary.SelectBoxToDelete[userLanguage];
				let keyboardbuttons = [];
				for(let dbElement of dbArrayObject)
					keyboardbuttons.push([{
						text: dbElement.name + ": " + dbElement.value + currentcurrency + "/" + dbElement.maxValue + currentcurrency,
						callback_data: dbElement.name
					}]);
				keyboardbuttons.push([{
					text: translationsDictionary.KeyboardCancelOption[userLanguage],
					callback_data: 'option_of_cancel'
				}]);
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: keyboardbuttons,
					}
				};
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				if(text==='option_of_cancel')
				{
					userConvState.name = States.normal;
					response.text = [];
					response.text.push(translationsDictionary.CancelledSuccessfully[userLanguage]);
					response.text.push(translationsDictionary.HelpMessage[userLanguage]);
					response.mark = true;
					return response;
				}
				userConvState.name = States.waiting2;
				dbObject = user.boxes.boxes.find(obj => obj.name === text);
				if(dbObject == undefined)
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					userConvState.name = States.normal;
					return response;
				}
				response.text = translationsDictionary.SureToDeleteBox1[userLanguage] + dbObject.name + translationsDictionary.SureToDeleteBox2[userLanguage];
				response.mark = true;
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: [ [
								{ text: translationsDictionary.KeyboardYesOption[userLanguage], callback_data: 'option_of_yes' },
								{ text: translationsDictionary.KeyboardNoOption[userLanguage], callback_data: 'option_of_no' },
							],
						]
					}
				};
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				return response;
			case States.waiting2:
				userConvState.name = States.normal;
				if(text === 'option_of_no')
				{
					response.text = '';
					return response;
				}
				if(text !== 'option_of_yes')
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				dbObject = user.boxes.boxes.find(obj => obj.name === user.misc.temp);
				let newMoney = Utils.getPriceFormat(user.money.remaining + dbObject.value);
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.deleteElementFromListOfSelectedAccount("boxes.boxes", dbObject.name);
				await mongoObj.updateSelectedAccount({"money.remaining": newMoney});
				await mongoObj.decrementListCountofSelectedAccount("boxes")
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.BoxDeletedSuccessfully1[userLanguage] + dbObject.name + 
					translationsDictionary.BoxDeletedSuccessfully2[userLanguage] + newMoney + currentcurrency + 
					translationsDictionary.BoxDeletedSuccessfully3[userLanguage];
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function CreateDebt(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		switch(userConvState.name)
		{
			case States.normal:
				if(user.debts.counter >= mongoObj.MAX_TOKENS)
				{
					response.text = translationsDictionary.AlreadyEnoughDebts[userLanguage];
					return response;
				}
				response.text = translationsDictionary.TypeNewDebtName[userLanguage];
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.TypeNewDebtInitial[userLanguage];
				userConvState.name = States.waiting2;
				return response;
			case States.waiting2:
				let objectName = user.misc.temp;
				let textInput = text.replace(',', '.').replace('\'', '.');
				if(!Utils.validateMoneyNumber(textInput))
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				let numberInput = Utils.getPriceFormat(textInput);
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.incrementListCountofSelectedAccount("debts");
				await mongoObj.pushToSelectedAccount("debts.debts", {name: objectName, value: numberInput});
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.DebtCreated1[userLanguage] + objectName + translationsDictionary.DebtCreated2[userLanguage];
				response.mark = true;
				userConvState.name = States.normal;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function IncreaseDebt(userLanguage, text, userConvState)
{
	let response = {};
	try{
		let user = await mongoObj.getSelectedAccount();
		let debtsobject = user.debts.debts;
		const currentcurrency = user.misc.currency;
		let dbObject;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.debts.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoDebtsToOperateWith[userLanguage];
					return response;
				}
				response.text = translationsDictionary.SelectDebtToModify[userLanguage];
				response.mark = true;
				let keyboardbuttons = [];
				for(let dbElement of debtsobject)
					keyboardbuttons.push([{
						text: dbElement.name + ": " + dbElement.value + currentcurrency, 
						callback_data: dbElement.name
					}]);
				keyboardbuttons.push([{
					text: translationsDictionary.KeyboardCancelOption[userLanguage],
					callback_data: 'option_of_cancel'
				}]);
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: keyboardbuttons,
					}
				};
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				if(text==='option_of_cancel')
				{
					userConvState.name = States.normal;
					response.text = [];
					response.text.push(translationsDictionary.CancelledSuccessfully[userLanguage]);
					response.text.push(translationsDictionary.HelpMessage[userLanguage]);
					response.mark = true;
					return response;
				}
				dbObject = user.debts.debts.find(obj => obj.name === text);
				if(dbObject == undefined)
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					userConvState.name = States.normal;
					return response;
				}
				response.text = translationsDictionary.HowMuchMoneyToIncrease[userLanguage];
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				userConvState.name = States.waiting2;
				return response;
			case States.waiting2:
				userConvState.name = States.normal;
				dbObject = user.debts.debts.find(obj => obj.name === user.misc.temp);
				let textInput = text.replace(',', '.').replace('\'', '.');
				if(!Utils.validateMoneyNumber(textInput))
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				let numberInput = Utils.getPriceFormat(textInput);
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.changeValueFromListOfSelectedAccount("debts.debts", dbObject.name, Utils.getPriceFormat(dbObject.value + numberInput));
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.AddedMoneyToDebtSuccesfully1[userLanguage] + numberInput + currentcurrency + 
					translationsDictionary.AddedMoneyToDebtSuccesfully2[userLanguage] + dbObject.name + 
					translationsDictionary.AddedMoneyToDebtSuccesfully3[userLanguage];
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function TakeDebt(userLanguage, text, userConvState)
{
	let response = {};
	try{
		let user = await mongoObj.getSelectedAccount();
		let dbArrayObject = user.debts.debts;
		let dbObject;
		const currentcurrency = user.misc.currency;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.debts.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoDebtsToOperateWith[userLanguage];
					return response;
				}
				response.text = translationsDictionary.SelectDebtToTake[userLanguage];
				let keyboardbuttons = [];
				for(let dbElement of dbArrayObject)
					if(dbElement.value !== 0)
						keyboardbuttons.push([{
							text: dbElement.name + ": " + dbElement.value + currentcurrency,
							callback_data: dbElement.name
						}]);
				keyboardbuttons.push([{
					text: translationsDictionary.KeyboardCancelOption[userLanguage],
					callback_data: 'option_of_cancel'
				}]);
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: keyboardbuttons,
					}
				};
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				if(text==='option_of_cancel')
				{
					userConvState.name = States.normal;
					response.text = [];
					response.text.push(translationsDictionary.CancelledSuccessfully[userLanguage]);
					response.text.push(translationsDictionary.HelpMessage[userLanguage]);
					response.mark = true;
					return response;
				}
				dbObject = user.debts.debts.find(obj => obj.name === text);
				response.text = translationsDictionary.ConfirmTakeDebt1[userLanguage] + dbObject.name + translationsDictionary.ConfirmTakeDebt2[userLanguage];
				response.mark = true;
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: [ [
								{ text: translationsDictionary.KeyboardYesOption[userLanguage], callback_data: 'option_of_yes' },
								{ text: translationsDictionary.KeyboardNoOption[userLanguage], callback_data: 'option_of_no' },
							],
						]
					}
				};
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				userConvState.name = States.waiting2;
				return response;
			case States.waiting2:
				userConvState.name = States.normal;
				if(text === 'option_of_no')
				{
					response.text = '';
					return response;
				}
				if(text !== 'option_of_yes')
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				dbObject = user.debts.debts.find(obj => obj.name === user.misc.temp);
				let newMoney = Utils.getPriceFormat(user.money.total + dbObject.value);
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.deleteElementFromListOfSelectedAccount("debts.debts", dbObject.name);
				await mongoObj.updateSelectedAccount({"money.remaining": Utils.getPriceFormat(user.money.remaining + dbObject.value)});
				await mongoObj.updateSelectedAccount({"money.total": newMoney});
				await mongoObj.decrementListCountofSelectedAccount("debts");
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.DebtTakenSuccessfully1[userLanguage] + dbObject.value + currentcurrency + 
					translationsDictionary.DebtTakenSuccessfully2[userLanguage] + dbObject.name + 
					translationsDictionary.DebtTakenSuccessfully3[userLanguage] + newMoney + currentcurrency +
					translationsDictionary.DebtTakenSuccessfully4[userLanguage];
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function DeleteDebt(userLanguage, text, userConvState)
{
	let response = {};
	try{
		let user = await mongoObj.getSelectedAccount();
		let dbArrayObject = user.debts.debts;
		let dbObject;
		const currentcurrency = user.misc.currency;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.debts.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoDebtsToOperateWith[userLanguage];
					return response;
				}
				response.text = translationsDictionary.SelectDebtToDelete[userLanguage];
				let keyboardbuttons = [];
				for(let dbElement of dbArrayObject)
					if(dbElement.value !== 0)
						keyboardbuttons.push([{
							text: dbElement.name + ": " + dbElement.value + currentcurrency,
							callback_data: dbElement.name
						}]);
				keyboardbuttons.push([{
					text: translationsDictionary.KeyboardCancelOption[userLanguage],
					callback_data: 'option_of_cancel'
				}]);
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: keyboardbuttons,
					}
				};
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				if(text==='option_of_cancel')
				{
					userConvState.name = States.normal;
					response.text = [];
					response.text.push(translationsDictionary.CancelledSuccessfully[userLanguage]);
					response.text.push(translationsDictionary.HelpMessage[userLanguage]);
					response.mark = true;
					return response;
				}
				dbObject = user.debts.debts.find(obj => obj.name === text);
				response.text = translationsDictionary.SureToDeleteDebt1[userLanguage] + dbObject.name + translationsDictionary.SureToDeleteDebt2[userLanguage];
				response.mark = true;
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: [ [
								{ text: translationsDictionary.KeyboardYesOption[userLanguage], callback_data: 'option_of_yes' },
								{ text: translationsDictionary.KeyboardNoOption[userLanguage], callback_data: 'option_of_no' },
							],
						]
					}
				};
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				userConvState.name = States.waiting2;
				return response;
			case States.waiting2:
				userConvState.name = States.normal;
				if(text === 'option_of_no')
				{
					response.text = '';
					return response;
				}
				if(text !== 'option_of_yes')
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				dbObject = user.debts.debts.find(obj => obj.name === user.misc.temp);
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.deleteElementFromListOfSelectedAccount("debts.debts", dbObject.name);
				await mongoObj.decrementListCountofSelectedAccount("debts");
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.DebtDeletedSuccessfully1[userLanguage] + dbObject.name + translationsDictionary.DebtDeletedSuccessfully2[userLanguage];
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function CreateMensual(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		switch(userConvState.name)
		{
			case States.normal:
				if(user.monthly.counter >= mongoObj.MAX_TOKENS)
				{
					response.text = translationsDictionary.AlreadyEnoughMonthlys[userLanguage];
					return response;
				}
				response.text = translationsDictionary.TypeNewTaxName[userLanguage];
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.TypeNewTaxCost[userLanguage];
				userConvState.name = States.waiting2;
				return response;
			case States.waiting2:
				let objectName = user.misc.temp;
				let textInput = text.replace(',', '.').replace('\'', '.');
				if(!Utils.validateMoneyNumber(textInput))
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				let numberInput = Utils.getPriceFormat(textInput);
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.incrementListCountofSelectedAccount("monthly");
				await mongoObj.pushToSelectedAccount("monthly.taxes", {name: objectName, value: numberInput});
				await mongoObj.updateSelectedAccount({"monthly.moneyneeded": Utils.getPriceFormat(user.monthly.moneyneeded + numberInput*2)});
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.TaxCreated1[userLanguage] + objectName + translationsDictionary.TaxCreated2[userLanguage];
				response.mark = true;
				userConvState.name = States.normal;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function MoneyToMensuales(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		const currentcurrency = user.misc.currency;
		let dbObject;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.monthly.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoTaxesToOperateWith[userLanguage];
					return response;
				}
				if(user.money.remaining === 0)
				{
					response.text = translationsDictionary.YouHaveNoMoneyToOperateWith[userLanguage];
					return response;
				}
				
				response.text = translationsDictionary.HowMuchMoneyToMonthlys[userLanguage];
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				userConvState.name = States.normal;
				dbObject = user.monthly.taxes.find(obj => obj.name === user.misc.temp);
				let textInput = text.replace(',', '.').replace('\'', '.');
				if(!Utils.validateMoneyNumber(textInput))
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				let numberInput = Utils.getPriceFormat(textInput);
				if(numberInput > user.money.remaining)
				{
					response.text = translationsDictionary.YouDontHaveThatMuchMoney[userLanguage];
					return response;
				}
				if(user.monthly.currentmoney + numberInput > user.monthly.moneyneeded)
				{
					let neednt = Utils.getPriceFormat(user.monthly.moneyneeded - user.monthly.currentmoney);
					response.text = translationsDictionary.MoneyStoreOverflows1[userLanguage] + neednt + currentcurrency + translationsDictionary.MoneyStoreOverflows2[userLanguage];
					response.mark = true;
					return response;
				}
				let newMoney = Utils.getPriceFormat(user.monthly.currentmoney + numberInput);
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"money.remaining": Utils.getPriceFormat(user.money.remaining - numberInput)});
				await mongoObj.updateSelectedAccount({"monthly.currentmoney": newMoney});
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.AddedMoneyToStoreSuccesfully[userLanguage] + newMoney + currentcurrency + "*.";
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function MoneyFromMensuales(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		const currentcurrency = user.misc.currency;
		let dbObject;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.monthly.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoTaxesToOperateWith[userLanguage];
					return response;
				}
				if(user.monthly.currentmoney === 0)
				{
					response.text = translationsDictionary.YouHaveNoMoneyToOperateWith[userLanguage];
					return response;
				}
				response.text = translationsDictionary.HowMuchMoneyToRetire1[userLanguage] + user.monthly.currentmoney + currentcurrency + translationsDictionary.HowMuchMoneyToRetire2[userLanguage];
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				userConvState.name = States.normal;
				dbObject = user.monthly.taxes.find(obj => obj.name === user.misc.temp);
				let textInput = text.replace(',', '.').replace('\'', '.');
				if(!Utils.validateMoneyNumber(textInput))
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				let numberInput = Utils.getPriceFormat(textInput);
				if(numberInput > user.monthly.currentmoney)
				{
					response.text = translationsDictionary.YouDontHaveThatMuchMoney[userLanguage];
					return response;
				}
				let newMoney = Utils.getPriceFormat(user.monthly.currentmoney - numberInput);
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"money.remaining": Utils.getPriceFormat(user.money.remaining + numberInput)});
				await mongoObj.updateSelectedAccount({"monthly.currentmoney": newMoney });
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.RetiredMoneySuccessfully1[userLanguage] + numberInput + currentcurrency + 
					translationsDictionary.RetiredMoneySuccessfully2[userLanguage] + dbObject.name + 
					translationsDictionary.RetiredMoneySuccessfully3[userLanguage] + newMoney +
					translationsDictionary.RetiredMoneySuccessfully4[userLanguage];
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function DeleteMensual(userLanguage, text, userConvState)
{
	
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		let dbArrayObject = user.monthly.taxes;
		let dbObject, moneyToLiberate;
		const currentcurrency = user.misc.currency;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.monthly.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoTaxesToOperateWith[userLanguage];
					return response;
				}
				response.text = translationsDictionary.SelectTaxToDelete[userLanguage];
				let keyboardbuttons = [];
				for(let dbElement of dbArrayObject)
					keyboardbuttons.push([{
						text: dbElement.name + ": " + dbElement.value + currentcurrency + "/" + dbElement.maxValue + currentcurrency,
						callback_data: dbElement.name
					}]);
				keyboardbuttons.push([{
					text: translationsDictionary.KeyboardCancelOption[userLanguage],
					callback_data: 'option_of_cancel'
				}]);
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: keyboardbuttons,
					}
				};
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				if(text==='option_of_cancel')
				{
					userConvState.name = States.normal;
					response.text = [];
					response.text.push(translationsDictionary.CancelledSuccessfully[userLanguage]);
					response.text.push(translationsDictionary.HelpMessage[userLanguage]);
					response.mark = true;
					return response;
				}
				userConvState.name = States.waiting2;
				dbObject = user.monthly.taxes.find(obj => obj.name === text);
				if(dbObject == undefined)
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					userConvState.name = States.normal;
					return response;
				}
				response.text = '';
				moneyToLiberate = Utils.getPriceFormat(user.monthly.currentmoney - (user.monthly.moneyneeded - dbObject.value*2));
				if (moneyToLiberate < 0) moneyToLiberate = 0;
				if(moneyToLiberate > 0)
				{
					response.text += translationsDictionary.WillLiberateSomeMoneyDouble1[userLanguage] + 
						moneyToLiberate + currentcurrency + translationsDictionary.WillLiberateSomeMoneyDouble2[userLanguage] + '\n';
				}
				response.text += translationsDictionary.SureToDeleteTax1[userLanguage] + dbObject.name + translationsDictionary.SureToDeleteTax2[userLanguage];
				response.mark = true;
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: [ [
								{ text: translationsDictionary.KeyboardYesOption[userLanguage], callback_data: 'option_of_yes' },
								{ text: translationsDictionary.KeyboardNoOption[userLanguage], callback_data: 'option_of_no' },
							],
						]
					}
				};
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				return response;
			case States.waiting2:
				userConvState.name = States.normal;
				if(text === 'option_of_no')
				{
					response.text = '';
					return response;
				}
				if(text !== 'option_of_yes')
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				dbObject = user.monthly.taxes.find(obj => obj.name === user.misc.temp);
				moneyToLiberate = Utils.getPriceFormat(user.monthly.currentmoney - (user.monthly.moneyneeded - dbObject.value*2));
				if (moneyToLiberate < 0) moneyToLiberate = 0;
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.deleteElementFromListOfSelectedAccount("monthly.taxes", dbObject.name);
				await mongoObj.updateSelectedAccount({"monthly.moneyneeded": Utils.getPriceFormat(user.monthly.moneyneeded - dbObject.value*2)});
				await mongoObj.updateSelectedAccount({"monthly.currentmoney": Utils.getPriceFormat(user.monthly.moneyneeded - moneyToLiberate)});
				await mongoObj.updateSelectedAccount({"money.remaining": Utils.getPriceFormat(user.monthly.moneyneeded + moneyToLiberate)});
				await mongoObj.decrementListCountofSelectedAccount("monthly")
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.TaxDeletedSuccessfully1[userLanguage] + dbObject.name + translationsDictionary.TaxDeletedSuccessfully2[userLanguage];
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function PayMensual(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		let dbArrayObject = user.monthly.taxes;
		const currentcurrency = user.misc.currency;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.monthly.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoTaxesToOperateWith[userLanguage];
					return response;
				}
				if(user.monthly.currentmoney === 0)
				{
					response.text = translationsDictionary.YouHaveNoMoneyToOperateWith[userLanguage];
					return response;
				}
				response.text = translationsDictionary.SelectTaxToPay[userLanguage];
				let keyboardbuttons = [];
				for(let dbElement of dbArrayObject)
					keyboardbuttons.push([{
						text: dbElement.name + ": " + dbElement.value + currentcurrency,
						callback_data: dbElement.name
					}]);
				keyboardbuttons.push([{
					text: translationsDictionary.KeyboardCancelOption[userLanguage],
					callback_data: 'option_of_cancel'
				}]);
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: keyboardbuttons,
					}
				};
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				if(text==='option_of_cancel')
				{
					userConvState.name = States.normal;
					response.text = [];
					response.text.push(translationsDictionary.CancelledSuccessfully[userLanguage]);
					response.text.push(translationsDictionary.HelpMessage[userLanguage]);
					response.mark = true;
					return response;
				}
				userConvState.name = States.waiting2;
				dbObject = user.monthly.taxes.find(obj => obj.name === text);
				if(dbObject == undefined)
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					userConvState.name = States.normal;
					return response;
				}
				if(user.monthly.currentmoney < dbObject.value)
				{
					let difference = Utils.getPriceFormat(dbObject.value - user.monthly.currentmoney);
					response.text = translationsDictionary.YouHaveNotEnoughMoney1[userLanguage] + difference + currentcurrency + translationsDictionary.YouHaveNotEnoughMoney2[userLanguage];
					response.mark = true;
					return response;
				}
				response.text = translationsDictionary.ConfirmPayTax1[userLanguage] + dbObject.value + currentcurrency + translationsDictionary.ConfirmPayTax2[userLanguage];
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: [ [
								{ text: translationsDictionary.KeyboardYesOption[userLanguage], callback_data: 'option_of_yes' },
								{ text: translationsDictionary.KeyboardNoOption[userLanguage], callback_data: 'option_of_no' },
							],
						]
					}
				};
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				return response;
			case States.waiting2:
				userConvState.name = States.normal;
				dbObject = user.monthly.taxes.find(obj => obj.name === user.misc.temp);
				if(dbObject == undefined)
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					userConvState.name = States.normal;
					return response;
				}
				let left = Utils.getPriceFormat(user.monthly.currentmoney - dbObject.value);
				let leftTotal = Utils.getPriceFormat(user.money.total - dbObject.value);
				response.text = translationsDictionary.MoneyPaid1[userLanguage] + dbObject.value + currentcurrency + 
					translationsDictionary.MoneyPaid2[userLanguage] + left + currentcurrency + 
					translationsDictionary.MoneyPaid3[userLanguage] + leftTotal + currentcurrency + 
					translationsDictionary.MoneyPaid4[userLanguage];
				response.mark = true;
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"monthly.currentmoney": left});
				await mongoObj.updateSelectedAccount({"money.total": leftTotal});
				await mongoObj.commitSelectedAccount();
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function PayAllMensuales(userLanguage, text, userConvState)
{
	
	let response = {};
	try{
		let user = await mongoObj.getSelectedAccount();
		const currentcurrency = user.misc.currency;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.monthly.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoBoxesToOperateWith[userLanguage];
					return response;
				}
				if(user.monthly.currentmoney === 0)
				{
					response.text = translationsDictionary.YouHaveNoMoneyToOperateWith[userLanguage];
					return response;
				}
				let difference = Utils.getPriceFormat(user.monthly.moneyneeded/2 - user.monthly.currentmoney);
				if(difference>0)
				{
					response.text = translationsDictionary.YouHaveNotEnoughMoney1[userLanguage] + difference + currentcurrency + translationsDictionary.YouHaveNotEnoughMoney2[userLanguage];
					response.mark = true;
					return response;
				}
				response.text = translationsDictionary.ConfirmPayTax1[userLanguage] + user.monthly.moneyneeded/2 + currentcurrency + translationsDictionary.ConfirmPayTax2[userLanguage];
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: [ [
								{ text: translationsDictionary.KeyboardYesOption[userLanguage], callback_data: 'option_of_yes' },
								{ text: translationsDictionary.KeyboardNoOption[userLanguage], callback_data: 'option_of_no' },
							],
						]
					}
				};
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				userConvState.name = States.normal;
				let left = Utils.getPriceFormat(user.monthly.currentmoney - user.monthly.moneyneeded/2);
				let leftTotal = Utils.getPriceFormat(user.money.total - user.monthly.moneyneeded/2);
				response.text = translationsDictionary.MoneyPaid1[userLanguage] + (user.monthly.moneyneeded/2) + currentcurrency + 
					translationsDictionary.MoneyPaid2[userLanguage] + left + currentcurrency + 
					translationsDictionary.MoneyPaid3[userLanguage] + leftTotal + currentcurrency + 
					translationsDictionary.MoneyPaid4[userLanguage];
				response.mark = true;
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"monthly.currentmoney": left});
				await mongoObj.updateSelectedAccount({"money.total": leftTotal});
				await mongoObj.commitSelectedAccount();
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function CreateAnual(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		switch(userConvState.name)
		{
			case States.normal:
				if(user.yearly.counter >= mongoObj.MAX_TOKENS)
				{
					response.text = translationsDictionary.AlreadyEnoughYearlys[userLanguage];
					return response;
				}
				response.text = translationsDictionary.TypeNewTaxName[userLanguage];
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.TypeNewTaxCost[userLanguage];
				userConvState.name = States.waiting2;
				return response;
			case States.waiting2:
				let objectName = user.misc.temp;
				let textInput = text.replace(',', '.').replace('\'', '.');
				if(!Utils.validateMoneyNumber(textInput))
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				let numberInput = Utils.getPriceFormat(textInput);
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.incrementListCountofSelectedAccount("yearly");
				await mongoObj.pushToSelectedAccount("yearly.taxes", {name: objectName, value: numberInput});
				await mongoObj.updateSelectedAccount({"yearly.moneyneeded": Utils.getPriceFormat(user.yearly.moneyneeded + numberInput)});
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.TaxCreated1[userLanguage] + objectName + translationsDictionary.TaxCreated2[userLanguage];
				response.mark = true;
				userConvState.name = States.normal;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function MoneyToAnuales(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		const currentcurrency = user.misc.currency;
		let dbObject;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.yearly.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoTaxesToOperateWith[userLanguage];
					return response;
				}
				if(user.money.remaining === 0)
				{
					response.text = translationsDictionary.YouHaveNoMoneyToOperateWith[userLanguage];
					return response;
				}
				
				response.text = translationsDictionary.HowMuchMoneyToYearlys[userLanguage];
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				userConvState.name = States.normal;
				dbObject = user.yearly.taxes.find(obj => obj.name === user.misc.temp);
				let textInput = text.replace(',', '.').replace('\'', '.');
				if(!Utils.validateMoneyNumber(textInput))
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				let numberInput = Utils.getPriceFormat(textInput);
				if(numberInput > user.money.remaining)
				{
					response.text = translationsDictionary.YouDontHaveThatMuchMoney[userLanguage];
					return response;
				}
				if(user.yearly.currentmoney + numberInput > user.yearly.moneyneeded)
				{
					let neednt = Utils.getPriceFormat(user.yearly.moneyneeded - user.yearly.currentmoney);
					response.text = translationsDictionary.MoneyStoreOverflows1[userLanguage] + neednt + currentcurrency + translationsDictionary.MoneyStoreOverflows2[userLanguage];
					response.mark = true;
					return response;
				}
				let newMoney = Utils.getPriceFormat(user.yearly.currentmoney + numberInput);
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"money.remaining": Utils.getPriceFormat(user.money.remaining - numberInput)});
				await mongoObj.updateSelectedAccount({"yearly.currentmoney": newMoney});
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.AddedMoneyToStoreSuccesfully[userLanguage] + newMoney + currentcurrency + "*.";
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function MoneyFromAnuales(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		const currentcurrency = user.misc.currency;
		let dbObject;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.yearly.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoTaxesToOperateWith[userLanguage];
					return response;
				}
				if(user.yearly.currentmoney === 0)
				{
					response.text = translationsDictionary.YouHaveNoMoneyToOperateWith[userLanguage];
					return response;
				}
				response.text = translationsDictionary.HowMuchMoneyToRetire1[userLanguage] + user.yearly.currentmoney + currentcurrency + translationsDictionary.HowMuchMoneyToRetire2[userLanguage];
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				userConvState.name = States.normal;
				dbObject = user.yearly.taxes.find(obj => obj.name === user.misc.temp);
				let textInput = text.replace(',', '.').replace('\'', '.');
				if(!Utils.validateMoneyNumber(textInput))
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				let numberInput = Utils.getPriceFormat(textInput);
				if(numberInput > user.yearly.moneyneeded)
				{
					response.text = translationsDictionary.YouDontHaveThatMuchMoney[userLanguage];
					return response;
				}
				let newMoney = Utils.getPriceFormat(user.money.remaining + numberInput)
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"money.remaining": newMoney});
				await mongoObj.updateSelectedAccount({"yearly.currentmoney": Utils.getPriceFormat(user.yearly.currentmoney - numberInput)});
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.RetiredMoneySuccessfully1[userLanguage] + numberInput + currentcurrency + 
					translationsDictionary.RetiredMoneySuccessfully2[userLanguage] + dbObject.name + 
					translationsDictionary.RetiredMoneySuccessfully3[userLanguage] + newMoney + currentcurrency +
					translationsDictionary.RetiredMoneySuccessfully4;
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function DeleteAnual(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		let dbArrayObject = user.yearly.taxes;
		let dbObject, moneyToLiberate;
		const currentcurrency = user.misc.currency;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.yearly.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoTaxesToOperateWith[userLanguage];
					return response;
				}
				response.text = translationsDictionary.SelectBoxToDelete[userLanguage];
				let keyboardbuttons = [];
				for(let dbElement of dbArrayObject)
					keyboardbuttons.push([{
						text: dbElement.name + ": " + dbElement.value + currentcurrency + "/" + dbElement.maxValue + currentcurrency,
						callback_data: dbElement.name
					}]);
				keyboardbuttons.push([{
					text: translationsDictionary.KeyboardCancelOption[userLanguage],
					callback_data: 'option_of_cancel'
				}]);
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: keyboardbuttons,
					}
				};
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				if(text==='option_of_cancel')
				{
					userConvState.name = States.normal;
					response.text = [];
					response.text.push(translationsDictionary.CancelledSuccessfully[userLanguage]);
					response.text.push(translationsDictionary.HelpMessage[userLanguage]);
					response.mark = true;
					return response;
				}
				userConvState.name = States.waiting2;
				dbObject = user.yearly.taxes.find(obj => obj.name === text);
				if(dbObject == undefined)
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					userConvState.name = States.normal;
					return response;
				}
				response.text = '';
				moneyToLiberate = Utils.getPriceFormat(user.yearly.currentmoney - (user.yearly.moneyneeded - dbObject.value));
				if (moneyToLiberate < 0) moneyToLiberate = 0;
				if(moneyToLiberate > 0)
				{
					response.text += translationsDictionary.WillLiberateSomeMoneySingle1[userLanguage] + 
						moneyToLiberate + currentcurrency + translationsDictionary.WillLiberateSomeMoneySingle2[userLanguage] + '\n';
				}
				response.text += translationsDictionary.SureToDeleteTax1[userLanguage] + dbObject.name + translationsDictionary.SureToDeleteTax2[userLanguage];
				response.mark = true;
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: [ [
								{ text: translationsDictionary.KeyboardYesOption[userLanguage], callback_data: 'option_of_yes' },
								{ text: translationsDictionary.KeyboardNoOption[userLanguage], callback_data: 'option_of_no' },
							],
						]
					}
				};
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				return response;
			case States.waiting2:
				userConvState.name = States.normal;
				if(text === 'option_of_no')
				{
					response.text = '';
					return response;
				}
				if(text !== 'option_of_yes')
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				dbObject = user.yearly.taxes.find(obj => obj.name === user.misc.temp);
				moneyToLiberate = Utils.getPriceFormat(user.yearly.currentmoney - (user.yearly.moneyneeded - dbObject.value));
				if (moneyToLiberate < 0) moneyToLiberate = 0;
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.deleteElementFromListOfSelectedAccount("yearly.taxes", dbObject.name);
				await mongoObj.updateSelectedAccount({"yearly.moneyneeded": Utils.getPriceFormat(user.yearly.moneyneeded - dbObject.value)});
				await mongoObj.updateSelectedAccount({"yearly.currentmoney": Utils.getPriceFormat(user.yearly.moneyneeded - moneyToLiberate)});
				await mongoObj.updateSelectedAccount({"money.remaining": Utils.getPriceFormat(user.yearly.moneyneeded + moneyToLiberate)});
				await mongoObj.decrementListCountofSelectedAccount("yearly")
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.TaxDeletedSuccessfully1[userLanguage] + dbObject.name + 
					translationsDictionary.TaxDeletedSuccessfully2[userLanguage];
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function PayAnual(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		let dbArrayObject = user.yearly.taxes;
		const currentcurrency = user.misc.currency;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.yearly.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoTaxesToOperateWith[userLanguage];
					return response;
				}
				if(user.yearly.currentmoney === 0)
				{
					response.text = translationsDictionary.YouHaveNoMoneyToOperateWith[userLanguage];
					return response;
				}
				response.text = translationsDictionary.SelectTaxToPay[userLanguage];
				let keyboardbuttons = [];
				for(let dbElement of dbArrayObject)
					keyboardbuttons.push([{
						text: dbElement.name + ": " + dbElement.value + currentcurrency,
						callback_data: dbElement.name
					}]);
				keyboardbuttons.push([{
					text: translationsDictionary.KeyboardCancelOption[userLanguage],
					callback_data: 'option_of_cancel'
				}]);
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: keyboardbuttons,
					}
				};
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				if(text==='option_of_cancel')
				{
					userConvState.name = States.normal;
					response.text = [];
					response.text.push(translationsDictionary.CancelledSuccessfully[userLanguage]);
					response.text.push(translationsDictionary.HelpMessage[userLanguage]);
					response.mark = true;
					return response;
				}
				userConvState.name = States.waiting2;
				dbObject = user.yearly.taxes.find(obj => obj.name === text);
				if(dbObject == undefined)
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					userConvState.name = States.normal;
					return response;
				}
				if(user.yearly.currentmoney < dbObject.value)
				{
					let difference = Utils.getPriceFormat(dbObject.value - user.yearly.currentmoney);
					response.text = translationsDictionary.YouHaveNotEnoughMoney1[userLanguage] + difference + currentcurrency + translationsDictionary.YouHaveNotEnoughMoney2[userLanguage];
					response.mark = true;
					return response;
				}
				response.text = translationsDictionary.ConfirmPayTax1[userLanguage] + dbObject.value + currentcurrency + translationsDictionary.ConfirmPayTax2[userLanguage];
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: [ [
								{ text: translationsDictionary.KeyboardYesOption[userLanguage], callback_data: 'option_of_yes' },
								{ text: translationsDictionary.KeyboardNoOption[userLanguage], callback_data: 'option_of_no' },
							],
						]
					}
				};
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				return response;
			case States.waiting2:
				userConvState.name = States.normal;
				dbObject = user.yearly.taxes.find(obj => obj.name === user.misc.temp);
				if(dbObject == undefined)
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					userConvState.name = States.normal;
					return response;
				}
				let left = Utils.getPriceFormat(user.yearly.currentmoney - dbObject.value);
				let leftTotal = Utils.getPriceFormat(user.money.total - dbObject.value);
				response.text = translationsDictionary.MoneyPaid1[userLanguage] + dbObject.value + currentcurrency + 
					translationsDictionary.MoneyPaid2[userLanguage] + left + currentcurrency + 
					translationsDictionary.MoneyPaid3[userLanguage] + leftTotal + currentcurrency + 
					translationsDictionary.MoneyPaid4[userLanguage];
				response.mark = true;
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"yearly.currentmoney": left});
				await mongoObj.updateSelectedAccount({"money.total": leftTotal});
				await mongoObj.commitSelectedAccount();
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function CreateOther(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		switch(userConvState.name)
		{
			case States.normal:
				if(user.others.counter >= mongoObj.MAX_TOKENS)
				{
					response.text = translationsDictionary.AlreadyEnoughOthers[userLanguage];
					return response;
				}
				response.text = translationsDictionary.TypeNewTaxName[userLanguage];
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.TypeNewTaxCost[userLanguage];
				userConvState.name = States.waiting2;
				return response;
			case States.waiting2:
				let objectName = user.misc.temp;
				let textInput = text.replace(',', '.').replace('\'', '.');
				if(!Utils.validateMoneyNumber(textInput))
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				let numberInput = Utils.getPriceFormat(textInput);
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.incrementListCountofSelectedAccount("others");
				await mongoObj.pushToSelectedAccount("others.taxes", {name: objectName, value: numberInput});
				await mongoObj.updateSelectedAccount({"others.moneyneeded": Utils.getPriceFormat(user.others.moneyneeded + numberInput*2)});
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.TaxCreated1[userLanguage] + objectName + translationsDictionary.TaxCreated2[userLanguage];
				response.mark = true;
				userConvState.name = States.normal;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function MoneyToOthers(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		const currentcurrency = user.misc.currency;
		let dbObject;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.others.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoTaxesToOperateWith[userLanguage];
					return response;
				}
				if(user.money.remaining === 0)
				{
					response.text = translationsDictionary.YouHaveNoMoneyToOperateWith[userLanguage];
					return response;
				}
				
				response.text = translationsDictionary.HowMuchMoneyToOthers[userLanguage];
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				userConvState.name = States.normal;
				dbObject = user.others.taxes.find(obj => obj.name === user.misc.temp);
				let textInput = text.replace(',', '.').replace('\'', '.');
				if(!Utils.validateMoneyNumber(textInput))
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				let numberInput = Utils.getPriceFormat(textInput);
				if(numberInput > user.money.remaining)
				{
					response.text = translationsDictionary.YouDontHaveThatMuchMoney[userLanguage];
					return response;
				}
				if(user.others.currentmoney + numberInput > user.others.moneyneeded)
				{
					let neednt = Utils.getPriceFormat(user.others.moneyneeded - user.others.currentmoney);
					response.text = translationsDictionary.MoneyStoreOverflows1[userLanguage] + neednt + currentcurrency + translationsDictionary.MoneyStoreOverflows2[userLanguage];
					response.mark = true;
					return response;
				}
				let newMoney = Utils.getPriceFormat(user.others.currentmoney + numberInput);
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"money.remaining": Utils.getPriceFormat(user.money.remaining - numberInput)});
				await mongoObj.updateSelectedAccount({"others.currentmoney": newMoney});
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.AddedMoneyToStoreSuccesfully[userLanguage] + newMoney + currentcurrency + "*.";
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function MoneyFromOthers(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		const currentcurrency = user.misc.currency;
		let dbObject;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.others.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoTaxesToOperateWith[userLanguage];
					return response;
				}
				if(user.others.currentmoney === 0)
				{
					response.text = translationsDictionary.YouHaveNoMoneyToOperateWith[userLanguage];
					return response;
				}
				response.text = translationsDictionary.HowMuchMoneyToRetire1[userLanguage] + user.others.currentmoney + currentcurrency + translationsDictionary.HowMuchMoneyToRetire2[userLanguage];
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				userConvState.name = States.normal;
				dbObject = user.others.taxes.find(obj => obj.name === user.misc.temp);
				let textInput = text.replace(',', '.').replace('\'', '.');
				if(!Utils.validateMoneyNumber(textInput))
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				let numberInput = Utils.getPriceFormat(textInput);
				if(numberInput > user.others.moneyneeded)
				{
					response.text = translationsDictionary.YouDontHaveThatMuchMoney[userLanguage];
					return response;
				}
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"money.remaining": Utils.getPriceFormat(user.money.remaining + numberInput)});
				await mongoObj.updateSelectedAccount({"others.currentmoney": Utils.getPriceFormat(user.others.currentmoney - numberInput)});
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.AddedMoneySuccesfully1[userLanguage] + numberInput + currentcurrency + 
					translationsDictionary.AddedMoneySuccesfully2[userLanguage] + dbObject.name + 
					translationsDictionary.AddedMoneySuccesfully3[userLanguage];
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function DeleteOther(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		let dbArrayObject = user.others.taxes;
		let dbObject, moneyToLiberate;
		const currentcurrency = user.misc.currency;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.others.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoTaxesToOperateWith[userLanguage];
					return response;
				}
				response.text = translationsDictionary.SelectTaxToDelete[userLanguage];
				let keyboardbuttons = [];
				for(let dbElement of dbArrayObject)
					keyboardbuttons.push([{
						text: dbElement.name + ": " + dbElement.value + currentcurrency + "/" + dbElement.maxValue + currentcurrency,
						callback_data: dbElement.name
					}]);
				keyboardbuttons.push([{
					text: translationsDictionary.KeyboardCancelOption[userLanguage],
					callback_data: 'option_of_cancel'
				}]);
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: keyboardbuttons,
					}
				};
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				if(text==='option_of_cancel')
				{
					userConvState.name = States.normal;
					response.text = [];
					response.text.push(translationsDictionary.CancelledSuccessfully[userLanguage]);
					response.text.push(translationsDictionary.HelpMessage[userLanguage]);
					response.mark = true;
					return response;
				}
				userConvState.name = States.waiting2;
				dbObject = user.others.taxes.find(obj => obj.name === text);
				if(dbObject == undefined)
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					userConvState.name = States.normal;
					return response;
				}
				response.text = '';
				moneyToLiberate = Utils.getPriceFormat(user.others.currentmoney - (user.others.moneyneeded - dbObject.value*2));
				if (moneyToLiberate < 0) moneyToLiberate = 0;
				if(moneyToLiberate > 0)
				{
					response.text += translationsDictionary.WillLiberateSomeMoneyDouble1[userLanguage] + 
						moneyToLiberate + currentcurrency + translationsDictionary.WillLiberateSomeMoneyDouble2[userLanguage] + '\n';
				}
				response.text += translationsDictionary.SureToDeleteTax1[userLanguage] + dbObject.name + translationsDictionary.SureToDeleteTax2[userLanguage];
				response.mark = true;
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: [ [
								{ text: translationsDictionary.KeyboardYesOption[userLanguage], callback_data: 'option_of_yes' },
								{ text: translationsDictionary.KeyboardNoOption[userLanguage], callback_data: 'option_of_no' },
							],
						]
					}
				};
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				return response;
			case States.waiting2:
				userConvState.name = States.normal;
				if(text === 'option_of_no')
				{
					response.text = '';
					return response;
				}
				if(text !== 'option_of_yes')
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				dbObject = user.others.taxes.find(obj => obj.name === user.misc.temp);
				moneyToLiberate = Utils.getPriceFormat(user.others.currentmoney - (user.others.moneyneeded - dbObject.value*2));
				if (moneyToLiberate < 0) moneyToLiberate = 0;
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.deleteElementFromListOfSelectedAccount("others.taxes", dbObject.name);
				await mongoObj.updateSelectedAccount({"others.moneyneeded": Utils.getPriceFormat(user.others.moneyneeded - dbObject.value*2)});
				await mongoObj.updateSelectedAccount({"others.currentmoney": Utils.getPriceFormat(user.others.moneyneeded - moneyToLiberate)});
				await mongoObj.updateSelectedAccount({"money.remaining": Utils.getPriceFormat(user.others.moneyneeded + moneyToLiberate)});
				await mongoObj.decrementListCountofSelectedAccount("others")
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.TaxDeletedSuccessfully1[userLanguage] + dbObject.name + 
					translationsDictionary.TaxDeletedSuccessfully2[userLanguage];
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function PayOther(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		let dbArrayObject = user.others.taxes;
		const currentcurrency = user.misc.currency;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.others.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoTaxesToOperateWith[userLanguage];
					return response;
				}
				if(user.others.currentmoney === 0)
				{
					response.text = translationsDictionary.YouHaveNoMoneyToOperateWith[userLanguage];
					return response;
				}
				response.text = translationsDictionary.SelectTaxToPay[userLanguage];
				let keyboardbuttons = [];
				for(let dbElement of dbArrayObject)
					keyboardbuttons.push([{
						text: dbElement.name + ": " + dbElement.value + currentcurrency,
						callback_data: dbElement.name
					}]);
				keyboardbuttons.push([{
					text: translationsDictionary.KeyboardCancelOption[userLanguage],
					callback_data: 'option_of_cancel'
				}]);
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: keyboardbuttons,
					}
				};
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				if(text==='option_of_cancel')
				{
					userConvState.name = States.normal;
					response.text = [];
					response.text.push(translationsDictionary.CancelledSuccessfully[userLanguage]);
					response.text.push(translationsDictionary.HelpMessage[userLanguage]);
					response.mark = true;
					return response;
				}
				userConvState.name = States.waiting2;
				dbObject = user.others.taxes.find(obj => obj.name === text);
				if(dbObject == undefined)
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					userConvState.name = States.normal;
					return response;
				}
				if(user.others.currentmoney < dbObject.value)
				{
					let difference = Utils.getPriceFormat(dbObject.value - user.others.currentmoney);
					response.text = translationsDictionary.YouHaveNotEnoughMoney1[userLanguage] + difference + currentcurrency + translationsDictionary.YouHaveNotEnoughMoney2[userLanguage];
					response.mark = true;
					return response;
				}
				response.text = translationsDictionary.ConfirmPayTax1[userLanguage] + dbObject.value + currentcurrency + translationsDictionary.ConfirmPayTax2[userLanguage];
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: [ [
								{ text: translationsDictionary.KeyboardYesOption[userLanguage], callback_data: 'option_of_yes' },
								{ text: translationsDictionary.KeyboardNoOption[userLanguage], callback_data: 'option_of_no' },
							],
						]
					}
				};
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				return response;
			case States.waiting2:
				userConvState.name = States.normal;
				dbObject = user.others.taxes.find(obj => obj.name === user.misc.temp);
				if(dbObject == undefined)
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					userConvState.name = States.normal;
					return response;
				}
				let left = Utils.getPriceFormat(user.others.currentmoney - dbObject.value);
				let leftTotal = Utils.getPriceFormat(user.money.total - dbObject.value);
				response.text = translationsDictionary.MoneyPaid1[userLanguage] + dbObject.value + currentcurrency + 
					translationsDictionary.MoneyPaid2[userLanguage] + left + currentcurrency + 
					translationsDictionary.MoneyPaid3[userLanguage] + leftTotal + currentcurrency + 
					translationsDictionary.MoneyPaid4[userLanguage];
				response.mark = true;
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"others.currentmoney": left});
				await mongoObj.updateSelectedAccount({"money.total": leftTotal});
				await mongoObj.commitSelectedAccount();
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function AddFuturePurchase(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		switch(userConvState.name)
		{
			case States.normal:
				if(user.futures.counter >= mongoObj.MAX_TOKENS)
				{
					response.text = translationsDictionary.AlreadyEnoughFutures[userLanguage];
					return response;
				}
				response.text = translationsDictionary.TypeNewFuturePaymentName[userLanguage];
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.TypeNewFuturePaymentCost[userLanguage];
				userConvState.name = States.waiting2;
				return response;
			case States.waiting2:
				userConvState.name = States.normal;
				let objectName = user.misc.temp;
				let textInput = text.replace(',', '.').replace('\'', '.');
				if(!Utils.validateMoneyNumber(textInput))
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				let numberInput = Utils.getPriceFormat(textInput);
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.incrementListCountofSelectedAccount("futures");
				await mongoObj.pushToSelectedAccount("futures.purchases", {name: objectName, value: numberInput});
				await mongoObj.updateSelectedAccount({"futures.moneyneeded": Utils.getPriceFormat(user.futures.moneyneeded + numberInput)});
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.PurchaseCreated1[userLanguage] + objectName + translationsDictionary.PurchaseCreated2[userLanguage];
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}


async function MoneyToFutures(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		const currentcurrency = user.misc.currency;
		let dbObject;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.futures.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoFuturesToOperateWith[userLanguage];
					return response;
				}
				if(user.money.remaining === 0)
				{
					response.text = translationsDictionary.YouHaveNoMoneyToOperateWith[userLanguage];
					return response;
				}
				
				response.text = translationsDictionary.HowMuchMoneyToFutures[userLanguage];
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				userConvState.name = States.normal;
				let textInput = text.replace(',', '.').replace('\'', '.');
				if(!Utils.validateMoneyNumber(textInput))
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				let numberInput = Utils.getPriceFormat(textInput);
				if(numberInput > user.money.remaining)
				{
					response.text = translationsDictionary.YouDontHaveThatMuchMoney[userLanguage];
					return response;
				}
				if(user.futures.currentmoney + numberInput > user.futures.moneyneeded)
				{
					let neednt = Utils.getPriceFormat(user.futures.moneyneeded - user.futures.currentmoney);
					response.text = translationsDictionary.MoneyStoreOverflows1[userLanguage] + neednt + currentcurrency + translationsDictionary.MoneyStoreOverflows2[userLanguage];
					response.mark = true;
					return response;
				}
				let newMoney = Utils.getPriceFormat(user.futures.currentmoney + numberInput);
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"money.remaining": Utils.getPriceFormat(user.money.remaining - numberInput)});
				await mongoObj.updateSelectedAccount({"futures.currentmoney": newMoney});
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.AddedMoneyToStoreSuccesfully[userLanguage] + newMoney + currentcurrency + "*.";
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function MoneyFromFutures(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		const currentcurrency = user.misc.currency;
		let dbObject;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.futures.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoFuturesToOperateWith[userLanguage];
					return response;
				}
				if(user.futures.currentmoney === 0)
				{
					response.text = translationsDictionary.YouHaveNoMoneyToOperateWith[userLanguage];
					return response;
				}
				response.text = translationsDictionary.HowMuchMoneyToRetire1[userLanguage] + user.futures.currentmoney + currentcurrency + translationsDictionary.HowMuchMoneyToRetire2[userLanguage];
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				userConvState.name = States.normal;
				dbObject = user.futures.purchases.find(obj => obj.name === user.misc.temp);
				let textInput = text.replace(',', '.').replace('\'', '.');
				if(!Utils.validateMoneyNumber(textInput))
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				let numberInput = Utils.getPriceFormat(textInput);
				if(numberInput > user.futures.moneyneeded)
				{
					response.text = translationsDictionary.YouDontHaveThatMuchMoney[userLanguage];
					return response;
				}
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"money.remaining": Utils.getPriceFormat(user.money.remaining + numberInput)});
				await mongoObj.updateSelectedAccount({"futures.currentmoney": Utils.getPriceFormat(user.futures.currentmoney - numberInput)});
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.AddedMoneySuccesfully1[userLanguage] + numberInput + currentcurrency + 
					translationsDictionary.AddedMoneySuccesfully2[userLanguage] + dbObject.name + 
					translationsDictionary.AddedMoneySuccesfully3[userLanguage];
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function DeleteFuturePurchase(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		let dbArrayObject = user.futures.purchases;
		let dbObject, moneyToLiberate;
		const currentcurrency = user.misc.currency;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.futures.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoFuturesToOperateWith[userLanguage];
					return response;
				}
				response.text = translationsDictionary.SelectFutureToDelete[userLanguage];
				let keyboardbuttons = [];
				for(let dbElement of dbArrayObject)
					keyboardbuttons.push([{
						text: dbElement.name + ": " + dbElement.value + currentcurrency,
						callback_data: dbElement.name
					}]);
				keyboardbuttons.push([{
					text: translationsDictionary.KeyboardCancelOption[userLanguage],
					callback_data: 'option_of_cancel'
				}]);
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: keyboardbuttons,
					}
				};
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				if(text==='option_of_cancel')
				{
					userConvState.name = States.normal;
					response.text = [];
					response.text.push(translationsDictionary.CancelledSuccessfully[userLanguage]);
					response.text.push(translationsDictionary.HelpMessage[userLanguage]);
					response.mark = true;
					return response;
				}
				userConvState.name = States.waiting2;
				dbObject = user.futures.purchases.find(obj => obj.name === text);
				if(dbObject == undefined)
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					userConvState.name = States.normal;
					return response;
				}
				response.text = '';
				console.log(JSON.stringify(dbObject));
				moneyToLiberate = Utils.getPriceFormat(user.futures.currentmoney - (user.futures.moneyneeded - dbObject.value));
				if (moneyToLiberate < 0) moneyToLiberate = 0;
				console.log(moneyToLiberate);
				if(moneyToLiberate > 0)
				{
					response.text += translationsDictionary.WillLiberateSomeMoneySingle1[userLanguage] + 
						moneyToLiberate + currentcurrency + translationsDictionary.WillLiberateSomeMoneySingle2[userLanguage] + '\n';
				}
				console.log('hola')
				response.text += translationsDictionary.SureToDeletePurchase1[userLanguage] + dbObject.name + translationsDictionary.SureToDeletePurchase2[userLanguage];
				response.mark = true;
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: [ [
								{ text: translationsDictionary.KeyboardYesOption[userLanguage], callback_data: 'option_of_yes' },
								{ text: translationsDictionary.KeyboardNoOption[userLanguage], callback_data: 'option_of_no' },
							],
						]
					}
				};
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				return response;
			case States.waiting2:
				userConvState.name = States.normal;
				if(text === 'option_of_no')
				{
					response.text = '';
					return response;
				}
				if(text !== 'option_of_yes')
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				dbObject = user.futures.purchases.find(obj => obj.name === user.misc.temp);
				moneyToLiberate = Utils.getPriceFormat(user.futures.currentmoney - (user.futures.moneyneeded - dbObject.value));
				if (moneyToLiberate < 0) moneyToLiberate = 0;
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.deleteElementFromListOfSelectedAccount("futures.purchases", dbObject.name);
				await mongoObj.updateSelectedAccount({"futures.moneyneeded": Utils.getPriceFormat(user.futures.moneyneeded - dbObject.value)});
				await mongoObj.updateSelectedAccount({"futures.currentmoney":Utils.getPriceFormat(user.futures.currentmoney - moneyToLiberate)});
				await mongoObj.updateSelectedAccount({"money.remaining": Utils.getPriceFormat(user.money.remaining + moneyToLiberate)});
				await mongoObj.decrementListCountofSelectedAccount("futures");
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.PurchaseDeletedSuccessfully1[userLanguage] + dbObject.name + 
					translationsDictionary.PurchaseDeletedSuccessfully2[userLanguage];
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function PerformPurchase(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		let user = await mongoObj.getSelectedAccount();
		let dbArrayObject = user.futures.purchases;
		let dbObject;
		const currentcurrency = user.misc.currency;
		switch(userConvState.name)
		{
			case States.normal:
				if(user.futures.counter === 0)
				{
					response.text = translationsDictionary.YouHaveNoFuturesToOperateWith[userLanguage];
					return response;
				}
				if(user.futures.currentmoney === 0)
				{
					response.text = translationsDictionary.YouHaveNoMoneyToOperateWith[userLanguage];
					return response;
				}
				response.text = translationsDictionary.SelectFutureToBuy[userLanguage];
				let keyboardbuttons = [];
				for(let dbElement of dbArrayObject)
					keyboardbuttons.push([{
						text: dbElement.name + ": " + dbElement.value + currentcurrency,
						callback_data: dbElement.name
					}]);
				keyboardbuttons.push([{
					text: translationsDictionary.KeyboardCancelOption[userLanguage],
					callback_data: 'option_of_cancel'
				}]);
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: keyboardbuttons,
					}
				};
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				if(text==='option_of_cancel')
				{
					userConvState.name = States.normal;
					response.text = [];
					response.text.push(translationsDictionary.CancelledSuccessfully[userLanguage]);
					response.text.push(translationsDictionary.HelpMessage[userLanguage]);
					response.mark = true;
					return response;
				}
				userConvState.name = States.waiting2;
				dbObject = user.futures.purchases.find(obj => obj.name === text);
				if(dbObject == undefined)
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					userConvState.name = States.normal;
					return response;
				}
				let difference = Utils.getPriceFormat(dbObject.value - user.futures.currentmoney);
				if(difference > 0)
				{
					response.text = translationsDictionary.YouHaveNotEnoughMoney1[userLanguage] + translationsDictionary.YouHaveNotEnoughMoney1[userLanguage];
					response.mark = true;
					userConvState.name = States.normal;
					return response;
				}
				response.text = translationsDictionary.SureToPerformPurchase1[userLanguage] + dbObject.name + translationsDictionary.SureToPerformPurchase2[userLanguage];
				response.mark = true;
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: [ [
								{ text: translationsDictionary.KeyboardYesOption[userLanguage], callback_data: 'option_of_yes' },
								{ text: translationsDictionary.KeyboardNoOption[userLanguage], callback_data: 'option_of_no' },
							],
						]
					}
				};
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.updateSelectedAccount({"misc.temp": text});
				await mongoObj.commitSelectedAccount();
				return response;
			case States.waiting2:
				userConvState.name = States.normal;
				if(text === 'option_of_no')
				{
					response.text = '';
					return response;
				}
				if(text !== 'option_of_yes')
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				dbObject = user.futures.purchases.find(obj => obj.name === user.misc.temp);
				let newMoneyCurrent = Utils.getPriceFormat(user.futures.currentmoney - dbObject.value);
				let newMoney = Utils.getPriceFormat(user.money.total - dbObject.value);
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.deleteElementFromListOfSelectedAccount("futures.purchases", dbObject.name);
				await mongoObj.updateSelectedAccount({"futures.moneyneeded": Utils.getPriceFormat(user.others.moneyneeded - dbObject.value)});
				await mongoObj.updateSelectedAccount({"futures.currentmoney": newMoneyCurrent});
				await mongoObj.updateSelectedAccount({"money.total": newMoney});
				await mongoObj.decrementListCountofSelectedAccount("futures");
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.PurchasedSuccessfully1[userLanguage] + dbObject.value + 
					translationsDictionary.PurchasedSuccessfully2[userLanguage] + dbObject.name +
					translationsDictionary.PurchasedSuccessfully3[userLanguage] + newMoneyCurrent +
					translationsDictionary.PurchasedSuccessfully4[userLanguage] + newMoney + 
					translationsDictionary.PurchasedSuccessfully5[userLanguage];
				response.mark = true;
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function EraseData(userLanguage, text, userConvState)
{
	let response = {};
	try
	{
		switch(userConvState.name)
		{
			case States.normal:
				response.text = translationsDictionary.VeryConfirmEraseData[userLanguage];
				response.reply_keyboard = {
					reply_markup: {
						inline_keyboard: [ [
								{ text: translationsDictionary.KeyboardYesOption[userLanguage], callback_data: 'option_of_yes' },
								{ text: translationsDictionary.KeyboardNoOption[userLanguage], callback_data: 'option_of_no' },
							],
						]
					}
				};
				userConvState.name = States.waiting1;
				return response;
			case States.waiting1:
				userConvState.name = States.normal;
				if(text === 'option_of_no')
				{
					response.text = '';
					return response;
				}
				if(text !== 'option_of_yes')
				{
					response.text = translationsDictionary.UserIsStupid[userLanguage];
					response.mark = true;
					return response;
				}
				await mongoObj.uncommitSelectedAccount();
				await mongoObj.resetSelectedAccount();
				await mongoObj.commitSelectedAccount();
				response.text = translationsDictionary.DataErasedSuccessfully[userLanguage];
				return response;
		}
	}catch(error)
	{
		userConvState.name = States.error;
		response.text = "DEBUG: " + error;
		return response;
	}
	userConvState.name=States.error;
	response.text = "DEBUG: estado invalido"
	return response;
}

async function ManageMoneyBoxes(userLanguage)
{
	let response = {};
	response.text = translationsDictionary.SelectAnOption[userLanguage];
	response.reply_keyboard = {
		reply_markup: {
		  inline_keyboard: 
		  [
			[{ text: translationsDictionary.CreateHuchaOption[userLanguage] , callback_data: Actions.create_money_box }],
			[{ text: translationsDictionary.AddMoneyToHuchaOption[userLanguage], callback_data: Actions.add_money_to_box }],
			[{ text: translationsDictionary.FillHuchaOption[userLanguage], callback_data: Actions.add_all_money_to_box }],
			[{ text: translationsDictionary.RetireFromHuchaOption[userLanguage], callback_data: Actions.retire_money_from_box }],
			[{ text: translationsDictionary.SpendFromHuchaOption[userLanguage], callback_data: Actions.spend_money_from_box }],
			[{ text: translationsDictionary.DeleteHuchaOption[userLanguage], callback_data: Actions.delete_money_box }],
		  ],
		}
	};
	return response;
}

async function ManageDebts(userLanguage)
{
	let response = {};
	response.text = translationsDictionary.SelectAnOption[userLanguage];
	response.reply_keyboard = {
		reply_markup: {
		  inline_keyboard: 
		  [
			[{ text: translationsDictionary.CreateDebtOption[userLanguage] , callback_data: Actions.create_debt }],
			[{ text: translationsDictionary.IncreaseDebtOption[userLanguage], callback_data: Actions.increase_debt }],
			[{ text: translationsDictionary.TakeDebtOption[userLanguage], callback_data: Actions.get_debt }],
			[{ text: translationsDictionary.DeleteDebtOption[userLanguage], callback_data: Actions.delete_debt }],
		  ],
		}
	};
	return response;
}

async function ManageMonhtlyTaxes(userLanguage)
{
	let response = {};
	response.text = translationsDictionary.SelectAnOption[userLanguage];
	response.reply_keyboard = {
		reply_markup: {
		  inline_keyboard: 
		  [
			[{ text: translationsDictionary.CreateMonthlyTaxOption[userLanguage] , callback_data: Actions.create_monthly_tax }],
			[{ text: translationsDictionary.AddMoneyToMonthlysOption[userLanguage], callback_data: Actions.money_to_monthly_taxes }],
			[{ text: translationsDictionary.RetireMoneyFromMonthlysOption[userLanguage], callback_data: Actions.money_from_monthly_taxes }],
			[{ text: translationsDictionary.DeleteMonthlyTaxOption[userLanguage], callback_data: Actions.delete_monthly_tax }],
			[{ text: translationsDictionary.PayMonthlyTaxOption[userLanguage], callback_data: Actions.pay_monthly_tax }],
			[{ text: translationsDictionary.PayAllMonthlyTaxesOption[userLanguage], callback_data: Actions.pay_all_monthly_taxes }],
		  ],
		}
	};
	return response;
}

async function ManageYearlyTaxes(userLanguage)
{
	let response = {};
	response.text = translationsDictionary.SelectAnOption[userLanguage];
	response.reply_keyboard = {
		reply_markup: {
		  inline_keyboard: 
		  [
			[{ text: translationsDictionary.CreateYearlyTaxOption[userLanguage] , callback_data: Actions.create_yearly_tax }],
			[{ text: translationsDictionary.AddMoneyToYearlysOption[userLanguage], callback_data: Actions.money_to_yearly_taxes }],
			[{ text: translationsDictionary.RetireMoneyFromYearlysOption[userLanguage], callback_data: Actions.money_from_yearly_taxes }],
			[{ text: translationsDictionary.DeleteYearlyTaxOption[userLanguage], callback_data: Actions.delete_yearly_tax }],
			[{ text: translationsDictionary.PayYearlyTaxOption[userLanguage], callback_data: Actions.pay_yearly_tax }],
		  ],
		}
	};
	return response;
}

async function ManageOtherTaxes(userLanguage)
{
	let response = {};
	response.text = translationsDictionary.SelectAnOption[userLanguage];
	response.reply_keyboard = {
		reply_markup: {
		  inline_keyboard: 
		  [
			[{ text: translationsDictionary.CreateOtherTaxOption[userLanguage] , callback_data: Actions.create_other_tax }],
			[{ text: translationsDictionary.AddMoneyToOthersOption[userLanguage], callback_data: Actions.money_to_other_taxes }],
			[{ text: translationsDictionary.RetireMoneyFromOthersOption[userLanguage], callback_data: Actions.money_from_other_taxes }],
			[{ text: translationsDictionary.DeleteOtherTaxOption[userLanguage], callback_data: Actions.delete_other_tax }],
			[{ text: translationsDictionary.PayOtherTaxOption[userLanguage], callback_data: Actions.pay_other_tax }],
		  ],
		}
	};
	return response;
}

async function ManageFuturePurchases(userLanguage)
{
	let response = {};
	response.text = translationsDictionary.SelectAnOption[userLanguage];
	response.reply_keyboard = {
		reply_markup: {
		  inline_keyboard: 
		  [
			[{ text: translationsDictionary.NewFuturePurchaseOption[userLanguage] , callback_data: Actions.add_future_purchase }],
			[{ text: translationsDictionary.AddMoneyToFuturesOption[userLanguage], callback_data: Actions.money_to_future_purchases }],
			[{ text: translationsDictionary.RetireMoneyFromFuturesOption[userLanguage], callback_data: Actions.money_from_future_purchases }],
			[{ text: translationsDictionary.DeleteFuturePurchaseOption[userLanguage], callback_data: Actions.delete_future_purchase }],
			[{ text: translationsDictionary.PerformPurchaseOption[userLanguage], callback_data: Actions.perform_purchase }],
		  ],
		}
	};
	return response;
}

function InconsistencyFound(userLanguage) {
	return translationsDictionary.AccountIsInconsistent[userLanguage];
}

async function Default(userLanguage)
{
	let response = {};
	response.text = translationsDictionary.NoCommand[userLanguage];
	response.mark = true;
	return response;
}



module.exports = {
	Start,
	NoStart,
	ChangeLang,
	ChangeCurrency,
	Help,
	Guide,
	MyWallet,
	AddMoney,
	CreateHucha,
	AddMoneyToHucha,
	AddAllMoneyToHucha,
	RetireMoneyFromHucha,
	SpendMoneyFromHucha,
	DeleteHucha,
	CreateDebt,
	IncreaseDebt,
	TakeDebt,
	DeleteDebt,
	CreateMensual,
	MoneyToMensuales,
	MoneyFromMensuales,
	DeleteMensual,
	PayMensual,
	PayAllMensuales,
	CreateAnual,
	MoneyToAnuales,
	MoneyFromAnuales,
	DeleteAnual,
	PayAnual,
	CreateOther,
	MoneyToOthers,
	MoneyFromOthers,
	DeleteOther,
	PayOther,
	AddFuturePurchase,
	MoneyToFutures,
	MoneyFromFutures,
	DeleteFuturePurchase,
	PerformPurchase,
	EraseData,
	ManageDebts,
	ManageMoneyBoxes,
	ManageMonhtlyTaxes,
	ManageYearlyTaxes,
	ManageOtherTaxes,
	ManageFuturePurchases,
	InconsistencyFound,
	Default,
}