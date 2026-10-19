$ErrorActionPreference = 'Stop'
$videoWorkspace = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$videoSourceDir = Join-Path $videoWorkspace 'video\anasayfa'
$videoPublicDir = Join-Path $videoWorkspace 'public\media\video'
$videoMaster = Join-Path $videoSourceDir 'etites-anasayfa-master.mp4'
$videoWeb = Join-Path $videoPublicDir 'etites-anasayfa.mp4'
$videoPoster = Join-Path $videoPublicDir 'etites-anasayfa-poster.jpg'

New-Item -ItemType Directory -Path $videoPublicDir -Force | Out-Null
$videoArguments = @('-hide_banner', '-y')
$videoFilters = @()
foreach ($clipNumber in 1..5) {
    $videoSource = Join-Path $videoSourceDir ('et' + $clipNumber + '.mp4')
    if (-not (Test-Path -LiteralPath $videoSource -PathType Leaf)) { throw ('Eksik video: ' + $videoSource) }
    $videoArguments += @('-i', $videoSource)
    $streamNumber = $clipNumber - 1
    $videoFilters += ('[' + $streamNumber + ':v]settb=AVTB,setpts=N/(24*TB),scale=1920:1080:in_color_matrix=auto:out_color_matrix=bt709,setsar=1,format=yuv420p[v' + $streamNumber + ']')
}
$videoFilters += '[v0][v1][v2][v3][v4]concat=n=5:v=1:a=0,split=2[master][web]'
$videoArguments += @('-filter_complex', ($videoFilters -join ';'))
$videoEncoding = @('-an', '-c:v', 'libx264', '-preset', 'medium', '-threads', '4', '-profile:v', 'high', '-level:v', '4.1', '-pix_fmt', 'yuv420p', '-r', '24', '-g', '48', '-color_primaries', 'bt709', '-color_trc', 'iec61966-2-1', '-colorspace', 'bt709', '-movflags', '+faststart', '-map_metadata', '-1')
$videoArguments += @('-map', '[master]') + $videoEncoding + @('-crf', '16', $videoMaster)
$videoArguments += @('-map', '[web]') + $videoEncoding + @('-crf', '20', '-maxrate', '8M', '-bufsize', '16M', $videoWeb)
& ffmpeg @videoArguments
if ($LASTEXITCODE -ne 0) { throw 'Video birleştirme başarısız' }

& ffmpeg -hide_banner -loglevel error -y -i $videoWeb -frames:v 1 -q:v 2 -update 1 $videoPoster
if ($LASTEXITCODE -ne 0) { throw 'Video başlangıç görseli alınamadı' }

Get-Item -LiteralPath $videoMaster, $videoWeb, $videoPoster | Select-Object FullName, Length
