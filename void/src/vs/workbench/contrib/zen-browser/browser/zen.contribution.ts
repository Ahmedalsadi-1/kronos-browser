/*--------------------------------------------------------------------------------------
 *  Copyright 2025 Ahmed Alsadi. All rights reserved.
 *  Licensed under the Apache License, Version 2.0. See LICENSE.txt for more information.
 *--------------------------------------------------------------------------------------*/

import { Registry } from '../../../../platform/registry/common/platform.js';
import { WorkbenchPhase, registerWorkbenchContribution2 } from '../../../common/contributions.js';
import { IViewContainersRegistry, ViewContainerLocation, IViewsRegistry, Extensions as ViewExtensions } from '../../../common/views.js';
import { ViewPaneContainer } from '../../../browser/parts/views/viewPaneContainer.js';
import { SyncDescriptor } from '../../../../platform/instantiation/common/descriptors.js';
import { Orientation } from '../../../../base/browser/ui/sash/sash.js';
import { Codicon } from '../../../../base/common/codicons.js';
import * as nls from '../../../../nls.js';
import { IViewPaneOptions, ViewPane } from '../../../browser/parts/views/viewPane.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { IViewDescriptorService } from '../../../common/views.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
import { IContextKeyService, ContextKeyExpr } from '../../../../platform/contextkey/common/contextkey.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { IContextMenuService } from '../../../../platform/contextview/browser/contextView.js';
import { IKeybindingService } from '../../../../platform/keybinding/common/keybinding.js';
import { IOpenerService } from '../../../../platform/opener/common/opener.js';
import { ITelemetryService } from '../../../../platform/telemetry/common/telemetry.js';
import { IHoverService } from '../../../../platform/hover/browser/hover.js';
import { Action2, registerAction2 } from '../../../../platform/actions/common/actions.js';
import { ServicesAccessor } from '../../../../editor/browser/editorExtensions.js';
import { ICommandService } from '../../../../platform/commands/common/commands.js';
import { IViewsService } from '../../../services/views/common/viewsService.js';
import { MenuId } from '../../../../platform/actions/common/actions.js';
import { KeybindingWeight } from '../../../../platform/keybinding/common/keybindingsRegistry.js';
import { KeyCode, KeyMod } from '../../../../base/common/keyCodes.js';

// ---------- Constants ----------

export const ZEN_VIEW_CONTAINER_ID = 'workbench.view.zen';
export const ZEN_VIEW_ID = ZEN_VIEW_CONTAINER_ID;
export const ZEN_SIDE_DRAWER_ID = 'workbench.view.zenSideDrawer';

// Context key for IDE mode
export const ZEN_IDE_MODE_CONTEXT_KEY = 'zenIdeMode';
export const IsZenIdeMode = ContextKeyExpr.equals(ZEN_IDE_MODE_CONTEXT_KEY, true);

// ---------- Side Drawer View Pane ----------

class ZenSideDrawerViewPane extends ViewPane {

	constructor(
		options: IViewPaneOptions,
		@IInstantiationService instantiationService: IInstantiationService,
		@IViewDescriptorService viewDescriptorService: IViewDescriptorService,
		@IConfigurationService configurationService: IConfigurationService,
		@IContextKeyService contextKeyService: IContextKeyService,
		@IThemeService themeService: IThemeService,
		@IContextMenuService contextMenuService: IContextMenuService,
		@IKeybindingService keybindingService: IKeybindingService,
		@IOpenerService openerService: IOpenerService,
		@ITelemetryService telemetryService: ITelemetryService,
		@IHoverService hoverService: IHoverService,
	) {
		super(options, keybindingService, contextMenuService, configurationService, contextKeyService, viewDescriptorService, instantiationService, openerService, themeService, hoverService);
	}

	protected override renderBody(parent: HTMLElement): void {
		super.renderBody(parent);
		parent.style.overflow = 'hidden';
		parent.style.display = 'flex';
		parent.style.flexDirection = 'column';
		parent.style.height = '100%';

		// Create the side drawer container
		const drawerContainer = document.createElement('div');
		drawerContainer.className = 'zen-side-drawer';
		drawerContainer.style.cssText = `
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			background: var(--vscode-sideBackground);
		`;
		parent.appendChild(drawerContainer);

		// Terminal icon button at top-left
		const terminalButton = document.createElement('div');
		terminalButton.className = 'zen-terminal-button';
		terminalButton.innerHTML = `
			<div class="zen-terminal-icon">${Codicon.terminal.toString()}</div>
			<div class="zen-terminal-label">TERMINAL</div>
		`;
		terminalButton.style.cssText = `
			display: flex;
			align-items: center;
			gap: 8px;
			padding: 12px 16px;
			cursor: pointer;
			color: var(--vscode-foreground);
			font-size: 11px;
			font-weight: 600;
			letter-spacing: 1px;
			border-bottom: 1px solid var(--vscode-sideBarSectionHeader-border);
			transition: background-color 0.15s ease;
		`;
		terminalButton.onmouseenter = () => {
			terminalButton.style.backgroundColor = 'var(--vscode-list-hoverBackground)';
		};
		terminalButton.onmouseleave = () => {
			terminalButton.style.backgroundColor = '';
		};
		drawerContainer.appendChild(terminalButton);

		// IDE Mode button
		const ideModeButton = document.createElement('div');
		ideModeButton.className = 'zen-ide-mode-button';
		ideModeButton.innerHTML = `
			<div class="zen-ide-mode-icon">🚀</div>
			<div class="zen-ide-mode-label">IDE MODE</div>
		`;
		ideModeButton.style.cssText = `
			display: flex;
			align-items: center;
			gap: 8px;
			padding: 12px 16px;
			cursor: pointer;
			color: var(--vscode-foreground);
			font-size: 11px;
			font-weight: 600;
			letter-spacing: 1px;
			margin: 8px;
			border-radius: 6px;
			background: linear-gradient(135deg, #667eea, #764ba2);
			color: white;
			transition: transform 0.15s ease, box-shadow 0.15s ease;
		`;
		ideModeButton.onmouseenter = () => {
			ideModeButton.style.transform = 'translateY(-1px)';
			ideModeButton.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
		};
		ideModeButton.onmouseleave = () => {
			ideModeButton.style.transform = '';
			ideModeButton.style.boxShadow = '';
		};
		drawerContainer.appendChild(ideModeButton);

		// Panel toggle buttons container
		const panelToggleContainer = document.createElement('div');
		panelToggleContainer.className = 'zen-panel-toggles';
		panelToggleContainer.style.cssText = `
			flex: 1;
			overflow-y: auto;
			padding: 8px 0;
		`;
		drawerContainer.appendChild(panelToggleContainer);

		// Define panel toggles
		const panelToggles = [
			{ id: 'files', icon: Codicon.files, label: 'Files', viewId: 'workbench.files.explorer' },
			{ id: 'search', icon: Codicon.search, label: 'Search', viewId: 'workbench.search.searchView' },
			{ id: 'debug', icon: Codicon.debugAlt, label: 'Debug', viewId: 'workbench.debug.viewlet' },
			{ id: 'extensions', icon: Codicon.extensions, label: 'Extensions', viewId: 'workbench.extensions.gui' },
			{ id: 'terminal', icon: Codicon.terminal, label: 'Terminal', viewId: 'workbench.panel.terminal' },
			{ id: 'output', icon: Codicon.output, label: 'Output', viewId: 'workbench.panel.output' },
			{ id: 'problems', icon: Codicon.warning, label: 'Problems', viewId: 'workbench.panel.markers' },
			{ id: 'ai', icon: Codicon.commentDiscussion, label: 'AI Chat', viewId: 'workbench.view.void' },
			{ id: 'outline', icon: Codicon.listTree, label: 'Outline', viewId: 'workbench.outline' },
			{ id: 'settings', icon: Codicon.settings, label: 'Settings', viewId: 'workbench.settings.editor' },
		];

		panelToggles.forEach(toggle => {
			const button = document.createElement('div');
			button.className = `zen-panel-toggle zen-panel-toggle-${toggle.id}`;
			button.innerHTML = `
				<div class="zen-panel-icon">${toggle.icon.toString()}</div>
				<div class="zen-panel-label">${toggle.label}</div>
			`;
			button.style.cssText = `
				display: flex;
				align-items: center;
				gap: 12px;
				padding: 10px 16px;
				cursor: pointer;
				color: var(--vscode-foreground);
				font-size: 13px;
				transition: background-color 0.15s ease;
			`;
			button.onmouseenter = () => {
				button.style.backgroundColor = 'var(--vscode-list-hoverBackground)';
			};
			button.onmouseleave = () => {
				button.style.backgroundColor = '';
			};
			button.onclick = () => {
				// Toggle the panel
				this.instantiationService.invokeFunction(accessor => {
					const viewsService = accessor.get(IViewsService);
					const commandService = accessor.get(ICommandService);
					viewsService.openViewContainer(toggle.viewId).then(() => {
						commandService.executeCommand('workbench.action.togglePanel');
					});
				});
			};
			panelToggleContainer.appendChild(button);
		});

		// IDE Mode toggle logic
		ideModeButton.onclick = () => {
			this.instantiationService.invokeFunction(accessor => {
				const contextKeyService = accessor.get(IContextKeyService);
				const currentValue = contextKeyService.getContextKeyValue<boolean>(ZEN_IDE_MODE_CONTEXT_KEY);
				const newValue = !currentValue;
				
				// Toggle the context key
				contextKeyService.createKey(ZEN_IDE_MODE_CONTEXT_KEY, newValue);
				
				// Update button appearance
				if (newValue) {
					ideModeButton.innerHTML = `
						<div class="zen-ide-mode-icon">🖥️</div>
						<div class="zen-ide-mode-label">BROWSER MODE</div>
					`;
					ideModeButton.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
					
					// Show IDE panels
					const commandService = accessor.get(ICommandService);
					commandService.executeCommand('workbench.action.toggleAuxiliaryBar');
					commandService.executeCommand('workbench.files.action.focusFilesExplorer');
				} else {
					ideModeButton.innerHTML = `
						<div class="zen-ide-mode-icon">🚀</div>
						<div class="zen-ide-mode-label">IDE MODE</div>
					`;
					ideModeButton.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
					
					// Hide IDE panels
					const commandService = accessor.get(ICommandService);
					commandService.executeCommand('workbench.action.toggleAuxiliaryBar');
				}
			});
		};
	}

	protected override layoutBody(height: number, width: number): void {
		super.layoutBody(height, width);
		this.element.style.height = `${height}px`;
		this.element.style.width = `${width}px`;
	}
}

// ---------- Register View Container and Views ----------

// Register view container
const viewContainerRegistry = Registry.as<IViewContainersRegistry>(ViewExtensions.ViewContainersRegistry);
const sideDrawerContainer = viewContainerRegistry.registerViewContainer({
	id: ZEN_SIDE_DRAWER_ID,
	title: nls.localize2('zenSideDrawer', 'Tools'),
	ctorDescriptor: new SyncDescriptor(ViewPaneContainer, [ZEN_SIDE_DRAWER_ID, {
		mergeViewWithContainerWhenSingleView: true,
		orientation: Orientation.VERTICAL,
	}]),
	hideIfEmpty: true,
	order: 0,
	icon: Codicon.symbolProperty,
}, ViewContainerLocation.AuxiliaryBar, { doNotRegisterOpenCommand: true, isDefault: false });

// Register side drawer view
const viewsRegistry = Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry);
viewsRegistry.registerViews([{
	id: ZEN_SIDE_DRAWER_ID,
	hideByDefault: true,
	name: nls.localize2('zenTools', 'Tools'),
	ctorDescriptor: new SyncDescriptor(ZenSideDrawerViewPane),
	canToggleVisibility: false,
	canMoveView: false,
	weight: 100,
	order: 1,
}], sideDrawerContainer);

// ---------- Workbench Contributions ----------

interface IWorkbenchContribution {}

export class ZenBrowserStartupContribution implements IWorkbenchContribution {
	static readonly ID = 'workbench.contrib.zenBrowser';
	constructor(
		@ICommandService commandService: ICommandService,
		@IViewsService viewsService: IViewsService,
	) {
		// Initialize with IDE mode off (browser only)
		// Browser will be shown by default as the main content
	}
}
registerWorkbenchContribution2(ZenBrowserStartupContribution.ID, ZenBrowserStartupContribution, WorkbenchPhase.AfterRestored);

// ---------- Actions ----------

// Toggle side drawer
export const ZEN_TOGGLE_DRAWER_ACTION_ID = 'zen.toggleDrawer';
registerAction2(class extends Action2 {
	constructor() {
		super({
			id: ZEN_TOGGLE_DRAWER_ACTION_ID,
			title: nls.localize2('zenToggleDrawer', 'Toggle Zen Side Drawer'),
			keybinding: {
				primary: KeyMod.CtrlCmd | KeyCode.KeyB,
				weight: KeybindingWeight.WorkbenchContrib
			}
		});
	}
	run(accessor: ServicesAccessor): void {
		const viewsService = accessor.get(IViewsService);
		const isVisible = viewsService.isViewContainerVisible(ZEN_SIDE_DRAWER_ID);
		if (isVisible) {
			viewsService.closeViewContainer(ZEN_SIDE_DRAWER_ID);
		} else {
			viewsService.openViewContainer(ZEN_SIDE_DRAWER_ID);
		}
	}
});

// Focus URL bar
export const ZEN_FOCUS_URL_BAR_ACTION_ID = 'zen.focusUrlBar';
registerAction2(class extends Action2 {
	constructor() {
		super({
			id: ZEN_FOCUS_URL_BAR_ACTION_ID,
			title: nls.localize2('zenFocusUrlBar', 'Focus URL Bar'),
			keybinding: {
				primary: KeyMod.CtrlCmd | KeyCode.KeyL,
				weight: KeybindingWeight.WorkbenchContrib
			}
		});
	}
	run(accessor: ServicesAccessor): void {
		// Dispatch event to focus URL bar in the browser view
		const event = new CustomEvent('zen-focus-url-bar');
		window.dispatchEvent(event);
	}
});

// New tab
export const ZEN_NEW_TAB_ACTION_ID = 'zen.newTab';
registerAction2(class extends Action2 {
	constructor() {
		super({
			id: ZEN_NEW_TAB_ACTION_ID,
			title: nls.localize2('zenNewTab', 'New Browser Tab'),
			keybinding: {
				primary: KeyMod.CtrlCmd | KeyCode.KeyT,
				weight: KeybindingWeight.WorkbenchContrib,
				when: IsZenIdeMode
			},
			menu: [{ id: MenuId.ViewTitle, group: 'navigation', when: ContextKeyExpr.equals('view', ZEN_VIEW_ID) }]
		});
	}
	run(accessor: ServicesAccessor): void {
		const event = new CustomEvent('zen-new-tab');
		window.dispatchEvent(event);
	}
});

// Toggle IDE Mode
export const ZEN_TOGGLE_IDE_MODE_ACTION_ID = 'zen.toggleIdeMode';
registerAction2(class extends Action2 {
	constructor() {
		super({
			id: ZEN_TOGGLE_IDE_MODE_ACTION_ID,
			title: nls.localize2('zenToggleIdeMode', 'Toggle IDE Mode'),
			keybinding: {
				primary: KeyMod.CtrlCmd | KeyCode.KeyI,
				weight: KeybindingWeight.WorkbenchContrib
			}
		});
	}
	run(accessor: ServicesAccessor): void {
		const contextKeyService = accessor.get(IContextKeyService);
		const currentValue = contextKeyService.getContextKeyValue<boolean>(ZEN_IDE_MODE_CONTEXT_KEY);
		const newValue = !currentValue;
		contextKeyService.createKey(ZEN_IDE_MODE_CONTEXT_KEY, newValue);
		
		const commandService = accessor.get(ICommandService);
		if (newValue) {
			commandService.executeCommand('workbench.action.toggleAuxiliaryBar');
		} else {
			commandService.executeCommand('workbench.action.toggleAuxiliaryBar');
		}
	}
});
