const translate = require('google-translate-api-x');
const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, '../src/app/messages/fa.json');
const targetLangs = ['en', 'ar'];

async function translateObject(obj, targetLang) {
  const result = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      result[key] = await translateObject(value, targetLang);
    } else if (typeof value === 'string' && value.trim()) {
      try {
        console.log(`Translating "${value.substring(0, 50)}..." to ${targetLang}`);
        const res = await translate(value, { to: targetLang });
        result[key] = res.text;
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.log(`Error: ${error.message}`);
        result[key] = value;
      }
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

async function translateAll() {
  console.log('\n🚀 Starting translation...\n');
  
  if (!fs.existsSync(sourcePath)) {
    console.error('❌ messages/fa.json not found!');
    process.exit(1);
  }
  
  console.log('📖 Reading Persian messages...\n');
  const sourceMessages = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
  
  for (const lang of targetLangs) {
    console.log(`\n🌐 Translating to ${lang}...\n`);
    const translated = await translateObject(sourceMessages, lang);
    const targetPath = path.join(__dirname, `../messages/${lang}.json`);
    fs.writeFileSync(targetPath, JSON.stringify(translated, null, 2));
    console.log(`\n✅ Saved to messages/${lang}.json`);
  }
  
  console.log('\n🎉 Translation completed!\n');
}

translateAll().catch(console.error);