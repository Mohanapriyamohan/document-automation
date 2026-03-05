// ═══ Department Requests Inbox ═══
export function renderDepartmentInbox() {
    const requests = [
        { field: 'Vessel Name', shipment: 'SH-2024-0847', from: 'Jane Doe', dept: 'Supply Chain', due: '2024-03-12', priority: 'High', status: 'Pending' },
        { field: 'ETD', shipment: 'SH-2024-0847', from: 'Jane Doe', dept: 'Supply Chain', due: '2024-03-12', priority: 'High', status: 'Pending' },
        { field: 'Container Number', shipment: 'SH-2024-0845', from: 'Mark Chen', dept: 'Warehouse', due: '2024-03-14', priority: 'Normal', status: 'Pending' },
        { field: 'Insurance Certificate No.', shipment: 'SH-2024-0843', from: 'Lisa Park', dept: 'Finance', due: '2024-03-10', priority: 'Urgent', status: 'Overdue' },
        { field: 'Net Weight (KG)', shipment: 'SH-2024-0840', from: 'Tom Harris', dept: 'Warehouse', due: '2024-03-15', priority: 'Normal', status: 'Completed' },
    ];

    const priClass = p => p === 'Urgent' ? 'danger' : p === 'High' ? 'pending' : 'draft';
    const statusClass = s => s === 'Overdue' ? 'rejected' : s === 'Completed' ? 'completed' : 'pending';

    return `
    <div class="animate-up">
      <div class="flex items-center justify-between mb-lg">
        <div>
          <h2 style="font-size:var(--fs-lg);font-weight:700;">Department Requests</h2>
          <p class="text-sm text-muted" style="margin-top:4px;">Respond to field value requests from documentation team</p>
        </div>
        <button class="btn btn-primary btn-sm">Bulk Respond</button>
      </div>

      <div class="flex gap-md mb-lg">
        <div class="tabs">
          <button class="tab active">All (5)</button>
          <button class="tab">Pending (3)</button>
          <button class="tab">Overdue (1)</button>
          <button class="tab">Completed (1)</button>
        </div>
      </div>

      ${requests.map((r, i) => `
        <div class="request-card" style="animation-delay:${i * 50}ms;">
          <div class="request-card-header">
            <span class="request-card-field">${r.field}</span>
            <span class="badge badge-${statusClass(r.status)}">${r.status}</span>
          </div>
          <div class="request-card-meta">
            <span>📦 ${r.shipment}</span>
            <span>👤 Requested by ${r.from}</span>
            <span>🏢 ${r.dept}</span>
            <span>📅 Due ${r.due}</span>
            <span class="badge badge-${priClass(r.priority)}" style="font-size:10px;">${r.priority}</span>
          </div>
          ${r.status !== 'Completed' ? `
          <div class="flex items-center gap-sm">
            <input class="field-edit-input" placeholder="Enter value for ${r.field}..." style="flex:1;" />
            <button class="btn btn-primary btn-sm">Submit</button>
            <button class="btn btn-ghost btn-sm">💬 Comment</button>
          </div>` : `
          <div class="flex items-center gap-sm text-sm" style="color:var(--success);">✓ Value submitted: 2,450 KG</div>`}
        </div>`).join('')}
    </div>`;
}
