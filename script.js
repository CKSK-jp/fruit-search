window.addEventListener('DOMContentLoaded', () => {
	const input = document.querySelector('#fruit');
	const suggestions = document.querySelector('.suggestions ul');

	const fruits = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

	
	function search(str) {
		let results = [];
		str = str.toLowerCase();
		if (str !== '') {
			console.log('search running on:', str);
			fruits.filter(fruit => {
				if (fruit.toLowerCase().includes(str)) {
					results.push(fruit);
				}
			});
		}
		return results;
	}

	const searchHandler = (event) => {
		text = event.target.value;
		if (text === '') {
			showSuggestions(search(''), text);
			suggestions.classList.remove('has-suggestions');
		}
		if (event.key === 'Backspace' && text !== '') {
			console.log('backspace pressed');
			showSuggestions(search(text), text);
		} else if (event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode === 32) {
			console.log('valid key pressed');
			showSuggestions(search(text), text);
		}
	}

	function showSuggestions(results, inputVal) {
		console.log('suggestions generating');
		inputText = inputVal.toLowerCase();
		suggestions.innerHTML = '';
		for (let fruit of results) {
			let checkedFruit = fruit.toLowerCase();
			let fruitNode = document.createElement('li');
			let spanStartIndex = checkedFruit.indexOf(inputText);
			let spanEndIndex = spanStartIndex + inputText.length;
			
			if (spanStartIndex === 0) {
				fruitNode.innerHTML = '<span>' + fruit.slice(0, spanEndIndex) + '</span>' + fruit.slice(spanEndIndex);
				suggestions.append(fruitNode);
			} else {
				fruitNode.innerHTML = fruit.slice(0, spanStartIndex) + '<span>' + inputText + '</span>' + fruit.slice(spanEndIndex);
				suggestions.append(fruitNode);
			}
			suggestions.classList.add('has-suggestions');
		}
	}

	//TODO: bug when dragging 
	function useSuggestion(e) {
		selectedFruit = e.target.closest('li');
		input.value = selectedFruit.innerText;
		showSuggestions(search(''), text);
		suggestions.classList.remove('has-suggestions');
	}

	input.addEventListener('keyup', searchHandler);
	suggestions.addEventListener('click', useSuggestion);
});