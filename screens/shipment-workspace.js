// ═══ Shipment Workspace Screen ═══
export function renderShipmentWorkspace() {
  return `
    <div class="animate-up" style="display:flex;flex-direction:column;height:calc(100vh - var(--topbar-h) - 48px);">
      <!-- Header -->
      <div class="flex items-center justify-between mb-md">
        <div class="flex items-center gap-md">
          <button class="btn btn-ghost btn-sm" data-action="back-to-list">← Back</button>
          <div>
            <h2 style="font-size:var(--fs-lg);font-weight:700;">SH-2024-0847</h2>
            <p class="text-sm text-muted">Acme Industries • Hamburg, DE • FOB</p>
          </div>
          <span class="badge badge-dot badge-pending">Pending Inputs</span>
        </div>
        <div class="workspace-actions" style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm">⬇ Download All</button>
          <button class="btn btn-ghost btn-sm">🖨 Print</button>
        </div>
      </div>

      <!-- Scrollable body -->
      <div style="flex:1;overflow-y:auto;min-height:0;">
        <!-- Required Documents Panel -->
        <div class="card mb-lg" id="requiredDocsPanel">
          <div class="card-header">
            <h3 class="card-title">Required Documents</h3>
            <span class="text-sm text-muted">5 documents • 2 need attention</span>
          </div>

          <!-- Status Filters -->
          <div class="filter-chips mb-md">
            <button class="filter-chip active" data-doc-filter="all">All</button>
            <button class="filter-chip" data-doc-filter="draft">Draft</button>
            <button class="filter-chip" data-doc-filter="pending-inputs">Pending Inputs</button>
            <button class="filter-chip" data-doc-filter="validated">Validated</button>
            <button class="filter-chip" data-doc-filter="pending-approval">Pending Approval</button>
            <button class="filter-chip" data-doc-filter="approved">Approved</button>
            <button class="filter-chip" data-doc-filter="rejected">Rejected</button>
          </div>

          <!-- Document Cards -->
          <div class="req-doc-list" id="reqDocList">
            ${renderDocCard('Commercial Invoice', 'Pending Inputs', 3, 'invoice', false)}
            ${renderDocCard('Packing List', 'Draft', 1, 'packing', false)}
            ${renderDocCard('Bill of Lading', 'Validated', 0, 'bol', false)}
            ${renderDocCard('Packing Declaration', 'Pending Approval', 0, 'packdecl', false)}
            ${renderDocCard('Annual Packing Declaration', 'Draft', 2, 'annualdecl', false)}
          </div>
        </div>
      </div>
    </div>`;
}

function renderDocCard(name, status, missing, id, selected) {
  const badgeMap = {
    'Draft': 'draft',
    'Pending Inputs': 'pending',
    'Validated': 'validated',
    'Pending Approval': 'badge-pending-approval',
    'Approved': 'approved',
    'Rejected': 'rejected',
    'Completed': 'completed'
  };
  const badgeClass = badgeMap[status] || 'draft';
  const filterKey = status.toLowerCase().replace(/\s+/g, '-');
  const needsAttention = missing > 0;

  return `
    <div class="req-doc-card ${selected ? 'selected' : ''}" data-doc-id="${id}" data-doc-status="${filterKey}">
      <div class="req-doc-card-left">
        <div class="req-doc-icon">📄</div>
        <div class="req-doc-info">
          <div class="req-doc-name">${name}</div>
          <div class="req-doc-meta">
            <span class="badge badge-dot badge-${badgeClass}">${status}</span>
            ${missing > 0 ? `<span class="req-doc-missing">⚠ ${missing} missing field${missing > 1 ? 's' : ''}</span>` : `<span class="req-doc-complete">✓ All fields complete</span>`}
          </div>
        </div>
      </div>
      <button class="btn ${needsAttention ? 'btn-primary' : 'btn-ghost'} btn-sm" data-view-doc="${id}">View Document</button>
    </div>`;
}

// ═══ PREVIEW MODE CANVAS (unchanged – clean printable document) ═══
function renderDocCanvas() {
  return `
    <div class="doc-canvas">
      <div class="doc-header-block">
        <div class="co-name">Company Name Placeholder</div>
        <div class="doc-type">Commercial Invoice</div>
      </div>
      <div class="section-grid">
        <div class="doc-section">
          <div class="doc-section-title">Shipper Details</div>
          <div class="doc-field-row"><span class="doc-field-label">Company Name</span><span class="doc-field-value">Placeholder Company Ltd.</span></div>
          <div class="doc-field-row"><span class="doc-field-label">Address</span><span class="doc-field-value">123 Export Street, City</span></div>
          <div class="doc-field-row"><span class="doc-field-label">Tax ID</span><span class="doc-field-value">XX-XXXXXXXX</span></div>
        </div>
        <div class="doc-section">
          <div class="doc-section-title">Consignee Details</div>
          <div class="doc-field-row"><span class="doc-field-label">Customer Name</span><span class="doc-field-value">Acme Industries GmbH</span></div>
          <div class="doc-field-row"><span class="doc-field-label">Address</span><span class="doc-field-value">Hamburg, Germany</span></div>
          <div class="doc-field-row"><span class="doc-field-label">Contact</span><span class="doc-field-value field-missing-optional"><span class="field-missing-label">⚠ Optional – Contact Person</span></span></div>
        </div>
      </div>
      <div class="doc-section">
        <div class="doc-section-title">Shipment Information</div>
        <div class="section-grid">
          <div class="doc-field-row"><span class="doc-field-label">Shipment ID</span><span class="doc-field-value">SH-2024-0847</span></div>
          <div class="doc-field-row"><span class="doc-field-label">Incoterm</span><span class="doc-field-value">FOB</span></div>
          <div class="doc-field-row"><span class="doc-field-label">Port of Loading</span><span class="doc-field-value">Chennai, IN</span></div>
          <div class="doc-field-row"><span class="doc-field-label">Port of Discharge</span><span class="doc-field-value">Hamburg, DE</span></div>
          <div class="doc-field-row"><span class="doc-field-label">Vessel Name</span><span class="doc-field-value field-missing-required"><span class="field-missing-label">⛔ Required – Vessel Name</span></span></div>
          <div class="doc-field-row"><span class="doc-field-label">ETD</span><span class="doc-field-value field-missing-required"><span class="field-missing-label">⛔ Required – Estimated Departure</span></span></div>
        </div>
      </div>
      <div class="doc-section">
        <div class="doc-section-title">Line Items</div>
        <table class="doc-table">
          <thead><tr><th>#</th><th>Description</th><th>HS Code</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Product A – Industrial Component</td><td>8481.80</td><td>500</td><td>$24.00</td><td>$12,000.00</td></tr>
            <tr><td>2</td><td>Product B – Assembly Part</td><td>7318.15</td><td>1,200</td><td>$8.50</td><td>$10,200.00</td></tr>
            <tr><td>3</td><td>Product C – Packaging Material</td><td>3923.10</td><td>200</td><td>$15.00</td><td>$3,000.00</td></tr>
          </tbody>
        </table>
      </div>
      <div class="doc-section">
        <div class="doc-section-title">Totals</div>
        <div class="doc-field-row"><span class="doc-field-label">Subtotal</span><span class="doc-field-value">$25,200.00</span></div>
        <div class="doc-field-row"><span class="doc-field-label">Freight</span><span class="doc-field-value field-missing-required"><span class="field-missing-label">⛔ Required – Freight Amount</span></span></div>
        <div class="doc-field-row" style="font-weight:700;font-size:14px;border-bottom:2px solid #334155;"><span class="doc-field-label">Grand Total</span><span class="doc-field-value">Pending</span></div>
      </div>
      <div style="margin-top:32px;padding-top:16px;border-top:1px solid #E2E8F0;font-size:11px;color:#94A3B8;text-align:center;">
        This is a system-generated document preview. Final version will be produced upon approval.
      </div>
    </div>`;
}

// ═══ EDIT FIELDS MODE CANVAS ═══
function renderEditFieldsCanvas() {
  return `
    <div class="doc-canvas edit-fields-canvas ef-canvas">
      <div class="doc-header-block">
        <div class="co-name">
          <span class="ef-editable" data-field="company_name">Company Name Placeholder</span>
        </div>
        <div class="doc-type">
          <span class="ef-editable" data-field="doc_type">Commercial Invoice</span>
        </div>
      </div>

      <div class="section-grid">
        <!-- Shipper Details -->
        <div class="doc-section">
          <div class="doc-section-title">Shipper Details</div>
          <div class="doc-field-row">
            <span class="doc-field-label">Company Name</span>
            <span class="doc-field-value"><span class="ef-editable" data-field="shipper_company">Placeholder Company Ltd.</span></span>
          </div>
          <div class="doc-field-row">
            <span class="doc-field-label">Address</span>
            <span class="doc-field-value"><span class="ef-editable" data-field="shipper_address">123 Export Street, City</span></span>
          </div>
          <div class="doc-field-row">
            <span class="doc-field-label">Tax ID</span>
            <span class="doc-field-value"><span class="ef-editable" data-field="shipper_taxid">XX-XXXXXXXX</span></span>
          </div>
        </div>

        <!-- Consignee Details -->
        <div class="doc-section">
          <div class="doc-section-title">Consignee Details</div>
          <div class="doc-field-row">
            <span class="doc-field-label">Customer Name</span>
            <span class="doc-field-value"><span class="ef-editable" data-field="consignee_name">Acme Industries GmbH</span></span>
          </div>
          <div class="doc-field-row">
            <span class="doc-field-label">Address</span>
            <span class="doc-field-value"><span class="ef-editable" data-field="consignee_address">Hamburg, Germany</span></span>
          </div>
          <div class="doc-field-row">
            <span class="doc-field-label">Contact</span>
            <span class="doc-field-value field-missing-optional ef-missing" data-field-name="Contact Person" data-missing-type="optional">
              <span class="field-missing-label">⚠ Optional – Contact Person</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Shipment Information -->
      <div class="doc-section">
        <div class="doc-section-title">Shipment Information</div>
        <div class="section-grid">
          <div class="doc-field-row">
            <span class="doc-field-label">Shipment ID</span>
            <span class="doc-field-value"><span class="ef-editable" data-field="shipment_id">SH-2024-0847</span></span>
          </div>
          <div class="doc-field-row">
            <span class="doc-field-label">Incoterm</span>
            <span class="doc-field-value"><span class="ef-editable" data-field="incoterm">FOB</span></span>
          </div>
          <div class="doc-field-row">
            <span class="doc-field-label">Port of Loading</span>
            <span class="doc-field-value"><span class="ef-editable" data-field="port_loading">Chennai, IN</span></span>
          </div>
          <div class="doc-field-row">
            <span class="doc-field-label">Port of Discharge</span>
            <span class="doc-field-value"><span class="ef-editable" data-field="port_discharge">Hamburg, DE</span></span>
          </div>
          <div class="doc-field-row">
            <span class="doc-field-label">Vessel Name</span>
            <span class="doc-field-value field-missing-required ef-missing" data-field-name="Vessel Name" data-missing-type="required">
              <span class="field-missing-label">⛔ Required – Vessel Name</span>
            </span>
          </div>
          <div class="doc-field-row">
            <span class="doc-field-label">ETD</span>
            <span class="doc-field-value field-missing-required ef-missing" data-field-name="Estimated Departure" data-missing-type="required">
              <span class="field-missing-label">⛔ Required – Estimated Departure</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Line Items -->
      <div class="doc-section">
        <div class="doc-section-title">Line Items</div>
        <table class="doc-table">
          <thead><tr><th>#</th><th>Description</th><th>HS Code</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><span class="ef-editable" data-field="item1_desc">Product A – Industrial Component</span></td>
              <td><span class="ef-editable" data-field="item1_hs">8481.80</span></td>
              <td><span class="ef-editable" data-field="item1_qty">500</span></td>
              <td><span class="ef-editable" data-field="item1_price">$24.00</span></td>
              <td><span class="ef-editable" data-field="item1_total">$12,000.00</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td><span class="ef-editable" data-field="item2_desc">Product B – Assembly Part</span></td>
              <td><span class="ef-editable" data-field="item2_hs">7318.15</span></td>
              <td><span class="ef-editable" data-field="item2_qty">1,200</span></td>
              <td><span class="ef-editable" data-field="item2_price">$8.50</span></td>
              <td><span class="ef-editable" data-field="item2_total">$10,200.00</span></td>
            </tr>
            <tr>
              <td>3</td>
              <td><span class="ef-editable" data-field="item3_desc">Product C – Packaging Material</span></td>
              <td><span class="ef-editable" data-field="item3_hs">3923.10</span></td>
              <td><span class="ef-editable" data-field="item3_qty">200</span></td>
              <td><span class="ef-editable" data-field="item3_price">$15.00</span></td>
              <td><span class="ef-editable" data-field="item3_total">$3,000.00</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Totals -->
      <div class="doc-section">
        <div class="doc-section-title">Totals</div>
        <div class="doc-field-row">
          <span class="doc-field-label">Subtotal</span>
          <span class="doc-field-value"><span class="ef-editable" data-field="subtotal">$25,200.00</span></span>
        </div>
        <div class="doc-field-row">
          <span class="doc-field-label">Freight</span>
          <span class="doc-field-value field-missing-required ef-missing" data-field-name="Freight Amount" data-missing-type="required">
            <span class="field-missing-label">⛔ Required – Freight Amount</span>
          </span>
        </div>
        <div class="doc-field-row" style="font-weight:700;font-size:14px;border-bottom:2px solid #334155;">
          <span class="doc-field-label">Grand Total</span>
          <span class="doc-field-value"><span class="ef-editable computed-field" data-field="grand_total" title="Computed: Subtotal + Freight">Pending</span></span>
        </div>
      </div>

      <div style="margin-top:32px;padding-top:16px;border-top:1px solid #E2E8F0;font-size:11px;color:#94A3B8;text-align:center;">
        ✏️ Click any field value to edit inline. Click missing fields for actions.
      </div>

      <!-- Field Action Popover (hidden, positioned via JS) -->
      <div class="ef-popover" id="efPopover" style="display:none;">
        <div class="ef-popover-arrow"></div>
        <button class="ef-popover-action" data-popover-action="enter"><span>✏️</span> Enter Value</button>
        <button class="ef-popover-action" data-popover-action="request"><span>📨</span> Request from Department</button>
        <button class="ef-popover-action" data-popover-action="comment"><span>💬</span> Add Comment</button>
      </div>
    </div>`;
}

// ═══ FIELD EDITOR PANEL ═══
function renderFieldEditorPanel() {
  return `
    <div class="inspector-panel" style="display:flex;flex-direction:column;height:100%;">
      <div class="inspector-header" style="padding:16px;border-bottom:1px solid var(--border);background:white;">
        <h3 style="font-size:var(--fs-md);font-weight:600;margin:0;">Field Editor</h3>
        <p class="text-sm text-muted" style="margin:4px 0 0 0;">Edit document fields securely</p>
      </div>
      <div class="inspector-body" style="flex:1;overflow-y:auto;padding:16px;background:var(--bg-secondary);">
        
        <!-- Shipper Details -->
        <div class="field-editor-section mb-lg">
          <div class="section-title text-sm font-semibold mb-sm" style="color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.5px;">Shipper Details</div>
          
          <div class="field-editor-row mb-md" data-panel-field="shipper_company">
            <div class="flex items-center justify-between mb-xs">
              <label class="form-label mb-0" style="font-size:12px;">Company Name</label>
              <span class="badge badge-dot badge-validated" style="font-size:10px;">ERP</span>
            </div>
            <input type="text" class="form-input form-input-sm" value="Placeholder Company Ltd." data-sync-field="shipper_company" />
          </div>
          
          <div class="field-editor-row mb-md" data-panel-field="shipper_address">
            <div class="flex items-center justify-between mb-xs">
              <label class="form-label mb-0" style="font-size:12px;">Address</label>
              <span class="badge badge-dot badge-validated" style="font-size:10px;">ERP</span>
            </div>
            <input type="text" class="form-input form-input-sm" value="123 Export Street, City" data-sync-field="shipper_address" />
          </div>

          <div class="field-editor-row mb-md" data-panel-field="shipper_taxid">
            <div class="flex items-center justify-between mb-xs">
              <label class="form-label mb-0" style="font-size:12px;">Tax ID</label>
              <span class="badge badge-dot badge-validated" style="font-size:10px;">ERP</span>
            </div>
            <input type="text" class="form-input form-input-sm" value="XX-XXXXXXXX" data-sync-field="shipper_taxid" />
          </div>
        </div>

        <!-- Consignee Details -->
        <div class="field-editor-section mb-lg">
          <div class="section-title text-sm font-semibold mb-sm" style="color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.5px;">Consignee Details</div>
          
          <div class="field-editor-row mb-md" data-panel-field="consignee_name">
            <div class="flex items-center justify-between mb-xs">
              <label class="form-label mb-0" style="font-size:12px;">Customer Name</label>
              <span class="badge badge-dot badge-validated" style="font-size:10px;">ERP</span>
            </div>
            <input type="text" class="form-input form-input-sm" value="Acme Industries GmbH" data-sync-field="consignee_name" />
          </div>
          
          <div class="field-editor-row mb-md" data-panel-field="consignee_address">
            <div class="flex items-center justify-between mb-xs">
              <label class="form-label mb-0" style="font-size:12px;">Address</label>
              <span class="badge badge-dot badge-validated" style="font-size:10px;">ERP</span>
            </div>
            <input type="text" class="form-input form-input-sm" value="Hamburg, Germany" data-sync-field="consignee_address" />
          </div>

          <div class="field-editor-row mb-md" data-panel-field="consignee_contact">
            <div class="flex items-center justify-between mb-xs">
              <label class="form-label mb-0" style="font-size:12px;">Contact <span class="text-muted">(Optional)</span></label>
              <span class="badge badge-dot badge-draft" style="font-size:10px;">MANUAL</span>
            </div>
            <div class="flex items-center gap-xs">
              <input type="text" class="form-input form-input-sm" placeholder="Enter Contact Person" data-sync-field="consignee_contact" />
              <button class="btn btn-ghost btn-sm" title="Request from Department" data-request-field="Contact Person" style="padding:0 8px;">📨</button>
            </div>
          </div>
        </div>

        <!-- Shipment Information -->
        <div class="field-editor-section mb-lg">
          <div class="section-title text-sm font-semibold mb-sm" style="color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.5px;">Shipment Information</div>
          
          <div class="field-editor-row mb-md" data-panel-field="shipment_id">
            <div class="flex items-center justify-between mb-xs">
              <label class="form-label mb-0" style="font-size:12px;">Shipment ID</label>
              <span class="badge badge-dot badge-validated" style="font-size:10px;">ERP</span>
            </div>
            <input type="text" class="form-input form-input-sm" value="SH-2024-0847" data-sync-field="shipment_id" />
          </div>

          <div class="field-editor-row mb-md" data-panel-field="incoterm">
            <div class="flex items-center justify-between mb-xs">
              <label class="form-label mb-0" style="font-size:12px;">Incoterm</label>
              <span class="badge badge-dot badge-validated" style="font-size:10px;">ERP</span>
            </div>
            <input type="text" class="form-input form-input-sm" value="FOB" data-sync-field="incoterm" />
          </div>

          <div class="field-editor-row mb-md" data-panel-field="port_loading">
            <div class="flex items-center justify-between mb-xs">
              <label class="form-label mb-0" style="font-size:12px;">Port of Loading</label>
              <span class="badge badge-dot badge-validated" style="font-size:10px;">ERP</span>
            </div>
            <input type="text" class="form-input form-input-sm" value="Chennai, IN" data-sync-field="port_loading" />
          </div>

          <div class="field-editor-row mb-md" data-panel-field="port_discharge">
            <div class="flex items-center justify-between mb-xs">
              <label class="form-label mb-0" style="font-size:12px;">Port of Discharge</label>
              <span class="badge badge-dot badge-validated" style="font-size:10px;">ERP</span>
            </div>
            <input type="text" class="form-input form-input-sm" value="Hamburg, DE" data-sync-field="port_discharge" />
          </div>
          
          <div class="field-editor-row mb-md" data-panel-field="vessel_name">
            <div class="flex items-center justify-between mb-xs">
              <label class="form-label mb-0" style="font-size:12px;color:var(--danger);">Vessel Name *</label>
              <span class="badge badge-dot badge-pending" style="font-size:10px;">MANUAL</span>
            </div>
            <div class="flex items-center gap-xs">
              <input type="text" class="form-input form-input-sm" placeholder="Required" data-sync-field="vessel_name" style="border-color:var(--danger);" />
              <button class="btn btn-ghost btn-sm" title="Request from Department" data-request-field="Vessel Name" style="padding:0 8px;">📨</button>
            </div>
          </div>
          
          <div class="field-editor-row mb-md" data-panel-field="etd">
            <div class="flex items-center justify-between mb-xs">
              <label class="form-label mb-0" style="font-size:12px;color:var(--danger);">Estimated Departure *</label>
              <span class="badge badge-dot badge-pending" style="font-size:10px;">MANUAL</span>
            </div>
            <div class="flex items-center gap-xs">
              <input type="date" class="form-input form-input-sm" data-sync-field="etd" style="border-color:var(--danger);" />
              <button class="btn btn-ghost btn-sm" title="Request from Department" data-request-field="Estimated Departure" style="padding:0 8px;">📨</button>
            </div>
          </div>
        </div>
        
        <!-- Totals -->
        <div class="field-editor-section mb-lg">
          <div class="section-title text-sm font-semibold mb-sm" style="color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.5px;">Totals</div>
          
          <div class="field-editor-row mb-md" data-panel-field="subtotal">
            <div class="flex items-center justify-between mb-xs">
              <label class="form-label mb-0" style="font-size:12px;">Subtotal</label>
              <span class="badge badge-dot badge-pending" style="font-size:10px;">COMPUTED</span>
            </div>
            <input type="text" class="form-input form-input-sm" value="$25,200.00" data-sync-field="subtotal" readonly style="background:transparent;border-color:transparent;padding-left:0;font-weight:600;" />
          </div>

          <div class="field-editor-row mb-md" data-panel-field="freight">
            <div class="flex items-center justify-between mb-xs">
              <label class="form-label mb-0" style="font-size:12px;color:var(--danger);">Freight Amount *</label>
              <span class="badge badge-dot badge-pending" style="font-size:10px;">MANUAL</span>
            </div>
            <div class="flex items-center gap-xs">
              <input type="number" class="form-input form-input-sm" placeholder="Required" data-sync-field="freight" style="border-color:var(--danger);" />
              <button class="btn btn-ghost btn-sm" title="Request from Department" data-request-field="Freight Amount" style="padding:0 8px;">📨</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

// ═══ EDIT LAYOUT MODE CANVAS ═══
function renderEditLayoutCanvas() {
  const sections = [
    { id: 'header', name: 'Header', mandatory: false, type: 'header' },
    { id: 'shipper', name: 'Shipper Details', mandatory: false, type: 'kv' },
    { id: 'consignee', name: 'Consignee Details', mandatory: false, type: 'kv' },
    { id: 'shipment-info', name: 'Shipment Information', mandatory: false, type: 'kv' },
    { id: 'line-items', name: 'Line Items', mandatory: true, type: 'table' },
    { id: 'totals', name: 'Totals', mandatory: true, type: 'kv' },
    { id: 'declarations', name: 'Declarations & Certifications', mandatory: false, type: 'text' },
    { id: 'signatures', name: 'Signatures', mandatory: false, type: 'text' },
  ];

  return `
    <div class="doc-canvas edit-layout-canvas" id="editLayoutCanvas">
      ${sections.map((sec, i) => renderLayoutSection(sec, i)).join('')}
      <div class="layout-drop-zone" data-drop-index="${sections.length}"></div>
      <button class="add-section-btn" id="addSectionBtn" data-action="add-section">
        <span class="add-section-icon">+</span> Add Section
      </button>
    </div>`;
}

function renderLayoutSection(sec, index) {
  const mandatoryAttr = sec.mandatory ? 'data-mandatory="true"' : '';
  const mandatoryClass = sec.mandatory ? 'mandatory-section' : '';

  let content = '';
  switch (sec.id) {
    case 'header':
      content = `
        <div class="doc-header-block">
          <div class="co-name">Company Name Placeholder</div>
          <div class="doc-type">Commercial Invoice</div>
        </div>`;
      break;
    case 'shipper':
      content = `
        <div class="layout-kv-group">
          ${renderLayoutKVRow('Company Name', 'Placeholder Company Ltd.', 'shipper_company')}
          ${renderLayoutKVRow('Address', '123 Export Street, City', 'shipper_address')}
          ${renderLayoutKVRow('Tax ID', 'XX-XXXXXXXX', 'shipper_taxid')}
        </div>`;
      break;
    case 'consignee':
      content = `
        <div class="layout-kv-group">
          ${renderLayoutKVRow('Customer Name', 'Acme Industries GmbH', 'consignee_name')}
          ${renderLayoutKVRow('Address', 'Hamburg, Germany', 'consignee_address')}
          ${renderLayoutKVRow('Contact', '⚠ Optional – Contact Person', 'consignee_contact', true)}
        </div>`;
      break;
    case 'shipment-info':
      content = `
        <div class="layout-kv-group">
          ${renderLayoutKVRow('Shipment ID', 'SH-2024-0847', 'shipment_id')}
          ${renderLayoutKVRow('Incoterm', 'FOB', 'incoterm')}
          ${renderLayoutKVRow('Port of Loading', 'Chennai, IN', 'port_loading')}
          ${renderLayoutKVRow('Port of Discharge', 'Hamburg, DE', 'port_discharge')}
          ${renderLayoutKVRow('Vessel Name', '⛔ Required', 'vessel_name', true)}
          ${renderLayoutKVRow('ETD', '⛔ Required', 'etd', true)}
        </div>`;
      break;
    case 'line-items':
      content = `
        <table class="doc-table">
          <thead><tr><th>#</th><th>Description</th><th>HS Code</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Product A – Industrial Component</td><td>8481.80</td><td>500</td><td>$24.00</td><td>$12,000.00</td></tr>
            <tr><td>2</td><td>Product B – Assembly Part</td><td>7318.15</td><td>1,200</td><td>$8.50</td><td>$10,200.00</td></tr>
            <tr><td>3</td><td>Product C – Packaging Material</td><td>3923.10</td><td>200</td><td>$15.00</td><td>$3,000.00</td></tr>
          </tbody>
        </table>`;
      break;
    case 'totals':
      content = `
        <div class="layout-kv-group">
          ${renderLayoutKVRow('Subtotal', '$25,200.00', 'subtotal')}
          ${renderLayoutKVRow('Freight', '⛔ Required', 'freight', true)}
          ${renderLayoutKVRow('Grand Total', 'Pending', 'grand_total')}
        </div>`;
      break;
    case 'declarations':
      content = `<div class="layout-text-block">We hereby declare that the information contained herein is true and correct to the best of our knowledge.</div>`;
      break;
    case 'signatures':
      content = `
        <div class="layout-signature-block">
          <div class="sig-line">Authorized Signatory</div>
          <div class="sig-line">Date: _______________</div>
        </div>`;
      break;
  }

  return `
    <div class="layout-drop-zone" data-drop-index="${index}"></div>
    <div class="layout-section-wrapper ${mandatoryClass}" data-section-id="${sec.id}" data-section-index="${index}" ${mandatoryAttr} draggable="true">
      <div class="layout-section-toolbar">
        <span class="layout-drag-handle" title="Drag to reorder">⠿</span>
        <span class="layout-section-label">${sec.name}</span>
        ${sec.mandatory ? '<span class="layout-mandatory-badge" title="Mandatory compliance section – cannot be removed">🔒 Required</span>' : ''}
        <div class="layout-section-actions">
          <button class="layout-action-btn" data-section-action="settings" data-section-target="${sec.id}" title="Section Settings">⚙</button>
          <button class="layout-action-btn" data-section-action="duplicate" data-section-target="${sec.id}" title="Duplicate Section">📋</button>
          <button class="layout-action-btn ${sec.mandatory ? 'disabled-action' : 'danger-action'}" data-section-action="remove" data-section-target="${sec.id}" ${sec.mandatory ? 'disabled title="Cannot remove mandatory compliance section"' : 'title="Remove Section"'}>🗑</button>
        </div>
      </div>
      <div class="layout-section-content">
        ${content}
      </div>
    </div>`;
}

function renderLayoutKVRow(label, value, key, isMissing = false) {
  return `
    <div class="layout-kv-row" data-field-key="${key}">
      <div class="layout-kv-row-actions">
        <span class="kv-drag-handle" title="Reorder">⠿</span>
      </div>
      <span class="doc-field-label">${label}</span>
      <span class="doc-field-value ${isMissing ? 'layout-missing-field' : ''}">${value}</span>
      <div class="layout-kv-row-end-actions">
        <button class="kv-action-btn" data-kv-action="hide" data-kv-key="${key}" title="Hide this field">👁‍🗨</button>
      </div>
    </div>`;
}

// ═══ INSPECTOR CONTENT GENERATOR ═══
export function renderInspectorContent(sectionId) {
  const sectionMeta = {
    'header': { name: 'Header', mandatory: false, fields: ['Company Name', 'Document Type'] },
    'shipper': { name: 'Shipper Details', mandatory: false, fields: ['Company Name', 'Address', 'Tax ID'] },
    'consignee': { name: 'Consignee Details', mandatory: false, fields: ['Customer Name', 'Address', 'Contact'] },
    'shipment-info': { name: 'Shipment Information', mandatory: false, fields: ['Shipment ID', 'Incoterm', 'Port of Loading', 'Port of Discharge', 'Vessel Name', 'ETD'] },
    'line-items': { name: 'Line Items', mandatory: true, fields: [] },
    'totals': { name: 'Totals', mandatory: true, fields: ['Subtotal', 'Freight', 'Grand Total'] },
    'declarations': { name: 'Declarations & Certifications', mandatory: false, fields: [] },
    'signatures': { name: 'Signatures', mandatory: false, fields: [] },
  };

  const meta = sectionMeta[sectionId];
  if (!meta) return '<p class="text-muted">Select a section to configure.</p>';

  const fieldToggles = meta.fields.length > 0 ? `
    <div class="inspector-section">
      <div class="inspector-section-title">Field Visibility</div>
      ${meta.fields.map(f => `
        <div class="inspector-field-row">
          <span class="inspector-field-name">${f}</span>
          <div class="layout-toggle on" data-inspector-field="${f}"></div>
        </div>
      `).join('')}
    </div>` : '';

  return `
    <div class="inspector-section">
      <div class="inspector-section-title">Section Name</div>
      <input class="form-input" value="${meta.name}" data-inspector-rename="${sectionId}" />
    </div>
    <div class="inspector-section">
      <div class="inspector-section-title">Visibility</div>
      <div class="inspector-field-row">
        <span class="inspector-field-name">Show Section</span>
        <div class="layout-toggle on" data-inspector-visibility="${sectionId}"></div>
      </div>
    </div>
    <div class="inspector-section">
      <div class="inspector-section-title">Column Placement</div>
      <div class="inspector-placement-options">
        <button class="placement-btn active" data-placement="full" data-placement-section="${sectionId}">Full Width</button>
        <button class="placement-btn" data-placement="left" data-placement-section="${sectionId}">Left</button>
        <button class="placement-btn" data-placement="right" data-placement-section="${sectionId}">Right</button>
      </div>
    </div>
    <div class="inspector-section">
      <div class="inspector-section-title">Spacing</div>
      <div class="inspector-placement-options">
        <button class="placement-btn active" data-spacing="comfortable" data-spacing-section="${sectionId}">Comfortable</button>
        <button class="placement-btn" data-spacing="compact" data-spacing-section="${sectionId}">Compact</button>
      </div>
    </div>
    ${fieldToggles}
    <div class="inspector-section" style="margin-top:12px;">
      ${meta.mandatory
      ? '<button class="btn btn-ghost w-full" disabled title="Cannot remove mandatory compliance section">🔒 Mandatory Section</button>'
      : `<button class="btn btn-danger w-full" data-inspector-remove="${sectionId}">🗑 Remove Section</button>`
    }
    </div>`;
}

// ═══ MODALS ═══
function renderRequestModal() {
  return `
    <div class="modal-overlay" id="requestModal" style="display:none;">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-title">📨 Request Field Value</div>
          <button class="modal-close" data-close-modal>✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Field Name</label>
            <input class="form-input" id="requestFieldName" value="Vessel Name" readonly style="opacity:0.7;" />
          </div>
          <div class="form-group">
            <label class="form-label">Assign to Department</label>
            <select class="form-select">
              <option>Supply Chain</option>
              <option>Sales</option>
              <option>Warehouse</option>
              <option>Finance</option>
              <option>Factory</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Priority</label>
            <select class="form-select">
              <option>Normal</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Due Date</label>
            <input class="form-input" type="date" />
          </div>
          <div class="form-group">
            <label class="form-label">Comment</label>
            <textarea class="form-textarea" placeholder="Add context or instructions..."></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" data-close-modal>Cancel</button>
          <button class="btn btn-primary" id="btnSendRequest" data-close-modal>Send Request</button>
        </div>
      </div>
    </div>`;
}

function renderRemoveConfirmModal() {
  return `
    <div class="modal-overlay" id="removeSectionModal" style="display:none;">
      <div class="modal" style="width:420px;">
        <div class="modal-header">
          <div class="modal-title">⚠️ Remove Section</div>
          <button class="modal-close" data-close-modal>✕</button>
        </div>
        <div class="modal-body">
          <p style="color:var(--text-secondary);line-height:1.6;">Are you sure you want to remove <strong id="removeSectionName">this section</strong> from the document layout?</p>
          <p style="color:var(--text-muted);font-size:var(--fs-sm);margin-top:8px;">This action can be undone by resetting to the original template.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" data-close-modal>Cancel</button>
          <button class="btn btn-danger" id="confirmRemoveSection">Remove Section</button>
        </div>
      </div>
    </div>`;
}

function renderAddSectionModal() {
  return `
    <div class="modal-overlay" id="addSectionModal" style="display:none;">
      <div class="modal" style="width:480px;">
        <div class="modal-header">
          <div class="modal-title">+ Add New Section</div>
          <button class="modal-close" data-close-modal>✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Section Type</label>
            <select class="form-select" id="newSectionType">
              <option value="kv">Key-Value Fields</option>
              <option value="text">Text Block</option>
              <option value="table">Table</option>
              <option value="signature">Signature Block</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Section Title</label>
            <input class="form-input" id="newSectionTitle" placeholder="e.g. Bank Details, Special Instructions..." />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" data-close-modal>Cancel</button>
          <button class="btn btn-primary" data-close-modal id="confirmAddSectionBtn">Add Section</button>
        </div>
      </div>
    </div>`;
}
