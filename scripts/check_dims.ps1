$app = New-Object -ComObject PowerPoint.Application
$filePath = (Resolve-Path "traceback-ai-presentation.pptx").Path
$pres = $app.Presentations.Open($filePath, -1, 0, 0)
$w = $pres.PageSetup.SlideWidth
$h = $pres.PageSetup.SlideHeight
Write-Host "SlideWidth in pt: $w (inches: $($w / 72))"
Write-Host "SlideHeight in pt: $h (inches: $($h / 72))"
$pres.Close()
$app.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($app) | Out-Null
