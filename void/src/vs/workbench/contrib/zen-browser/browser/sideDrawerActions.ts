/*--------------------------------------------------------------------------------------
 *  Copyright 2025 Ahmed Alsadi. All rights reserved.
 *  Licensed under the Apache License, Version 2.0. See LICENSE.txt for more information.
 *--------------------------------------------------------------------------------------*/

// Side drawer actions for Zen Browser

import { KeyCode, KeyMod } from '../../../../base/common/keyCodes.js';
import { Action2, registerAction2 } from '../../../../platform/actions/common/actions.js';
import { ServicesAccessor } from '../../../../editor/browser/editorExtensions.js';
import { KeybindingWeight } from '../../../../platform/keybinding/common/keybindingsRegistry.js';
import { IViewsService } from '../../../services/views/common/viewsService.js';
import { ICommandService } from '../../../../platform/commands/common/commands.js';
import { ZEN_IDE_MODE_CONTEXT_KEY } from './zen.contribution.js';
import { ContextKeyExpr } from '../../../../platform/contextkey/common/contextkey.js';
import * as nls from '../../../../nls.js';

// Open Files Explorer
registerAction2(class extends Action2 {
	constructor() {
		super({
			id: 'zen.openFilesExplorer',
			title: nls.localize2('zenOpenFiles', 'Open Files Explorer'),
			keybinding: {
				primary: KeyMod.CtrlCmd | KeyCode.KeyE,
				weight: KeybindingWeight.WorkbenchContrib
			}
		});
	}
	run(accessor: ServicesAccessor): void {
		const viewsService = accessor.get(IViewsService);
		viewsService.openViewContainer('workbench.files.explorer');
	}
});

// Open Search
registerAction2(class extends Action2 {
	constructor() {
		super({
			id: 'zen.openSearch',
			title: nls.localize2('zenOpenSearch', 'Open Search'),
			keybinding: {
				primary: KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KeyF,
				weight: KeybindingWeight.WorkbenchContrib
			}
		});
	}
	run(accessor: ServicesAccessor): void {
		const viewsService = accessor.get(IViewsService);
		viewsService.openViewContainer('workbench.search.searchView');
	}
});

// Open Terminal
registerAction2(class extends Action2 {
	constructor() {
		super({
			id: 'zen.openTerminal',
			title: nls.localize2('zenOpenTerminal', 'Open Terminal'),
			keybinding: {
				primary: KeyMod.CtrlCmd | KeyCode.Backquote,
				weight: KeybindingWeight.WorkbenchContrib
			}
		});
	}
	run(accessor: ServicesAccessor): void {
		const commandService = accessor.get(ICommandService);
		commandService.executeCommand('workbench.action.terminal.toggleTerminal');
	}
});

// Open Debug
registerAction2(class extends Action2 {
	constructor() {
		super({
			id: 'zen.openDebug',
			title: nls.localize2('zenOpenDebug', 'Open Debug'),
			keybinding: {
				primary: KeyMod.CtrlCmd | KeyCode.KeyD,
				weight: KeybindingWeight.WorkbenchContrib
			}
		});
	}
	run(accessor: ServicesAccessor): void {
		const viewsService = accessor.get(IViewsService);
		viewsService.openViewContainer('workbench.debug.viewlet');
	}
});

// Open AI Chat
registerAction2(class extends Action2 {
	constructor() {
		super({
			id: 'zen.openAIChat',
			title: nls.localize2('zenOpenAI', 'Open AI Chat'),
			keybinding: {
				primary: KeyMod.CtrlCmd | KeyCode.KeyL,
				weight: KeybindingWeight.WorkbenchContrib
			}
		});
	}
	run(accessor: ServicesAccessor): void {
		const viewsService = accessor.get(IViewsService);
		viewsService.openViewContainer('workbench.view.void');
	}
});

// Open Extensions
registerAction2(class extends Action2 {
	constructor() {
		super({
			id: 'zen.openExtensions',
			title: nls.localize2('zenOpenExtensions', 'Open Extensions'),
			keybinding: {
				primary: KeyMod.CtrlCmd | KeyCode.KeyX,
				weight: KeybindingWeight.WorkbenchContrib
			}
		});
	}
	run(accessor: ServicesAccessor): void {
		const viewsService = accessor.get(IViewsService);
		viewsService.openViewContainer('workbench.extensions.gui');
	}
});

// Go Back
registerAction2(class extends Action2 {
	constructor() {
		super({
			id: 'zen.goBack',
			title: nls.localize2('zenGoBack', 'Go Back'),
			keybinding: {
				primary: KeyMod.Alt | KeyCode.LeftArrow,
				weight: KeybindingWeight.WorkbenchContrib,
				when: ContextKeyExpr.equals(ZEN_IDE_MODE_CONTEXT_KEY, false)
			}
		});
	}
	run(accessor: ServicesAccessor): void {
		const event = new CustomEvent('zen-go-back');
		window.dispatchEvent(event);
	}
});

// Go Forward
registerAction2(class extends Action2 {
	constructor() {
		super({
			id: 'zen.goForward',
			title: nls.localize2('zenGoForward', 'Go Forward'),
			keybinding: {
				primary: KeyMod.Alt | KeyCode.RightArrow,
				weight: KeybindingWeight.WorkbenchContrib,
				when: ContextKeyExpr.equals(ZEN_IDE_MODE_CONTEXT_KEY, false)
			}
		});
	}
	run(accessor: ServicesAccessor): void {
		const event = new CustomEvent('zen-go-forward');
		window.dispatchEvent(event);
	}
});

// Reload Page
registerAction2(class extends Action2 {
	constructor() {
		super({
			id: 'zen.reload',
			title: nls.localize2('zenReload', 'Reload Page'),
			keybinding: {
				primary: KeyMod.CtrlCmd | KeyCode.KeyR,
				weight: KeybindingWeight.WorkbenchContrib,
				when: ContextKeyExpr.equals(ZEN_IDE_MODE_CONTEXT_KEY, false)
			}
		});
	}
	run(accessor: ServicesAccessor): void {
		const event = new CustomEvent('zen-reload');
		window.dispatchEvent(event);
	}
});

// Stop Loading
registerAction2(class extends Action2 {
	constructor() {
		super({
			id: 'zen.stopLoading',
			title: nls.localize2('zenStopLoading', 'Stop Loading'),
			keybinding: {
				primary: KeyCode.Escape,
				weight: KeybindingWeight.WorkbenchContrib,
				when: ContextKeyExpr.equals(ZEN_IDE_MODE_CONTEXT_KEY, false)
			}
		});
	}
	run(accessor: ServicesAccessor): void {
		const event = new CustomEvent('zen-stop-loading');
		window.dispatchEvent(event);
	}
});

// Close Tab
registerAction2(class extends Action2 {
	constructor() {
		super({
			id: 'zen.closeTab',
			title: nls.localize2('zenCloseTab', 'Close Browser Tab'),
			keybinding: {
				primary: KeyMod.CtrlCmd | KeyCode.KeyW,
				weight: KeybindingWeight.WorkbenchContrib,
				when: ContextKeyExpr.equals(ZEN_IDE_MODE_CONTEXT_KEY, false)
			}
		});
	}
	run(accessor: ServicesAccessor): void {
		const event = new CustomEvent('zen-close-tab');
		window.dispatchEvent(event);
	}
});

// Focus Editor (when in browser mode)
registerAction2(class extends Action2 {
	constructor() {
		super({
			id: 'zen.focusEditor',
			title: nls.localize2('zenFocusEditor', 'Focus Editor'),
			keybinding: {
				primary: KeyCode.F6,
				weight: KeybindingWeight.WorkbenchContrib
			}
		});
	}
	run(accessor: ServicesAccessor): void {
		const commandService = accessor.get(ICommandService);
		commandService.executeCommand('workbench.action.focusFirstEditorGroup');
	}
});
