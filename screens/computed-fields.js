// ═══ Computed Field Builder Screen ═══
export function renderComputedFields() {
    const fields = [
        { name: 'Grand Total', formula: '= Subtotal + Freight + Insurance', inputs: 'Subtotal, Freight, Insurance', status: 'Active' },
        { name: 'Net Weight Total', formula: '= SUM(LineItems.NetWeight)', inputs: 'Line Item Net Weight', status: 'Active' },
        { name: 'Gross Weight Total', formula: '= SUM(LineItems.GrossWeight)', inputs: 'Line Item Gross Weight', status: 'Active' },
        { name: 'Total CBM', formula: '= SUM(LineItems.Length × Width × Height / 1000000)', inputs: 'Dimensions', status: 'Active' },
        { name: 'FOB Value', formula: '= Grand Total - Freight - Insurance', inputs: 'Grand Total, Freight, Insurance', status: 'Inactive' },
        { name: 'Line Total', formula: '= Quantity × Unit Price', inputs: 'Quantity, Unit Price', status: 'Active' },
    ];
    return `
    <div class="animate-up">
      <div class="flex items-center justify-between mb-lg">
        <div>
          <h2 style="font-size:var(--fs-lg);font-weight:700;">Computed Field Builder</h2>
          <p class="text-sm text-muted" style="margin-top:4px;">Define calculated fields based on other document fields</p>
        </div>
        <button class="btn btn-primary">+ New Computed Field</button>
      </div>
      <div class="card">
        <table class="data-table">
          <thead><tr><th>Field Name</th><th>Formula</th><th>Input Fields</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            ${fields.map(f => `<tr>
              <td>${f.name}</td>
              <td><div class="formula-bar" style="font-size:12px;padding:5px 10px;">${f.formula}</div></td>
              <td class="text-sm">${f.inputs}</td>
              <td><div class="layout-toggle ${f.status === 'Active' ? 'on' : ''}" style="display:inline-block;"></div></td>
              <td><button class="btn btn-ghost btn-sm">Edit</button> <button class="btn btn-ghost btn-sm">Test</button></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>

      <div class="card" style="margin-top:20px;">
        <div class="card-header"><h3 class="card-title">Formula Builder</h3><span class="badge badge-primary">Design Mode</span></div>
        <div class="form-group">
          <label class="form-label">Field Name</label>
          <input class="form-input" placeholder="Enter computed field name..." />
        </div>
        <div class="form-group">
          <label class="form-label">Formula</label>
          <div class="formula-bar" style="min-height:48px;cursor:text;">= <span style="opacity:0.5;">Click to build formula...</span></div>
        </div>
        <div class="form-group">
          <label class="form-label">Available Fields</label>
          <div class="filter-chips">
            <button class="filter-chip">Subtotal</button>
            <button class="filter-chip">Freight</button>
            <button class="filter-chip">Insurance</button>
            <button class="filter-chip">Quantity</button>
            <button class="filter-chip">Unit Price</button>
            <button class="filter-chip">Net Weight</button>
            <button class="filter-chip">Gross Weight</button>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Operators</label>
          <div class="flex gap-sm">
            <button class="btn btn-ghost btn-sm">+</button>
            <button class="btn btn-ghost btn-sm">−</button>
            <button class="btn btn-ghost btn-sm">×</button>
            <button class="btn btn-ghost btn-sm">÷</button>
            <button class="btn btn-ghost btn-sm">SUM</button>
            <button class="btn btn-ghost btn-sm">AVG</button>
            <button class="btn btn-ghost btn-sm">ROUND</button>
          </div>
        </div>
        <div class="flex gap-sm" style="margin-top:12px;">
          <button class="btn btn-primary">Save Field</button>
          <button class="btn btn-accent">Preview Result</button>
        </div>
      </div>
    </div>`;
}
