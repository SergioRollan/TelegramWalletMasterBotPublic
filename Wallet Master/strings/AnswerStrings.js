
const { Actions } = require ("../enums/Actions.js");
const { Idiomas } = require("../enums/Idiomas.js");
const Utils = require('../Utils.js');

let translationsDictionary = 
{
    HelpMessage: {},
    MyContact: {},
    NoCommand: {},
    UserIsStupid: {},
    AlreadyStartedMessage: {},
    AccountIsInconsistent: {},
    SelectYourLanguage: {},
    SelectYourCurrency: {},
    SelectYourGuide: {},
    KeyboardYesOption: {},
    KeyboardNoOption: {},
    KeyboardCancelOption: {},
    CancelledSuccessfully: {},
    SelectAnOption: {},
    SelectTaxToPay: {},
    SelectTaxToDelete: {},
    ChangedLangCorrectly: {},
    ChangedCurrencyCorrectly: {},
    NoWalletMoneyCoincidence: {},
    HowMuchMoney: {},
    WillLiberateSomeMoneyDouble1: {},
    WillLiberateSomeMoneyDouble2: {},
    WillLiberateSomeMoneySingle1: {},
    WillLiberateSomeMoneySingle2: {},
    MoneyReceived1: {},
    MoneyReceived2: {},
    MoneyPaid1: {},
    MoneyPaid2: {},
    MoneyPaid3: {},
    MoneyPaid4: {},
    AlreadyEnoughMoneyBoxes: {},
    AlreadyEnoughDebts: {},
    AlreadyEnoughMonthlys: {},
    AlreadyEnoughYearlys: {},
    AlreadyEnoughOthers: {},
    AlreadyEnoughFutures: {},
    TypeNewMoneyBoxName: {},
    TypeNewMoneyBoxLimit: {},
    TypeNewDebtName: {},
    TypeNewDebtInitial: {},
    TypeNewTaxName: {},
    TypeNewTaxCost: {},
    TypeNewFuturePaymentName: {},
    TypeNewFuturePaymentCost: {},
    CreateHuchaOption: {},
    AddMoneyToHuchaOption: {},
    FillHuchaOption: {},
    RetireFromHuchaOption: {},
    SpendFromHuchaOption: {},
    DeleteHuchaOption: {},
    CreateDebtOption: {},
    IncreaseDebtOption: {},
    TakeDebtOption: {},
    DeleteDebtOption: {},
    CreateMonthlyTaxOption: {},
    AddMoneyToMonthlysOption: {},
    RetireMoneyFromMonthlysOption: {},
    DeleteMonthlyTaxOption: {},
    PayMonthlyTaxOption: {},
    PayAllMonthlyTaxesOption: {},
    CreateYearlyTaxOption: {},
    AddMoneyToYearlysOption: {},
    RetireMoneyFromYearlysOption: {},
    DeleteYearlyTaxOption: {},
    PayYearlyTaxOption: {},
    CreateOtherTaxOption: {},
    AddMoneyToOthersOption: {},
    RetireMoneyFromOthersOption: {},
    DeleteOtherTaxOption: {},
    PayOtherTaxOption: {},
    NewFuturePurchaseOption: {},
    AddMoneyToFuturesOption: {},
    RetireMoneyFromFuturesOption: {},
    DeleteFuturePurchaseOption: {},
    PerformPurchaseOption: {},
    MoneyBoxCreated1: {},
    MoneyBoxCreated2: {},
    DebtCreated1: {},
    DebtCreated2: {},
    TaxCreated1: {},
    TaxCreated2: {},
    PurchaseCreated1: {},
    PurchaseCreated2: {},
    SelectBoxToOperate1: {},
    SelectBoxToOperate2: {},
    SelectBoxToSubstract: {},
    SelectBoxToDelete: {},
    SelectDebtToModify: {},
    SelectDebtToTake: {},
    SelectDebtToDelete: {},
    YouHaveNoBoxesToOperateWith: {},
    YouHaveNoMoneyToOperateWith: {},
    YouHaveNoTaxesToOperateWith: {},
    YouHaveNoDebtsToOperateWith: {},
    YouHaveNoFuturesToOperateWith: {},
    SelectFutureToBuy: {},
    SelectFutureToDelete: {},
    YouHaveNotEnoughMoney1: {},
    YouHaveNotEnoughMoney2: {},
    HowMuchMoneyToBox: {},
    HowMuchMoneyToMonthlys: {},
    HowMuchMoneyToYearlys: {},
    HowMuchMoneyToOthers: {},
    HowMuchMoneyToFutures: {},
    HowMuchMoneyToGet: {},
    HowMuchMoneyToRetire1: {},
    HowMuchMoneyToRetire2: {},
    HowMuchMoneyToSpend: {},
    HowMuchMoneyToIncrease: {},
    YouDontHaveThatMuchMoney: {},
    YouCantTakeThatMuchMoney: {},
    MoneyBoxOverflows: {},
    MoneyStoreOverflows1: {},
    MoneyStoreOverflows2: {},
    MoneyBoxAlreadyFull: {},
    MoneyStoreAlreadyFull: {},
    AddedMoneySuccesfully1: {},
    AddedMoneySuccesfully2: {},
    AddedMoneySuccesfully3: {},
    AddedMoneyToDebtSuccesfully1: {},
    AddedMoneyToDebtSuccesfully2: {},
    AddedMoneyToDebtSuccesfully3: {},
    AddedMoneyToStoreSuccesfully: {},
    RetiredMoneySuccessfully1: {},
    RetiredMoneySuccessfully2: {},
    RetiredMoneySuccessfully3: {},
    RetiredMoneySuccessfully4: {},
    SpentMoneySuccessfully1: {},
    SpentMoneySuccessfully2: {},
    SpentMoneySuccessfully3: {},
    SpentMoneySuccessfully4: {},
    SpentMoneySuccessfully5: {},
    DebtTakenSuccessfully1: {},
    DebtTakenSuccessfully2: {},
    DebtTakenSuccessfully3: {},
    DebtTakenSuccessfully4: {},
    PaidTaxSuccessfully1: {},
    PaidTaxSuccessfully2: {},
    PaidTaxSuccessfully3: {},
    PaidTaxSuccessfully4: {},
    PaidTaxSuccessfully5: {},
    PurchasedSuccessfully1: {},
    PurchasedSuccessfully2: {},
    PurchasedSuccessfully3: {},
    PurchasedSuccessfully4: {},
    PurchasedSuccessfully5: {},
    BoxDeletedSuccessfully1: {},
    BoxDeletedSuccessfully2: {},
    BoxDeletedSuccessfully3: {},
    TaxDeletedSuccessfully1: {},
    TaxDeletedSuccessfully2: {},
    DebtDeletedSuccessfully1: {},
    DebtDeletedSuccessfully2: {},
    PurchaseDeletedSuccessfully1: {},
    PurchaseDeletedSuccessfully2: {},
    WeWillTransfer1: {},
    WeWillTransfer2: {},
    WeWillTransfer2p5: {},
    WeWillTransfer3: {},
    SureToDeleteBox1: {},
    SureToDeleteBox2: {},
    SureToDeleteDebt1: {},
    SureToDeleteDebt2: {},
    SureToDeleteTax1: {},
    SureToDeleteTax2: {},
    SureToDeletePurchase1: {},
    SureToDeletePurchase2: {},
    SureToPerformPurchase1: {},
    SureToPerformPurchase2: {},
    ConfirmPayTax1: {},
    ConfirmPayTax2: {},
    ConfirmTakeDebt1: {},
    ConfirmTakeDebt2: {},
    ConfirmPerformPurchase1: {},
    ConfirmPerformPurchase2: {},
    VeryConfirmEraseData: {},
    DataErasedSuccessfully: {},
};

translationsDictionary.HelpMessage[Idiomas.english]="Hello, I am the *Wallet Master Bot* from *Sergio Rollán*. Here's a summary of all the instructions you can control me with:\n\n" +
    "\n`----IMPORTANT COMMANDS----`\n"+
    "[*"+Actions.change_lang+"*] or [*"+Actions.change_lang_short+"*] - _Cambia el idioma_ / _Changes the language_ \n" +
    "[*"+Actions.change_currency+"*] or [*"+Actions.change_currency_short+"*] - Changes the currency your money will be represented in\n" +
    "[*"+Actions.help+"*] or [*"+Actions.help_short+"*] - Explains what each command does in your language\n" +
    "[*"+Actions.my_wallet+"*] or [*"+Actions.my_wallet_short+"*] - Shows a summary of all your boxes, debts and taxes in your language\n" +
    "\n`-----MONEY MANAGEMENT-----`\n"+
    "[*"+Actions.add_money+"*] or [*"+Actions.add_money_short+"*] - When you are given your salary, add it to your global wallet with this command\n" +
    "[*"+Actions.manage_money_boxes+"*] or [*"+Actions.manage_money_boxes_short+"*] - Create, delete or manage a money box to organize your money, adding and spending money from it\n" +
    "[*"+Actions.manage_debts+"*] or [*"+Actions.manage_debts_short+"*] - Create, delete or take money your friends owe you\n" +
    "[*"+Actions.manage_future_purchases+"*] or [*"+Actions.manage_future_purchases_short+"*] - Make a special place to stuff you know for sure you're going to buy in a near future\n" +
    "\n`------TAX MANAGEMENT------`\n"+
    "[*"+Actions.manage_monthly_taxes+"*] or [*"+Actions.manage_monthly_taxes_short+"*] - Manage your fixed payments that are marked as monthly paid\n" +
    "[*"+Actions.manage_yearly_taxes+"*] or [*"+Actions.manage_yearly_taxes_short+"*] - Manage your fixed payments that are marked as yearly paid\n" +
    "[*"+Actions.manage_other_taxes+"*] or [*"+Actions.manage_other_taxes_short+"*] - Manage your fixed payments that are marked as non-periodical\n" +
    "\n`------OTHER ACTIONS-------`\n"+
    "[*"+Actions.erase_all_data+"*] or [*"+Actions.erase_all_data_short+"*] - Erase all the data on this account and start from zero (*CAREFUL*, this is a _NON_-reversible action!!)\n" +
    "[*"+Actions.guide+"*] or [*"+Actions.guide_short+"*] - Shows a little guide about how the author planned the bot to be used";
translationsDictionary.HelpMessage[Idiomas.spanish] = "Hola, soy el *Bot Wallet Master* de *Sergio Rollán*. Aquí te dejo un resumen de todas las instrucciones con las que puedes controlarme:\n\n" +
    "\n`---COMANDOS IMPORTANTES---`\n"+
    "[*"+Actions.change_lang+"*] o [*"+Actions.change_lang_short+"*] - _Cambia el idioma_ / _Changes the language_\n" +
    "[*"+Actions.change_currency+"*] o [*"+Actions.change_currency_short+"*] - Cambia la moneda de cambio de tu dinero\n" +
    "[*"+Actions.help+"*] o [*"+Actions.help_short+"*] - Explica lo que cada comando hace en tu idioma\n" +
    "[*"+Actions.my_wallet+"*] o [*"+Actions.my_wallet_short+"*] - Muestra un resumen de todas tus huchas, deudas y pagos periódicos en tu idioma\n" +
    "\n`-----DINERO Y HUCHAS------`\n"+
    "[*"+Actions.add_money+"*] o [*"+Actions.add_money_short+"*] - Cuando cobres la nómina, añádela a tu cartera global usando este comando\n" +
    "[*"+Actions.manage_money_boxes+"*] o [*"+Actions.manage_money_boxes_short+"*] - Crea, elimina y modifica tus huchas para organizar bien tu dinero, añadiendo y gastando dinero de ellas\n" +
    "[*"+Actions.manage_debts+"*] o [*"+Actions.manage_debts_short+"*] - Crea, elimina y cobra el dinero que te deba tu amigo\n" +
    "[*"+Actions.manage_future_purchases+"*] o [*"+Actions.manage_future_purchases_short+"*] - Reserva un sitio especial a lo que sabes de seguro que vas a comprar en un futuro cercano\n" +
    "\n`-----PAGOS PERIÓDICOS-----`\n"+
    "[*"+Actions.manage_monthly_taxes+"*] o [*"+Actions.manage_monthly_taxes_short+"*] - Gestiona tus pagos fijos marcados como mensuales\n" +
    "[*"+Actions.manage_yearly_taxes+"*] o [*"+Actions.manage_yearly_taxes_short+"*] - Gestiona tus pagos fijos marcados como anuales\n" +
    "[*"+Actions.manage_other_taxes+"*] o [*"+Actions.manage_other_taxes_short+"*] - Gestiona tus pagos fijos marcados como no periódicos\n" +
    "\n`------OTRAS ACCIONES------`\n"+
    "[*"+Actions.erase_all_data+"*] o [*"+Actions.erase_all_data_short+"*] - Borra todos los datos de esta cuenta y empieza de cero (*CUIDADO*, esta acción _NO_ es reversible!!)\n" +
    "[*"+Actions.guide+"*] o [*"+Actions.guide_short+"*] - Muestra una pequeña guía sobre cómo está planeado que sea utilizado el bot";
    
translationsDictionary.MyContact[Idiomas.english] = 'If you have any questions or issues you can contact the author: ' + Utils.myUserUrl;
translationsDictionary.MyContact[Idiomas.spanish] = 'Para cualquier duda o problema puedes hablar con el autor: ' + Utils.myUserUrl;

translationsDictionary.NoCommand[Idiomas.english] = "No command was selected, please type a valid command.\n\n"+
    "If you wish to see all the possible commands, use [*"+Actions.help+"*].\n\n" +
    "If you wish to change the _language_, use [*"+Actions.change_lang+"*].";
translationsDictionary.NoCommand[Idiomas.spanish] = "No se ha seleccionado ningún comando, por favor teclea un comando válido.\n\n"+
    "Si deseas mostrar un resumen de los comandos, utiliza [*"+Actions.help+"*].\n\n" +
    "Si deseas cambiar el _idioma_, utiliza [*"+Actions.change_lang+"*].";

translationsDictionary.UserIsStupid[Idiomas.english] = "Use the buttons provided or the format requested.\n\n"+
    "If you wish to see all the possible commands, use [*"+Actions.help+"*].\n\n" +
    "If you wish to read a deep explanation on this bot's functions, use [*"+Actions.guide+"*].\n\n" +
    "If you wish to change the _language_, use [*"+Actions.change_lang+"*].";
translationsDictionary.UserIsStupid[Idiomas.spanish] = "Utiliza los botones proporcionados o el formato pedido.\n\n"+
    "Si deseas ver un resumen de los comandos, utiliza [*"+Actions.help+"*].\n\n" +
    "Si deseas leer una explicación en profundidad de las funciones del bot, utiliza [*"+Actions.guide+"*].\n\n" +
    "Si deseas cambiar el _idioma_, utiliza [*"+Actions.change_lang+"*].";

translationsDictionary.AlreadyStartedMessage[Idiomas.english] = "This bot has already been started.\n\n"+
    "If you wish to see all the possible commands, use [*"+Actions.help+"*].\n\n" +
    "If you wish to change the _language_, use [*"+Actions.change_lang+"*].";
translationsDictionary.AlreadyStartedMessage[Idiomas.spanish] = "Este bot ya ha sido iniciado.\n\n"+
    "Si deseas mostrar un resumen de los comandos, utiliza [*"+Actions.help+"*].\n\n" +
    "Si deseas cambiar el _idioma_, utiliza [*"+Actions.change_lang+"*].";

translationsDictionary.SelectYourLanguage[Idiomas.english] = "Select your language:";
translationsDictionary.SelectYourLanguage[Idiomas.spanish] = "Selecciona tu idioma:";

translationsDictionary.SelectYourCurrency[Idiomas.english] = "Select your currency:";
translationsDictionary.SelectYourCurrency[Idiomas.spanish] = "Selecciona tu moneda:";

translationsDictionary.SelectYourGuide[Idiomas.english] = "Select what you wish to know more about:";
translationsDictionary.SelectYourGuide[Idiomas.spanish] = "Selecciona la opción de la que quieres saber más:";

translationsDictionary.KeyboardNoOption[Idiomas.english] = "No";
translationsDictionary.KeyboardNoOption[Idiomas.spanish] = "No";

translationsDictionary.KeyboardYesOption[Idiomas.english] = "Yes";
translationsDictionary.KeyboardYesOption[Idiomas.spanish] = "Sí";

translationsDictionary.KeyboardCancelOption[Idiomas.english] = "Cancel";
translationsDictionary.KeyboardCancelOption[Idiomas.spanish] = "Cancelar";

translationsDictionary.CancelledSuccessfully[Idiomas.english] = "You cancelled the action. You're on main menu again now.";
translationsDictionary.CancelledSuccessfully[Idiomas.spanish] = "Has cancelado la acción. Estás en el menú principal de nuevo.";

translationsDictionary.SelectAnOption[Idiomas.english] = "Select an option:";
translationsDictionary.SelectAnOption[Idiomas.spanish] = "Selecciona una opción:";

translationsDictionary.SelectTaxToPay[Idiomas.english] = "Select what tax you want to pay.";
translationsDictionary.SelectTaxToPay[Idiomas.spanish] = "Selecciona el pago que quieres realizar.";

translationsDictionary.SelectTaxToDelete[Idiomas.english] = "Select what tax you want to delete.";
translationsDictionary.SelectTaxToDelete[Idiomas.spanish] = "Selecciona el pago que quieres eliminar.";

translationsDictionary.ChangedLangCorrectly[Idiomas.english] = "Language was changed to English.";
translationsDictionary.ChangedLangCorrectly[Idiomas.spanish] = "Se ha cambiado el idioma a español.";

translationsDictionary.ChangedCurrencyCorrectly[Idiomas.english] = "Your currency was correctly changed to ";
translationsDictionary.ChangedCurrencyCorrectly[Idiomas.spanish] = "Se ha cambiado correctamente tu moneda a ";

translationsDictionary.NoWalletMoneyCoincidence[Idiomas.english] = "Error: the money used and remaining do not add up well. Please, contact the author: " + Utils.myUserUrl;
translationsDictionary.NoWalletMoneyCoincidence[Idiomas.spanish] = "Error: no hay concordancia en el dinero usado y restante. Por favor, contacta con el autor: " + Utils.myUserUrl;

translationsDictionary.HowMuchMoney[Idiomas.english] = "How much money did you receive?\n\n(Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)";
translationsDictionary.HowMuchMoney[Idiomas.spanish] = "¿Cuánto dinero has recibido?\n\n(Por favor, escribe la cantidad con punto, apóstrofe o coma, por ejemplo: 9.50 / 9'50 / 9,50)";

translationsDictionary.WillLiberateSomeMoneyDouble1[Idiomas.english] = "The current money destined to these taxes would be higher than the max amount to cover 2 periods by ";
translationsDictionary.WillLiberateSomeMoneyDouble1[Idiomas.spanish] = "El dinero destinado a estos pagos sería mayor al máximo permitido de cubrir 2 periodos por ";

translationsDictionary.WillLiberateSomeMoneyDouble2[Idiomas.english] = ", so that much will be transfered to the main count.";
translationsDictionary.WillLiberateSomeMoneyDouble2[Idiomas.spanish] = ", así que esa cantidad será transferida al montón principal.";

translationsDictionary.WillLiberateSomeMoneySingle1[Idiomas.english] = "The current money destined here would be higher than the new max amount by ";
translationsDictionary.WillLiberateSomeMoneySingle1[Idiomas.spanish] = "El dinero destinado aquí sería mayor al nuevo máximo permitido por ";

translationsDictionary.WillLiberateSomeMoneySingle2[Idiomas.english] = ", so that much will be transfered to the main count.";
translationsDictionary.WillLiberateSomeMoneySingle2[Idiomas.spanish] = ", así que esa cantidad será transferida al montón principal.";

translationsDictionary.MoneyReceived1[Idiomas.english] = "Successfully added *";
translationsDictionary.MoneyReceived1[Idiomas.spanish] = "Se ha/n añadido correctamente *";

translationsDictionary.MoneyReceived2[Idiomas.english] = "* to your account. You currently have a total of *";
translationsDictionary.MoneyReceived2[Idiomas.spanish] = "* a tu cuenta. Actualmente dispones de un total de *";

translationsDictionary.MoneyPaid1[Idiomas.english] = "Successfully spent *";
translationsDictionary.MoneyPaid1[Idiomas.spanish] = "Se ha/n gastado correctamente *";

translationsDictionary.MoneyPaid2[Idiomas.english] = "* from this tax list count. You have *";
translationsDictionary.MoneyPaid2[Idiomas.spanish] = "* de tu cuenta. Dispones de *";

translationsDictionary.MoneyPaid3[Idiomas.english] = "* left, and *";
translationsDictionary.MoneyPaid3[Idiomas.spanish] = "* más, y *";

translationsDictionary.MoneyPaid4[Idiomas.english] = "* total.";
translationsDictionary.MoneyPaid4[Idiomas.spanish] = "* en total.";

translationsDictionary.AlreadyEnoughMoneyBoxes[Idiomas.english] = "You already reached your limit of money boxes. Please delete one before creating again.";
translationsDictionary.AlreadyEnoughMoneyBoxes[Idiomas.spanish] = "Ya has alcanzado tu límite de huchas. Por favor, elimina una antes de crear de nuevo.";

translationsDictionary.AlreadyEnoughDebts[Idiomas.english] = "You already reached your limit of debts. Please finish with one before creating again.";
translationsDictionary.AlreadyEnoughDebts[Idiomas.spanish] = "Ya has alcanzado tu límite de deudas. Por favor, espera a cobrar una antes de crear de nuevo.";

translationsDictionary.AlreadyEnoughMonthlys[Idiomas.english] = "You already reached your limit of monthly taxes. Please delete one before creating again.";
translationsDictionary.AlreadyEnoughMonthlys[Idiomas.spanish] = "Ya has alcanzado tu límite de pagos mensuales. Por favor, elimina uno antes de crear de nuevo.";

translationsDictionary.AlreadyEnoughYearlys[Idiomas.english] = "You already reached your limit of yearly taxes. Please delete one before creating again.";
translationsDictionary.AlreadyEnoughYearlys[Idiomas.spanish] = "Ya has alcanzado tu límite de pagos anuales. Por favor, elimina uno antes de crear de nuevo.";

translationsDictionary.AlreadyEnoughOthers[Idiomas.english] = "You already reached your limit of non-periodical payments. Please delete one before creating again.";
translationsDictionary.AlreadyEnoughOthers[Idiomas.spanish] = "Ya has alcanzado tu límite de pagos no periódicos. Por favor, elimina uno antes de crear de nuevo.";

translationsDictionary.AlreadyEnoughFutures[Idiomas.english] = "You already reached your limit of future purchases. Please delete one or buy one before creating again.";
translationsDictionary.AlreadyEnoughFutures[Idiomas.spanish] = "Ya has alcanzado tu límite de compras futuras. Por favor, elimina una o compra una antes de crear de nuevo.";

translationsDictionary.TypeNewMoneyBoxName[Idiomas.english] = "What will the name of this money box be?";
translationsDictionary.TypeNewMoneyBoxName[Idiomas.spanish] = "¿Qué nombre tendrá esta hucha?";

translationsDictionary.TypeNewMoneyBoxLimit[Idiomas.english] = "How much money do you want to store in this box at most?\n\n(Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)";
translationsDictionary.TypeNewMoneyBoxLimit[Idiomas.spanish] = "¿Cuánto dinero quieres almacenar aquí como máximo?\n\n(Por favor, escribe la cantidad con punto, apóstrofe o coma, por ejemplo: 9.50 / 9'50 / 9,50)";

translationsDictionary.TypeNewDebtName[Idiomas.english] = "What will the name of this debt be? (For example, the name of the person who ows you money)";
translationsDictionary.TypeNewDebtName[Idiomas.spanish] = "¿Qué nombre tendrá esta deuda? (Por ejemplo, el nombre de la persona que te debe dinero)";

translationsDictionary.TypeNewDebtInitial[Idiomas.english] = "How much money do they owe you?\n\n(Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)";
translationsDictionary.TypeNewDebtInitial[Idiomas.spanish] = "¿Cuánto dinero te deben?\n\n(Por favor, escribe la cantidad con punto, apóstrofe o coma, por ejemplo: 9.50 / 9'50 / 9,50)";

translationsDictionary.TypeNewTaxName[Idiomas.english] = "What will the name of this payment be?";
translationsDictionary.TypeNewTaxName[Idiomas.spanish] = "¿Qué nombre tendrá este pago?";

translationsDictionary.TypeNewTaxCost[Idiomas.english] = "What is this tax's cost?\n\n(Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)";
translationsDictionary.TypeNewTaxCost[Idiomas.spanish] = "¿Qué coste tiene este pago?\n\n(Por favor, escribe la cantidad con punto, apóstrofe o coma, por ejemplo: 9.50 / 9'50 / 9,50)";

translationsDictionary.TypeNewFuturePaymentName[Idiomas.english] = "What's the name of what you want to purchase?";
translationsDictionary.TypeNewFuturePaymentName[Idiomas.spanish] = "¿Qué nombre tiene lo que quieres comprar?";

translationsDictionary.TypeNewFuturePaymentCost[Idiomas.english] = "What's its price?\n\n(Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)";
translationsDictionary.TypeNewFuturePaymentCost[Idiomas.spanish] = "¿Qué precio tiene?\n\n(Por favor, escribe la cantidad con punto, apóstrofe o coma, por ejemplo: 9.50 / 9'50 / 9,50)";

translationsDictionary.CreateHuchaOption[Idiomas.english] = "Create new money box";
translationsDictionary.CreateHuchaOption[Idiomas.spanish] = "Crear nueva hucha";

translationsDictionary.AddMoneyToHuchaOption[Idiomas.english] = "Add some money to a box";
translationsDictionary.AddMoneyToHuchaOption[Idiomas.spanish] = "Añadir algo de dinero a una hucha";

translationsDictionary.FillHuchaOption[Idiomas.english] = "Fill a box as much as possible";
translationsDictionary.FillHuchaOption[Idiomas.spanish] = "Llenar una hucha todo lo posible";

translationsDictionary.RetireFromHuchaOption[Idiomas.english] = "Retire money from a box";
translationsDictionary.RetireFromHuchaOption[Idiomas.spanish] = "Saca dinero de una hucha";

translationsDictionary.SpendFromHuchaOption[Idiomas.english] = "Spend money from a box";
translationsDictionary.SpendFromHuchaOption[Idiomas.spanish] = "Gastar dinero de una hucha";

translationsDictionary.DeleteHuchaOption[Idiomas.english] = "Delete a money box";
translationsDictionary.DeleteHuchaOption[Idiomas.spanish] = "Borrar una hucha";

translationsDictionary.CreateDebtOption[Idiomas.english] = "Note down a new debt";
translationsDictionary.CreateDebtOption[Idiomas.spanish] = "Apunta una nueva deuda";

translationsDictionary.IncreaseDebtOption[Idiomas.english] = "Increment a debt";
translationsDictionary.IncreaseDebtOption[Idiomas.spanish] = "Aumenta una deuda";

translationsDictionary.TakeDebtOption[Idiomas.english] = "Take a debt's money";
translationsDictionary.TakeDebtOption[Idiomas.spanish] = "Cobra una deuda";

translationsDictionary.DeleteDebtOption[Idiomas.english] = "Delete a debt";
translationsDictionary.DeleteDebtOption[Idiomas.spanish] = "Elimina una deuda";

translationsDictionary.CreateMonthlyTaxOption[Idiomas.english] = "Create a monthly tax";
translationsDictionary.CreateMonthlyTaxOption[Idiomas.spanish] = "Crea un pago mensual";

translationsDictionary.AddMoneyToMonthlysOption[Idiomas.english] = "Add money to save it for paying the monthly taxes";
translationsDictionary.AddMoneyToMonthlysOption[Idiomas.spanish] = "Reserva dinero para los pagos mensuales";

translationsDictionary.RetireMoneyFromMonthlysOption[Idiomas.english] = "Retire money you'd saved for the monthly taxes";
translationsDictionary.RetireMoneyFromMonthlysOption[Idiomas.spanish] = "Retira dinero que habías reservado para ellos";

translationsDictionary.DeleteMonthlyTaxOption[Idiomas.english] = "Delete a monthly tax";
translationsDictionary.DeleteMonthlyTaxOption[Idiomas.spanish] = "Elimina un pago mensual";

translationsDictionary.PayMonthlyTaxOption[Idiomas.english] = "Pay a monthly tax";
translationsDictionary.PayMonthlyTaxOption[Idiomas.spanish] = "Efectúa un pago mensual";

translationsDictionary.PayAllMonthlyTaxesOption[Idiomas.english] = "Pay all monthly taxes at once";
translationsDictionary.PayAllMonthlyTaxesOption[Idiomas.spanish] = "Efectúa todos los pagos mensuales";

translationsDictionary.CreateYearlyTaxOption[Idiomas.english] = "Create a yearly tax";
translationsDictionary.CreateYearlyTaxOption[Idiomas.spanish] = "Crea un pago anual";

translationsDictionary.AddMoneyToYearlysOption[Idiomas.english] = "Add money to save it for paying the yearly taxes";
translationsDictionary.AddMoneyToYearlysOption[Idiomas.spanish] = "Reserva dinero para los pagos anuales";

translationsDictionary.RetireMoneyFromYearlysOption[Idiomas.english] = "Retire money you'd saved for the yearly taxes";
translationsDictionary.RetireMoneyFromYearlysOption[Idiomas.spanish] = "Retira dinero que habías reservado para ellos";

translationsDictionary.DeleteYearlyTaxOption[Idiomas.english] = "Delete a yearly tax";
translationsDictionary.DeleteYearlyTaxOption[Idiomas.spanish] = "Elimina un pago anual";

translationsDictionary.PayYearlyTaxOption[Idiomas.english] = "Pay a yearly tax";
translationsDictionary.PayYearlyTaxOption[Idiomas.spanish] = "Efectúa un pago anual";

translationsDictionary.CreateOtherTaxOption[Idiomas.english] = "Create a non-periodical tax";
translationsDictionary.CreateOtherTaxOption[Idiomas.spanish] = "Crea un pago no periódico";

translationsDictionary.AddMoneyToOthersOption[Idiomas.english] = "Add money to save it for paying the non-peridical taxes";
translationsDictionary.AddMoneyToOthersOption[Idiomas.spanish] = "Reserva dinero para los pagos no periódicos";

translationsDictionary.RetireMoneyFromOthersOption[Idiomas.english] = "Retire money you'd saved for the non-periodical taxes";
translationsDictionary.RetireMoneyFromOthersOption[Idiomas.spanish] = "Retira dinero que habías reservado para ellos";

translationsDictionary.DeleteOtherTaxOption[Idiomas.english] = "Delete a non-periodical tax";
translationsDictionary.DeleteOtherTaxOption[Idiomas.spanish] = "Elimina un pago no periódico";

translationsDictionary.PayOtherTaxOption[Idiomas.english] = "Pay a non-periodical tax";
translationsDictionary.PayOtherTaxOption[Idiomas.spanish] = "Efectúa un pago no periódico";

translationsDictionary.NewFuturePurchaseOption[Idiomas.english] = "Create a new future purchase";
translationsDictionary.NewFuturePurchaseOption[Idiomas.spanish] = "Crea una nueva compra planeada";

translationsDictionary.AddMoneyToFuturesOption[Idiomas.english] = "Add money to save it for the future purchases";
translationsDictionary.AddMoneyToFuturesOption[Idiomas.spanish] = "Reserva dinero para las compras planeadas";

translationsDictionary.RetireMoneyFromFuturesOption[Idiomas.english] = "Retire money you'd saved for the future purchases";
translationsDictionary.RetireMoneyFromFuturesOption[Idiomas.spanish] = "Retira dinero que habías reservado para ellas";

translationsDictionary.DeleteFuturePurchaseOption[Idiomas.english] = "Delete a purchase you need no more";
translationsDictionary.DeleteFuturePurchaseOption[Idiomas.spanish] = "Elimina una compra que ya no necesites";

translationsDictionary.PerformPurchaseOption[Idiomas.english] = "Perform a purchase from the list";
translationsDictionary.PerformPurchaseOption[Idiomas.spanish] = "Realiza una compra de la lista";

translationsDictionary.MoneyBoxCreated1[Idiomas.english] = "The new money box called *";
translationsDictionary.MoneyBoxCreated1[Idiomas.spanish] = "Se ha creado la nueva hucha llamada *";

translationsDictionary.MoneyBoxCreated2[Idiomas.english] = "* has been successfully created.";
translationsDictionary.MoneyBoxCreated2[Idiomas.spanish] = "* con éxito.";

translationsDictionary.DebtCreated1[Idiomas.english] = "The new debt assigned to *";
translationsDictionary.DebtCreated1[Idiomas.spanish] = "Se ha creado la nueva deuda de *";

translationsDictionary.DebtCreated2[Idiomas.english] = "* has been successfully created.";
translationsDictionary.DebtCreated2[Idiomas.spanish] = "* con éxito.";

translationsDictionary.TaxCreated1[Idiomas.english] = "The new tax called *";
translationsDictionary.TaxCreated1[Idiomas.spanish] = "Se ha creado el nuevo pago llamado *";

translationsDictionary.TaxCreated2[Idiomas.english] = "* has been successfully created.";
translationsDictionary.TaxCreated2[Idiomas.spanish] = "* con éxito.";

translationsDictionary.PurchaseCreated1[Idiomas.english] = "The new future purchase of *";
translationsDictionary.PurchaseCreated1[Idiomas.spanish] = "Se ha registrado el el pago futuro de *";

translationsDictionary.PurchaseCreated2[Idiomas.english] = "* has been successfully registered.";
translationsDictionary.PurchaseCreated2[Idiomas.spanish] = "* con éxito.";

translationsDictionary.SelectBoxToOperate1[Idiomas.english] = "You currently have ";
translationsDictionary.SelectBoxToOperate1[Idiomas.spanish] = "Actualmente tienes ";

translationsDictionary.SelectBoxToOperate2[Idiomas.english] = " that have not been distributed. Select one of your money boxes:";
translationsDictionary.SelectBoxToOperate2[Idiomas.spanish] = " sin distribuir. Selecciona una de tus huchas:";

translationsDictionary.SelectBoxToSubstract[Idiomas.english] = "Select a box to spend money from:";
translationsDictionary.SelectBoxToSubstract[Idiomas.spanish] = "Selecciona la hucha de la quieres gastar:";

translationsDictionary.SelectBoxToDelete[Idiomas.english] = "Select the money box you want to delete:";
translationsDictionary.SelectBoxToDelete[Idiomas.spanish] = "Selecciona la hucha que quieres eliminar:";

translationsDictionary.SelectDebtToDelete[Idiomas.english] = "Select the debt you want to forgive:";
translationsDictionary.SelectDebtToDelete[Idiomas.spanish] = "Selecciona la deuda que quieres perdonar:";

translationsDictionary.SelectDebtToModify[Idiomas.english] = "Select the debt you want to modify";
translationsDictionary.SelectDebtToModify[Idiomas.spanish] = "Actualmente tienes ";

translationsDictionary.SelectDebtToTake[Idiomas.english] = "Select the debt that has now been dealt with:";
translationsDictionary.SelectDebtToTake[Idiomas.spanish] = "Selecciona la deuda que ya se ha saldado:";

translationsDictionary.SelectFutureToBuy[Idiomas.english] = "Select the product you want to buy now:";
translationsDictionary.SelectFutureToBuy[Idiomas.spanish] = "Selecciona el producto que ya qiueres comprar ahora:";

translationsDictionary.SelectFutureToDelete[Idiomas.english] = "Select the product you don't want to buy anymore:";
translationsDictionary.SelectFutureToDelete[Idiomas.spanish] = "Selecciona el producto que ya no quieres comprar:";

translationsDictionary.YouHaveNoBoxesToOperateWith[Idiomas.english] = "You've got no money boxes to operate with. Please create one or more boxes before distributing your money with them.";
translationsDictionary.YouHaveNoBoxesToOperateWith[Idiomas.spanish] = "No tienes huchas con las que operar. Por favor, crea una o más huchas antes de distribuir el dinero en ellas.";

translationsDictionary.YouHaveNoMoneyToOperateWith[Idiomas.english] = "You've got no money to operate with. Wait until you earn more money to distribute it into your boxes.";
translationsDictionary.YouHaveNoMoneyToOperateWith[Idiomas.spanish] = "No tienes dinero con el que operar. Esperar a ganar más para distribuirlo en tus huchas.";

translationsDictionary.YouHaveNoDebtsToOperateWith[Idiomas.english] = "You've got no debts to operate with. Please create one or more debts operating with them.";
translationsDictionary.YouHaveNoDebtsToOperateWith[Idiomas.spanish] = "No tienes deudas con las que operar. Por favor, crea una o más deudas antes de operar con ellas.";

translationsDictionary.YouHaveNoFuturesToOperateWith[Idiomas.english] = "You've got no future purchases to operate with. Please create one or more future purchases before operating with them.";
translationsDictionary.YouHaveNoFuturesToOperateWith[Idiomas.spanish] = "No tienes compras futuras con las que operar. Por favor, crea una o más compras antes de operar con ellas.";

translationsDictionary.YouHaveNoTaxesToOperateWith[Idiomas.english] = "You've got no taxes to operate with. Please create one or more taxes before operating with them.";
translationsDictionary.YouHaveNoTaxesToOperateWith[Idiomas.spanish] = "No tienes pagos con los que operar. Por favor, crea uno o más pagos antes de operar con ellos.";

translationsDictionary.YouHaveNotEnoughMoney1[Idiomas.english] = "You don't have enough money (*";
translationsDictionary.YouHaveNotEnoughMoney1[Idiomas.spanish] = "No tienes suficiente dinero (faltan *";

translationsDictionary.YouHaveNotEnoughMoney2[Idiomas.english] = "* more is needed). Please add more money to this tax list to make the payments.";
translationsDictionary.YouHaveNotEnoughMoney2[Idiomas.spanish] = "*). Por favor, añade dinero a esta lista de pagos antes de efectuarlos.";

translationsDictionary.HowMuchMoneyToBox[Idiomas.english] = "How much money do you want to store in this box?\n\n(Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)";
translationsDictionary.HowMuchMoneyToBox[Idiomas.spanish] = "¿Cuánto dinero quieres meter en esta hucha?\n\n(Por favor, escribe la cantidad con punto, apóstrofe o coma, por ejemplo: 9.50 / 9'50 / 9,50)";

translationsDictionary.HowMuchMoneyToMonthlys[Idiomas.english] = "How much money do you want to store for monthly taxes?\n\n(Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)";
translationsDictionary.HowMuchMoneyToMonthlys[Idiomas.spanish] = "¿Cuánto dinero quieres destinar a los pagos mensuales?\n\n(Por favor, escribe la cantidad con punto, apóstrofe o coma, por ejemplo: 9.50 / 9'50 / 9,50)";

translationsDictionary.HowMuchMoneyToYearlys[Idiomas.english] = "How much money do you want to store for yearly taxes?\n\n(Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)";
translationsDictionary.HowMuchMoneyToYearlys[Idiomas.spanish] = "¿Cuánto dinero quieres destinar a los pagos anuales?\n\n(Por favor, escribe la cantidad con punto, apóstrofe o coma, por ejemplo: 9.50 / 9'50 / 9,50)";

translationsDictionary.HowMuchMoneyToOthers[Idiomas.english] = "How much money do you want to store for non-periodical taxes?\n\n(Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)";
translationsDictionary.HowMuchMoneyToOthers[Idiomas.spanish] = "¿Cuánto dinero quieres destinar a los pagos no periódicos?\n\n(Por favor, escribe la cantidad con punto, apóstrofe o coma, por ejemplo: 9.50 / 9'50 / 9,50)";

translationsDictionary.HowMuchMoneyToFutures[Idiomas.english] = "How much money do you want to store for future purchases?\n\n(Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)";
translationsDictionary.HowMuchMoneyToFutures[Idiomas.spanish] = "¿Cuánto dinero quieres destinar a las compras futuras?\n\n(Por favor, escribe la cantidad con punto, apóstrofe o coma, por ejemplo: 9.50 / 9'50 / 9,50)";

translationsDictionary.HowMuchMoneyToGet[Idiomas.english] = "How much money do you want to get from this box?\n\n(Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)";
translationsDictionary.HowMuchMoneyToGet[Idiomas.spanish] = "¿Cuánto dinero quieres sacar de esta hucha?\n\n(Por favor, escribe la cantidad con punto, apóstrofe o coma, por ejemplo: 9.50 / 9'50 / 9,50)";

translationsDictionary.HowMuchMoneyToRetire1[Idiomas.english] = "How much money do you want to retire from this store (max ";
translationsDictionary.HowMuchMoneyToRetire1[Idiomas.spanish] = "¿Cuánto dinero quieres retirar de este depósito (max ";

translationsDictionary.HowMuchMoneyToRetire2[Idiomas.english] = ")?\n\n(Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)";
translationsDictionary.HowMuchMoneyToRetire2[Idiomas.spanish] = ")?\n\n(Por favor, escribe la cantidad con punto, apóstrofe o coma, por ejemplo: 9.50 / 9'50 / 9,50)";

translationsDictionary.HowMuchMoneyToSpend[Idiomas.english] = "How much money from this box do you want to spend?\n\n(Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)";
translationsDictionary.HowMuchMoneyToSpend[Idiomas.spanish] = "¿Cuánto dinero de esta hucha quieres gastar?\n\n(Por favor, escribe la cantidad con punto, apóstrofe o coma, por ejemplo: 9.50 / 9'50 / 9,50)";

translationsDictionary.HowMuchMoneyToIncrease[Idiomas.english] = "How much money has this debt increased?\n\n(Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)";
translationsDictionary.HowMuchMoneyToIncrease[Idiomas.spanish] = "¿En cuánto dinero ha aumentado la deuda?\n\n(Por favor, escribe la cantidad con punto, apóstrofe o coma, por ejemplo: 9.50 / 9'50 / 9,50)";

translationsDictionary.YouDontHaveThatMuchMoney[Idiomas.english] = "That is more money than what you currently have available. Please provide a valid number.";
translationsDictionary.YouDontHaveThatMuchMoney[Idiomas.spanish] = "Eso es más dinero del que tienes disponible. Por favor proporciona una cantidad válida.";

translationsDictionary.YouCantTakeThatMuchMoney[Idiomas.english] = "That is more money than what is stored in that box. Please provide a valid number.";
translationsDictionary.YouCantTakeThatMuchMoney[Idiomas.spanish] = "Eso es más dinero del que hay en esa hucha. Por favor proporciona una cantidad válida.";

translationsDictionary.AccountIsInconsistent[Idiomas.english] = "There has been a problem during a previous operation in your account. Please contact the author to see what happened: " + Utils.myUserUrl;
translationsDictionary.AccountIsInconsistent[Idiomas.spanish] = "Ha ocurrido un problema durante una operación previa con tu cuenta. Por favor, contacta con el autor para consultarlo: " + Utils.myUserUrl;

translationsDictionary.MoneyBoxOverflows[Idiomas.english] = "If you store this much money in the box it will overflow the limit you chose for it.\n\n" +
    "If you want to fill the box until it reaches this limit, please use '" + translationsDictionary.FillHuchaOption[Idiomas.english] + "'.";
translationsDictionary.MoneyBoxOverflows[Idiomas.spanish] = "Si metes todo ese dinero en la hucha sobrepasará el límite que le colocaste al crearla.\n\n" +
    "Si quieres llenarla hasta que llegue a este límite, por favor utiliza '" + translationsDictionary.FillHuchaOption[Idiomas.spanish] + "'.";

translationsDictionary.MoneyStoreOverflows1[Idiomas.english] = "If you store this much money it will overflow the limit (*";
translationsDictionary.MoneyStoreOverflows1[Idiomas.spanish] = "Si metes todo ese dinero se sobrepasará el límite (*";

translationsDictionary.MoneyStoreOverflows2[Idiomas.english] = "* to reach it).";
translationsDictionary.MoneyStoreOverflows2[Idiomas.spanish] = "* para alcanzarlo).";

translationsDictionary.MoneyBoxAlreadyFull[Idiomas.english] = "This money box already stores the highest amount of money you wanted it to.";
translationsDictionary.MoneyBoxAlreadyFull[Idiomas.spanish] = "Esta hucha ya almacena el máximo de dinero para lo que la habías creado.";

translationsDictionary.MoneyStoreAlreadyFull[Idiomas.english] = "You have all the money you need here.";
translationsDictionary.MoneyStoreAlreadyFull[Idiomas.spanish] = "Ya tienes dinero suficiente aquí.";
    
translationsDictionary.AddedMoneySuccesfully1[Idiomas.english] = "Added *";
translationsDictionary.AddedMoneySuccesfully1[Idiomas.spanish] = "Se han añadido *";

translationsDictionary.AddedMoneySuccesfully2[Idiomas.english] = "* to *";
translationsDictionary.AddedMoneySuccesfully2[Idiomas.spanish] = "* a *";

translationsDictionary.AddedMoneySuccesfully3[Idiomas.english] = "* successfully.";
translationsDictionary.AddedMoneySuccesfully3[Idiomas.spanish] = "* correctamente.";
    
translationsDictionary.AddedMoneyToDebtSuccesfully1[Idiomas.english] = "Added *";
translationsDictionary.AddedMoneyToDebtSuccesfully1[Idiomas.spanish] = "Se han añadido *";

translationsDictionary.AddedMoneyToDebtSuccesfully2[Idiomas.english] = "* to *";
translationsDictionary.AddedMoneyToDebtSuccesfully2[Idiomas.spanish] = "* a la deuda de *";

translationsDictionary.AddedMoneyToDebtSuccesfully3[Idiomas.english] = "*'s debt successfully.";
translationsDictionary.AddedMoneyToDebtSuccesfully3[Idiomas.spanish] = "* correctamente.";

translationsDictionary.AddedMoneyToStoreSuccesfully[Idiomas.english] = "The money wass successfully stored, to a total of *";
translationsDictionary.AddedMoneyToStoreSuccesfully[Idiomas.spanish] = "Se ha depositado el dinero correctamente. Ahora hay un total de *";
    
translationsDictionary.BoxDeletedSuccessfully1[Idiomas.english] = "The money box called *";
translationsDictionary.BoxDeletedSuccessfully1[Idiomas.spanish] = "La hucha llamada *";

translationsDictionary.BoxDeletedSuccessfully2[Idiomas.english] = "* was deleted succesfully. You now have *";
translationsDictionary.BoxDeletedSuccessfully2[Idiomas.spanish] = "* se ha borrado correctamente. Ahora tienes *";

translationsDictionary.BoxDeletedSuccessfully3[Idiomas.english] = "* available.";
translationsDictionary.BoxDeletedSuccessfully3[Idiomas.spanish] = "* disponibles.";
    
translationsDictionary.DebtDeletedSuccessfully1[Idiomas.english] = "The debt of *";
translationsDictionary.DebtDeletedSuccessfully1[Idiomas.spanish] = "Se le ha perdonado su deuda a *";

translationsDictionary.DebtDeletedSuccessfully2[Idiomas.english] = "* was forgiven succesfully.";
translationsDictionary.DebtDeletedSuccessfully2[Idiomas.spanish] = "* correctamente.";
    
translationsDictionary.TaxDeletedSuccessfully1[Idiomas.english] = "The tax called *";
translationsDictionary.TaxDeletedSuccessfully1[Idiomas.spanish] = "El pago llamado *";

translationsDictionary.TaxDeletedSuccessfully2[Idiomas.english] = "* was deleted succesfully.";
translationsDictionary.TaxDeletedSuccessfully2[Idiomas.spanish] = "* se ha borrado correctamente.";
    
translationsDictionary.PurchaseDeletedSuccessfully1[Idiomas.english] = "The planned purchase of *";
translationsDictionary.PurchaseDeletedSuccessfully1[Idiomas.spanish] = "La compra planeada de *";

translationsDictionary.PurchaseDeletedSuccessfully2[Idiomas.english] = "* was deleted succesfully.";
translationsDictionary.PurchaseDeletedSuccessfully2[Idiomas.spanish] = "* se ha borrado correctamente.";
    
translationsDictionary.RetiredMoneySuccessfully1[Idiomas.english] = "Retired *";
translationsDictionary.RetiredMoneySuccessfully1[Idiomas.spanish] = "Se han retirado *";

translationsDictionary.RetiredMoneySuccessfully2[Idiomas.english] = "* from *";
translationsDictionary.RetiredMoneySuccessfully2[Idiomas.spanish] = "* de *";

translationsDictionary.RetiredMoneySuccessfully3[Idiomas.english] = "* successfully. You now have *";
translationsDictionary.RetiredMoneySuccessfully3[Idiomas.spanish] = "* correctamente. Ahora tienes *";

translationsDictionary.RetiredMoneySuccessfully4[Idiomas.english] = "* available.";
translationsDictionary.RetiredMoneySuccessfully4[Idiomas.spanish] = "* disponibles.";
    
translationsDictionary.SpentMoneySuccessfully1[Idiomas.english] = "You spent *";
translationsDictionary.SpentMoneySuccessfully1[Idiomas.spanish] = "Has gastado *";

translationsDictionary.SpentMoneySuccessfully2[Idiomas.english] = "* from the money box *";
translationsDictionary.SpentMoneySuccessfully2[Idiomas.spanish] = "* de la hucha *";

translationsDictionary.SpentMoneySuccessfully3[Idiomas.english] = "*. You now have *";
translationsDictionary.SpentMoneySuccessfully3[Idiomas.spanish] = "*. Ahora tienes *";

translationsDictionary.SpentMoneySuccessfully4[Idiomas.english] = "* remaining in this box and *";
translationsDictionary.SpentMoneySuccessfully4[Idiomas.spanish] = "* restantes en esta hucha y *";

translationsDictionary.SpentMoneySuccessfully5[Idiomas.english] = "* total in your account.";
translationsDictionary.SpentMoneySuccessfully5[Idiomas.spanish] = "* totales en tu cuenta.";
    
translationsDictionary.DebtTakenSuccessfully1[Idiomas.english] = "You have been given *";
translationsDictionary.DebtTakenSuccessfully1[Idiomas.spanish] = "Has cobrado *";

translationsDictionary.DebtTakenSuccessfully2[Idiomas.english] = "* from the debt of *";
translationsDictionary.DebtTakenSuccessfully2[Idiomas.spanish] = "* por la deuda de *";

translationsDictionary.DebtTakenSuccessfully3[Idiomas.english] = "*. You now have *";
translationsDictionary.DebtTakenSuccessfully3[Idiomas.spanish] = "*. Ahora tienes *";

translationsDictionary.DebtTakenSuccessfully4[Idiomas.english] = "* total in your account.";
translationsDictionary.DebtTakenSuccessfully4[Idiomas.spanish] = "* totales en tu cuenta.";
    
translationsDictionary.PaidTaxSuccessfully1[Idiomas.english] = "You spent *";
translationsDictionary.PaidTaxSuccessfully1[Idiomas.spanish] = "Has gastado *";

translationsDictionary.PaidTaxSuccessfully2[Idiomas.english] = "* in paying *";
translationsDictionary.PaidTaxSuccessfully2[Idiomas.spanish] = "* en pagar *";

translationsDictionary.PaidTaxSuccessfully3[Idiomas.english] = "*. You now have *";
translationsDictionary.PaidTaxSuccessfully3[Idiomas.spanish] = "*. Ahora tienes *";

translationsDictionary.PaidTaxSuccessfully4[Idiomas.english] = "* remaining for these taxes and *";
translationsDictionary.PaidTaxSuccessfully4[Idiomas.spanish] = "* restantes para estos pagos y *";

translationsDictionary.PaidTaxSuccessfully5[Idiomas.english] = "* total in your account.";
translationsDictionary.PaidTaxSuccessfully5[Idiomas.spanish] = "* totales en tu cuenta.";
    
translationsDictionary.PurchasedSuccessfully1[Idiomas.english] = "You spent *";
translationsDictionary.PurchasedSuccessfully1[Idiomas.spanish] = "Has gastado *";

translationsDictionary.PurchasedSuccessfully2[Idiomas.english] = "* to buy *";
translationsDictionary.PurchasedSuccessfully2[Idiomas.spanish] = "* para comprar *";

translationsDictionary.PurchasedSuccessfully3[Idiomas.english] = "*. You now have *";
translationsDictionary.PurchasedSuccessfully3[Idiomas.spanish] = "*. Ahora tienes *";

translationsDictionary.PurchasedSuccessfully4[Idiomas.english] = "* remaining for your other purchases and *";
translationsDictionary.PurchasedSuccessfully4[Idiomas.spanish] = "* restantes para las otras compras y *";

translationsDictionary.PurchasedSuccessfully5[Idiomas.english] = "* total in your account.";
translationsDictionary.PurchasedSuccessfully5[Idiomas.spanish] = "* totales en tu cuenta.";

translationsDictionary.WeWillTransfer1[Idiomas.english] = "";
translationsDictionary.WeWillTransfer1[Idiomas.spanish] = "Se almacenarán ";

translationsDictionary.WeWillTransfer2[Idiomas.english] = " will be stored in this box, to make a total of ";
translationsDictionary.WeWillTransfer2[Idiomas.spanish] = " en esta hucha. Tendrá un total de ";

translationsDictionary.WeWillTransfer2p5[Idiomas.english] = " (its limit)";
translationsDictionary.WeWillTransfer2p5[Idiomas.spanish] = " (su límite)";

translationsDictionary.WeWillTransfer3[Idiomas.english] = ". Continue?";
translationsDictionary.WeWillTransfer3[Idiomas.spanish] = " ahora. ¿Continuar?";

translationsDictionary.SureToDeleteBox1[Idiomas.english] = "The box called ";
translationsDictionary.SureToDeleteBox1[Idiomas.spanish] = "Se va a eliminar la hucha ";

translationsDictionary.SureToDeleteBox2[Idiomas.english] = " will be deleted, and all the money inside will be given to the global count. Continue?";
translationsDictionary.SureToDeleteBox2[Idiomas.spanish] = ", y todo el dinero de dentro será añadido al depósito global. ¿Continuar?";

translationsDictionary.SureToDeleteDebt1[Idiomas.english] = "The debt of ";
translationsDictionary.SureToDeleteDebt1[Idiomas.spanish] = "Se va a eliminar la deuda de ";

translationsDictionary.SureToDeleteDebt2[Idiomas.english] = " will be deleted. Continue?";
translationsDictionary.SureToDeleteDebt2[Idiomas.spanish] = ". ¿Continuar?";

translationsDictionary.SureToDeleteTax1[Idiomas.english] = "The tax called ";
translationsDictionary.SureToDeleteTax1[Idiomas.spanish] = "Se va a eliminar el pago llamado ";

translationsDictionary.SureToDeleteTax2[Idiomas.english] = " will be deleted, and if the money limit for these taxes drops below you current store, the remaining will be given to the global count. Continue?";
translationsDictionary.SureToDeleteTax2[Idiomas.spanish] = ", y si el límite de dinero para estos cae por debajo de la cantidad actual, el sobrante se añadirá al depósito global. ¿Continuar?";

translationsDictionary.SureToDeletePurchase1[Idiomas.english] = "The purchase of ";
translationsDictionary.SureToDeletePurchase1[Idiomas.spanish] = "Se va a eliminar la compra de ";

translationsDictionary.SureToDeletePurchase2[Idiomas.english] = " will be deleted, and if the money limit for purchases drops below you current store, the remaining will be given to the global count. Continue?";
translationsDictionary.SureToDeletePurchase2[Idiomas.spanish] = ", y si el límite de dinero para compras cae por debajo de la cantidad actual, el sobrante se añadirá al depósito global. ¿Continuar?";

translationsDictionary.SureToPerformPurchase1[Idiomas.english] = "The purchase of ";
translationsDictionary.SureToPerformPurchase1[Idiomas.spanish] = "Se va a llevar la compra de ";

translationsDictionary.SureToPerformPurchase2[Idiomas.english] = " will be done now. Continue?";
translationsDictionary.SureToPerformPurchase2[Idiomas.spanish] = ". ¿Continuar?";

translationsDictionary.ConfirmPayTax1[Idiomas.english] = "";
translationsDictionary.ConfirmPayTax1[Idiomas.spanish] = "Se va/n a descontar ";

translationsDictionary.ConfirmPayTax2[Idiomas.english] = " will be substracted. Continue?";
translationsDictionary.ConfirmPayTax2[Idiomas.spanish] = ". ¿Continuar?";

translationsDictionary.ConfirmTakeDebt1[Idiomas.english] = "This debt, with ";
translationsDictionary.ConfirmTakeDebt1[Idiomas.spanish] = "Se va a cobrar esta deuda, con ";

translationsDictionary.ConfirmTakeDebt2[Idiomas.english] = ", will be taken and added to your global count. Continue?";
translationsDictionary.ConfirmTakeDebt2[Idiomas.spanish] = ", y se añadirá el dinero al depósito global. ¿Continuar?";

translationsDictionary.ConfirmPerformPurchase1[Idiomas.english] = "The product ";
translationsDictionary.ConfirmPerformPurchase1[Idiomas.spanish] = "Se va a adquirir el producto ";

translationsDictionary.ConfirmPerformPurchase2[Idiomas.english] = " will be bought. Continue?";
translationsDictionary.ConfirmPerformPurchase2[Idiomas.spanish] = ". ¿Continuar?";

translationsDictionary.VeryConfirmEraseData[Idiomas.english] = "All of your money, your boxes, debts, taxes and planned purchases will be deleted. This action cannot be undone. Are you completely sure you want to continue?";
translationsDictionary.VeryConfirmEraseData[Idiomas.spanish] = "Todo tu dinero, tus huchas, deudas, pagos y compras planeadas se borrarán. Esta acción no puede deshacerse. ¿Estás completamente seguro de que quieres hacerlo?";

translationsDictionary.DataErasedSuccessfully[Idiomas.english] = "All your data was successfully erased.";
translationsDictionary.DataErasedSuccessfully[Idiomas.spanish] = "Toda tu información ha sido borrada con éxito.";

module.exports={
    translationsDictionary,
}