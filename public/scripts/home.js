const dummyData = ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9", "item10", "item11", "item12"];

function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function displayItem(item){
	var display = document.createElement('text');
	display.innerHTML = item;

	var menu = document.getElementById('menu');
	menu.appendChild(display);
	menu.appendChild(document.createElement('br'));
}

function test() {
	document.getElementById('menu').innerHTML = '';
	var newList = shuffle(dummyData);
	for (i=0; i < 7; i++) {
		var item = newList[i];
		displayItem(item);
	}
}