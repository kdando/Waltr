import axios from 'axios';

export default async function handler(req, res) {
    const { count = 1 } = req.query;

    try {
        const response = await axios.get(
            `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=museum&count=${count}`
        );
        const imageUrls = response.data.map((image) => image.urls.regular);
        res.status(200).json({
            imageUrls
        });
    } catch (error) {
        console.error('Error fetching images from Unsplash:', error);
        res.status(500).json({ error: 'Error fetching images from Unsplash.' });
    }

}
