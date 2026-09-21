const axios = require('axios');

module.exports = function(app) {
    app.get('/games/islamic', async (req, res) => {
        try {
            const response = await axios.get('https://api.nexray.eu.cc/games/islamic');
            return res.status(200).json(response.data);
        } catch (error) {
            console.error("Error fetching Islamic game:", error.message);
            return res.status(500).json({ status: false, error: 'Gagal mengambil data dari API eksternal' });
        }
    });
};
