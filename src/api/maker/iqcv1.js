const axios = require('axios');

module.exports = function(app) {
    app.get('/maker/v1/iqc', async (req, res) => {
        try {
            // Tangkap query jika ada, misal text
            const queryParams = new URLSearchParams(req.query).toString();
            const targetUrl = `https://api.nexray.eu.cc/maker/v1/iqc${queryParams ? '?' + queryParams : ''}`;
            
            const response = await axios.get(targetUrl, { responseType: 'arraybuffer' });
            res.setHeader('Content-Type', response.headers['content-type'] || 'image/png');
            return res.status(200).send(response.data);
        } catch (error) {
            console.error("Error fetching IQC v1:", error.message);
            return res.status(500).json({ status: false, error: 'Gagal mengambil data dari API eksternal' });
        }
    });
};
