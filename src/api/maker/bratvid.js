const axios = require('axios');

module.exports = function(app) {
    app.get('/maker/bratvid', async (req, res) => {
        try {
            const queryParams = new URLSearchParams(req.query).toString();
            const targetUrl = `https://api.nexray.eu.cc/maker/bratvid${queryParams ? '?' + queryParams : ''}`;
            
            const response = await axios.get(targetUrl, { responseType: 'arraybuffer' });
            res.setHeader('Content-Type', response.headers['content-type'] || 'video/mp4');
            return res.status(200).send(response.data);
        } catch (error) {
            console.error("Error fetching BratVid:", error.message);
            return res.status(500).json({ status: false, error: 'Gagal mengambil data dari API eksternal' });
        }
    });
};
