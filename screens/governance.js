// ═══ Governance Screen ═══
export function renderGovernance() {
    return `
    <div class="animate-up">
      <div class="flex items-center justify-between mb-lg">
        <div>
          <h2 style="font-size:var(--fs-lg);font-weight:700;">Governance</h2>
          <p class="text-sm text-muted" style="margin-top:4px;">Audit logs, version history, and role & permission management</p>
        </div>
      </div>

      <div class="flex gap-md mb-lg">
        <div class="tabs">
          <button class="tab active">Audit Timeline</button>
          <button class="tab">Version History</button>
          <button class="tab">Roles & Permissions</button>
        </div>
      </div>

      <!-- Audit Timeline -->
      <div class="card mb-lg">
        <div class="card-header"><h3 class="card-title">Audit Timeline</h3>
          <div class="flex gap-sm">
            <div class="search-bar" style="width:220px;"><span class="search-icon">🔍</span><input placeholder="Search events..." style="padding:7px 0;" /></div>
            <select class="form-select" style="width:140px;padding:7px 10px;">
              <option>All Events</option><option>Documents</option><option>Approvals</option><option>Templates</option><option>Rules</option>
            </select>
          </div>
        </div>
        <div class="timeline">
          <div class="timeline-item"><div class="timeline-time">Mar 10, 2024 – 15:42</div><div class="timeline-content"><span class="timeline-user">Jane Doe</span> submitted Invoice for approval — <span style="color:var(--accent);">SH-2024-0846</span></div></div>
          <div class="timeline-item" style="animation-delay:50ms;"><div class="timeline-time">Mar 10, 2024 – 14:18</div><div class="timeline-content"><span class="timeline-user">Mark Chen</span> updated field "Vessel Name" — <span style="color:var(--accent);">SH-2024-0847</span></div></div>
          <div class="timeline-item" style="animation-delay:100ms;"><div class="timeline-time">Mar 09, 2024 – 11:05</div><div class="timeline-content"><span class="timeline-user">Admin</span> published template "Invoice – Japan Customs" v2.0</div></div>
          <div class="timeline-item" style="animation-delay:150ms;"><div class="timeline-time">Mar 08, 2024 – 16:30</div><div class="timeline-content"><span class="timeline-user">Lisa Park</span> approved Packing List — <span style="color:var(--accent);">SH-2024-0838</span></div></div>
          <div class="timeline-item" style="animation-delay:200ms;"><div class="timeline-time">Mar 08, 2024 – 10:12</div><div class="timeline-content"><span class="timeline-user">Admin</span> created rule "FOB Freight Exclusion"</div></div>
          <div class="timeline-item" style="animation-delay:250ms;"><div class="timeline-time">Mar 07, 2024 – 09:00</div><div class="timeline-content"><span class="timeline-user">Tom Harris</span> requested value for "Container Number" — <span style="color:var(--accent);">SH-2024-0845</span></div></div>
        </div>
      </div>

      <!-- Version History -->
      <div class="card mb-lg">
        <div class="card-header"><h3 class="card-title">Version History</h3></div>
        <table class="data-table">
          <thead><tr><th>Entity</th><th>Version</th><th>Modified By</th><th>Date</th><th>Changes</th><th>Actions</th></tr></thead>
          <tbody>
            <tr><td>Invoice – Standard</td><td>v3.2</td><td>Jane Doe</td><td>2024-02-28</td><td class="text-sm">Added Freight field, updated totals block</td><td><button class="btn btn-ghost btn-sm">View</button> <button class="btn btn-ghost btn-sm">Restore</button></td></tr>
            <tr><td>Invoice – Standard</td><td>v3.1</td><td>Admin</td><td>2024-02-15</td><td class="text-sm">Updated consignee section layout</td><td><button class="btn btn-ghost btn-sm">View</button> <button class="btn btn-ghost btn-sm">Restore</button></td></tr>
            <tr><td>Packing List – EU</td><td>v2.1</td><td>Mark Chen</td><td>2024-02-25</td><td class="text-sm">Added weight conversion field</td><td><button class="btn btn-ghost btn-sm">View</button> <button class="btn btn-ghost btn-sm">Restore</button></td></tr>
            <tr><td>Rule: EU Customer</td><td>v2</td><td>Admin</td><td>2024-02-20</td><td class="text-sm">Added Belgium to country list</td><td><button class="btn btn-ghost btn-sm">View</button> <button class="btn btn-ghost btn-sm">Restore</button></td></tr>
          </tbody>
        </table>
      </div>

      <!-- Roles & Permissions -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Roles & Permissions</h3>
          <button class="btn btn-primary btn-sm">+ Add Role</button>
        </div>
        <table class="perm-matrix">
          <thead>
            <tr><th>Permission</th><th>Admin</th><th>Approver</th><th>Doc Specialist</th><th>Dept User</th><th>Viewer</th></tr>
          </thead>
          <tbody>
            <tr><td>View Shipments</td><td><span class="perm-check on">✓</span></td><td><span class="perm-check on">✓</span></td><td><span class="perm-check on">✓</span></td><td><span class="perm-check on">✓</span></td><td><span class="perm-check on">✓</span></td></tr>
            <tr><td>Edit Document Fields</td><td><span class="perm-check on">✓</span></td><td><span class="perm-check on">✓</span></td><td><span class="perm-check on">✓</span></td><td><span class="perm-check"></span></td><td><span class="perm-check"></span></td></tr>
            <tr><td>Edit Layout</td><td><span class="perm-check on">✓</span></td><td><span class="perm-check"></span></td><td><span class="perm-check on">✓</span></td><td><span class="perm-check"></span></td><td><span class="perm-check"></span></td></tr>
            <tr><td>Approve Documents</td><td><span class="perm-check on">✓</span></td><td><span class="perm-check on">✓</span></td><td><span class="perm-check"></span></td><td><span class="perm-check"></span></td><td><span class="perm-check"></span></td></tr>
            <tr><td>Manage Templates</td><td><span class="perm-check on">✓</span></td><td><span class="perm-check"></span></td><td><span class="perm-check"></span></td><td><span class="perm-check"></span></td><td><span class="perm-check"></span></td></tr>
            <tr><td>Manage Rules</td><td><span class="perm-check on">✓</span></td><td><span class="perm-check"></span></td><td><span class="perm-check"></span></td><td><span class="perm-check"></span></td><td><span class="perm-check"></span></td></tr>
            <tr><td>Manage Field Catalog</td><td><span class="perm-check on">✓</span></td><td><span class="perm-check"></span></td><td><span class="perm-check"></span></td><td><span class="perm-check"></span></td><td><span class="perm-check"></span></td></tr>
            <tr><td>Submit Dept Values</td><td><span class="perm-check on">✓</span></td><td><span class="perm-check"></span></td><td><span class="perm-check"></span></td><td><span class="perm-check on">✓</span></td><td><span class="perm-check"></span></td></tr>
            <tr><td>View Audit Logs</td><td><span class="perm-check on">✓</span></td><td><span class="perm-check on">✓</span></td><td><span class="perm-check on">✓</span></td><td><span class="perm-check"></span></td><td><span class="perm-check on">✓</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>`;
}
