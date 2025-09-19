/**
 * Case Study System
 * Loads project data and renders case study content
 */

const params = new URLSearchParams(location.search);
const slug = params.get('slug');

if (!slug) {
    location.replace('/#work');
}

function $(sel) { 
    return document.querySelector(sel); 
}

async function getData() {
    try {
        const res = await fetch('/projects.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('projects.json not found');
        return res.json();
    } catch (error) {
        console.error('Error loading projects:', error);
        throw error;
    }
}

async function loadCaseStudy() {
    try {
        const data = await getData();
        const proj = data.find(p => p.slug === slug);
        
        if (!proj) {
            throw new Error('Project not found');
        }

        // Update page title
        document.title = `${proj.title} — Case Study | Charlie`;

        // Fill in content
        $('#title').textContent = proj.title;
        $('#dek').textContent = proj.subtitle || '';
        $('#role').textContent = proj.role || 'Design & Frontend';
        $('#scope').textContent = (proj.tags || []).join(' • ');
        $('#timeline').textContent = proj.timeline || '4–8 weeks';

        // Build links
        const links = [];
        if (proj.live) links.push(`<a href="${proj.live}" target="_blank" rel="noopener">Live site</a>`);
        if (proj.repo) links.push(`<a href="${proj.repo}" target="_blank" rel="noopener">Code</a>`);
        $('#links').innerHTML = links.join(' • ') || '—';

        // Project overview
        $('#overview').textContent = proj.summary || '';

        // Process section
        if (proj.process && proj.process.length > 0) {
            $('#process').innerHTML = proj.process.map(p => `<p>${p}</p>`).join('');
        } else {
            $('#process').innerHTML = '<p>Process documentation coming soon.</p>';
        }

        // Gallery
        const gallery = $('#gallery');
        if (proj.gallery && proj.gallery.length > 0) {
            gallery.innerHTML = proj.gallery
                .map(src => `<figure class="cs-media"><img src="${src}" loading="lazy" decoding="async" alt="${proj.title} artifact" width="800" height="600"></figure>`)
                .join('');
        } else {
            gallery.innerHTML = '<p>Gallery images coming soon.</p>';
        }

        // Outcomes
        const outcomes = $('#outcomes');
        if (proj.outcomes && proj.outcomes.length > 0) {
            outcomes.innerHTML = proj.outcomes.map(o => `<li>${o}</li>`).join('');
        } else {
            outcomes.innerHTML = '<li>Outcomes documentation in progress.</li>';
        }

        // Update meta tags
        updateMetaTags(proj);

    } catch (error) {
        console.error('Error loading case study:', error);
        $('#title').textContent = 'Case Study Not Found';
        $('#dek').textContent = '';
        $('#overview').textContent = 'This case study is unavailable. Please check back later or return to the work section.';
        
        // Hide other sections
        const sections = ['#role', '#scope', '#timeline', '#links', '#process', '#gallery', '#outcomes'];
        sections.forEach(sel => {
            const el = document.querySelector(sel);
            if (el) el.style.display = 'none';
        });
    }
}

function updateMetaTags(proj) {
    // Update description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', `${proj.title} case study — ${proj.subtitle || proj.summary || 'Portfolio project by Charlie'}`);
    }

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.setAttribute('content', `${proj.title} — Case Study`);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.setAttribute('content', proj.summary || `Case study for ${proj.title}`);
    }

    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
        canonical.setAttribute('href', `https://everything-evu.pages.dev/case-study.html?slug=${slug}`);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadCaseStudy);
} else {
    loadCaseStudy();
}
