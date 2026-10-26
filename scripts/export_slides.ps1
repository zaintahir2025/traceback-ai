$ppt = New-Object -ComObject PowerPoint.Application
$filePath = (Resolve-Path "traceback-ai-presentation.pptx").Path
$pres = $ppt.Presentations.Open($filePath, -1, 0, 0)
$outDir = Join-Path (Get-Location) "scripts\slide_exports"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }

for ($i = 1; $i -le $pres.Slides.Count; $i++) {
    $outFile = Join-Path $outDir ("slide_$i.png")
    $pres.Slides.Item($i).Export($outFile, "PNG", 1920, 1080)
    Write-Output "Exported slide $i"
}
$pres.Close()
$ppt.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($ppt) | Out-Null
