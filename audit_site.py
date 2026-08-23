from pathlib import Path
from bs4 import BeautifulSoup
from urllib.parse import urlparse

root = Path('/home/ubuntu/jadewokhtml')
pages = sorted(root.glob('*.html'))
required = {'index.html','about.html','menu.html','menu-details.html','reservations.html','private-dining.html','gallery.html','chefs.html','chef-details.html','locations.html','contact.html','faq.html','blog.html','blog-details.html','404.html'}
errors = []
checks = []
if {p.name for p in pages} != required:
    errors.append(f'Page set mismatch: found {sorted(p.name for p in pages)}')
for page in pages:
    soup = BeautifulSoup(page.read_text(encoding='utf-8'), 'html.parser')
    title = soup.title.string.strip() if soup.title and soup.title.string else ''
    desc = soup.find('meta', attrs={'name':'description'})
    if not title: errors.append(f'{page.name}: missing title')
    if not desc or not desc.get('content'): errors.append(f'{page.name}: missing meta description')
    if not soup.find('main'): errors.append(f'{page.name}: missing main landmark')
    if not soup.find('h1'): errors.append(f'{page.name}: missing h1')
    if not soup.find('link', rel='stylesheet'): errors.append(f'{page.name}: missing stylesheet')
    for img in soup.find_all('img'):
        if not img.get('alt'): errors.append(f'{page.name}: image missing alt text')
    for a in soup.find_all('a', href=True):
        href = a['href']
        if href.startswith(('http://','https://','mailto:','tel:','#')): continue
        target = (page.parent / href).resolve()
        if not target.exists(): errors.append(f'{page.name}: broken link {href}')
    raw = page.read_text(encoding='utf-8').lower()
    for forbidden in ('lorem ipsum','todo','coming soon'):
        if forbidden in raw: errors.append(f'{page.name}: forbidden unfinished text {forbidden}')
    checks.append((page.name, title, len(soup.find_all('section')), len(soup.find_all('img'))))

css = root / 'assets/css/style.css'
js = root / 'assets/js/main.js'
if not css.exists() or css.stat().st_size < 10000: errors.append('Shared CSS missing or unexpectedly small')
if not js.exists() or js.stat().st_size < 2000: errors.append('Shared JS missing or unexpectedly small')
if not (root/'logo.svg').exists() or not (root/'favicon.svg').exists(): errors.append('Brand assets missing')
if not (root/'docs/index.html').exists() or not (root/'docs/documentation.md').exists(): errors.append('Documentation landing page or guide missing')
if 'data-validate-form' not in (root/'reservations.html').read_text(): errors.append('Reservation form hook missing')
if 'data-gallery-item' not in (root/'gallery.html').read_text(): errors.append('Gallery interaction hook missing')
if 'data-filter' not in (root/'menu.html').read_text(): errors.append('Menu filter hook missing')
if 'faq-item' not in (root/'faq.html').read_text(): errors.append('FAQ accordion markup missing')

print(f'Pages checked: {len(pages)}')
print(f'HTML section/image coverage: {sum(x[2] for x in checks)} sections / {sum(x[3] for x in checks)} images')
print(f'Documentation files: {len(list((root/"docs").glob("*")))}')
if errors:
    print('AUDIT FAILED')
    for error in errors: print(' -', error)
    raise SystemExit(1)
print('AUDIT PASSED: no structural, link, metadata, accessibility-alt, or unfinished-content errors found.')
