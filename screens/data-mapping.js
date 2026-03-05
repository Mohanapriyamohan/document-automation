// ═══ Data Mapping Studio Screen ═══
export function renderDataMapping() {
    const mappings = [
        { docField: 'Shipment ID', erpField: 'SO.ShipmentNbr', type: '1:1', status: 'Mapped' },
        { docField: 'Customer Name', erpField: 'SO.Customer.Name', type: '1:1', status: 'Mapped' },
        { docField: 'Incoterm', erpField: 'SO.ShipTerms', type: '1:1', status: 'Mapped' },
        { docField: 'Port of Loading', erpField: 'SO.FOBPoint', type: '1:1', status: 'Mapped' },
        { docField: 'HS Code', erpField: 'IN.InventoryItem.HSTariffCode', type: '1:1', status: 'Mapped' },
        { docField: 'Item Description', erpField: 'IN.Item.Descr + IN.Item.ExtDescr', type: 'M:1', status: 'Mapped' },
        { docField: 'Customer PO Number', erpField: 'SO.CustomerOrder', type: '1:1', status: 'Mapped' },
        { docField: 'Vessel Name', erpField: '—', type: '—', status: 'Unmapped' },
        { docField: 'Freight Amount', erpField: '—', type: '—', status: 'Unmapped' },
    ];
    return `
    <div class="animate-up">
      <div class="flex items-center justify-between mb-lg">
        <div>
          <h2 style="font-size:var(--fs-lg);font-weight:700;">Data Mapping Studio</h2>
          <p class="text-sm text-muted" style="margin-top:4px;">Map document fields to ERP data sources (Acumatica)</p>
        </div>
        <div class="flex gap-sm">
          <button class="btn btn-primary">+ Add Mapping</button>
          <button class="btn btn-accent">⟳ Sync from ERP</button>
        </div>
      </div>
      <div class="stat-cards" style="grid-template-columns:repeat(3,1fr);">
        <div class="stat-card"><div class="stat-icon green">🔗</div><div><div class="stat-value">7</div><div class="stat-label">Mapped Fields</div></div></div>
        <div class="stat-card"><div class="stat-icon red">⚡</div><div><div class="stat-value">2</div><div class="stat-label">Unmapped Fields</div></div></div>
        <div class="stat-card"><div class="stat-icon cyan">📊</div><div><div class="stat-value">1</div><div class="stat-label">Multi-Source (M:1)</div></div></div>
      </div>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Field Mappings</h3>
          <div class="search-bar" style="width:260px;">
            <span class="search-icon">🔍</span>
            <input placeholder="Search mappings..." />
          </div>
        </div>
        ${mappings.map(m => `
          <div class="mapping-pair">
            <div class="mapping-field">${m.docField}</div>
            <span class="mapping-arrow">${m.status === 'Mapped' ? '⟷' : '⟶'}</span>
            <div class="mapping-field" style="${m.status === 'Unmapped' ? 'border-color:var(--danger);color:var(--danger);background:var(--danger-bg);' : ''}">${m.erpField}</div>
            ${m.type !== '—' ? `<span class="mapping-type">${m.type}</span>` : ''}
            <span class="badge badge-${m.status === 'Mapped' ? 'approved' : 'rejected'} badge-dot">${m.status}</span>
            <button class="btn btn-ghost btn-sm">Edit</button>
          </div>`).join('')}
      </div>
    </div>`;
}
