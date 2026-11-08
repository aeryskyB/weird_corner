const listEl = document.getElementById('blog-list');
const tagEl = document.getElementById('tag-filters');
let allPosts = [];

async function loadPosts() {
    try {
        const res = await fetch('./posts.json');
        allPosts = await res.json();
    } catch (e) {
        listEl.textContent = 'Could not load posts. Make sure you are serving this over HTTP (e.g. python -m http.server or Live Server).';
        return;
    }
    renderTags();
    renderPosts(allPosts);
}

function renderTags() {
    const tags = [...new Set(allPosts.flatMap(p => p.tags))].sort();
    tagEl.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.textContent = 'All';
    allBtn.className = 'tag active';
    allBtn.onclick = () => setActive(allBtn, null);
    tagEl.appendChild(allBtn);

    tags.forEach(tag => {
        const btn = document.createElement('button');
        btn.textContent = tag;
        btn.className = 'tag';
        btn.onclick = () => setActive(btn, tag);
        tagEl.appendChild(btn);
    });
}

function setActive(activeBtn, tag) {
    [...tagEl.querySelectorAll('.tag')].forEach(b => b.classList.remove('active'));
    activeBtn.classList.add('active');
    const filtered = tag ? allPosts.filter(p => p.tags.includes(tag)) : allPosts;
    renderPosts(filtered);
}

function renderPosts(posts) {
    listEl.innerHTML = '';
    if (posts.length === 0) {
        listEl.innerHTML = '<p style="color:#888888">No posts with this tag.</p>';
        return;
    }
    posts.forEach(p => {
        const el = document.createElement('div');
        el.className = 'post';
        el.innerHTML = `
            <p class="meta"> >> ${p.date} - <a href="${p.link}">${p.title}</a></p>
            ${p.excerpt ? `<p class="excerpt">~ ${p.excerpt}</p>` : ''}
            <div class="post-tags">${p.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}</div>
        `;
        listEl.appendChild(el);
    });
}

loadPosts();
