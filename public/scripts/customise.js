var dishType = "";
var selectedDish = "";


function selectDishType(){
	dishType = document.querySelector('input[name="dishType"]:checked').value;
}

function selectDish(){
	selectedDish = document.getElementById('dishSelection').value;
}

document.getElementById('confirm').addEventListener('click', function() {
	var dishName = document.getElementById('dishName').value;
	var dishDesc = document.getElementById('dishDesc').value;
	var dishJSON = {
		"name": dishName,
		"description": dishDesc,
		"type": dishType,
		"selectedDish": selectedDish
	}
	saveDish(dishJSON);
});

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