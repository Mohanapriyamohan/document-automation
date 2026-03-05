// ═══ Template Library Screen ═══
export function renderTemplateLibrary() {
    const templates = [
        { name: 'Commercial Invoice – Standard', type: 'Invoice', country: 'Global', version: 'v3.2', modified: '2024-02-28', status: 'Active' },
        { name: 'Packing List – EU', type: 'Packing List', country: 'EU', version: 'v2.1', modified: '2024-02-25', status: 'Active' },
        { name: 'Bill of Lading – Ocean', type: 'BOL', country: 'Global', version: 'v1.8', modified: '2024-03-01', status: 'Active' },
        { name: 'Packing Declaration – AU', type: 'Packing Decl', country: 'Australia', version: 'v1.3', modified: '2024-01-15', status: 'Active' },
        { name: 'Annual Packing Declaration', type: 'Annual Decl', country: 'Australia', version: 'v1.0', modified: '2024-01-10', status: 'Draft' },
        { name: 'Invoice – Japan Customs', type: 'Invoice', country: 'Japan', version: 'v2.0', modified: '2023-12-20', status: 'Active' },
        { name: 'Certificate of Origin – ASEAN', type: 'COO', country: 'ASEAN', version: 'v1.5', modified: '2024-02-10', status: 'Active' },
        { name: 'BOI Declaration – India', type: 'BOI', country: 'India', version: 'v1.1', modified: '2024-03-05', status: 'Draft' },
    ];
    return `
    <div class="animate-up">
      <div class="flex items-center justify-between mb-lg">
        <div>
          <h2 style="font-size:var(--fs-lg);font-weight:700;">Template Library</h2>
          <p class="text-sm text-muted" style="margin-top:4px;">Manage document templates and versions</p>
        </div>
        <div class="flex gap-sm">
          <button class="btn btn-primary">+ New Template</button>
          <button class="btn btn-ghost">📥 Import</button>
        </div>
      </div>
      <div class="flex items-center gap-md mb-lg">
        <div class="search-bar" style="flex:1;max-width:360px;">
          <span class="search-icon">🔍</span><input placeholder="Search templates..." />
        </div>
        <div class="filter-chips">
          <button class="filter-chip active">All</button>
          <button class="filter-chip">Active</button>
          <button class="filter-chip">Draft</button>
          <button class="filter-chip">Archived</button>
        </div>
      </div>
      <div class="template-grid">
        ${templates.map((t, i) => `
          <div class="template-card" style="animation-delay:${i * 40}ms;">
            <div class="template-card-header">
              <div class="template-card-icon">📄</div>
              <span class="badge badge-${t.status === 'Active' ? 'approved' : 'draft'}">${t.status}</span>
            </div>
            <div class="template-card-name">${t.name}</div>
            <div class="template-card-meta">
              <span>📋 ${t.type}</span>
              <span>🌍 ${t.country}</span>
              <span>${t.version}</span>
            </div>
            <div style="margin-top:10px;font-size:var(--fs-xs);color:var(--text-muted);">Modified: ${t.modified}</div>
            <div class="flex gap-sm" style="margin-top:12px;">
              <button class="btn btn-ghost btn-sm">Edit</button>
              <button class="btn btn-ghost btn-sm">Clone</button>
              <button class="btn btn-ghost btn-sm">History</button>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
}
