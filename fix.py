import re

with open('analyst.html', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# 1. Remove style block
content = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL)

# 2. Add link tags
link_tags = '''<link rel="stylesheet" href="css/shared.css">
    <link rel="stylesheet" href="css/cases.css">'''
content = content.replace('</head>', link_tags + '\n</head>')

# 3. Add body class
content = content.replace('<body>', '<body class="case-page">')

# 4. Group lore texts (already grouped mostly in backup? Let's check!)
content = re.sub(r'<span class="redacted"[^>]*>.*?</span>', '<span class="redacted">██████████</span>', content)

with open('analyst.html', 'w', encoding='utf-8') as f:
    f.write(content)
