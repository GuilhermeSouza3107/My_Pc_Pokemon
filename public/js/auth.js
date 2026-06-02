const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const username = document.getElementById('username').value;
    const senha = document.getElementById('senha').value;

    try {

        const resposta = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                username,
                senha
            })
        });

        const dados = await resposta.json();

        if (dados.token) {

            localStorage.setItem('token', dados.token);
            alert('Login realizado!');
            window.location.href = 'dashboard.html';

        } else {
            alert(dados.erro);
        }

    } catch (err) {
        console.log(err);
        alert('Erro no login');
    }

});