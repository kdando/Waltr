import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const response = await axios.get(
                `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=museum`
            );
            res.status(200).json({
                imageUrl: response.data.urls.regular,
            });
        } catch (error) {
            console.error('Error fetching image from Unsplash:', error);
            res.status(500).json({ error: 'Error fetching image' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
