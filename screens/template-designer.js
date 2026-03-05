// ═══ Template Designer Screen ═══
export function renderTemplateDesigner() {
    return `
    <div class="animate-up" style="display:flex;flex-direction:column;height:calc(100vh - var(--topbar-h) - 48px);">
      <div class="flex items-center justify-between mb-md">
        <div class="flex items-center gap-md">
          <button class="btn btn-ghost btn-sm" data-nav="templates">← Back to Library</button>
          <div>
            <h2 style="font-size:var(--fs-lg);font-weight:700;">Commercial Invoice – Standard</h2>
            <p class="text-sm text-muted">v3.2 • Global • Last edited Mar 01, 2024</p>
          </div>
          <span class="badge badge-approved">Active</span>
        </div>
        <div class="flex gap-sm">
          <button class="btn btn-ghost btn-sm">↶ Undo</button>
          <button class="btn btn-ghost btn-sm">↷ Redo</button>
          <button class="btn btn-ghost">💾 Save Draft</button>
          <button class="btn btn-primary">📤 Publish</button>
          <button class="btn btn-accent">📋 Version History</button>
        </div>
      </div>
      <div class="split-panel" style="flex:1;">
        <div class="split-left">
          <div class="doc-canvas-area">
            <div class="doc-canvas" style="position:relative;">
              <div style="position:absolute;top:8px;right:8px;font-size:10px;padding:2px 8px;background:#6366F1;color:#fff;border-radius:4px;">Template Preview</div>
              <div class="doc-header-block" style="border:2px dashed #6366F1;border-radius:6px;padding:16px;cursor:move;">
                <div class="co-name">{{ Company Name }}</div>
                <div class="doc-type">{{ Document Type }}</div>
              </div>
              <div class="section-grid">
                <div class="doc-section" style="border:2px dashed #6366F1;border-radius:6px;padding:12px;cursor:move;">
                  <div class="doc-section-title">Shipper Details</div>
                  <div class="doc-field-row"><span class="doc-field-label">{{ Company Name }}</span><span class="doc-field-value" style="color:#6366F1;">Field Placeholder</span></div>
                  <div class="doc-field-row"><span class="doc-field-label">{{ Address }}</span><span class="doc-field-value" style="color:#6366F1;">Field Placeholder</span></div>
                  <div class="doc-field-row"><span class="doc-field-label">{{ Tax ID }}</span><span class="doc-field-value" style="color:#6366F1;">Field Placeholder</span></div>
                </div>
                <div class="doc-section" style="border:2px dashed #6366F1;border-radius:6px;padding:12px;cursor:move;">
                  <div class="doc-section-title">Consignee Details</div>
                  <div class="doc-field-row"><span class="doc-field-label">{{ Customer Name }}</span><span class="doc-field-value" style="color:#6366F1;">Field Placeholder</span></div>
                  <div class="doc-field-row"><span class="doc-field-label">{{ Address }}</span><span class="doc-field-value" style="color:#6366F1;">Field Placeholder</span></div>
                </div>
              </div>
              <div class="doc-section" style="border:2px dashed #22D3EE;border-radius:6px;padding:12px;cursor:move;">
                <div class="doc-section-title">Line Items Table</div>
                <table class="doc-table">
                  <thead><tr><th>{{ Column 1 }}</th><th>{{ Column 2 }}</th><th>{{ Column 3 }}</th><th>{{ Column 4 }}</th></tr></thead>
                  <tbody><tr><td colspan="4" style="text-align:center;color:#94A3B8;">Repeating row block</td></tr></tbody>
                </table>
              </div>
              <div class="doc-section" style="border:2px dashed #10B981;border-radius:6px;padding:12px;cursor:move;">
                <div class="doc-section-title">Totals</div>
                <div class="doc-field-row"><span class="doc-field-label">{{ Subtotal }}</span><span class="doc-field-value" style="color:#10B981;">Computed</span></div>
                <div class="doc-field-row"><span class="doc-field-label">{{ Grand Total }}</span><span class="doc-field-value" style="color:#10B981;">Computed</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="split-right">
          <div class="inspector-panel">
            <h3 style="font-size:var(--fs-md);font-weight:600;margin-bottom:16px;">Properties</h3>
            <div class="inspector-section">
              <div class="inspector-section-title">Available Fields</div>
              <div class="search-bar mb-sm" style="border:1px solid var(--border);">
                <span class="search-icon">🔍</span><input placeholder="Search fields..." style="padding:7px 0;" />
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:4px;">
                <span class="filter-chip" style="cursor:grab;">Shipment ID</span>
                <span class="filter-chip" style="cursor:grab;">Customer Name</span>
                <span class="filter-chip" style="cursor:grab;">Incoterm</span>
                <span class="filter-chip" style="cursor:grab;">Port of Loading</span>
                <span class="filter-chip" style="cursor:grab;">Vessel Name</span>
                <span class="filter-chip" style="cursor:grab;">ETD</span>
                <span class="filter-chip" style="cursor:grab;">HS Code</span>
                <span class="filter-chip" style="cursor:grab;">Container No.</span>
              </div>
            </div>
            <div class="inspector-section">
              <div class="inspector-section-title">Section Blocks</div>
              <div class="layout-block"><span class="drag-handle">⠿</span><span class="block-name">Header Block</span></div>
              <div class="layout-block"><span class="drag-handle">⠿</span><span class="block-name">Field Group</span></div>
              <div class="layout-block"><span class="drag-handle">⠿</span><span class="block-name">Table Block</span></div>
              <div class="layout-block"><span class="drag-handle">⠿</span><span class="block-name">Totals Block</span></div>
              <div class="layout-block"><span class="drag-handle">⠿</span><span class="block-name">Signature Block</span></div>
            </div>
            <div class="inspector-section">
              <div class="inspector-section-title">Grid Layout</div>
              <div class="layout-option">
                <button class="layout-opt-btn active" data-layout-opt="1">
                  <span class="layout-opt-icon">▰</span>1 Column
                </button>
                <button class="layout-opt-btn" data-layout-opt="2">
                  <span class="layout-opt-icon">▰▰</span>2 Columns
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}
