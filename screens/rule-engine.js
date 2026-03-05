// ═══ Rule Engine Builder Screen ═══
export function renderRuleEngine() {
    const rules = [
        { name: 'EU Customer Invoice', conditions: 'Customer Country IN (DE, FR, NL, BE) AND Doc Type = Invoice', action: 'Use Template: Invoice – EU Standard', priority: 1, status: 'Active' },
        { name: 'Australia Packing Decl', conditions: 'Destination Country = AU', action: 'Include: Packing Declaration – AU', priority: 2, status: 'Active' },
        { name: 'Japan Customs Invoice', conditions: 'Customer Country = JP AND Value > $10,000', action: 'Use Template: Invoice – Japan Customs', priority: 3, status: 'Active' },
        { name: 'FOB Freight Exclusion', conditions: 'Incoterm = FOB', action: 'Hide Field: Freight in Invoice', priority: 4, status: 'Active' },
        { name: 'Hazmat BOL Extra', conditions: 'Contains Hazmat Items = true', action: 'Include: Dangerous Goods Declaration', priority: 5, status: 'Inactive' },
    ];
    return `
    <div class="animate-up">
      <div class="flex items-center justify-between mb-lg">
        <div>
          <h2 style="font-size:var(--fs-lg);font-weight:700;">Rule Engine Builder</h2>
          <p class="text-sm text-muted" style="margin-top:4px;">Define document determination rules based on shipment attributes</p>
        </div>
        <button class="btn btn-primary">+ New Rule</button>
      </div>
      <div class="card mb-lg">
        <table class="data-table">
          <thead><tr><th>Priority</th><th>Rule Name</th><th>Conditions</th><th>Action</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            ${rules.map(r => `<tr>
              <td style="color:var(--text-muted);text-align:center;">#${r.priority}</td>
              <td>${r.name}</td>
              <td><span class="text-sm" style="color:var(--accent);">${r.conditions}</span></td>
              <td class="text-sm">${r.action}</td>
              <td><div class="layout-toggle ${r.status === 'Active' ? 'on' : ''}" style="display:inline-block;"></div></td>
              <td><button class="btn btn-ghost btn-sm">Edit</button> <button class="btn btn-ghost btn-sm">↕</button></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <!-- Rule Builder Panel -->
      <div class="card">
        <div class="card-header"><h3 class="card-title">Rule Builder</h3><span class="badge badge-primary">New Rule</span></div>
        <div class="form-group">
          <label class="form-label">Rule Name</label>
          <input class="form-input" placeholder="Enter rule name..." />
        </div>
        <div class="inspector-section-title" style="margin:16px 0 10px;">Conditions (IF)</div>
        <div class="rule-row">
          <span class="rule-keyword">IF</span>
          <select class="rule-select"><option>Customer Country</option><option>Destination Country</option><option>Incoterm</option><option>Shipment Type</option><option>Product Category</option></select>
          <select class="rule-select"><option>equals</option><option>in</option><option>not equals</option><option>contains</option></select>
          <input class="field-edit-input" style="flex:1;max-width:200px;" placeholder="Value..." />
          <button class="btn btn-ghost btn-sm">✕</button>
        </div>
        <div class="rule-row">
          <span class="rule-keyword">AND</span>
          <select class="rule-select"><option>Document Type</option><option>Customer Country</option><option>Incoterm</option><option>Value Range</option></select>
          <select class="rule-select"><option>equals</option><option>in</option><option>greater than</option></select>
          <input class="field-edit-input" style="flex:1;max-width:200px;" placeholder="Value..." />
          <button class="btn btn-ghost btn-sm">✕</button>
        </div>
        <button class="btn btn-ghost btn-sm" style="margin:8px 0;">+ Add Condition</button>
        <div class="inspector-section-title" style="margin:16px 0 10px;">Action (THEN)</div>
        <div class="rule-row">
          <span class="rule-keyword">THEN</span>
          <select class="rule-select"><option>Include Document</option><option>Use Template</option><option>Assign Department</option><option>Set Field Value</option><option>Hide Field</option></select>
          <input class="field-edit-input" style="flex:1;max-width:300px;" placeholder="Action target..." />
        </div>
        <div class="flex gap-sm" style="margin-top:16px;">
          <button class="btn btn-primary">Save Rule</button>
          <button class="btn btn-accent">Test Rule</button>
          <button class="btn btn-ghost">Cancel</button>
        </div>
      </div>
    </div>`;
}
