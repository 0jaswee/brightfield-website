# Bal Vikas Vidyalaya — Complete Website

यह पूरा replacement package है। पुरानी website files पर निर्भर नहीं है।

## Files
- 13 HTML pages: index, school, college (higher-study guidance), admissions, apply, about, facilities, gallery, notices, contact, privacy, fees, chat.
- site-config.js: नाम, contact, logo, location, images, notices और service links.
- site.js: साझा navigation, footer और content.
- site.css: सभी pages का design.
- assets/: original school emblem, supplied signboard, और sample illustrations.

## GitHub पर पूरा replacement
1. ZIP को Extract All करें।
2. अपनी existing repository में website की पुरानी HTML/CSS/JS और assets files को replace कर सकते हैं। Repository, .github settings, domain CNAME (अगर कभी जोड़ा हो) या Pages settings delete नहीं करनी हैं। पहले चाहें तो Code → Download ZIP से पुराना backup ले लें।
3. Upload files में इस extracted folder के अंदर की सभी files और assets folder डालें। index.html सबसे ऊपर रहे; extra enclosing folder या ZIP upload न करें।
4. Commit changes करें। Settings → Pages में वही main और /(root) रहने दें।
5. Publication के बाद Ctrl+F5 / private window से जाँचें। URL वही रहेगा।

## इस version में
- सही Google Maps link: site-config.js के mapUrl में।
- Logo: assets/school-emblem.png; ChatGPT share link पर निर्भर नहीं।
- Calls / WhatsApp: +91 9431500007.
- Google Form और student fee portal अभी connected नहीं हैं। उनके pages सही unavailable स्थिति दिखाते हैं।
- Gallery में Sample image 1 / 2 illustrations हैं, वास्तविक events का दावा नहीं।
- Student/teacher counts पुष्टि होने तक खाली हैं।

नाम और details बदलने के लिए EDIT-GUIDE.md पढ़ें। Google Drive folder/album link gallery के albumUrl में दे सकते हैं। सामान्य Drive sharing URL imageUrl के लिए direct photo URL नहीं है; assets में photo रखना आसान है।

## Loading
कोई external fonts, JavaScript framework या image CDN जरूरी नहीं। Gallery images lazy-load होती हैं। Logo की original supplied PNG रखी है; अन्य images जोड़ते समय छोटे web-ready files चुनें। यह speed benchmark या किसी device पर fixed load time का दावा नहीं है।

Student records, passwords और secret keys public repository में कभी न रखें।
