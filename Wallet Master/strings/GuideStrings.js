
const { Actions } = require ("../enums/Actions.js");
const { Idiomas } = require("../enums/Idiomas.js");
const Utils = require('../Utils.js');


///////////////////////////////////////////////////////
		// Resumen general
		// Disclaimer
		// Sobre el idioma y la moneda
		// Sobre el dinero y los depósitos
			// Sobre añadir dinero
			// Sobre las huchas
				// Resumen
				// Ejemplo
				// Volver
			// Sobre las deudas
				// Resumen
				// Ejemplo
				// Volver
			// Sobre las compras planeadas
				// Resumen
				// Ejemplo
				// Volver
			// Volver
		// Sobre los pagos periódicos
			// Resumen
			// Diferencias
			// Ejemplo
			// Volver
		// Salir
///////////////////////////////////////////////////////

let guideTranslations = 
{
    GeneralSummaryTag: {},
    DisclaimerTag: {},
    AboutLanguageAndCurrencyTag: {},
    AboutMoneyAndBoxesTag: {},
    AboutPeriodicalPaymentsTag: {},
    ExitTag: {},
    AboutAddingMoneyTag: {},
    AboutMoneyBoxesTag: {},
    AboutDebtsTag: {},
    AboutFuturePurchasesTag: {},
    GoBackTag: {},
    SpecificSummaryTag: {},
    SpecificDifferencesTag: {},
    SpecificExampleTag: {},
    GeneralSummary: {},
    Disclaimer: {},
    AboutLanguageAndCurrency: {},
    AboutAddingMoney: {},
    SpecificSummaryBoxes: {},
    SpecificSummaryDebts: {},
    SpecificSummaryFutures: {},
    SpecificSummaryPeriodical: {},
    SpecificDifferencesPeriodical: {},
    SpecificExampleBoxes: {},
    SpecificExampleDebts: {},
    SpecificExampleFutures: {},
    SpecificExamplePeriodical: {},
}

guideTranslations.GeneralSummaryTag[Idiomas.english] = "Overview";
guideTranslations.GeneralSummaryTag[Idiomas.spanish] = "Resumen general";

guideTranslations.DisclaimerTag[Idiomas.english] = "Disclaimer";
guideTranslations.DisclaimerTag[Idiomas.spanish] = "Disclaimer";

guideTranslations.AboutLanguageAndCurrencyTag[Idiomas.english] = "About language and currency";
guideTranslations.AboutLanguageAndCurrencyTag[Idiomas.spanish] = "Sobre el idioma y la moneda";

guideTranslations.AboutMoneyAndBoxesTag[Idiomas.english] = "About money and boxes";
guideTranslations.AboutMoneyAndBoxesTag[Idiomas.spanish] = "Sobre el dinero y los depósitos";

guideTranslations.AboutPeriodicalPaymentsTag[Idiomas.english] = "About periodical payments";
guideTranslations.AboutPeriodicalPaymentsTag[Idiomas.spanish] = "Sobre los pagos periódicos";

guideTranslations.ExitTag[Idiomas.english] = "Exit";
guideTranslations.ExitTag[Idiomas.spanish] = "Salir";

guideTranslations.AboutAddingMoneyTag[Idiomas.english] = "About adding money";
guideTranslations.AboutAddingMoneyTag[Idiomas.spanish] = "Sobre añadir dinero";

guideTranslations.AboutMoneyBoxesTag[Idiomas.english] = "About money boxes";
guideTranslations.AboutMoneyBoxesTag[Idiomas.spanish] = "Sobre las huchas";

guideTranslations.AboutDebtsTag[Idiomas.english] = "About debts";
guideTranslations.AboutDebtsTag[Idiomas.spanish] = "Sobre las deudas";

guideTranslations.AboutFuturePurchasesTag[Idiomas.english] = "About future purchases";
guideTranslations.AboutFuturePurchasesTag[Idiomas.spanish] = "Sobre las compras planeadas";

guideTranslations.GoBackTag[Idiomas.english] = "Back";
guideTranslations.GoBackTag[Idiomas.spanish] = "Volver";

guideTranslations.SpecificSummaryTag[Idiomas.english] = "Summary";
guideTranslations.SpecificSummaryTag[Idiomas.spanish] = "Resumen";

guideTranslations.SpecificDifferencesTag[Idiomas.english] = "Differences";
guideTranslations.SpecificDifferencesTag[Idiomas.spanish] = "Diferencias";

guideTranslations.SpecificExampleTag[Idiomas.english] = "Example";
guideTranslations.SpecificExampleTag[Idiomas.spanish] = "Ejemplo";

guideTranslations.GeneralSummary[Idiomas.english] = "Wallet Master is a small bot that allows users to organize their " +
    "money according to their purposes to keep good control of finances, monitor expenses, and limit waste.\n\n" + 
    "This bot uses a layered architecture and a non-relational database to store and process user information.\n\n" + 
    "The creator initially designed it for personal use, but as he's already on it, made it public, and the code is even available on GitHub.\n\nThanks for using Wallet Master :D";
guideTranslations.GeneralSummary[Idiomas.spanish] = "Wallet Master es un pequeño bot que permite a los usuarios organizar su dinero según sus propósitos para " +
    "así llevar un buen control de las finanzas, vigilar los gastos y limitar el despilfarro.\n\n" + 
    "Este bot hace uso de una arquitectura por capas y una base de datos no relacional para guardar y procesar la información del usuario.\n\n" +
    "Principalmente el creador lo ideó para uso propio, pero, ya de paso, lo deja público e incluso está el código en GitHub. Gracias por usar Wallet Master :D";

guideTranslations.Disclaimer[Idiomas.english] = "Just a clarification: by using this bot, you accept that all the data you provide can be accessed by the server, "+
    "and you are aware that it is only accessed for the purpose of offering an optimal user experience.";
guideTranslations.Disclaimer[Idiomas.spanish] = "Solo aclarar que, haciendo uso de este bot, aceptas que todos los datos que proporciones puedan ser accedidos " +
    "por el servidor y eres consciente de que únicamente se accede a ellos con el propósito de ofrecer una experiencia de uso del bot correcta.";

guideTranslations.AboutLanguageAndCurrency[Idiomas.english] = "The language that is set will be the one in which the bot will send all its replies. At the moment, it's only "+
    "available in Spanish and English, but more languages may be added in the future without issue.\n\n" +
    "The currency setting will only affect the symbol sent when displaying prices, payments, savings, or any other amount expressed in monetary units. "+
    "No currency conversion logic has been implemented. Currently, available options are the euro, dollar, pound, and yen, but more may be added too.";
guideTranslations.AboutLanguageAndCurrency[Idiomas.spanish] = "El idioma que se configure será en el que el bot enviará todos los textos. De momento solo se ha " +
    "hecho en español y en inglés, pero en un futuro se pueden añadir más sin problema.\n\n" +
    "La moneda que se configure solo marcará el carácter que se enviará cuando se representen precios, pagos, ahorros o cualquier otra cantidad expresada en unidades " +
    "monetarias. No se ha implementado ninguna lógica de conversión de monedas. De momento las opciones disponibles son el euro, el dólar, la libra y el yen, pero se " +
    "pueden añadir más también de ser necesario.";

guideTranslations.AboutAddingMoney[Idiomas.english] = "To add money, the user only needs to use the [*" + Actions.add_money + "*] command and specify the amount received.";
guideTranslations.AboutAddingMoney[Idiomas.spanish] = "Para añadir dinero el usuario solo deberá utilizar el comando de [*" + Actions.add_money + "*] e indicar la cantidad " +
    "monetaria que ha recibido.";

guideTranslations.SpecificSummaryBoxes[Idiomas.english] = "The basic loop of the bot would be receiving a salary or a sale, adding it to the global count, and then "+
    "distributing that money into the different money boxes. " +
    "Afterward, every time a user makes an expense, they communicate it, specifying which box the money comes from, and the bot calculates the flow of that money.";
guideTranslations.SpecificSummaryBoxes[Idiomas.spanish] = "El bucle básico del bot sería cobrar una nómina o una compra, añadirla al conteo global, y ese dinero irlo " +
    "repartiendo en las diferentes huchas, para después, cada vez que se realice un gasto, se le comunique también, aclarando de qué hucha se gasta " +
    "y así el bot calcule todo el flujo de ese dinero.\n\n";

guideTranslations.SpecificSummaryDebts[Idiomas.english] = "The concept of money boxes works well for classifying money the user already has, but it is also important to "+
    "consider money that is NOT yet in their possession, such as when someone or an entity owes the user money. " + 
    "Many friends or even professional contacts try to accumulate several of these debts and delay payments, hoping the user will forget. The best solution is to keep them recorded. " +
    "The bot can track all money owed to the user and add it to the global count (as if it were a normal income) when it's finally received.";
guideTranslations.SpecificSummaryDebts[Idiomas.spanish] = "El concepto de hucha sirve muy bien para clasificar el dinero que el usuario ya tiene, pero también es bueno " +
    "tener en cuenta el dinero que NO se tiene aún, cuando una persona o entidad debe pagar al usuario un dinero que aún no está en su poder. Muchos amigos o incluso personas " +
    "con relación profesional intentan acumular varias de estas deudas y alargar su pago para que al usuario se le olvide. Lo mejor es dejarlas apuntadas. El bot puede " +
    "mantener la cuenta de todo el dinero que le deben al usuario, y sumarlo a la cuenta (como si de un ingreso normal se tratase) cuando por fin lo reciba.";

guideTranslations.SpecificSummaryFutures[Idiomas.english] = "There are occasions when we want to buy something but can't do so immediately. For example, when we want a video game that "+
    "won’t be released until next year, or when we've planned an expensive dinner with friends in a couple of months, or when we're planning to attend a festival but the tickets aren't on sale yet.\n\n" +
    "Although it may be a small amount, it’s better not to be surprised by expenses, and reserve the necessary money for that purchase as soon as possible. The bot’s future purchase feature was created for this purpose. " +
    "There will be a special money box reserved for all these expenses. When any of these purchases is made, you just need to specify it, and the bot will deduct the money from the box and the global amount.";
guideTranslations.SpecificSummaryFutures[Idiomas.spanish] = "Hay ocasiones en las que queremos comprar algo, pero no podemos. Por ejemplo, cuando queremos un videojuego " +
    "pero no sale a la venta hasta el año siguiente, o cuando hemos quedado con un grupo grande de colegas para ir a un restaurante caro dentro de un par de meses, " +
    "o cuando planeamos asistir a un festival pero las entradas no salen a la venta hasta una fecha determinada.\n\n" +
    "Aunque en muchos casos sea poco dinero, es mejor que no le pille por sorpresa a los gastos y se reserve el dinero necesario para esa compra cuanto antes. Para eso " +
    "se ha creado la opción de compras futuras en el bot. Habrá una hucha especial específicamente reservada para todos estos gastos, y, cuando cualquiera de los gastos " +
    "guardados se efectúe, solo se deberá indicar concretamente y el bot descontará el dinero de la hucha y de la cantidad global.";

guideTranslations.SpecificSummaryPeriodical[Idiomas.english] = "In life, there are many payments that must be made periodically and are unavoidable: rent, mortgage, utilities, food, gas, car insurance, home insurance, etc. " + 
    "It's a great decision to reserve part of a previous income for next period’s payments (monthly, quarterly, yearly, or other). With the bot’s reserved sections for these taxes or payments, managing them becomes easier.";
guideTranslations.SpecificSummaryPeriodical[Idiomas.spanish] = "En esta vida hay muchos pagos que debemos hacer de forma periódica y son inevitables. Alquileres, " +
    "hipotecas, luz, agua, gas, comida, gasolina, seguros de coche o de hogar, etcétera. Es una gran decisión reservar una parte de un ingreso anterior para los pagos del " +
    "periodo siguiente (mes, trimestre, año o cualquier otro). Con los apartados reservados por el bot para estos impuestos o pagos, su manejo se hace más fácil.";

guideTranslations.SpecificDifferencesPeriodical[Idiomas.english] = "There is a separation between monthly, yearly, and non-periodical expenses. An example of one of the latter "+
    "could be refueling the car or paying a subscription that's paid every three months instead of every month. Additionally, for "+
    "greater flexibility, the bot offers users the option to reserve money for two months for monthly expenses. " + 
    "The same applies for those that are neither monthly nor yearly. When any of these payments are due, the user just needs to indicate it, and the bot will handle the necessary calculations.";
guideTranslations.SpecificDifferencesPeriodical[Idiomas.spanish] = "Se realiza una separación entre gastos mensuales, gastos anuales y gastos que no pertenecen a " +
    "ninguna de estas dos frecuencias. Un ejemplo de este último grupo puede ser repostar el coche o pagar una suscripción que es trimestral en lugar de mensual. " +
    "Además, para un mayor margen y flexibilidad en el caso de los pagos mensuales, el bot da al usuario la opción de reservar dinero " +
    "para los gastos periódicos de dos meses. Y lo mismo con los que no son ni mensuales ni anuales. " +
    "Cuando al usuario se le cobre cualquiera de estos pagos, solo lo tendrá que indicar y el bot realizará los cálculos necesarios.";


guideTranslations.SpecificExampleBoxes[Idiomas.english] = 
    "User: [Create new box]\n"+
    "Wallet Master: What will the name of this money box be?\n"+
    "User: box1\n"+
    "Wallet Master: How much money do you want to store in this box at most? (Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)\n"+
    "User: 500\n"+
    "Wallet Master: The new money box called box1 has been successfully created\n\n"+
    "User: [Add money to a box]\n"+
    "Wallet Master: You currently have 700€ that have not been distributed. Select one of your money boxes:\n"+
    "User: [box1]\n"+
    "Wallet Master: How much money do you want to store in this box? (Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)\n"+
    "User: 35'82\n"+
    "Wallet Master: Added 35.82€ to box1 successfully.\n\n"+
    "User: [Spend money from a box]\n"+
    "Wallet Master: Select a box to spend money from:\n"+
    "User: [box1]\n"+
    "Wallet Master: How much money from this box do you want to spend? (Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)\n"+
    "User: 12.43\n"+
    "Wallet Master: You spent 12.43€ from the money box box1. You now have 23.39€ remaining in this box and 687.57€ total in your account.\n\n"+
    "User: [Delete money box]\n"+
    "Wallet Master: Select the money box you want to delete:\n"+
    "User: [box1]\n"+
    "Wallet Master: The box called box1 will be deleted, and all the money inside will be given to the global count. Continue?\n"+
    "User: [Yes]\n"+
    "Wallet Master: The money box called box1 was deleted succesfully. You now have 687.57€ available.";
guideTranslations.SpecificExampleBoxes[Idiomas.spanish] = 
    "Usuario: [Crear nueva hucha]\n"+
    "Wallet Master: ¿Cómo se llamará esta hucha?\n"+
    "Usuario: hucha1\n"+
    "Wallet Master: ¿Cuánto dinero quieres almacenar en esta hucha como máximo? (Por favor, escribe el número con punto, apóstrofo o coma, por ejemplo: 9.50 / 9'50 / 9,50)\n"+
    "Usuario: 500\n"+
    "Wallet Master: La nueva hucha llamada hucha1 se ha creado con éxito.\n\n"+
    "Usuario: [Añadir dinero a una hucha]\n"+
    "Wallet Master: Actualmente tienes 700€ que no han sido distribuidos. Selecciona una de tus huchas:\n"+
    "Usuario: [hucha1]\n"+
    "Wallet Master: ¿Cuánto dinero quieres almacenar en esta hucha? (Por favor, escribe el número con punto, apóstrofo o coma, por ejemplo: 9.50 / 9'50 / 9,50)\n"+
    "Usuario: 35'82\n"+
    "Wallet Master: Se han añadido 35.82€ a la hucha hucha1 con éxito.\n\n"+
    "Usuario: [Gastar dinero de una hucha]\n"+
    "Wallet Master: Selecciona una hucha para gastar dinero:\n"+
    "Usuario: [hucha1]\n"+
    "Wallet Master: ¿Cuánto dinero quieres gastar de esta hucha? (Por favor, escribe el número con punto, apóstrofo o coma, por ejemplo: 9.50 / 9'50 / 9,50)\n"+
    "Usuario: 12.43\n"+
    "Wallet Master: Has gastado 12.43€ de la hucha hucha1. Ahora te quedan 23.39€ en esta hucha y 687.57€ en total en tu cuenta.\n\n"+
    "Usuario: [Eliminar hucha]\n"+
    "Wallet Master: Selecciona la hucha que deseas eliminar:\n"+
    "Usuario: [hucha1]\n"+
    "Wallet Master: La hucha llamada hucha1 será eliminada, y todo el dinero dentro se transferirá a la cuenta global. ¿Continuar?\n"+
    "Usuario: [Sí]\n"+
    "Wallet Master: La hucha llamada hucha1 se eliminó con éxito. Ahora tienes 687.57€ disponibles.";


guideTranslations.SpecificExampleDebts[Idiomas.english] = 
    "User: [Note down a new debt]\n"+
    "Wallet Master: What will the name of this debt be? (For example, the name of the person who ows you money)\n"+
    "User: Jim\n"+
    "Wallet Master: How much money do they owe you? (Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)\n"+
    "User: 14,90\n"+
    "Wallet Master: The new debt assigned to Jim has been successfully created.\n\n" +
    "User: [Increment a debt]\n"+
    "Wallet Master: Select the debt you want to modify:\n"+
    "User: [Jim]\n"+
    "Wallet Master: How much money has this debt increased? (Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)\n"+
    "User: 6'55\n"+
    "Wallet Master: Added 6.55€ to Jim's debt successfully.\n\n"+
    "User: [Take a debt's money]\n"+
    "Wallet Master: Select the debt that has now been dealt with:\n"+
    "User: [Jim]\n"+
    "Wallet Master: This debt, with Jim, will be taken and added to your global count. Continue?\n"+
    "User: [Yes]\n"+
    "Wallet Master: You have been given 21.4€ from the debt of Jim. You now have 708.97€ total in your account.";
guideTranslations.SpecificExampleDebts[Idiomas.spanish] = 
    "Usuario: [Anotar una nueva deuda]\n"+
    "Wallet Master: ¿Qué nombre tendrá esta deuda? (Por ejemplo, el nombre de la persona que te debe dinero)\n"+
    "Usuario: Jim\n"+
    "Wallet Master: ¿Cuánto dinero te debe? (Por favor, escribe el número con punto, apóstrofo o coma, por ejemplo: 9.50 / 9'50 / 9,50)\n"+
    "Usuario: 14,90\n"+
    "Wallet Master: La nueva deuda asignada a Jim se ha creado con éxito.\n\n"+
    "Usuario: [Incrementar una deuda]\n"+
    "Wallet Master: Selecciona la deuda que deseas modificar:\n"+
    "Usuario: [Jim]\n"+
    "Wallet Master: ¿Cuánto ha aumentado esta deuda? (Por favor, escribe el número con punto, apóstrofo o coma, por ejemplo: 9.50 / 9'50 / 9,50)\n"+
    "Usuario: 6'55\n"+
    "Wallet Master: Se añadieron 6.55€ a la deuda de Jim con éxito.\n\n"+
    "Usuario: [Cobrar una deuda]\n"+
    "Wallet Master: Selecciona la deuda que se ha saldado:\n"+
    "Usuario: [Jim]\n"+
    "Wallet Master: Esta deuda, con Jim, será transferida a tu cuenta global. ¿Continuar?\n"+
    "Usuario: [Sí]\n"+
    "Wallet Master: Has recibido 21.4€ de la deuda de Jim. Ahora tienes 708.97€ en total en tu cuenta.";


guideTranslations.SpecificExampleFutures[Idiomas.english] = 
    "User: [Create a new future purchase]\n"+
    "Wallet Master: What's the name of what you want to purchase?\n"+
    "User: FIFA 25\n"+
    "Wallet Master: What's its price? (Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)\n"+
    "User: 59,90\n"+
    "Wallet Master: The new future purchase of FIFA 25 has been successfully registered.\n\n" +
    "User: [Create a new future purchase]\n"+
    "Wallet Master: What's the name of what you want to purchase?\n"+
    "User: Medicaments\n"+
    "Wallet Master: What's its price? (Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)\n"+
    "User: 11'99\n"+
    "Wallet Master: The new future purchase of Medicaments has been successfully registered.\n\n" +
    "User: [Add money to save it for the future purchases]\n"+
    "Wallet Master: How much money do you want to store for future purchases? (Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)\n"+
    "User: 40\n"+
    "Wallet Master: The money wass successfully stored, to a total of 40€.\n\n"+
    "User: [Perform a purchase from the list]\n"+
    "Wallet Master: Select the product you want to buy now:\n"+
    "User: [Medicaments]\n"+
    "Wallet Master: The purchase of Medicaments will be done now. Continue?\n"+
    "User: [Yes]\n"+
    "Wallet Master: You spent 11.99 to buy Medicaments. You now have 28.01 remaining for your other purchases and 696.98 total in your account.";
guideTranslations.SpecificExampleFutures[Idiomas.spanish] = 
    "Usuario: [Crear nueva compra futura]\n"+
    "Wallet Master: ¿Qué es lo que quieres comprar?\n"+
    "Usuario: FIFA 25\n"+
    "Wallet Master: ¿Cuál es su precio? (Por favor, escribe el número con punto, apóstrofo o coma, por ejemplo: 9.50 / 9'50 / 9,50)\n"+
    "Usuario: 59,90\n"+
    "Wallet Master: La nueva compra futura de FIFA 25 se ha registrado con éxito.\n\n"+
    "Usuario: [Crear nueva compra futura]\n"+
    "Wallet Master: ¿Qué es lo que quieres comprar?\n"+
    "Usuario: Medicamentos\n"+
    "Wallet Master: ¿Cuál es su precio? (Por favor, escribe el número con punto, apóstrofo o coma, por ejemplo: 9.50 / 9'50 / 9,50)\n"+
    "Usuario: 11'99\n"+
    "Wallet Master: La nueva compra futura de Medicamentos se ha registrado con éxito.\n\n"+
    "Usuario: [Añadir dinero para futuras compras]\n"+
    "Wallet Master: ¿Cuánto dinero quieres almacenar para futuras compras? (Por favor, escribe el número con punto, apóstrofo o coma, por ejemplo: 9.50 / 9'50 / 9,50)\n"+
    "Usuario: 40\n"+
    "Wallet Master: El dinero se almacenó con éxito, sumando un total de 40€.\n\n"+
    "Usuario: [Realizar una compra de la lista]\n"+
    "Wallet Master: Selecciona el producto que deseas comprar ahora:\n"+
    "Usuario: [Medicamentos]\n"+
    "Wallet Master: La compra de Medicamentos se realizará ahora. ¿Continuar?\n"+
    "Usuario: [Sí]\n"+
    "Wallet Master: Has gastado 11.99€ para comprar Medicamentos. Ahora te quedan 28.01€ para otras compras y 696.98€ en total en tu cuenta.";


guideTranslations.SpecificExamplePeriodical[Idiomas.english] = 
    "User: [Create a monthly tax]\n"+
    "Wallet Master: What will the name of this payment be?\n"+
    "User: Rent\n"+
    "Wallet Master: What's this tax's cost? (Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)\n"+
    "User: 300\n"+
    "Wallet Master: The new tax called Rent has been successfully created.\n\n" +
    "User: [Create a monthly tax]\n"+
    "Wallet Master: What will the name of this payment be?\n"+
    "User: Netflix subscription\n"+
    "Wallet Master: What's this tax's cost? (Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)\n"+
    "User: 14'99\n"+
    "Wallet Master: The new tax called Netflix subscription has been successfully created.\n\n" +
    "User: [Add money to save it for paying the monthly taxes]\n"+
    "Wallet Master: How much money do you want to store for monthly taxes? (Please type the number with dot, apostrophe or comma, for example: 9.50 / 9'50 / 9,50)\n"+
    "User: 500\n"+
    "Wallet Master: The money wass successfully stored, to a total of 500€.\n\n"+
    "User: [Pay all monthly taxes at once]\n"+
    "Wallet Master: 314.99€ will be substracted. Continue?\n"+
    "User: [Yes]\n"+
    "Wallet Master: Successfully spent 314.99€ from this tax list count. You have 185.01€ left, and 696.98€ total.";
guideTranslations.SpecificExamplePeriodical[Idiomas.spanish] =
    "Usuario: [Crear un pago mensual]\n"+
    "Wallet Master: ¿Cómo se llamará este pago?\n"+
    "Usuario: Alquiler\n"+
    "Wallet Master: ¿Cuál es su precio? (Por favor, escribe el número con punto, apóstrofo o coma, por ejemplo: 9.50 / 9'50 / 9,50)\n"+
    "Usuario: 300\n"+
    "Wallet Master: El nuevo pago llamado Alquiler se ha creado con éxito.\n\n"+
    "Usuario: [Crear un pago mensual]\n"+
    "Wallet Master: ¿Cómo se llamará este pago?\n"+
    "Usuario: Suscripción a Netflix\n"+
    "Wallet Master: ¿Cuál es el su precio? (Por favor, escribe el número con punto, apóstrofo o coma, por ejemplo: 9.50 / 9'50 / 9,50)\n"+
    "Usuario: 14'99\n"+
    "Wallet Master: El nuevo pago llamado Suscripción a Netflix se ha creado con éxito.\n\n"+
    "Usuario: [Añadir dinero a los pagos mensuales]\n"+
    "Wallet Master: ¿Cuánto dinero quieres almacenar para los pagos mensuales? (Por favor, escribe el número con punto, apóstrofo o coma, por ejemplo: 9.50 / 9'50 / 9,50)\n"+
    "Usuario: 500\n"+
    "Wallet Master: El dinero se almacenó con éxito, sumando un total de 500€.\n\n"+
    "Usuario: [Pagar todos los pagos mensuales a la vez]\n"+
    "Wallet Master: Se restarán 314.99€. ¿Continuar?\n"+
    "Usuario: [Sí]\n"+
    "Wallet Master: Se han gastado con éxito 314.99€ de la lista de pagos. Te quedan 185.01€ y 696.98€ en total en tu cuenta.";




module.exports={
    guideTranslations,
}