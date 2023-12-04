
const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruits = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

// main fruit filter logic
function search(str) {
	return fruits.filter((fruit) => (fruit.toLowerCase().includes(str)));
}

// streamlined version v2
const searchHandler = (event) => {
	const inputVal = event.currentTarget.value.trim().toLowerCase();
	const results = inputVal.length > 0 ? search(inputVal) : [];
	results.length !== 0 ? showSuggestions(results, inputVal) : suggestions.classList.remove('has-suggestions');
}

// render suggestions under input bar
function showSuggestions(results, inputVal) {
	suggestions.innerHTML = '';
	results.forEach((fruit) => {
		const checkedFruit = fruit.toLowerCase();
		const fruitNode = document.createElement('li');
		const spanStartIndex = checkedFruit.indexOf(inputVal);
		const spanEndIndex = spanStartIndex + inputVal.length;
		if (spanStartIndex === 0) {
			fruitNode.innerHTML = '<span>' + fruit.slice(0, spanEndIndex) + '</span>' + fruit.slice(spanEndIndex);
		} else {
			fruitNode.innerHTML = fruit.slice(0, spanStartIndex) + '<span>' + inputVal + '</span>' + fruit.slice(spanEndIndex);
		}
		suggestions.append(fruitNode);
		suggestions.classList.add('has-suggestions');
	});
}

// check for user selected suggestion
function useSuggestion(e) {
	selectedFruit = e.target.closest('li');
	input.value = selectedFruit.innerText;
	suggestions.classList.remove('has-suggestions');
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);
