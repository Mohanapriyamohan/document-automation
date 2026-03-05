// ═══ Field Catalog Screen ═══
export function renderFieldCatalog() {
    const fields = [
        { name: 'Shipment ID', type: 'Text', source: 'ERP', templates: 'Invoice, PL, BOL', dept: 'Documentation' },
        { name: 'Customer Name', type: 'Text', source: 'ERP', templates: 'Invoice, PL, BOL', dept: 'Sales' },
        { name: 'Incoterm', type: 'Dropdown', source: 'ERP', templates: 'Invoice, BOL', dept: 'Sales' },
        { name: 'Vessel Name', type: 'Text', source: 'Manual', templates: 'BOL', dept: 'Supply Chain' },
        { name: 'ETD', type: 'Date', source: 'Manual', templates: 'BOL, PL', dept: 'Supply Chain' },
        { name: 'Net Weight', type: 'Number', source: 'Manual', templates: 'PL, Packing Decl', dept: 'Warehouse' },
        { name: 'Grand Total', type: 'Currency', source: 'Computed', templates: 'Invoice', dept: 'Finance' },
        { name: 'Freight Amount', type: 'Currency', source: 'Manual', templates: 'Invoice', dept: 'Finance' },
        { name: 'HS Code', type: 'Text', source: 'ERP', templates: 'Invoice, BOI', dept: 'Documentation' },
        { name: 'Container Number', type: 'Text', source: 'Manual', templates: 'BOL, PL', dept: 'Warehouse' },
    ];
    const srcClass = s => s === 'ERP' ? 'erp' : s === 'Manual' ? 'manual' : 'computed';
    return `
    <div class="animate-up">
      <div class="flex items-center justify-between mb-lg">
        <div>
          <h2 style="font-size:var(--fs-lg);font-weight:700;">Field Catalog</h2>
          <p class="text-sm text-muted" style="margin-top:4px;">Master list of all document fields used by templates</p>
        </div>
        <button class="btn btn-primary">+ Add Field</button>
      </div>
      <div class="card">
        <div class="flex items-center gap-md mb-md">
          <div class="search-bar" style="flex:1;max-width:360px;">
            <span class="search-icon">🔍</span>
            <input placeholder="Search fields..." />
          </div>
          <div class="filter-chips">
            <button class="filter-chip active">All</button>
            <button class="filter-chip">ERP</button>
            <button class="filter-chip">Manual</button>
            <button class="filter-chip">Computed</button>
          </div>
        </div>
        <table class="data-table">
          <thead><tr><th>Field Name</th><th>Type</th><th>Source</th><th>Used In Templates</th><th>Department</th><th>Actions</th></tr></thead>
          <tbody>
            ${fields.map(f => `<tr>
              <td>${f.name}</td>
              <td><span class="badge badge-draft">${f.type}</span></td>
              <td><span class="field-source ${srcClass(f.source)}">${f.source}</span></td>
              <td class="text-sm">${f.templates}</td>
              <td class="text-sm">${f.dept}</td>
              <td><button class="btn btn-ghost btn-sm">Edit</button> <button class="btn btn-danger btn-sm">Delete</button></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
}
