function sendMarkedMessage(ctx, str)
{
	ctx.reply(str
		.replaceAll('\\', '\\\\')
		.replaceAll('[', '\\[')
		.replaceAll(']', '\\]')
		.replaceAll('(', '\\(')
		.replaceAll(')', '\\)')
		.replaceAll('~', '\\~')
		.replaceAll('`', '\\`')
		.replaceAll('>', '\\>')
		.replaceAll('#', '\\#')
		.replaceAll('+', '\\+')
		.replaceAll('-', '\\-')
		.replaceAll('=', '\\=')
		.replaceAll('|', '\\|')
		.replaceAll('{', '\\{')
        .replaceAll('`', '\\`')
		.replaceAll('}', '\\}')
		.replaceAll('.', '\\.')
		.replaceAll('!', '\\!'), 
		{parse_mode: 'MarkdownV2'})
}

function validateMoneyNumber(number)
{
	let textTokens = number.split('\.');
	let numberInput = parseFloat(parseFloat(number).toFixed(2));
	
	if(textTokens.length !== 2 || textTokens[1].length !== 2 || isNaN(numberInput))
		if(textTokens.length !== 1 || isNaN(numberInput) || numberInput <= 0)
			return false;
	return number >= 0;
}

function getPriceFormat(textInput)
{
	return parseFloat(parseFloat(textInput).toFixed(2));
}

const myUserUrl = 'https://t.me/serg_0_0';

module.exports = {
    sendMarkedMessage,
	validateMoneyNumber,
	getPriceFormat,
	myUserUrl,
}