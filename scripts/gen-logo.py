"""
BullGEO Logo & Icon Generator — Recraft AI
生成：A) 矢量图标  B) 品牌 Logo（带文字）
"""

import os, sys, requests
from openai import OpenAI

API_KEY = os.getenv("RECRAFT_API_KEY", "XBCrpfqi7I1rOxUn8bUeNbafatIGNirGn1Mt5JTt7rvBryWTe43uhVy2DUECfLIf")
OUT_DIR = os.path.join(os.path.dirname(__file__), "../frontend/public/brand")
os.makedirs(OUT_DIR, exist_ok=True)

client = OpenAI(
    base_url="https://external.api.recraft.ai/v1",
    api_key=API_KEY,
)

tasks = [
    {
        "name": "icon",
        "filename": "bullgeo-icon.png",
        "prompt": (
            "A minimalist flat vector app icon for BullGEO, "
            "a financial AI analytics platform. "
            "Abstract upward-trending bull silhouette integrated with a network graph node. "
            "Electric blue (#3B82F6) gradient on clean white background. "
            "Geometric, sharp edges, modern fintech aesthetic. No text."
        ),
        "style": "vector_illustration",
        "size": "1024x1024",
    },
    {
        "name": "logo",
        "filename": "bullgeo-logo.png",
        "prompt": (
            "Horizontal brand logo for BullGEO. "
            "Left side: a compact minimalist bull head icon merged with an upward trend arrow, electric blue. "
            "Right side: bold clean sans-serif text 'BullGEO' in dark navy #1E293B. "
            "Tagline below in smaller text: 'LLM推荐优化'. "
            "White background, professional fintech branding, no gradients, flat design."
        ),
        "style": "vector_illustration",
        "size": "1365x1024",
    },
]

def download(url: str, path: str):
    import subprocess
    result = subprocess.run(
        ["curl", "-L", "-s", "-o", path, url],
        timeout=60
    )
    result.check_returncode()

for task in tasks:
    print(f"\n⏳ 正在生成 {task['name']} ({task['style']}, {task['size']})...")
    try:
        resp = client.images.generate(
            model="recraftv3",
            prompt=task["prompt"],
            style=task["style"],
            n=1,
            size=task["size"],
        )
        url = resp.data[0].url
        # 检测实际格式：SVG 还是 PNG
        is_svg = "svg" in url.lower() or task["style"] == "vector_illustration"
        filename = task["filename"].replace(".png", ".svg") if is_svg else task["filename"]
        out_path = os.path.join(OUT_DIR, filename)
        download(url, out_path)
        print(f"✅ 已保存：{out_path}")
    except Exception as e:
        print(f"❌ 失败：{e}", file=sys.stderr)

print("\n🎉 完成！文件保存在 frontend/public/brand/")
