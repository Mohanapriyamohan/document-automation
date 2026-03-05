// ═══ Shipment List Screen ═══
export function renderShipmentList() {
    const shipments = [
        { id: 'SH-2024-0847', customer: 'Acme Industries', dest: 'Hamburg, DE', status: 'Pending Inputs', docs: '3/5', progress: 60 },
        { id: 'SH-2024-0846', customer: 'GlobalTech Inc', dest: 'Rotterdam, NL', status: 'Validated', docs: '5/5', progress: 100 },
        { id: 'SH-2024-0845', customer: 'NexGen Corp', dest: 'Shanghai, CN', status: 'Draft', docs: '1/4', progress: 25 },
        { id: 'SH-2024-0844', customer: 'StellarTrade LLC', dest: 'Tokyo, JP', status: 'Approved', docs: '6/6', progress: 100 },
        { id: 'SH-2024-0843', customer: 'OmniLogistics', dest: 'Singapore, SG', status: 'Pending Approval', docs: '4/4', progress: 90 },
        { id: 'SH-2024-0842', customer: 'PrimaCargo SA', dest: 'Santos, BR', status: 'Rejected', docs: '2/5', progress: 40 },
        { id: 'SH-2024-0841', customer: 'EuroShip GmbH', dest: 'Antwerp, BE', status: 'Completed', docs: '5/5', progress: 100 },
        { id: 'SH-2024-0840', customer: 'Pacific Exports', dest: 'Sydney, AU', status: 'Pending Inputs', docs: '2/6', progress: 33 },
    ];

    const badgeClass = s => {
        const m = { 'Draft': 'draft', 'Pending Inputs': 'pending', 'Validated': 'validated', 'Pending Approval': 'pending', 'Approved': 'approved', 'Completed': 'completed', 'Rejected': 'rejected' };
        return m[s] || 'draft';
    };

    return `
    <div class="animate-up">
      <div class="flex items-center justify-between mb-lg">
        <div>
          <h2 style="font-size:var(--fs-lg);font-weight:700;">Shipments</h2>
          <p class="text-sm text-muted" style="margin-top:4px;">Manage shipment documentation and workflows</p>
        </div>
        <button class="btn btn-primary btn-lg">+ New Shipment</button>
      </div>

      <div class="stat-cards">
        <div class="stat-card"><div class="stat-icon blue">📦</div><div><div class="stat-value">124</div><div class="stat-label">Total Shipments</div></div></div>
        <div class="stat-card"><div class="stat-icon yellow">⏳</div><div><div class="stat-value">18</div><div class="stat-label">Pending Inputs</div></div></div>
        <div class="stat-card"><div class="stat-icon green">✅</div><div><div class="stat-value">89</div><div class="stat-label">Approved</div></div></div>
        <div class="stat-card"><div class="stat-icon red">⚠️</div><div><div class="stat-value">7</div><div class="stat-label">Overdue</div></div></div>
      </div>

      <div class="card">
        <div class="flex items-center gap-md mb-md" style="flex-wrap:wrap;">
          <div class="search-bar" style="flex:1;min-width:220px;">
            <span class="search-icon">🔍</span>
            <input placeholder="Search shipments..." />
          </div>
          <div class="filter-chips">
            <button class="filter-chip active">All</button>
            <button class="filter-chip">Draft</button>
            <button class="filter-chip">Pending</button>
            <button class="filter-chip">Validated</button>
            <button class="filter-chip">Approved</button>
            <button class="filter-chip">Completed</button>
          </div>
        </div>

        <table class="data-table">
          <thead>
            <tr><th>Shipment ID</th><th>Customer</th><th>Destination</th><th>Status</th><th>Documents</th><th>Progress</th><th>Actions</th></tr>
          </thead>
          <tbody>
            ${shipments.map(s => `
              <tr>
                <td><a href="#" data-action="open-workspace" style="color:var(--primary-light);font-weight:600;">${s.id}</a></td>
                <td>${s.customer}</td>
                <td>${s.dest}</td>
                <td><span class="badge badge-dot badge-${badgeClass(s.status)}">${s.status}</span></td>
                <td>${s.docs}</td>
                <td style="min-width:100px;">
                  <div class="progress-bar"><div class="progress-fill" style="width:${s.progress}%"></div></div>
                  <span class="text-sm text-muted">${s.progress}%</span>
                </td>
                <td>
                  <button class="btn btn-ghost btn-sm" data-action="open-workspace">View</button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>

        <div class="pagination">
          <span>Showing 1–8 of 124 shipments</span>
          <div class="page-buttons">
            <button class="page-btn">‹</button>
            <button class="page-btn active">1</button>
            <button class="page-btn">2</button>
            <button class="page-btn">3</button>
            <button class="page-btn">…</button>
            <button class="page-btn">16</button>
            <button class="page-btn">›</button>
          </div>
        </div>
      </div>
    </div>`;
}
