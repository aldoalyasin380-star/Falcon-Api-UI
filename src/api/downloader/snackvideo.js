const axios = require('axios');

module.exports = function(app) {
    app.get('/downloader/snackvideo', async (req, res) => {
        try {
            const queryParams = new URLSearchParams(req.query).toString();
            const targetUrl = `https://api.nexray.eu.cc/downloader/snackvideo${queryParams ? '?' + queryParams : ''}`;
            
            const response = await axios.get(targetUrl);
            return res.status(200).json(response.data);
        } catch (error) {
            console.error("Error fetching Snack Video:", error.message);
            return res.status(500).json({ status: false, error: 'Gagal mengambil data dari API eksternal' });
        }
    });
};
