
const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruits = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

// main fruit filter logic
const search = (str) => fruits.filter((fruit) => (fruit.toLowerCase().includes(str)));

// streamlined version v2
const searchHandler = (event) => {
	const inputVal = event.currentTarget.value.trim().toLowerCase();
	const results = inputVal.length > 0 ? search(inputVal) : [];
	results.length !== 0 ? showSuggestions(results, inputVal) : suggestions.classList.remove('has-suggestions');
}

// render suggestions under input bar
const showSuggestions = (results, inputVal) => {
	suggestions.innerHTML = '';
	results.forEach((fruit) => {
		const fruitNode = document.createElement('li');
		fruitNode.innerHTML = boldInput(fruit.toLowerCase(), inputVal);
		suggestions.append(fruitNode);
		suggestions.classList.add('has-suggestions');
	});
}

const boldInput = (fruit, inputVal) => {
	const spanStartIndex = fruit.indexOf(inputVal);
	const spanEndIndex = spanStartIndex + inputVal.length;
	return spanStartIndex === 0 ?
		'<b>' + fruit.slice(0, spanEndIndex) + '</b>' + fruit.slice(spanEndIndex)
		:
		fruit.slice(0, spanStartIndex) + '<b>' + inputVal + '</b>' + fruit.slice(spanEndIndex);
}

// check for user selected suggestion
const useSuggestion = (e) => {
	selectedFruit = e.target.closest('li');
	input.value = selectedFruit.innerText;
	suggestions.classList.remove('has-suggestions');
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);
