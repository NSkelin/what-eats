var dishType = "";
var selectedDish = "";


function selectDishType(){
	dishType = document.querySelector('input[name="dishType"]:checked').value;
	let url = ''
	switch(dishType) {
		case 'mainDishes':
			url = '/getMainDishes';
			break;
		case 'sideDishes':
			url = '/getSideDishes';
			break;
	}
	$.ajax({
		type: 'GET',
		contentType: 'application/json',
        url: url,
        success: function(res){
            let dishSelect = document.getElementById('dishSelection');
            while (dishSelect.hasChildNodes()) {
            	dishSelect.removeChild(dishSelect.firstChild);
            };
            let option = document.createElement('option');
            	option.value = 'newDish';
            	option.innerHTML = 'Add a new dish';
            	dishSelect.appendChild(option)

            res.forEach((dish) => {
            	let option = document.createElement('option');
            	option.value = dish.id;
            	option.innerHTML = dish.name;
            	dishSelect.appendChild(option)
            })
        }
	})
}

function selectDish(){
	selectedDish = document.getElementById('dishSelection').value;
	if (selectedDish != 'newDish') {
		let dishType = document.querySelector('input[name="dishType"]:checked').value;
		let data = {'type': dishType, 'name': selectedDish}
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(data),
	        url: '/getDish',
	        success: function(res){
	        	let dishName = res.name;
	        	let dishDesc = res.description;
	        	let nameInput = document.getElementById('dishName');
	        	let descInput = document.getElementById('dishDesc');
	        	nameInput.value = dishName;
	        	descInput.value = dishDesc;
	        }
        })
	}
}

document.getElementById('confirm').addEventListener('click', function() {
	let dishName = document.getElementById('dishName').value;
	let dishId = document.getElementById('dishSelection').value;
	let dishDesc = document.getElementById('dishDesc').value;
	let dishJSON = {
		"id": dishId,
		"name": dishName,
		"description": dishDesc,
		"type": dishType,
		"selectedDish": selectedDish
	}
	saveDish(dishJSON);
});

document.getElementById('delete').addEventListener('click', function() {
	let dishId = document.getElementById('dishSelection').value;
	dishJSON = {
		'id': dishId,
		"type": dishType
	};
	deleteDish(dishJSON);
});

function deleteDish(dish) {
	console.log(dish);
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dish),
		contentType: 'application/json',
        url: '/deleteDish',
        success: function(){
            document.getElementById('dishDesc').value = '';
            document.getElementById('dishName').value = '';
            let dishSelection = document.getElementById("dishSelection");;
            dishSelection.remove(dishSelection.selectedIndex);
            alert('worked');
        }
	})
}

function saveDish(dish) {
	console.log(dish);
	$.ajax({
		type: 'POST',
		data: JSON.stringify(dish),
		contentType: 'application/json',
        url: '/addDish',
        success: function(){
            alert('worked');
        }
	})
}