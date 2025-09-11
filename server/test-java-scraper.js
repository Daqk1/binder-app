const JavaScraperWrapper = require('./java-scraper-wrapper');

async function testJavaScraper() {
    console.log('🧪 Testing Java Scraper Integration...');
    
    const javaScraper = new JavaScraperWrapper();
    
    try {
        // Check Java installation
        console.log('📋 Checking Java installation...');
        const javaInstalled = await javaScraper.checkJavaInstallation();
        if (!javaInstalled) {
            console.error('❌ Java is not installed or not in PATH');
            return;
        }
        console.log('✅ Java installation verified');
        
        // Check dependencies
        console.log('📋 Checking dependencies...');
        const deps = await javaScraper.checkDependencies();
        if (!deps.allPresent) {
            console.error('❌ Missing dependencies:', deps.missing);
            return;
        }
        console.log('✅ All dependencies present');
        
        // Check status
        console.log('📋 Checking scraper status...');
        const status = javaScraper.getStatus();
        console.log('Status:', status);
        
        console.log('✅ Java scraper integration test completed successfully!');
        console.log('🚀 You can now use the admin interface at http://localhost:8000/admin');
        
    } catch (error) {
        console.error('❌ Test failed:', error);
    }
}

// Run the test
testJavaScraper().catch(console.error);

