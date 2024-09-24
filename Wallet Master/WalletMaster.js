
const { Actions } = require('./enums/Actions.js');
const { States } = require('./enums/States.js');
const { Idiomas } = require('./enums/Idiomas.js');
const { Telegraf } = require('telegraf');
const mongoObj = require('./MongoFacade.js');
const EndPoints = require('./EndPoints');
const Utils = require('./Utils.js');


const token = '7456324156:AAFYk4jK6X_kSYy7J6h_fDWtdHoaVOrtX3A';
const telegramUrl = 'https://api.telegram.org/bot' + token;
const webAppUrl = 'https://script.google.com/macros/s/AKfycbxxDWlk-Ob-LFa_-Cj3Hrwc5zkTuZnUPOZOa0pvTszX7cj-rX2a33xRWYH6ynsBnt7CZQ/exec';
const bot = new Telegraf(token);
const debuglogs = false;


bot.use(async (ctx, next) => {
	if(!await mongoObj.connect())
	{
		ctx.reply('Error 503')
		return;
	} 
   return next();
});

bot.start(async (ctx) => {
	const chatId = ctx.message.chat.id;
	if(await mongoObj.accountExists(chatId))
	{
		let user = await mongoObj.getFromAccount(chatId);
		Utils.sendMarkedMessage(ctx, EndPoints.NoStart(user.misc.lang));
		return;
	} 
	await mongoObj.newAccount(chatId);
	Utils.sendMarkedMessage(ctx, EndPoints.Start());
	ctx.reply('If you have any questions or issues you can contact the author: ' + Utils.myUserUrl);
});

bot.use(async (ctx, next) => {
	const chatId = (ctx.callbackQuery == null) ? ctx.message.chat.id : ctx.callbackQuery.message.chat.id;
	if(!await mongoObj.accountExists(chatId))
	{
		ctx.reply('Error 401')
		return;
	} 
	if(!await mongoObj.selectAccount(chatId))
	{
		ctx.reply('Error 404');
		return;
	}
    return next();
});

bot.help(async (ctx) => {
	let user = await mongoObj.getFromAccount(ctx.message.chat.id);
	let resp = EndPoints.Help(user.misc.lang);
	Utils.sendMarkedMessage(ctx, resp[0].text);
	ctx.reply(resp[1].text);
})

bot.on('text', async (ctx) => {
	processQuery(ctx);
	//pruebas(ctx);
});

bot.on('callback_query', (ctx) => {
	processQuery(ctx);
});

bot.launch();

process.on('SIGINT', async () => {
	await client.close();
	process.exit();
 });

async function processQuery(ctx) {
	const text = (ctx.callbackQuery == null) ? ctx.message.text : ctx.callbackQuery.data;


	let userDB = await mongoObj.getSelectedAccount();
	const userLanguage = userDB.misc.lang;
	if(!await mongoObj.isSelectedAccountCommited())
	{
		ctx.reply(EndPoints.InconsistencyFound(userLanguage));
		return;
	}

	let tQuery = "";
	
	let userConvRef = userDB.misc.convstate;
	let userConvState = {};
	userConvState.name = userConvRef;

	if(!States.esUnState(userConvRef))
	{
		ctx.reply('Error 500');
		return;
	}
	if(userConvRef == States.normal)
	{
		tQuery = text;
		await mongoObj.updateSelectedAccount({"misc.currentquery": tQuery});
	}
	else tQuery = userDB.misc.currentquery;

	if(tQuery == "") tQuery = text;
	let tAnswer = '';

	switch(tQuery)
	{
		case Actions.help_short:
			let resp = EndPoints.Help(userDB.misc.lang);
			Utils.sendMarkedMessage(ctx, resp[0].text);
			ctx.reply(resp[1].text);
			return; 
		case Actions.erase_all_data:
		case Actions.erase_all_data_short:
			tAnswer = await EndPoints.EraseData(userLanguage, text, userConvState);
			break;
		case Actions.change_lang: 
		case Actions.change_lang_short:
			tAnswer = await EndPoints.ChangeLang(userLanguage, text, userConvState);
			break;
		case Actions.change_currency: 
		case Actions.change_currency_short:
			tAnswer = await EndPoints.ChangeCurrency(userLanguage, text, userConvState);
			break;
		case Actions.guide: 
		case Actions.guide_short:
			tAnswer = await EndPoints.Guide(userLanguage, text, userConvState);
			break;
		case Actions.my_wallet: 
		case Actions.my_wallet_short:
			tAnswer = await EndPoints.MyWallet(userLanguage);
			break;
		case Actions.add_money: 
		case Actions.add_money_short: 
			tAnswer = await EndPoints.AddMoney(userLanguage, text, userConvState);
			break;
		case Actions.manage_money_boxes:
		case Actions.manage_money_boxes_short:
			tAnswer = await EndPoints.ManageMoneyBoxes(userLanguage);
			break;
		case Actions.manage_debts:
		case Actions.manage_debts_short:
			tAnswer = await EndPoints.ManageDebts(userLanguage);
			break;
		case Actions.manage_monthly_taxes:
		case Actions.manage_monthly_taxes_short:
			tAnswer = await EndPoints.ManageMonhtlyTaxes(userLanguage);
			break;
		case Actions.manage_yearly_taxes: 
		case Actions.manage_yearly_taxes_short:
			tAnswer = await EndPoints.ManageYearlyTaxes(userLanguage);
			break;
		case Actions.manage_other_taxes: 
		case Actions.manage_other_taxes_short:
			tAnswer = await EndPoints.ManageOtherTaxes(userLanguage);
			break;
		case Actions.manage_future_purchases: 
		case Actions.manage_future_purchases_short:
			tAnswer = await EndPoints.ManageFuturePurchases(userLanguage);
			break;
		case Actions.create_money_box: 
			tAnswer = await EndPoints.CreateHucha(userLanguage, text, userConvState);
			break;
		case Actions.add_money_to_box: 
			tAnswer = await EndPoints.AddMoneyToHucha(userLanguage, text, userConvState);
			break;
		case Actions.add_all_money_to_box: 
			tAnswer = await EndPoints.AddAllMoneyToHucha(userLanguage, text, userConvState);
			break;
		case Actions.spend_money_from_box: 
			tAnswer = await EndPoints.SpendMoneyFromHucha(userLanguage, text, userConvState);
			break;
		case Actions.retire_money_from_box: 
			tAnswer = await EndPoints.RetireMoneyFromHucha(userLanguage, text, userConvState);
			break;
		case Actions.delete_money_box: 
			tAnswer = await EndPoints.DeleteHucha(userLanguage, text, userConvState);
			break;
		case Actions.create_debt: 
			tAnswer = await EndPoints.CreateDebt(userLanguage, text, userConvState);
			break;
		case Actions.increase_debt: 
			tAnswer = await EndPoints.IncreaseDebt(userLanguage, text, userConvState);
			break;
		case Actions.get_debt:
			tAnswer = await EndPoints.TakeDebt(userLanguage, text, userConvState);
			break;
		case Actions.delete_debt:
			tAnswer = await EndPoints.DeleteDebt(userLanguage, text, userConvState);
			break;
		case Actions.create_monthly_tax: 
			tAnswer = await EndPoints.CreateMensual(userLanguage, text, userConvState);
			break;
		case Actions.money_to_monthly_taxes:
			tAnswer = await EndPoints.MoneyToMensuales(userLanguage, text, userConvState);
			break;
		case Actions.money_from_monthly_taxes:
			tAnswer = await EndPoints.MoneyFromMensuales(userLanguage, text, userConvState);
			break;
		case Actions.delete_monthly_tax: 
			tAnswer = await EndPoints.DeleteMensual(userLanguage, text, userConvState);
			break;
		case Actions.pay_monthly_tax: 
			tAnswer = await EndPoints.PayMensual(userLanguage, text, userConvState);
			break;
		case Actions.pay_all_monthly_taxes: 
			tAnswer = await EndPoints.PayAllMensuales(userLanguage, text, userConvState);
			break;
		case Actions.create_yearly_tax:
			tAnswer = await EndPoints.CreateAnual(userLanguage, text, userConvState);
			break;
		case Actions.money_to_yearly_taxes:
			tAnswer = await EndPoints.MoneyToAnuales(userLanguage, text, userConvState);
			break;
		case Actions.money_from_yearly_taxes:
			tAnswer = await EndPoints.MoneyFromAnuales(userLanguage, text, userConvState);
			break;
		case Actions.delete_yearly_tax: 
			tAnswer = await EndPoints.DeleteAnual(userLanguage, text, userConvState);
			break;
		case Actions.pay_yearly_tax: 
			tAnswer = await EndPoints.PayAnual(userLanguage, text, userConvState);
			break;
		case Actions.create_other_tax:
			tAnswer = await EndPoints.CreateOther(userLanguage, text, userConvState);
			break;
		case Actions.money_to_other_taxes:
			tAnswer = await EndPoints.MoneyToOthers(userLanguage, text, userConvState);
			break;
		case Actions.money_from_other_taxes:
			tAnswer = await EndPoints.MoneyFromOthers(userLanguage, text, userConvState);
			break;
		case Actions.delete_other_tax:
			tAnswer = await EndPoints.DeleteOther(userLanguage, text, userConvState);
			break;
		case Actions.pay_other_tax:
			tAnswer = await EndPoints.PayOther(userLanguage, text, userConvState);
			break;
		case Actions.add_future_purchase:
			tAnswer = await EndPoints.AddFuturePurchase(userLanguage, text, userConvState);
			break;
		case Actions.money_to_future_purchases:
			tAnswer = await EndPoints.MoneyToFutures(userLanguage, text, userConvState);
			break;
		case Actions.money_from_future_purchases:
			tAnswer = await EndPoints.MoneyFromFutures(userLanguage, text, userConvState);
			break;
		case Actions.delete_future_purchase:
			tAnswer = await EndPoints.DeleteFuturePurchase(userLanguage, text, userConvState);
			break;
		case Actions.perform_purchase:
			tAnswer = await EndPoints.PerformPurchase(userLanguage, text, userConvState);
			break;
		default:
			tAnswer = await EndPoints.Default(userLanguage);
	}
	console.log(tAnswer);

	if(userConvState.name == States.error)
	{
		switch(userLanguage)
		{
			case Idiomas.spanish:
				ctx.reply('Se ha producido un error desconocido, disculpa las molestias.');
				break;
			case Idiomas.english:
			default:
				ctx.reply('An unexpected error happened, sorry for the inconvenience.');
		}
		if(debuglogs) ctx.reply(tAnswer.text);
		mongoObj.updateSelectedAccount({"misc.convstate": States.normal});
		return;
	}

	if(userConvState.name != userConvRef)
		mongoObj.updateSelectedAccount({"misc.convstate": userConvState.name});

	if(Array.isArray(tAnswer))
	{
		for(let t of tAnswer)
		{
			if(t.reply_keyboard != null)
			{
				ctx.reply(t.text, t.reply_keyboard);
				continue;
			}
			if(t.mark)
			{
				Utils.sendMarkedMessage(ctx, t.text);
				continue;
			}
			ctx.reply(t.text);
		}

	}
		
	if(tAnswer.reply_keyboard != null)
	{
		ctx.reply(tAnswer.text, tAnswer.reply_keyboard);
		return;
	}

	if(tAnswer.mark)
	{
		if(tAnswer.text !== undefined && tAnswer.text !== '') Utils.sendMarkedMessage(ctx, tAnswer.text);
		return;
	}

	if(tAnswer.text !== undefined && tAnswer.text !== '') ctx.reply(tAnswer.text);

}



async function pruebas(ctx){
	await mongoObj.selectAccount(ctx.message.chat.id);
	mongoObj.prueba(ctx.message.chat.id);
}


/**
 * 
 * WriteResult({
  "writeError": {
    "code": 8000,
    "errmsg": "you are over your space quota, using 513 MB of 512 MB"
  }
})
 */