# एक file से पूरी website बदलें

रोज बदलने वाली जानकारी के लिए **site-config.js** खोलें। सभी pages इसे पढ़ते हैं। यह public settings file है, admin login या database नहीं।

| जानकारी | Config में field |
|---|---|
| संस्थान का नाम | name |
| Logo नहीं हो तो अक्षर | initials |
| Logo और browser icon | logoUrl, faviconUrl |
| Phone, email | phone, email |
| पता, office hours | address, officeHours |
| Google Maps location | mapUrl |
| Google Form responder link | googleFormUrl |
| Prospectus PDF | prospectusUrl |
| Homepage heading/photo | heroTitle, heroImageUrl, heroImageAlt |
| Academic year | academicYear |
| School stages | school.stages |
| College courses | courses |
| Notices | notices |
| Facilities | facilities |
| Gallery images/captions | gallery |
| परिचय, affiliation, fees | aboutText, affiliationText, feesText |
| Social links | socialLinks |

## उदाहरण

Existing lines की quotes के अंदर अपनी जानकारी भरें। Quotes और commas बनाए रखें। Duplicate fields न जोड़ें।

```js
name: "आपके संस्थान का नाम",
phone: "+91 98765 43210",
email: "office@your-domain.example",
logoUrl: "assets/logo.png",
googleFormUrl: "",
```

Phone और email अभी खाली हैं, इसलिए placeholder दिखता है। Map, social और prospectus link खाली होने पर उनके links छिपते हैं।

## Photos

अपनी image assets folder में रखें। उदाहरण: assets/school-photo.jpg। फिर heroImageUrl में वही path भरें और heroImageAlt में उसका वर्णन लिखें। Logo के लिए logoUrl और gallery के लिए gallery entries बदलें। https:// image links भी स्वीकार हैं; अपनी image files रखना अधिक भरोसेमंद है। File names lowercase और बिना spaces रखें। Config के साथ नई image भी GitHub पर upload करें। असली बच्चों की photos उचित permission के साथ ही publish करें।

## Google Form बाद में जोड़ें

1. Google Forms में student name, DOB, class/course, academic year, guardian/contact और previous education जैसे जरूरी fields बनाएँ।
2. Access settings जाँचें और responder access publish करें।
3. Responder link copy करें, edit link नहीं।
4. site-config.js के googleFormUrl में link भरें और GitHub पर commit करें।
5. Apply Now page में Open admission form button अपने-आप दिखेगा। Link खाली हो तो आवेदन उपलब्ध नहीं होने का स्पष्ट message रहेगा।

Data Google Form के Responses में देखेंगे। Link to Sheets से private spreadsheet जोड़ सकते हैं। Form और Sheet की permissions अलग-अलग जाँचें। Sheet सार्वजनिक न करें और GitHub पर upload न करें। Application submit होने से admission पक्का नहीं होता।

## Publish a change

GitHub repository → site-config.js → pencil/Edit → बदलाव → Commit changes। GitHub Pages publication पूरी होने के बाद pages refresh करें। पहले से खुले pages अपने-आप live update नहीं होंगे। सिर्फ computer पर edit करने से live website नहीं बदलेगी।

एक छोटा बदलाव करें और check करें। गलत quotes/commas से JavaScript syntax error हो सकता है और shared content नहीं दिखेगा।

## Demo से real institution

पहले name, contact, address, courses, photos, fees और recognition को verified जानकारी से बदलें। फिर demoMode को false करें। सिर्फ banner छिपाने से sample content वास्तविक नहीं होता। Real applications से पहले privacy.html में संस्था का वास्तविक privacy notice जोड़ें: data क्यों चाहिए, कौन देखेगा, कितने समय रखेंगे और contact कौन है।

इस public config में passwords, API secrets, Google credentials और student records कभी न रखें।

## Files की जिम्मेदारी

- site-config.js: साझा रोज बदलने वाला content।
- site.js: साझा header, footer, menu और content loading।
- site.css: सभी pages के रंग, spacing और responsive layout।
- HTML pages: संबंधित पेज की structure और स्थायी explanation।
- assets: photos, logo, illustrations और PDFs।

यह browser में सीधे काम करता है: कोई build tool या command जरूरी नहीं। JavaScript बंद हो तो shared content नहीं भरता; basic fallback navigation है। आगे बड़े production project में templates/static-site generator इस्तेमाल कर सकते हैं।

## Bal Vikas Vidyalaya — इस update के नए settings

- established: 1989; udise: 20241304404.
- studentCount / teacherCount: पुष्टि होने तक खाली रखें। संख्या देने पर School page पर दिखेगी।
- whatsappNumber: country code सहित केवल digits (वर्तमान 919431500007)।
- mapUrl: दिए हुए Google Maps location का link।
- feesPortalUrl: भविष्य के private fee service का address; अभी खाली है। कोई student fee data public config में न रखें।
- gallery की हर entry: imageUrl, alt, caption, category, date, albumUrl। Category filters अपने-आप बनते हैं।
- Sample image 1 और 2 illustrations हैं, वास्तविक school event photos नहीं। इन्हें अपनी photos से बदलें।

Google Drive का सामान्य sharing link photo का direct image link नहीं होता। Shared album/folder खोलने का link albumUrl में डाल सकते हैं। Website पर image दिखाने के लिए सबसे सरल तरीका photo को assets में रखना और imageUrl में उसका path देना है। Drive images को अपने-आप sync करने का integration इस version में नहीं है।

Higher-study support page को website में कॉलेज के रूप में नहीं दिखाया गया है। college.html filename पुरानी links न टूटें इसलिए रखा है। Degree देने वाली संस्था संबंधित college/university होगी।

## इस update को live कैसे करें

नई ZIP Extract All करें। अपने existing GitHub repository में Add file → Upload files से extracted folder के अंदर की सभी files और पूरा assets folder upload करें। Root में index.html रहे। Commit changes करें और Pages publication पूरी होने दें। फिर Ctrl+F5 से website refresh करें। Repository का नाम बदलना जरूरी नहीं है; पुराना live link चलता रहेगा। सिर्फ ZIP upload करने से website update नहीं होगी।

## Latest package / नया logo और location

इस पूरे package का folder bal-vikas-website है। Logo अपनी assets/school-emblem.png file है। नया Maps link mapUrl में है। Homepage में emblem, quick links और navy/gold/red design है। सभी website files साथ upload करें।
