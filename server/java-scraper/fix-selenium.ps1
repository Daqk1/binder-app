# PowerShell script to download the correct Selenium JAR file
Write-Host "Downloading correct Selenium JAR file..."

# Remove the directory if it exists
if (Test-Path "lib\selenium-java-4.26.0") {
    Remove-Item -Path "lib\selenium-java-4.26.0" -Recurse -Force
    Write-Host "Removed selenium-java-4.26.0 directory"
}

# Download the correct Selenium JAR file
$seleniumUrl = "https://repo1.maven.org/maven2/org/seleniumhq/selenium/selenium-java/4.26.0/selenium-java-4.26.0.jar"
Write-Host "Downloading Selenium JAR from: $seleniumUrl"
Invoke-WebRequest -Uri $seleniumUrl -OutFile "lib\selenium-java-4.26.0.jar"

Write-Host "✅ Selenium JAR downloaded successfully!"
Write-Host "You can now test the Java scraper integration."

