"""Ana sayfa filmini bölüm bölüm hızlandırır, siteye konacak flu kopyaları üretir.

Kaynak: video/anasayfa/et1.mp4 ... et5.mp4 (Flow'dan gelen orijinal parçalar, 37,67 sn, 24 kare/sn).
Ara kopya kullanılmaz, böylece film yalnız bir kez sıkıştırılır.
Çıktı: video/anasayfa/etites-anasayfa-master-hizli.mp4 (arşiv, net, yüksek kalite),
       video/anasayfa/etites-anasayfa-web-hizli.mp4 (siteye konacak H.264 kopya) ve
       video/anasayfa/etites-anasayfa-web-hizli.webm (siteye konacak AV1 kopya, desteklenen tarayıcılarda).
Site kopyaları ve başlangıç görseli public/media/video altına da yazılır.

Hızlar kare kare hareket ve yeşil vurgu ölçümüne göre seçildi (18 Ekim 2026), 19 Ekim'de açılış
ve kafeye iniş kullanıcı isteğiyle belirgin biçimde hızlandırıldı.
kamera hareketi olan geçişler neredeyse olduğu gibi kalır, durağan bekleyişler 2,5-3,2 kat
hızlanır, yeşil tesisat vurguları okunur kalsın diye 1,3-1,4 kat hızlanır.
Hız değişimleri 0,4 saniyede yumuşar. Hızlanan yerlerde 180 derecelik obtüratör gibi
komşu kareler harmanlanır, böylece kare atlaması titreme yapmaz.

Sitede film hafif flu durur, öndeki cam bar daha flu kalır (19 Ekim 2026). Flu dosyaya işlenir,
tarayıcı her karede ayrıca hesaplamaz. Arşiv kopyası net kalır.

Kullanım: python scripts/retime-home-video.py
          python scripts/retime-home-video.py --sadece-web   (arşiv kopyası varken yalnız site kopyaları)
"""
import os
import shutil
import subprocess
import sys

import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CLIPS = [os.path.join(ROOT, "video", "anasayfa", f"et{i}.mp4") for i in range(1, 6)]
OUT_MASTER = os.path.join(ROOT, "video", "anasayfa", "etites-anasayfa-master-hizli.mp4")
OUT_WEB = os.path.join(ROOT, "video", "anasayfa", "etites-anasayfa-web-hizli.mp4")
OUT_AV1 = os.path.join(ROOT, "video", "anasayfa", "etites-anasayfa-web-hizli.webm")
OUT_POSTER = os.path.join(ROOT, "video", "anasayfa", "etites-anasayfa-poster.jpg")
SITE_DIR = os.path.join(ROOT, "public", "media", "video")
W, H, FPS = 1920, 1080, 24

# (başlangıç sn, bitiş sn, hız) kaynak filmin zamanına göre
SEGMENTS = [
    (0.00, 1.00, 1.80),   # açılış
    (1.00, 5.00, 2.80),   # tepeye hızlı yaklaşma
    (5.00, 7.40, 1.50),   # penthouse, yeşil vurgu
    (7.40, 8.70, 4.00),   # vurgu sonrası durağan an
    (8.70, 13.10, 3.20),  # cephe boyunca kafeye hızlı iniş
    (13.10, 13.45, 3.00), # kafe, vurgu öncesi
    (13.45, 15.20, 1.30), # kafe, yeşil vurgu
    (15.20, 16.60, 3.00), # vurgu sonrası durağan an
    (16.60, 19.60, 1.15), # fabrikaya hızlı geçiş, zaten hızlı
    (19.60, 20.90, 2.60), # fabrika önünde duruş
    (20.90, 23.40, 1.40), # fabrika, yeşil vurgu
    (23.40, 24.90, 3.00), # vurgu sonrası durağan an
    (24.90, 28.20, 1.35), # savunma tesisine geçiş
    (28.20, 31.00, 1.70), # kapıya yaklaşma
    (31.00, 32.60, 3.20), # kapalı kapı önünde bekleme
    (32.60, 99.00, 1.25), # kapı açılır, araç çıkar
]
RAMP = 0.4      # hız değişiminin yumuşama süresi (sn)
SHUTTER = 0.5   # harmanlanan pencere, kaynak kare cinsinden hızın yarısı
BLUR = 5.5      # site kopyalarındaki flu (Gauss sigma, piksel), cam barın dörtte biri

TAGS = ["-color_primaries", "bt709", "-color_trc", "iec61966-2-1", "-colorspace", "bt709"]
X264 = ["-an", "-c:v", "libx264", "-preset", "slow", "-tune", "film", "-threads", "4", "-profile:v", "high",
        "-level:v", "4.2", "-pix_fmt", "yuv420p", "-r", str(FPS), "-g", "48", *TAGS,
        "-bsf:v", "h264_metadata=colour_primaries=1:transfer_characteristics=13:matrix_coefficients=1",
        "-movflags", "+faststart", "-map_metadata", "-1"]


def speed_curve(duration, step):
    t = np.arange(0.0, duration + step, step)
    s = np.ones_like(t)
    for a, b, v in SEGMENTS:
        s[(t >= a) & (t < b)] = v
    k = max(1, int(round(RAMP / step)))
    kernel = np.ones(k) / k
    padded = np.pad(s, (k, k), mode="edge")
    s = np.convolve(padded, kernel, mode="same")[k:-k]
    return t, s


def decoder():
    """Beş parçayı sırayla, tek renk dönüşümüyle RGB karelere açar."""
    args = ["ffmpeg", "-v", "error"]
    chains = []
    for i, clip in enumerate(CLIPS):
        args += ["-i", clip]
        chains.append(f"[{i}:v]settb=AVTB,setpts=N/({FPS}*TB),scale={W}:{H}:in_color_matrix=auto:flags=lanczos,format=rgb24[v{i}]")
    chains.append("".join(f"[v{i}]" for i in range(len(CLIPS))) + f"concat=n={len(CLIPS)}:v=1:a=0[out]")
    return args + ["-filter_complex", ";".join(chains), "-map", "[out]", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"]


def probe_frames(path):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0", "-count_frames",
         "-show_entries", "stream=nb_read_frames", "-of", "csv=p=0", path],
        capture_output=True, text=True, check=True)
    return int(out.stdout.strip())


def retime():
    """Orijinal parçalardan net arşiv kopyasını üretir."""
    n_in = sum(probe_frames(c) for c in CLIPS)
    duration = n_in / FPS
    step = 1.0 / (FPS * 20)
    t, s = speed_curve(duration, step)
    # Çıktı zamanı = ∫ dt / hız
    out_t = np.concatenate([[0.0], np.cumsum(step / s[:-1])])
    out_duration = out_t[-1]
    n_out = int(np.floor(out_duration * FPS))
    tau = np.arange(n_out) / FPS
    t_in = np.interp(tau, out_t, t)
    s_at = np.interp(t_in, t, s)
    pos = np.clip(t_in * FPS, 0, n_in - 1)
    print(f"kaynak {n_in} kare, {duration:.2f} sn -> çıktı {n_out} kare, {n_out / FPS:.2f} sn")

    dec = subprocess.Popen(decoder(), stdout=subprocess.PIPE)
    enc = subprocess.Popen(
        ["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
         "-r", str(FPS), "-i", "-",
         "-vf", "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p",
         *X264, "-crf", "12", OUT_MASTER],
        stdin=subprocess.PIPE)

    frame_bytes = W * H * 3
    cache = {}
    next_index = 0

    def frame(i):
        nonlocal next_index
        while next_index <= i:
            buf = dec.stdout.read(frame_bytes)
            if len(buf) < frame_bytes:
                break
            cache[next_index] = np.frombuffer(buf, np.uint8).reshape(H, W, 3)
            next_index += 1
        return cache[min(i, next_index - 1)]

    for k in range(n_out):
        span = max(1e-3, s_at[k] * SHUTTER)
        a, b = pos[k] - span / 2, pos[k] + span / 2
        first, last = int(np.floor(a + 0.5)), int(np.floor(b + 0.5))
        acc, total = None, 0.0
        for i in range(max(0, first), min(n_in - 1, last) + 1):
            lo, hi = max(a, i - 0.5), min(b, i + 0.5)
            w = hi - lo
            if w <= 0:
                continue
            f = frame(i).astype(np.float32)
            acc = f * w if acc is None else acc + f * w
            total += w
        if acc is None:
            out = frame(int(round(pos[k])))
        else:
            out = np.clip(acc / total + 0.5, 0, 255).astype(np.uint8)
        enc.stdin.write(out.tobytes())
        for old in [x for x in cache if x < first - 1]:
            del cache[old]
        if k % 48 == 0:
            print(f"  {k}/{n_out}", flush=True)

    enc.stdin.close()
    enc.wait()
    dec.stdout.close()
    dec.wait()
    if enc.returncode != 0:
        sys.exit("kodlama başarısız")


def web():
    """Arşiv kopyasından siteye konacak flu kopyaları ve başlangıç görselini üretir."""
    # Flu 10 bitte uygulanır, gökyüzü geçişlerinde bantlanma olmaz
    blur = f"format=yuv420p10le,gblur=sigma={BLUR}"
    steps = [
        ("H.264", ["ffmpeg", "-v", "error", "-y", "-i", OUT_MASTER, "-vf", f"{blur},format=yuv420p",
                   *X264, "-crf", "18", "-maxrate", "12M", "-bufsize", "24M", OUT_WEB]),
        # AV1 kopya: aynı kalitede çok daha küçük
        ("AV1", ["ffmpeg", "-v", "error", "-y", "-i", OUT_MASTER, "-vf", blur, "-an", "-c:v", "libsvtav1",
                 "-preset", "5", "-crf", "27", "-pix_fmt", "yuv420p10le", "-g", "48", "-svtav1-params", "tune=0:lp=2",
                 *TAGS, "-map_metadata", "-1", OUT_AV1]),
        ("başlangıç görseli", ["ffmpeg", "-v", "error", "-y", "-i", OUT_WEB, "-frames:v", "1", "-q:v", "3", OUT_POSTER]),
    ]
    for name, cmd in steps:
        if subprocess.run(cmd).returncode != 0:
            sys.exit(f"{name} kodlama başarısız")
    for src, name in ((OUT_WEB, "etites-anasayfa.mp4"), (OUT_AV1, "etites-anasayfa.webm"),
                      (OUT_POSTER, "etites-anasayfa-poster.jpg")):
        shutil.copyfile(src, os.path.join(SITE_DIR, name))
    for p in (OUT_MASTER, OUT_WEB, OUT_AV1, OUT_POSTER):
        print(p, round(os.path.getsize(p) / 1e6, 2), "MB")


def main():
    if "--sadece-web" not in sys.argv:
        retime()
    web()


if __name__ == "__main__":
    main()
