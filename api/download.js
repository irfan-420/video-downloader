export default async function handler(req, res) {
    let { url } = req.query;
    if (!url) return res.status(400).json({ success: false });

    // লিংকের শেষে থাকা অতিরিক্ত হাবিজাবি (?) অটোমেটিক কেটে দেওয়ার ব্যবস্থা
    if(url.includes("?igsh=") || url.includes("?si=")) {
        url = url.split("?")[0];
    }

    try {
        const apiKey = "8f0ff3e6e0b47aff0949701cc961da5f3eb04808";
        const targetUrl = encodeURIComponent(url);
        
        // আপনার দেওয়া API লিংক (এখানে mp4 দেওয়া হয়েছে ভিডিওর জন্য)
        const apiUrl = `https://p.savenow.to/ajax/download.php?format=mp4&url=${targetUrl}&add_info=1&apikey=${apiKey}`;

        // GET রিকোয়েস্ট পাঠানো হচ্ছে
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' // সার্ভার যাতে ব্লক না করে তাই এটি দেওয়া
            }
        });
        
        const data = await response.json();

        // এই নতুন API থেকে ভিডিওর লিংক বের করার নিয়ম
        let downloadLink = null;
        
        if (data && data.url) {
            downloadLink = data.url;
        } else if (data && data.file) {
            downloadLink = data.file;
        } else if (data && data.download_url) {
            downloadLink = data.download_url;
        } else if (data && data.link) {
            downloadLink = data.link;
        }

        if (downloadLink) {
            // যদি লিংক পায়, ফ্রন্টএন্ডে পাঠিয়ে দেবে
            res.status(200).json({ success: true, link: downloadLink });
        } else {
            res.status(404).json({ success: false, message: "ভিডিও পাওয়া যায়নি" });
        }
    } catch (error) {
        res.status(500).json({ success: false });
    }
        }
