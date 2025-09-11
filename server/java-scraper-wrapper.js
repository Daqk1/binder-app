const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs').promises;

class JavaScraperWrapper {
    constructor() {
        this.javaScraperPath = path.join(__dirname, 'java-scraper');
        this.isRunning = false;
    }

    async compileJavaFiles() {
        console.log('🔨 Compiling Java files...');
        
        const classpath = [
            path.join(this.javaScraperPath, 'lib', 'gson-2.11.0.jar'),
            path.join(this.javaScraperPath, 'lib', 'jsoup-1.18.1.jar'),
            path.join(this.javaScraperPath, 'lib', 'selenium-java-4.26.0.jar')
        ].join(path.delimiter);

        return new Promise((resolve, reject) => {
            const javac = spawn('javac', [
                '-cp', classpath,
                path.join(this.javaScraperPath, '*.java')
            ], {
                cwd: this.javaScraperPath,
                shell: true
            });

            let output = '';
            let error = '';

            javac.stdout.on('data', (data) => {
                output += data.toString();
            });

            javac.stderr.on('data', (data) => {
                error += data.toString();
            });

            javac.on('close', (code) => {
                if (code === 0) {
                    console.log('✅ Java files compiled successfully');
                    resolve(output);
                } else {
                    console.error('❌ Java compilation failed:', error);
                    reject(new Error(`Compilation failed: ${error}`));
                }
            });
        });
    }

    async scrapeSet(setName, isJapanese = false) {
        if (this.isRunning) {
            throw new Error('Java scraper is already running');
        }

        console.log(`🔄 Starting Java scraper for set: ${setName} (${isJapanese ? 'Japanese' : 'English'})`);
        
        // First compile the Java files
        try {
            await this.compileJavaFiles();
        } catch (error) {
            throw new Error(`Failed to compile Java files: ${error.message}`);
        }

        this.isRunning = true;

        return new Promise((resolve, reject) => {
            const classpath = [
                path.join(this.javaScraperPath, 'lib', 'gson-2.11.0.jar'),
                path.join(this.javaScraperPath, 'lib', 'jsoup-1.18.1.jar'),
                path.join(this.javaScraperPath, 'lib', 'selenium-java-4.26.0.jar'),
                this.javaScraperPath
            ].join(path.delimiter);

            // Create a temporary Java file to run specific set
            const tempJavaFile = this.createTempSetRunner(setName, isJapanese);
            
            const java = spawn('java', [
                '-cp', classpath,
                'TempSetRunner'
            ], {
                cwd: this.javaScraperPath,
                shell: true
            });

            let output = '';
            let error = '';

            java.stdout.on('data', (data) => {
                const text = data.toString();
                output += text;
                console.log(`[Java Scraper] ${text.trim()}`);
            });

            java.stderr.on('data', (data) => {
                const text = data.toString();
                error += text;
                console.error(`[Java Scraper Error] ${text.trim()}`);
            });

            java.on('close', (code) => {
                this.isRunning = false;
                
                // Clean up temp file
                this.cleanupTempFile(tempJavaFile);
                
                if (code === 0) {
                    console.log(`✅ Java scraper completed for ${setName}`);
                    resolve({
                        success: true,
                        output: output,
                        setName: setName,
                        isJapanese: isJapanese
                    });
                } else {
                    console.error(`❌ Java scraper failed for ${setName}`);
                    reject(new Error(`Java scraper failed: ${error}`));
                }
            });

            // Timeout after 30 minutes
            setTimeout(() => {
                if (this.isRunning) {
                    java.kill();
                    this.isRunning = false;
                    reject(new Error('Java scraper timed out after 30 minutes'));
                }
            }, 30 * 60 * 1000);
        });
    }

    async scrapeAllSets() {
        if (this.isRunning) {
            throw new Error('Java scraper is already running');
        }

        console.log('🔄 Starting Java scraper for all sets...');
        
        // First compile the Java files
        try {
            await this.compileJavaFiles();
        } catch (error) {
            throw new Error(`Failed to compile Java files: ${error.message}`);
        }

        this.isRunning = true;

        return new Promise((resolve, reject) => {
            const classpath = [
                path.join(this.javaScraperPath, 'lib', 'gson-2.11.0.jar'),
                path.join(this.javaScraperPath, 'lib', 'jsoup-1.18.1.jar'),
                path.join(this.javaScraperPath, 'lib', 'selenium-java-4.26.0.jar'),
                this.javaScraperPath
            ].join(path.delimiter);

            const java = spawn('java', [
                '-cp', classpath,
                'grabPokemons'
            ], {
                cwd: this.javaScraperPath,
                shell: true
            });

            let output = '';
            let error = '';

            java.stdout.on('data', (data) => {
                const text = data.toString();
                output += text;
                console.log(`[Java Scraper] ${text.trim()}`);
            });

            java.stderr.on('data', (data) => {
                const text = data.toString();
                error += text;
                console.error(`[Java Scraper Error] ${text.trim()}`);
            });

            java.on('close', (code) => {
                this.isRunning = false;
                
                if (code === 0) {
                    console.log('✅ Java scraper completed for all sets');
                    resolve({
                        success: true,
                        output: output
                    });
                } else {
                    console.error('❌ Java scraper failed for all sets');
                    reject(new Error(`Java scraper failed: ${error}`));
                }
            });

            // Timeout after 2 hours for all sets
            setTimeout(() => {
                if (this.isRunning) {
                    java.kill();
                    this.isRunning = false;
                    reject(new Error('Java scraper timed out after 2 hours'));
                }
            }, 2 * 60 * 60 * 1000);
        });
    }

    createTempSetRunner(setName, isJapanese) {
        const className = isJapanese ? 'jpset' : 'set';
        const tempJavaContent = `
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class TempSetRunner {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(1);
        
        ${className} set = new ${className}();
        set.setSetName("${setName}");
        executor.execute(set);
        
        executor.shutdown();
        
        try {
            executor.awaitTermination(Long.MAX_VALUE, TimeUnit.NANOSECONDS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}`;

        const tempFilePath = path.join(this.javaScraperPath, 'TempSetRunner.java');
        require('fs').writeFileSync(tempFilePath, tempJavaContent);
        
        // Compile the temp file
        const classpath = [
            path.join(this.javaScraperPath, 'lib', 'gson-2.11.0.jar'),
            path.join(this.javaScraperPath, 'lib', 'jsoup-1.18.1.jar'),
            path.join(this.javaScraperPath, 'lib', 'selenium-java-4.26.0.jar')
        ].join(path.delimiter);

        const { execSync } = require('child_process');
        try {
            execSync(`javac -cp "${classpath}" TempSetRunner.java`, {
                cwd: this.javaScraperPath,
                shell: true
            });
        } catch (error) {
            console.error('Failed to compile temp runner:', error.message);
        }

        return tempFilePath;
    }

    cleanupTempFile(tempFilePath) {
        try {
            require('fs').unlinkSync(tempFilePath);
            const classFile = tempFilePath.replace('.java', '.class');
            if (require('fs').existsSync(classFile)) {
                require('fs').unlinkSync(classFile);
            }
        } catch (error) {
            console.error('Failed to cleanup temp file:', error.message);
        }
    }

    getStatus() {
        return {
            isRunning: this.isRunning,
            javaScraperPath: this.javaScraperPath
        };
    }

    async checkJavaInstallation() {
        return new Promise((resolve) => {
            const java = spawn('java', ['-version'], { shell: true });
            
            java.on('close', (code) => {
                resolve(code === 0);
            });
            
            java.on('error', () => {
                resolve(false);
            });
        });
    }

    async checkDependencies() {
        const requiredFiles = [
            path.join(this.javaScraperPath, 'lib', 'gson-2.11.0.jar'),
            path.join(this.javaScraperPath, 'lib', 'jsoup-1.18.1.jar'),
            path.join(this.javaScraperPath, 'lib', 'selenium-java-4.26.0.jar'),
            path.join(this.javaScraperPath, 'grabPokemons.java'),
            path.join(this.javaScraperPath, 'set.java'),
            path.join(this.javaScraperPath, 'jpset.java'),
            path.join(this.javaScraperPath, 'Card.java')
        ];

        const missing = [];
        for (const file of requiredFiles) {
            try {
                await fs.access(file);
            } catch {
                missing.push(path.basename(file));
            }
        }

        return {
            allPresent: missing.length === 0,
            missing: missing
        };
    }
}

module.exports = JavaScraperWrapper;

