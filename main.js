// ═══ DocAuto – Main Application ═══
import './style.css';
import { renderShipmentList } from './screens/shipment-list.js';
import { renderShipmentWorkspace } from './screens/shipment-workspace.js';
import { renderDocumentWorkspace } from './screens/document-workspace.js';
import { renderDepartmentInbox } from './screens/department-inbox.js';
import { renderApprovalInbox } from './screens/approval-inbox.js';
import { renderFieldCatalog } from './screens/field-catalog.js';
import { renderDataMapping } from './screens/data-mapping.js';
import { renderComputedFields } from './screens/computed-fields.js';
import { renderTemplateLibrary } from './screens/template-library.js';
import { renderTemplateDesigner } from './screens/template-designer.js';
import { renderRuleEngine } from './screens/rule-engine.js';
import { renderGovernance } from './screens/governance.js';

let currentScreen = 'shipments';
let isAdmin = true;
let userName = localStorage.getItem('docauto_userName') || 'Jane Doe';
let userEmail = localStorage.getItem('docauto_userEmail') || 'jane.doe@company.com';
let userDept = localStorage.getItem('docauto_userDept') || 'Documentation';
let currentTheme = localStorage.getItem('docauto_theme') || 'dark';
let profileDropdownOpen = false;

const navItems = [
  { id: 'shipments', label: 'Shipments', icon: '📦', section: 'operations' },
  { id: 'dept-inbox', label: 'Dept Requests', icon: '📨', section: 'operations', badge: '5' },
  { id: 'approvals', label: 'Approvals', icon: '✅', section: 'operations', badge: '3' },
  { id: 'field-catalog', label: 'Field Catalog', icon: '📋', section: 'admin' },
  { id: 'data-mapping', label: 'Data Mapping', icon: '🔗', section: 'admin' },
  { id: 'computed-fields', label: 'Computed Fields', icon: '⚡', section: 'admin' },
  { id: 'templates', label: 'Template Library', icon: '📄', section: 'admin' },
  { id: 'template-designer', label: 'Template Designer', icon: '🎨', section: 'admin' },
  { id: 'rule-engine', label: 'Rule Engine', icon: '⚙️', section: 'admin' },
  { id: 'governance', label: 'Governance', icon: '🛡️', section: 'admin' },
];

function getScreenTitle(id) {
  const item = navItems.find(n => n.id === id);
  if (id === 'workspace') return 'Shipment Workspace';
  if (id === 'doc-workspace') return 'Document Workspace';
  return item ? item.label : 'Shipments';
}

function navigate(screen) {
  currentScreen = screen;
  renderApp();
}

function toggleRole() {
  isAdmin = !isAdmin;
  if (!isAdmin && navItems.find(n => n.id === currentScreen)?.section === 'admin') {
    currentScreen = 'shipments';
  }
  renderApp();
}

function renderSidebar() {
  const ops = navItems.filter(n => n.section === 'operations');
  const admin = navItems.filter(n => n.section === 'admin');
  return `
    <aside class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon">D</div>
        <h1>DocAuto</h1>
      </div>
      <div class="sidebar-section">
        <div class="sidebar-section-label">Operations</div>
        <ul class="sidebar-nav">
          ${ops.map(n => `
            <li class="sidebar-nav-item ${currentScreen === n.id ? 'active' : ''}" data-nav="${n.id}">
              <span class="nav-icon">${n.icon}</span> ${n.label}
              ${n.badge ? `<span class="nav-badge">${n.badge}</span>` : ''}
            </li>`).join('')}
        </ul>
      </div>
      ${isAdmin ? `
      <div class="sidebar-section">
        <div class="sidebar-section-label">Configuration</div>
        <ul class="sidebar-nav">
          ${admin.map(n => `
            <li class="sidebar-nav-item ${currentScreen === n.id ? 'active' : ''}" data-nav="${n.id}">
              <span class="nav-icon">${n.icon}</span> ${n.label}
            </li>`).join('')}
        </ul>
      </div>` : ''}
      <div class="sidebar-footer">
        <div class="role-toggle ${isAdmin ? 'admin' : ''}" id="roleToggle">
          <span>${isAdmin ? '🔒 Admin' : '👤 User'}</span>
          <div class="toggle-track"><div class="toggle-knob"></div></div>
        </div>
      </div>
    </aside>`;
}

function renderTopbar() {
  const title = getScreenTitle(currentScreen);
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  return `
    <div class="topbar">
      <div class="topbar-breadcrumb">
        <span>DocAuto</span><span class="sep">›</span><span class="current">${title}</span>
      </div>
      <div class="topbar-actions">
        <button class="btn-icon" title="Notifications">🔔</button>
        <div class="user-profile-trigger" id="profileTrigger">
          <div class="topbar-user">
            <div class="topbar-avatar">${initials}</div>
            <div class="topbar-user-info">
              <div class="topbar-user-name" id="topbarUserName">${userName}</div>
              <div class="topbar-user-role">${isAdmin ? 'Administrator' : 'Documentation Specialist'}</div>
            </div>
            <span style="font-size:10px;color:var(--text-muted);margin-left:4px;">▼</span>
          </div>
          ${profileDropdownOpen ? `
          <div class="profile-dropdown" id="profileDropdown">
            <div class="profile-dd-header">
              <div class="profile-dd-avatar">${initials}</div>
              <div><div class="profile-dd-name">${userName}</div><div class="profile-dd-role">${userEmail}</div></div>
            </div>
            <div class="profile-dd-menu">
              <button class="profile-dd-item" id="ddMyProfile"><span class="dd-icon">👤</span> My Profile</button>
              <button class="profile-dd-item" id="ddPreferences"><span class="dd-icon">⚙</span> Preferences</button>
              <div class="profile-dd-divider"></div>
              <div class="profile-dd-item theme-row">
                <span><span class="dd-icon">🎨</span> Theme</span>
                <div class="theme-toggle-btn">
                  <button class="theme-opt ${currentTheme === 'dark' ? 'active' : ''}" data-set-theme="dark">Dark</button>
                  <button class="theme-opt ${currentTheme === 'light' ? 'active' : ''}" data-set-theme="light">Light</button>
                </div>
              </div>
              <div class="profile-dd-item role-row">
                <span><span class="dd-icon">${isAdmin ? '🔒' : '👤'}</span> Role: ${isAdmin ? 'Admin' : 'User'}</span>
                <button class="btn btn-ghost btn-sm" id="ddRoleSwitch" style="padding:3px 10px;font-size:11px;">Switch</button>
              </div>
              <div class="profile-dd-divider"></div>
              <button class="profile-dd-item" id="ddLogout" style="color:var(--danger);"><span class="dd-icon">🚪</span> Logout</button>
            </div>
          </div>
          ` : ''}
        </div>
      </div>
    </div>

    <!-- Profile Modal -->
    <div class="modal-overlay" id="profileModal" style="display:none;">
      <div class="modal" style="width:480px;">
        <div class="modal-header">
          <div class="modal-title">👤 My Profile</div>
          <button class="modal-close" data-close-modal>✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input class="form-input" id="profileName" value="${userName}" />
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input class="form-input" id="profileEmail" value="${userEmail}" />
          </div>
          <div class="form-group">
            <label class="form-label">Department</label>
            <select class="form-select" id="profileDept">
              <option ${userDept === 'Documentation' ? 'selected' : ''}>Documentation</option>
              <option ${userDept === 'Sales' ? 'selected' : ''}>Sales</option>
              <option ${userDept === 'Supply Chain' ? 'selected' : ''}>Supply Chain</option>
              <option ${userDept === 'Finance' ? 'selected' : ''}>Finance</option>
              <option ${userDept === 'Warehouse' ? 'selected' : ''}>Warehouse</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Role</label>
            <input class="form-input" value="${isAdmin ? 'Administrator' : 'Documentation Specialist'}" readonly style="opacity:0.6;" />
          </div>
          <div class="form-group">
            <label class="form-label">Change Password</label>
            <input class="form-input" type="password" placeholder="New password (optional)" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" data-close-modal>Cancel</button>
          <button class="btn btn-primary" id="btnSaveProfile">Save Profile</button>
        </div>
      </div>
    </div>
    `;
}

function renderScreen() {
  const renderers = {
    'shipments': renderShipmentList,
    'workspace': renderShipmentWorkspace,
    'doc-workspace': renderDocumentWorkspace,
    'dept-inbox': renderDepartmentInbox,
    'approvals': renderApprovalInbox,
    'field-catalog': renderFieldCatalog,
    'data-mapping': renderDataMapping,
    'computed-fields': renderComputedFields,
    'templates': renderTemplateLibrary,
    'template-designer': renderTemplateDesigner,
    'rule-engine': renderRuleEngine,
    'governance': renderGovernance,
  };
  const fn = renderers[currentScreen] || renderShipmentList;
  return fn();
}

function renderApp() {
  // Apply theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'light') {
    document.body.style.background = 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)';
  } else {
    document.body.style.background = '';
  }
  document.getElementById('app').innerHTML = `
    ${renderSidebar()}
    <div class="main-area">
      ${renderTopbar()}
      <div class="main-content" id="screenContent">${renderScreen()}</div>
    </div>`;
  bindEvents();
}

function bindEvents() {
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.nav));
  });
  document.getElementById('roleToggle')?.addEventListener('click', toggleRole);

  // ─── Profile Dropdown Toggle ───
  document.getElementById('profileTrigger')?.addEventListener('click', (e) => {
    if (e.target.closest('#profileDropdown')) return;
    profileDropdownOpen = !profileDropdownOpen;
    renderApp();
  });

  // Close dropdown on outside click
  if (profileDropdownOpen) {
    setTimeout(() => {
      document.addEventListener('click', function closeDD(e) {
        if (!e.target.closest('#profileTrigger')) {
          profileDropdownOpen = false;
          renderApp();
          document.removeEventListener('click', closeDD);
        }
      });
    }, 10);
  }

  // ─── Theme Toggle ───
  document.querySelectorAll('[data-set-theme]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentTheme = btn.dataset.setTheme;
      localStorage.setItem('docauto_theme', currentTheme);
      profileDropdownOpen = false;
      renderApp();
    });
  });

  // ─── Role Switch from Dropdown ───
  document.getElementById('ddRoleSwitch')?.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdownOpen = false;
    toggleRole();
  });

  // ─── My Profile ───
  document.getElementById('ddMyProfile')?.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdownOpen = false;
    const modal = document.getElementById('profileModal');
    if (modal) modal.style.display = 'flex';
  });

  // ─── Save Profile ───
  document.getElementById('btnSaveProfile')?.addEventListener('click', () => {
    const nameEl = document.getElementById('profileName');
    const emailEl = document.getElementById('profileEmail');
    const deptEl = document.getElementById('profileDept');
    if (nameEl) { userName = nameEl.value; localStorage.setItem('docauto_userName', userName); }
    if (emailEl) { userEmail = emailEl.value; localStorage.setItem('docauto_userEmail', userEmail); }
    if (deptEl) { userDept = deptEl.value; localStorage.setItem('docauto_userDept', userDept); }
    const modal = document.getElementById('profileModal');
    if (modal) modal.style.display = 'none';
    renderApp();
  });

  // Shipment list row clicks
  document.querySelectorAll('[data-action="open-workspace"]').forEach(el => {
    el.addEventListener('click', () => navigate('workspace'));
  });
  // Back to list
  document.querySelectorAll('[data-action="back-to-list"]').forEach(el => {
    el.addEventListener('click', () => navigate('shipments'));
  });

  // ─── Workspace mode tabs ───
  document.querySelectorAll('[data-mode]').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('[data-mode]').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
      const mode = el.dataset.mode;
      document.querySelectorAll('.workspace-mode-content').forEach(c => c.style.display = 'none');
      const target = document.getElementById('mode-' + mode);
      if (target) target.style.display = mode === 'preview' ? 'flex' : 'block';
      // Hide popover when switching modes
      const pop = document.getElementById('efPopover');
      if (pop) pop.style.display = 'none';
      // Hide layout inspector when leaving layout mode
      const inspPanel = document.getElementById('layoutInspectorPanel');
      if (inspPanel && mode !== 'layout') inspPanel.style.display = 'none';
      // Deselect layout sections
      document.querySelectorAll('.layout-section-wrapper.selected').forEach(s => s.classList.remove('selected'));
    });
  });

  // ─── View Document buttons ───
  document.querySelectorAll('[data-view-doc]').forEach(el => {
    el.addEventListener('click', () => {
      navigate('doc-workspace');
    });
  });

  // ─── Back to Workspace (from Document Workspace) ───
  document.querySelectorAll('[data-action="back-to-workspace"]').forEach(el => {
    el.addEventListener('click', () => navigate('workspace'));
  });

  // ─── Filter chips – doc status filter ───
  document.querySelectorAll('[data-doc-filter]').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('[data-doc-filter]').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
      const filter = el.dataset.docFilter;
      document.querySelectorAll('.req-doc-card').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.docStatus === filter) ? '' : 'none';
      });
    });
  });
  // Generic filter chips
  document.querySelectorAll('.filter-chip:not([data-doc-filter])').forEach(el => {
    el.addEventListener('click', () => el.classList.toggle('active'));
  });

  // ═══════════════════════════════════════════════════════
  //  EDIT FIELDS MODE – Inline Editing
  // ═══════════════════════════════════════════════════════

  document.querySelectorAll('.ef-canvas .ef-editable:not(.ef-missing)').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      if (el.classList.contains('ef-editing')) return;
      // computed fields are read-only
      if (el.classList.contains('computed-field')) return;
      const currentVal = el.textContent.replace(/✓ edited/g, '').trim();
      el.classList.add('ef-editing');
      el.innerHTML = `<input class="ef-inline-input" value="${currentVal.replace(/"/g, '&quot;')}" />`;
      const input = el.querySelector('.ef-inline-input');
      input.focus();
      input.select();
      const save = () => {
        const newVal = input.value.trim() || currentVal;
        const changed = newVal !== currentVal;
        el.classList.remove('ef-editing');
        el.innerHTML = newVal + (changed ? ' <span class="ef-edited-indicator">✓ edited</span>' : '');
      };
      input.addEventListener('blur', save);
      input.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter') { ev.preventDefault(); input.blur(); }
        if (ev.key === 'Escape') { input.value = currentVal; input.blur(); }
      });
    });
  });

  // ─── Missing Field Popover ───
  let activePopoverField = null;
  document.querySelectorAll('.ef-canvas .ef-missing').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const pop = document.getElementById('efPopover');
      if (!pop) return;
      if (activePopoverField === el) {
        pop.style.display = 'none';
        activePopoverField = null;
        return;
      }
      activePopoverField = el;
      const rect = el.getBoundingClientRect();
      pop.style.display = 'block';
      pop.style.position = 'fixed';
      pop.style.top = (rect.bottom + 8) + 'px';
      pop.style.left = Math.min(rect.left, window.innerWidth - 220) + 'px';
      pop.dataset.targetField = el.dataset.fieldName || '';
    });
  });

  // Popover action buttons
  document.querySelectorAll('[data-popover-action]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pop = document.getElementById('efPopover');
      const action = btn.dataset.popoverAction;
      const fieldName = pop?.dataset.targetField || 'field';
      const missingType = activePopoverField?.dataset.missingType || 'required';

      if (action === 'enter' && activePopoverField) {
        const target = activePopoverField;
        target.classList.remove('field-missing-required', 'field-missing-optional', 'ef-missing');
        target.classList.add('ef-editable', 'ef-editing');
        target.innerHTML = `<input class="ef-inline-input" placeholder="Enter ${fieldName}..." />`;
        const input = target.querySelector('.ef-inline-input');
        input.focus();
        const saveFn = () => {
          const val = input.value.trim();
          target.classList.remove('ef-editing');
          if (val) {
            target.innerHTML = val + ' <span class="ef-edited-indicator">✓ edited</span>';
          } else {
            // restore missing state
            const isMandatory = missingType === 'required';
            target.classList.add(isMandatory ? 'field-missing-required' : 'field-missing-optional', 'ef-missing');
            target.classList.remove('ef-editable');
            target.innerHTML = `<span class="field-missing-label">${isMandatory ? '⛔ Required' : '⚠ Optional'} – ${fieldName}</span>`;
          }
        };
        input.addEventListener('blur', saveFn);
        input.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') { ev.preventDefault(); input.blur(); } });
      } else if (action === 'request') {
        const nameInput = document.getElementById('requestFieldName');
        if (nameInput) nameInput.value = fieldName;
        const modal = document.getElementById('requestModal');
        if (modal) modal.style.display = 'flex';
      } else if (action === 'comment') {
        if (activePopoverField) {
          const existing = activePopoverField.closest('.doc-field-row')?.querySelector('.ef-comment-note');
          if (!existing) {
            const note = document.createElement('div');
            note.className = 'ef-comment-note';
            note.style.cssText = 'font-size:10px;color:#6366F1;margin-top:4px;font-style:italic;';
            note.textContent = '💬 Comment added';
            activePopoverField.closest('.doc-field-row')?.appendChild(note);
          }
        }
      }

      if (pop) pop.style.display = 'none';
      activePopoverField = null;
    });
  });

  // Dismiss popover on outside click
  document.addEventListener('click', (e) => {
    const pop = document.getElementById('efPopover');
    if (pop && pop.style.display !== 'none' && !pop.contains(e.target) && !e.target.closest('.ef-missing')) {
      pop.style.display = 'none';
      activePopoverField = null;
    }
  }, { capture: false });

  // ═══════════════════════════════════════════════════════
  //  EDIT LAYOUT MODE – Section Selection & Inspector
  // ═══════════════════════════════════════════════════════

  document.querySelectorAll('.layout-section-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', (e) => {
      if (e.target.closest('[data-section-action]') || e.target.closest('[data-kv-action]')) return;
      document.querySelectorAll('.layout-section-wrapper').forEach(w => w.classList.remove('selected'));
      wrapper.classList.add('selected');
    });
  });

  // ─── Section Action Buttons (settings / duplicate / remove) ───
  document.querySelectorAll('[data-section-action]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const wrapper = btn.closest('.layout-section-wrapper');
      const sectionId = wrapper?.dataset.sectionId;
      const action = btn.dataset.sectionAction;
      if (!sectionId) return;

      if (action === 'settings') {
        document.querySelectorAll('.layout-section-wrapper').forEach(w => w.classList.remove('selected'));
        wrapper.classList.add('selected');
        const panel = document.getElementById('layoutInspectorPanel');
        const content = document.getElementById('layoutInspectorContent');
        if (panel && content) {
          const sectionMeta = {
            'header': { title: 'Header', mandatory: false, hasFields: false, fields: [] },
            'shipper': { title: 'Shipper Details', mandatory: false, hasFields: true, fields: ['Company Name', 'Address', 'Tax ID'] },
            'consignee': { title: 'Consignee Details', mandatory: false, hasFields: true, fields: ['Customer Name', 'Address', 'Contact'] },
            'shipment-info': { title: 'Shipment Information', mandatory: false, hasFields: true, fields: ['Shipment ID', 'Incoterm', 'Port of Loading', 'Port of Discharge', 'Vessel Name', 'ETD'] },
            'line-items': { title: 'Line Items', mandatory: true, hasFields: false, fields: [] },
            'totals': { title: 'Totals', mandatory: true, hasFields: true, fields: ['Subtotal', 'Freight', 'Grand Total'] },
            'declarations': { title: 'Declarations & Certifications', mandatory: false, hasFields: false, fields: [] },
            'signatures': { title: 'Signatures', mandatory: false, hasFields: false, fields: [] },
          };
          const sec = sectionMeta[sectionId] || { title: sectionId, mandatory: false, hasFields: false, fields: [] };
          content.innerHTML = renderInspectorHTML(sectionId, sec);
          panel.style.display = '';
          bindInspectorEvents(sectionId, wrapper);
        }
      } else if (action === 'duplicate') {
        const clone = wrapper.cloneNode(true);
        clone.dataset.sectionId = sectionId + '-copy-' + Date.now();
        clone.classList.remove('selected');
        // Insert a new drop zone before the clone
        const dropZone = document.createElement('div');
        dropZone.className = 'layout-drop-zone';
        wrapper.parentNode.insertBefore(dropZone, wrapper.nextSibling);
        wrapper.parentNode.insertBefore(clone, dropZone.nextSibling);
        bindEvents();
      } else if (action === 'remove') {
        if (wrapper.dataset.mandatory === 'true') return;
        const nameEl = document.getElementById('removeSectionName');
        const sectionLabel = wrapper.querySelector('.layout-section-label');
        if (nameEl) nameEl.textContent = sectionLabel?.textContent?.trim() || sectionId;
        const modal = document.getElementById('removeSectionModal');
        if (modal) modal.style.display = 'flex';
        const confirmBtn = document.getElementById('confirmRemoveSection');
        if (confirmBtn) {
          // Remove any previous listeners by cloning
          const newBtn = confirmBtn.cloneNode(true);
          confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
          newBtn.addEventListener('click', () => {
            wrapper.remove();
            const panel = document.getElementById('layoutInspectorPanel');
            if (panel) panel.style.display = 'none';
            modal.style.display = 'none';
          });
        }
      }
    });
  });

  // ─── KV Row: Hide/Show toggle ───
  document.querySelectorAll('[data-kv-action="hide"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const row = btn.closest('.layout-kv-row');
      if (!row) return;
      row.classList.toggle('hidden-row');
      const isHidden = row.classList.contains('hidden-row');
      btn.title = isHidden ? 'Show this field' : 'Hide this field';
      btn.style.opacity = isHidden ? '0.4' : '';
    });
  });

  // ─── Column Layout Switching ───
  document.querySelectorAll('[data-col-layout]').forEach(btn => {
    btn.addEventListener('click', () => {
      const layout = btn.dataset.colLayout;
      const canvas = document.getElementById('editLayoutCanvas');
      const twoColOptions = document.getElementById('layout2colOptions');

      if (layout === 'swap') {
        if (!canvas) return;
        // Reverse the order of sections in the canvas
        const sections = [...canvas.querySelectorAll('.layout-section-wrapper')];
        sections.reverse().forEach(s => canvas.appendChild(s));
        return;
      }

      document.querySelectorAll('[data-col-layout]:not([data-col-layout="swap"])').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (layout === '2col') {
        canvas?.classList.add('two-col');
        if (twoColOptions) twoColOptions.style.display = '';
      } else {
        canvas?.classList.remove('two-col');
        if (twoColOptions) twoColOptions.style.display = 'none';
      }
    });
  });

  // ─── Column ratio presets ───
  document.querySelectorAll('[data-ratio]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-ratio]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const canvas = document.getElementById('editLayoutCanvas');
      if (!canvas || !canvas.classList.contains('two-col')) return;
      const ratio = btn.dataset.ratio;
      if (ratio === '60-40') canvas.style.gridTemplateColumns = '3fr 2fr';
      else if (ratio === '40-60') canvas.style.gridTemplateColumns = '2fr 3fr';
      else canvas.style.gridTemplateColumns = '';  // 50/50 default
    });
  });

  // ─── Close inspector (static panel close button) ───
  document.querySelector('[data-close-inspector]')?.addEventListener('click', () => {
    const panel = document.getElementById('layoutInspectorPanel');
    if (panel) panel.style.display = 'none';
    document.querySelectorAll('.layout-section-wrapper.selected').forEach(s => s.classList.remove('selected'));
  });

  // ─── Save/Reset Layout toolbar actions ───
  document.querySelector('[data-action="reset-layout"]')?.addEventListener('click', () => {
    if (confirm('Reset layout to template defaults? This will reload the section order.')) {
      navigate('workspace');
    }
  });
  document.querySelector('[data-action="save-layout-override"]')?.addEventListener('click', () => {
    const btn = document.querySelector('[data-action="save-layout-override"]');
    if (btn) { btn.textContent = '✓ Saved'; setTimeout(() => { btn.innerHTML = '💾 Save Override'; }, 2000); }
  });
  document.querySelector('[data-action="save-template-variant"]')?.addEventListener('click', () => {
    const modal = document.getElementById('addSectionModal');
    if (modal) modal.style.display = 'flex';
  });

  // ─── Add Section button ───
  document.getElementById('addSectionBtn')?.addEventListener('click', () => {
    const modal = document.getElementById('addSectionModal');
    if (modal) modal.style.display = 'flex';
    const confirmBtn = document.getElementById('confirmAddSectionBtn');
    if (confirmBtn) {
      const newBtn = confirmBtn.cloneNode(true);
      confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
      newBtn.addEventListener('click', () => {
        const typeEl = document.getElementById('newSectionType');
        const titleEl = document.getElementById('newSectionTitle');
        const sectionType = typeEl?.value || 'kv';
        const sectionTitle = titleEl?.value.trim() || 'New Section';
        const canvas = document.getElementById('editLayoutCanvas');
        const addBtn = document.getElementById('addSectionBtn');
        if (canvas && addBtn) {
          const newId = 'custom-' + Date.now();
          const dropZone = document.createElement('div');
          dropZone.className = 'layout-drop-zone';
          dropZone.dataset.dropIndex = newId;
          const newSection = document.createElement('div');
          newSection.className = 'layout-section-wrapper';
          newSection.dataset.sectionId = newId;
          newSection.dataset.mandatory = 'false';
          newSection.setAttribute('draggable', 'true');
          newSection.innerHTML = `
            <div class="layout-section-toolbar">
              <span class="layout-drag-handle" title="Drag to reorder">⠿</span>
              <span class="layout-section-label">${sectionTitle}</span>
              <div class="layout-section-actions">
                <button class="layout-action-btn" data-section-action="settings" data-section-target="${newId}" title="Section Settings">⚙</button>
                <button class="layout-action-btn" data-section-action="duplicate" data-section-target="${newId}" title="Duplicate Section">📋</button>
                <button class="layout-action-btn danger-action" data-section-action="remove" data-section-target="${newId}" title="Remove Section">🗑</button>
              </div>
            </div>
            <div class="layout-section-content">
              <div class="doc-section" style="margin-bottom:0;">
                <div class="doc-section-title">${sectionTitle}</div>
                <div style="padding:12px;color:var(--text-muted);font-size:12px;font-style:italic;">New ${sectionType} section – configure via Settings ⚙</div>
              </div>
            </div>`;
          canvas.insertBefore(dropZone, addBtn);
          canvas.insertBefore(newSection, addBtn);
        }
        modal.style.display = 'none';
        if (titleEl) titleEl.value = '';
        bindEvents();
      });
    }
  });

  // ─── Drag-and-Drop for Layout Sections ───
  let draggedSection = null;
  document.querySelectorAll('.layout-section-wrapper[draggable="true"]').forEach(wrapper => {
    wrapper.addEventListener('dragstart', (e) => {
      draggedSection = wrapper;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', wrapper.dataset.sectionId || '');
      setTimeout(() => wrapper.classList.add('dragging'), 0);
    });
    wrapper.addEventListener('dragend', () => {
      wrapper.classList.remove('dragging');
      document.querySelectorAll('.layout-drop-zone.drag-over').forEach(z => z.classList.remove('drag-over'));
      draggedSection = null;
    });
    // Drag over another section → reorder live
    wrapper.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (!draggedSection || draggedSection === wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      const canvas = wrapper.parentNode;
      if (e.clientY < midY) {
        canvas.insertBefore(draggedSection, wrapper);
      } else {
        canvas.insertBefore(draggedSection, wrapper.nextSibling);
      }
    });
  });

  // Drop zones: visual indicator
  document.querySelectorAll('.layout-drop-zone').forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('drag-over');
    });
    zone.addEventListener('dragleave', (e) => {
      if (!zone.contains(e.relatedTarget)) zone.classList.remove('drag-over');
    });
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      if (!draggedSection) return;
      zone.parentNode?.insertBefore(draggedSection, zone.nextSibling);
    });
  });

  // ─── Modal open/close ───
  document.querySelectorAll('[data-open-modal]').forEach(el => {
    el.addEventListener('click', () => {
      const modal = document.getElementById(el.dataset.openModal);
      if (modal) modal.style.display = 'flex';
    });
  });
  document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', () => {
      el.closest('.modal-overlay').style.display = 'none';
    });
  });

  // ─── Toggle switches ───
  document.querySelectorAll('.layout-toggle').forEach(el => {
    el.addEventListener('click', () => el.classList.toggle('on'));
  });
  // Permission checkboxes
  document.querySelectorAll('.perm-check').forEach(el => {
    el.addEventListener('click', () => {
      el.classList.toggle('on');
      el.textContent = el.classList.contains('on') ? '✓' : '';
    });
  });

  // ═══════════════════════════════════════════════════════
  //  RIGHT PANEL FIELD SYNCHRONIZATION AND FOCUS
  // ═══════════════════════════════════════════════════════

  // Live Sync Right Panel Input -> Left Canvas
  document.querySelectorAll('[data-sync-field]').forEach(input => {
    input.addEventListener('input', (e) => {
      const fieldId = input.dataset.syncField;
      const newVal = e.target.value;

      const canvasEls = document.querySelectorAll(`.ef-canvas [data-field="${fieldId}"]`);
      canvasEls.forEach(el => {
        if (!el.classList.contains('ef-editing')) {
          el.innerHTML = newVal ? newVal + ' <span class="ef-edited-indicator">✓ edited</span>' : 'Pending';
        }
      });
    });
  });

  // Highlight Right Panel Row on Left Canvas Click
  document.querySelectorAll('.ef-canvas .ef-editable, .ef-canvas .ef-missing').forEach(el => {
    el.addEventListener('click', (e) => {
      const fieldId = el.dataset.field;
      const fieldName = el.dataset.fieldName;

      let panelRow = null;
      if (fieldId) {
        panelRow = document.querySelector(`[data-panel-field="${fieldId}"]`);
      } else if (fieldName) {
        const reqBtn = document.querySelector(`[data-request-field="${fieldName}"]`);
        if (reqBtn) panelRow = reqBtn.closest('.field-editor-row');
      }

      if (panelRow) {
        // Reset previous highlights
        document.querySelectorAll('.field-editor-row').forEach(row => {
          row.style.transition = 'background-color 0.2s';
          row.style.backgroundColor = '';
        });

        // Highlight and focus
        panelRow.style.backgroundColor = 'var(--bg-active, #F1F5F9)';
        panelRow.scrollIntoView({ behavior: 'smooth', block: 'center' });

        const input = panelRow.querySelector('input');
        if (input && document.activeElement !== input) {
          input.focus();
        }

        setTimeout(() => {
          panelRow.style.backgroundColor = '';
        }, 1500);
      }
    });
  });

  // Right Panel Request Button -> Open Modal
  document.querySelectorAll('[data-request-field]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const fieldName = btn.dataset.requestField;
      const nameInput = document.getElementById('requestFieldName');
      if (nameInput) nameInput.value = fieldName;
      const modal = document.getElementById('requestModal');
      if (modal) modal.style.display = 'flex';
    });
  });

  // Send Request Modal Action
  document.getElementById('btnSendRequest')?.addEventListener('click', () => {
    const fieldNameInput = document.getElementById('requestFieldName');
    const fieldName = fieldNameInput ? fieldNameInput.value : '';
    if (!fieldName) return;

    // 1) Update the right panel (Edit Fields mode)
    const reqBtns = document.querySelectorAll(`[data-request-field="${fieldName}"]`);
    reqBtns.forEach(reqBtn => {
      // If it's in the field editor panel
      const row = reqBtn.closest('.field-editor-row');
      if (row) {
        const badge = row.querySelector('.badge');
        if (badge) {
          badge.className = 'badge badge-dot badge-pending';
          badge.textContent = 'REQUESTED';
        }
      }
      // General button update (both panel and preview)
      reqBtn.textContent = '📨 Sent';
      reqBtn.disabled = true;
      reqBtn.classList.add('disabled-action');
      reqBtn.title = 'Request Sent';
      if (reqBtn.classList.contains('preview-request-btn')) {
        reqBtn.style.opacity = '0.7';
        reqBtn.style.cursor = 'not-allowed';
      }
    });

    // 2) Update the left canvas (Edit Fields mode missing indicators)
    const canvasMissing = document.querySelector(`.ef-canvas .ef-missing[data-fieldName="${fieldName}"]`) || document.querySelector(`.ef-canvas .ef-missing[data-field-name="${fieldName}"]`);
    if (canvasMissing) {
      canvasMissing.innerHTML = `<span class="field-missing-label" style="color:var(--warning);border-color:var(--warning);">📨 Requested – ${fieldName}</span>`;
      canvasMissing.classList.remove('field-missing-required', 'field-missing-optional');
      canvasMissing.style.border = '1px dashed var(--warning)';
    }

    // 3) Update the Dept Requests badge count in sidebar (simulate creating the request)
    const deptBadge = document.querySelector('[data-nav="dept-inbox"] .nav-badge');
    if (deptBadge) {
      const currentCount = parseInt(deptBadge.textContent, 10) || 0;
      deptBadge.textContent = currentCount + 1;
      deptBadge.style.animation = 'none';
      void deptBadge.offsetWidth; // trigger reflow
      deptBadge.style.animation = 'pulseGlow 600ms ease';
    }

    // 4) Reset modal form fields
    const deptSelect = document.getElementById('requestDepartment');
    if (deptSelect) deptSelect.selectedIndex = 0;
    const commentField = document.getElementById('requestComment');
    if (commentField) commentField.value = '';

    // 5) Close modal
    const modal = document.getElementById('requestModal');
    if (modal) modal.style.display = 'none';
  });
}

// Helper to render inspector HTML dynamically
function renderInspectorHTML(sectionId, sec) {
  const fieldToggles = sec.hasFields && sec.fields.length > 0 ? `
    <div class="inspector-section">
      <div class="inspector-section-title">Field Visibility</div>
      ${sec.fields.map((f, i) => `
        <div class="inspector-field-row">
          <span class="inspector-field-name">${f}</span>
          <div class="layout-toggle on" data-inspector-field="${i}"></div>
        </div>
      `).join('')}
    </div>` : '';

  return `
    <div class="section-inspector" data-inspecting="${sectionId}" style="padding:16px;">
      <div class="flex items-center justify-between mb-md">
        <h3 style="font-size:var(--fs-md);font-weight:600;">Section Settings</h3>
        <button class="btn-icon" id="closeInspector" title="Close" style="background:transparent;border:none;cursor:pointer;color:var(--text-secondary);font-size:16px;">✕</button>
      </div>
      <div class="inspector-section">
        <div class="inspector-section-title">Section Name</div>
        <input class="form-input" value="${sec.title}" data-inspector-rename="${sectionId}" />
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
      <div class="inspector-section" style="border-top:1px solid var(--border);padding-top:16px;margin-top:8px;">
        ${sec.mandatory
      ? `<button class="btn btn-ghost w-full" disabled title="Mandatory compliance section – cannot be removed" style="opacity:0.5;">🔒 Mandatory – Cannot Remove</button>`
      : `<button class="btn btn-danger w-full" data-inspector-action="remove">🗑 Remove Section</button>`
    }
      </div>
    </div>`;
}

// Helper to bind inspector-specific events after dynamic render
function bindInspectorEvents(sectionId, wrapper) {
  const inspectorRoot = document.getElementById('layoutInspectorContent');
  if (!inspectorRoot) return;

  // Close button
  inspectorRoot.querySelector('#closeInspector')?.addEventListener('click', () => {
    const panel = document.getElementById('layoutInspectorPanel');
    if (panel) panel.style.display = 'none';
    wrapper.classList.remove('selected');
  });

  // Toggle switches
  inspectorRoot.querySelectorAll('.layout-toggle').forEach(el => {
    el.addEventListener('click', () => el.classList.toggle('on'));
  });

  // Column placement buttons
  inspectorRoot.querySelectorAll('[data-placement]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.inspector-placement-options')?.querySelectorAll('.placement-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const placement = btn.dataset.placement;
      wrapper.dataset.placement = placement;
    });
  });

  // Spacing buttons
  inspectorRoot.querySelectorAll('[data-spacing]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.inspector-placement-options')?.querySelectorAll('.placement-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const spacing = btn.dataset.spacing;
      const content = wrapper.querySelector('.layout-section-content');
      if (content) {
        content.style.padding = spacing === 'compact' ? '6px 12px' : '';
      }
    });
  });

  // Rename section
  inspectorRoot.querySelector('[data-inspector-rename]')?.addEventListener('input', (e) => {
    const label = wrapper.querySelector('.layout-section-label');
    if (label) label.textContent = e.target.value;
  });

  // Remove action
  inspectorRoot.querySelector('[data-inspector-action="remove"]')?.addEventListener('click', () => {
    if (wrapper.dataset.mandatory === 'true') return;
    const nameEl = document.getElementById('removeSectionName');
    if (nameEl) nameEl.textContent = wrapper.querySelector('.layout-section-label')?.textContent?.trim() || sectionId;
    const modal = document.getElementById('removeSectionModal');
    if (modal) modal.style.display = 'flex';
    const confirmBtn = document.getElementById('confirmRemoveSection');
    if (confirmBtn) {
      const newBtn = confirmBtn.cloneNode(true);
      confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
      newBtn.addEventListener('click', () => {
        wrapper.remove();
        const panel = document.getElementById('layoutInspectorPanel');
        if (panel) panel.style.display = 'none';
        modal.style.display = 'none';
      });
    }
  });
}

// Export navigate for screen modules
window.docAutoNavigate = navigate;
renderApp();
