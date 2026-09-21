const axios = require('axios');

module.exports = function(app) {
    async function fetchContent(content) {
        try {
            const response = await axios.post('https://luminai.my.id/', { content });
            return response.data;
        } catch (error) {
            console.error("Error fetching content from LuminAI:", error);
            throw error;
        }
    }

    // Endpoint lama Anda
    app.get('/ai/luminai', async (req, res) => {
        try {
            const { text } = req.query;
            if (!text) {
                return res.status(400).json({ status: false, error: 'Text is required' });
            }
            const { result } = await fetchContent(text);
            res.status(200).json({
                status: true,
                result
            });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });

    // ==========================================
    // Endpoint BARU untuk Brat (Proxy)
    // ==========================================
    app.get('/maker/brat', async (req, res) => {
        try {
            const { text } = req.query;
            if (!text) {
                return res.status(400).json({ status: false, error: 'Text is required' });
            }

            // Tembak langsung ke API eksternal dengan parameter text
            const targetUrl = `https://api.nexray.eu.cc/maker/brat?text=${encodeURIComponent(text)}`;
            
            const response = await axios.get(targetUrl, {
                responseType: 'arraybuffer' // Penting jika API eksternal merespons berupa gambar/binary
            });

            // Set Header Content-Type dari API aslinya (biasanya image/png atau image/jpeg)
            const contentType = response.headers['content-type'] || 'image/png';
            res.setHeader('Content-Type', contentType);

            // Kirim data buffer gambar langsung ke client
            return res.status(200).send(response.data);
        } catch (error) {
            console.error("Error fetching Brat Anime:", error);
            return res.status(500).json({ status: false, error: 'Gagal mengambil data dari API eksternal' });
        }
    });
};
