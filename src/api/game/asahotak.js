const axios = require('axios');

module.exports = function(app) {
    app.get('/games/asahotak', async (req, res) => {
        try {
            const response = await axios.get('https://api.nexray.eu.cc/games/asahotak');
            return res.status(200).json(response.data);
        } catch (error) {
            console.error("Error fetching Asah Otak:", error.message);
            return res.status(500).json({ status: false, error: 'Gagal mengambil data dari API eksternal' });
        }
    });
};
