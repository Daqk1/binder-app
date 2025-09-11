# PowerShell script to download complete Selenium dependencies
Write-Host "Downloading complete Selenium dependencies..."

# Create a temp directory for downloads
New-Item -ItemType Directory -Force -Path "temp"

# Download all required Selenium JAR files
$dependencies = @(
    @{name="selenium-java-4.26.0.jar"; url="https://repo1.maven.org/maven2/org/seleniumhq/selenium/selenium-java/4.26.0/selenium-java-4.26.0.jar"},
    @{name="selenium-api-4.26.0.jar"; url="https://repo1.maven.org/maven2/org/seleniumhq/selenium/selenium-api/4.26.0/selenium-api-4.26.0.jar"},
    @{name="selenium-chrome-driver-4.26.0.jar"; url="https://repo1.maven.org/maven2/org/seleniumhq/selenium/selenium-chrome-driver/4.26.0/selenium-chrome-driver-4.26.0.jar"},
    @{name="selenium-support-4.26.0.jar"; url="https://repo1.maven.org/maven2/org/seleniumhq/selenium/selenium-support/4.26.0/selenium-support-4.26.0.jar"},
    @{name="selenium-remote-driver-4.26.0.jar"; url="https://repo1.maven.org/maven2/org/seleniumhq/selenium/selenium-remote-driver/4.26.0/selenium-remote-driver-4.26.0.jar"},
    @{name="selenium-json-4.26.0.jar"; url="https://repo1.maven.org/maven2/org/seleniumhq/selenium/selenium-json/4.26.0/selenium-json-4.26.0.jar"},
    @{name="selenium-http-4.26.0.jar"; url="https://repo1.maven.org/maven2/org/seleniumhq/selenium/selenium-http/4.26.0/selenium-http-4.26.0.jar"},
    @{name="selenium-chromium-driver-4.26.0.jar"; url="https://repo1.maven.org/maven2/org/seleniumhq/selenium/selenium-chromium-driver/4.26.0/selenium-chromium-driver-4.26.0.jar"}
)

foreach ($dep in $dependencies) {
    Write-Host "Downloading $($dep.name)..."
    try {
        Invoke-WebRequest -Uri $dep.url -OutFile "lib\$($dep.name)" -ErrorAction Stop
        Write-Host "✅ Downloaded $($dep.name)"
    } catch {
        Write-Host "❌ Failed to download $($dep.name): $($_.Exception.Message)"
    }
}

# Clean up temp directory
Remove-Item -Path "temp" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "✅ Complete Selenium dependencies download completed!"
Write-Host "You can now try compiling the Java files again."

