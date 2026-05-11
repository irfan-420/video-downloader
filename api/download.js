export default async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).json({ success: false });

    try {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Host': 'auto-download-all-in-one.p.rapidapi.com',
                'X-RapidAPI-Key': 'eae85f6aecmsh3fbed1e8bfc981ep1161aejsnbcf9b0aae6fe'
            },
            body: JSON.stringify({ url: url })
        };

        const response = await fetch('https://auto-download-all-in-one.p.rapidapi.com/v1/social/autolink', options);
        const data = await response.json();

        let downloadLink = null;
        if (data && data.medias && data.medias.length > 0) {
            downloadLink = data.medias[0].url;
        } else if (data && data.url) {
            downloadLink = data.url;
        }

        if (downloadLink) {
            res.status(200).json({ success: true, link: downloadLink });
        } else {
            res.status(404).json({ success: false });
        }
    } catch (error) {
        res.status(500).json({ success: false });
    }
          }
