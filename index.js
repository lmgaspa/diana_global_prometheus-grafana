import express from 'express';
import fetch from 'node-fetch';
import client from 'prom-client';

const app = express();
const register = client.register;

// Métricas
const responseTimeGauge = new client.Gauge({
    name: 'dianaglobal_response_time',
    help: 'Tempo de resposta do site www.dianaglobal.com.br',
});

const statusGauge = new client.Gauge({
    name: 'dianaglobal_http_status',
    help: 'Status HTTP do site www.dianaglobal.com.br',
});

const activeUsersGauge = new client.Gauge({
    name: 'active_users',
    help: 'Número de usuários ativos no aplicativo',
});

// Middleware para expor métricas
app.get('/metrics', async (req, res) => {
    try {
        const start = Date.now();
        const response = await fetch('https://www.dianaglobal.com.br');
        const status = response.status;
        const end = Date.now();

        responseTimeGauge.set(end - start);
        statusGauge.set(status);

        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (err) {
        statusGauge.set(0);
        res.status(500).end(err.message);
    }
});

// Inicia o servidor
const PORT = 4001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});