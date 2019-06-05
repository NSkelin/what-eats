// ?? idk why i used this before need to research later
// function login() {
// 	var email = document.getElementById('loginEmail').value;
// 	var password = document.getElementById('loginPassword').value;
// 	var newJSON = {"email": email, "password": password}
// 	$.ajax({
// 		type: 'POST',
// 		data: JSON.stringify(newJSON),
// 		contentType: 'application/json',
// 		url: '/login'
// 	});
// }

// function signup() {
// 	var email = document.getElementById('signupEmail').value;
// 	var password = document.getElementById('signupPassword').value;
// 	var newJSON = {"email": email, "password": password}
// 	$.ajax({
// 		type: 'POST',
// 		data: JSON.stringify(newJSON),
// 		contentType: 'application/json',
// 		url: '/signup',
// 		success: function() {
// 			console.log('suc');
// 			$.ajax({
// 				type: 'GET',
// 				url: '/homePage'
// 			})
// 		}
// 	});
// }