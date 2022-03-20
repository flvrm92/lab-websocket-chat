const socket = io();
let connectionsUsers = [];

socket.on('adminListAllUsers', (connections) => {
  connectionsUsers = connections;
  document.getElementById('list_users').innerHTML = "";

  let template = document.getElementById('template').innerHTML;

  connections.forEach(connection => {
    const rendered = Mustache.render(template, {
      id: connection.socketId,
      email: connection.User.email
    })

    document.getElementById('list_users').innerHTML += rendered;
  });

});

function call(id) {
  const connection = connectionsUsers.find(cnn => cnn.socketId === id);

  const template = document.getElementById('admin_template').innerHTML;

  const rendered = Mustache.render(template, {
    email: connection.User.email,
    id: connection.userId
  });

  document.getElementById('supports').innerHTML += rendered;

  const params = {
    userId: connection.userId
  };

  socket.emit('adminListMessagesByUser', params, (messages) => {

    const divMessages = document.getElementById(`allMessages${connection.userId}`);

    messages.forEach(message => {
      const createDiv = document.createElement('div');

      if (message.adminId === null) {
        createDiv.className = 'admin_message_client';

        createDiv.innerHTML = `<span>${connection.User.email} - ${message.text}</span>`;
        createDiv.innerHTML += `<span class='admin_date'>${dayjs(message.createdAt).format("DD/MM/YYYY HH:mm:ss")}</span>`;
      } else {
        createDiv.className = 'admin_message_admin';

        createDiv.innerHTML = `<span>Atendente: ${message.text}</span>`;
        createDiv.innerHTML += `<span class='admin_date'>${dayjs(message.createdAt).format("DD/MM/YYYY HH:mm:ss")}</span>`;
      }

      divMessages.appendChild(createDiv);
    });
  });
}


function sendMEssage(id) {
  const text = document.getElementById(`send_message_${id}`);

  const params = {
    text: text.value,
    userId: id
  };

  socket.emit('adminSendMessage', params);
}