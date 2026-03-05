// ═══ Approval Inbox Screen ═══
export function renderApprovalInbox() {
    const items = [
        { id: 'SH-2024-0846', customer: 'GlobalTech Inc', doc: 'Commercial Invoice', submitted: '2024-03-10', submitter: 'Jane Doe', status: 'Pending Approval' },
        { id: 'SH-2024-0846', customer: 'GlobalTech Inc', doc: 'Packing List', submitted: '2024-03-10', submitter: 'Jane Doe', status: 'Pending Approval' },
        { id: 'SH-2024-0843', customer: 'OmniLogistics', doc: 'Bill of Lading', submitted: '2024-03-09', submitter: 'Mark Chen', status: 'Pending Approval' },
    ];

    return `
    <div class="animate-up">
      <div class="flex items-center justify-between mb-lg">
        <div>
          <h2 style="font-size:var(--fs-lg);font-weight:700;">Approval Inbox</h2>
          <p class="text-sm text-muted" style="margin-top:4px;">Review and approve validated shipment documents</p>
        </div>
        <div class="flex gap-sm">
          <button class="btn btn-success btn-sm">✓ Approve All Selected</button>
          <button class="btn btn-danger btn-sm">✕ Reject Selected</button>
        </div>
      </div>

      <div class="stat-cards" style="grid-template-columns:repeat(3,1fr);">
        <div class="stat-card"><div class="stat-icon yellow">📝</div><div><div class="stat-value">3</div><div class="stat-label">Pending Review</div></div></div>
        <div class="stat-card"><div class="stat-icon green">✅</div><div><div class="stat-value">42</div><div class="stat-label">Approved This Week</div></div></div>
        <div class="stat-card"><div class="stat-icon red">↩️</div><div><div class="stat-value">2</div><div class="stat-label">Returned for Revisions</div></div></div>
      </div>

      ${items.map((item, i) => `
        <div class="approval-card" style="animation-delay:${i * 60}ms;">
          <div class="approval-doc-preview">
            <div style="text-align:center;">
              <div style="font-weight:700;font-size:9px;color:#334155;">COMPANY NAME</div>
              <div style="font-size:8px;color:#64748B;margin-top:2px;">${item.doc}</div>
              <div style="margin-top:8px;font-size:7px;color:#CBD5E1;">Preview</div>
            </div>
          </div>
          <div class="approval-card-body">
            <div class="approval-card-title">${item.doc}</div>
            <div class="approval-card-meta">
              <span>📦 ${item.id}</span>
              <span>🏢 ${item.customer}</span>
              <span>👤 ${item.submitter}</span>
              <span>📅 ${item.submitted}</span>
            </div>
            <div class="badge badge-validated mb-sm">Validated</div>
            <div style="margin-top:12px;">
              <input class="form-input" placeholder="Add approval comment..." style="font-size:12px;padding:7px 10px;margin-bottom:8px;" />
              <div class="approval-actions">
                <button class="btn btn-success btn-sm">✓ Approve</button>
                <button class="btn btn-danger btn-sm">✕ Reject</button>
                <button class="btn btn-ghost btn-sm">↩ Request Changes</button>
                <button class="btn btn-ghost btn-sm" data-action="open-workspace">👁 Preview Full Doc</button>
              </div>
            </div>
          </div>
        </div>`).join('')}

      <div class="card" style="margin-top:24px;">
        <div class="card-header"><h3 class="card-title">Recent Approval History</h3></div>
        <div class="timeline">
          <div class="timeline-item"><div class="timeline-time">Mar 10, 2024 – 14:32</div><div class="timeline-content"><span class="timeline-user">Jane Doe</span> approved Invoice for SH-2024-0841</div></div>
          <div class="timeline-item"><div class="timeline-time">Mar 09, 2024 – 11:15</div><div class="timeline-content"><span class="timeline-user">Mark Chen</span> rejected BOL for SH-2024-0839 – "Missing seal numbers"</div></div>
          <div class="timeline-item"><div class="timeline-time">Mar 08, 2024 – 09:45</div><div class="timeline-content"><span class="timeline-user">Lisa Park</span> approved Packing List for SH-2024-0838</div></div>
        </div>
      </div>
    </div>`;
}
