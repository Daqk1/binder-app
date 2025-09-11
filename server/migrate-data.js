const fs = require('fs');
const path = require('path');

// This script migrates the existing scraped data from webscrap folder to the main pokemon_data folders
// and ensures compatibility with the new system

const sourceDir = path.join(__dirname, 'webscrap');
const targetDir = path.join(__dirname, 'pokemon_data');
const jpTargetDir = path.join(__dirname, 'jppokemon_data');

async function migrateData() {
    console.log('🔄 Starting data migration...');
    
    // Ensure target directories exist
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
        console.log('📁 Created pokemon_data directory');
    }
    
    if (!fs.existsSync(jpTargetDir)) {
        fs.mkdirSync(jpTargetDir, { recursive: true });
        console.log('📁 Created jppokemon_data directory');
    }
    
    // Copy English sets
    const englishSourceDir = path.join(sourceDir, 'pokemon_data');
    if (fs.existsSync(englishSourceDir)) {
        const files = fs.readdirSync(englishSourceDir);
        let copied = 0;
        
        for (const file of files) {
            if (file.endsWith('.json')) {
                const sourcePath = path.join(englishSourceDir, file);
                const targetPath = path.join(targetDir, file);
                
                try {
                    fs.copyFileSync(sourcePath, targetPath);
                    copied++;
                    console.log(`✅ Copied ${file}`);
                } catch (error) {
                    console.error(`❌ Error copying ${file}:`, error.message);
                }
            }
        }
        
        console.log(`📊 Copied ${copied} English set files`);
    } else {
        console.log('⚠️ English source directory not found');
    }
    
    // Copy Japanese sets
    const japaneseSourceDir = path.join(sourceDir, 'jppokemon_data');
    if (fs.existsSync(japaneseSourceDir)) {
        const files = fs.readdirSync(japaneseSourceDir);
        let copied = 0;
        
        for (const file of files) {
            if (file.endsWith('.json')) {
                const sourcePath = path.join(japaneseSourceDir, file);
                const targetPath = path.join(jpTargetDir, file);
                
                try {
                    fs.copyFileSync(sourcePath, targetPath);
                    copied++;
                    console.log(`✅ Copied ${file}`);
                } catch (error) {
                    console.error(`❌ Error copying ${file}:`, error.message);
                }
            }
        }
        
        console.log(`📊 Copied ${copied} Japanese set files`);
    } else {
        console.log('⚠️ Japanese source directory not found');
    }
    
    // Verify migration
    const englishFiles = fs.readdirSync(targetDir).filter(f => f.endsWith('.json'));
    const japaneseFiles = fs.readdirSync(jpTargetDir).filter(f => f.endsWith('.json'));
    
    console.log(`\n📈 Migration Summary:`);
    console.log(`   English sets: ${englishFiles.length} files`);
    console.log(`   Japanese sets: ${japaneseFiles.length} files`);
    console.log(`   Total: ${englishFiles.length + japaneseFiles.length} files`);
    
    // Test loading a sample file
    if (englishFiles.length > 0) {
        try {
            const sampleFile = path.join(targetDir, englishFiles[0]);
            const data = JSON.parse(fs.readFileSync(sampleFile, 'utf-8'));
            console.log(`\n🧪 Sample data from ${englishFiles[0]}:`);
            console.log(`   Cards: ${data.length}`);
            if (data.length > 0) {
                console.log(`   Sample card: ${data[0].cardName || data[0].name}`);
            }
        } catch (error) {
            console.error('❌ Error reading sample file:', error.message);
        }
    }
    
    console.log('\n✅ Migration completed successfully!');
    console.log('🚀 You can now start the server and use the admin interface at http://localhost:8000/admin');
}

migrateData().catch(console.error);
