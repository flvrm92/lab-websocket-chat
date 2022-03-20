document.querySelector("#start_chat").addEventListener("click", (event) => {
	const socket = io();

	const chatHelp = document.getElementById('chat_help');
	chatHelp.style.display = 'none';

	const chatInSupport = document.getElementById('chat_in_support');
	chatInSupport.style.display = 'block';

	const email = document.getElementById('email').value;
	const text = document.getElementById('txt_help').value;

	socket.on('connect', () => {
		const params = {
			email,
			text
		};

		socket.emit('clientFirstAccess', params, (call, err) => {
			if (err) {
				console.error(err);
			} else {
				console.log(call);
			}
		})
	});

	socket.on('clientListAllMessages', messages => {
		var templateClient = document.getElementById('message-user-template').innerHTML;
		var templateAdmin = document.getElementById('admin-template').innerHTML;

		messages.forEach(message => {
			if (!message.adminId) {
				const rendered = Mustach.render(templateClient, {
					message: message.text,
					email
				});

				document.getElementById('messages').innerHTML += rendered;
			} else {
				const rendered = Mustach.render(templateAdmin, {
					message_admin: message.text
				});

				document.getElementById('messages').innerHTML += rendered;
			}
		});
	});

	socket.on('adminSendToClient', message => {
		console.log(message);
	});

});
