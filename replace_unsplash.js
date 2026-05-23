const fs = require('fs');
const path = require('path');

const replacements = [
    {
        from: /https:\/\/images\.unsplash\.com\/photo-1589829085413-56de8ae18c73\?auto=format&fit=crop&w=\d+&q=\d+/g,
        to: 'js/images/m-5.jpg'
    },
    {
        from: /https:\/\/images\.unsplash\.com\/photo-1524504388940-b1c1722653e1\?auto=format&fit=crop&w=\d+&q=\d+/g,
        to: 'js/images/m-6.png'
    },
    {
        from: /https:\/\/images\.unsplash\.com\/photo-1554224155-6726b3ff858f\?auto=format&fit=crop&w=\d+&q=\d+/g,
        to: 'js/images/m-7.png'
    },
    {
        from: /https:\/\/images\.unsplash\.com\/photo-1453728013993-6d66e9c9123a\?auto=format&fit=crop&w=\d+&q=\d+/g,
        to: 'js/images/m-8.jpg'
    },
    {
        from: /https:\/\/images\.unsplash\.com\/photo-1520813792240-56fc4a3765a7\?auto=format&fit=crop&w=\d+&q=\d+/g,
        to: 'js/images/m-9.jpg'
    }
];

const dir = '.';
fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf-8');
        
        replacements.forEach(r => {
            content = content.replace(r.from, r.to);
        });
        
        fs.writeFileSync(filePath, content);
        console.log(`Updated Unsplash links in ${file}`);
    }
});
