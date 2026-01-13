import AppKit
import SwiftData
import SwiftUI

struct SidebarView: View {
    @Environment(\.theme) private var theme
    @Environment(\.window) var window: NSWindow?
    @EnvironmentObject var tabManager: TabManager
    @EnvironmentObject var historyManager: HistoryManager
    @EnvironmentObject var downloadManager: DownloadManager
    @EnvironmentObject var appState: AppState
    @EnvironmentObject var privacyMode: PrivacyMode
    @EnvironmentObject var media: MediaController
    @EnvironmentObject var sidebarManager: SidebarManager
    @EnvironmentObject var toolbarManager: ToolbarManager

    @Query var containers: [TabContainer]
    @Query(filter: nil, sort: [.init(\History.lastAccessedAt, order: .reverse)])
    var histories: [History]

    private let columns = Array(repeating: GridItem(spacing: 10), count: 3)

    @State private var isHoveringSidebarToggle = false
    @State private var isAgentPresented = false

    private var shouldShowMediaWidget: Bool {
        let activeId = tabManager.activeTab?.id
        let others = media.visibleSessions.filter { session in
            guard let activeId else { return true }
            return session.tabID != activeId
        }
        return media.isVisible && !others.isEmpty
    }

    private var selectedContainerIndex: Binding<Int> {
        Binding(
            get: {
                guard let activeContainer = tabManager.activeContainer else {
                    return 0
                }
                return containers.firstIndex { $0.id == activeContainer.id } ?? 0
            },
            set: { newIndex in
                guard newIndex >= 0, newIndex < containers.count else { return }
                tabManager.activateContainer(containers[newIndex])
            }
        )
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            SidebarToolbar()
            NSPageView(
                selection: selectedContainerIndex,
                pageObjects: containers,
                idKeyPath: \.name
            ) { container in
                ContainerView(
                    container: container,
                    selectedContainer: container.name,
                    containers: containers
                )
                .padding(.horizontal, 10)
                .environmentObject(tabManager)
                .environmentObject(historyManager)
                .environmentObject(downloadManager)
                .environmentObject(appState)
                .environmentObject(privacyMode)
                .environmentObject(toolbarManager)
            }

            if shouldShowMediaWidget {
                GlobalMediaPlayer()
                    .environmentObject(media)
                    .padding(.horizontal, 10)
                    .transition(.move(edge: .bottom).combined(with: .opacity))
            }

            // Embedded Kronos Agent (Chat Section)
            if isAgentPresented {
                VStack(spacing: 0) {
                    // Chat Header
                    HStack {
                        Text("CHAT")
                            .font(.system(size: 11, weight: .bold))
                            .foregroundColor(.gray)
                        Spacer()
                        HStack(spacing: 12) {
                            Button(action: {}) { Image(systemName: "plus") }
                            Button(action: {}) { Image(systemName: "clock") }
                            Button(action: {}) { Image(systemName: "gearshape") }
                            Button(action: { withAnimation { isAgentPresented = false } }) { Image(systemName: "xmark") }
                        }
                        .font(.system(size: 12))
                        .foregroundColor(.gray)
                    }
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)

                    AgentView(url: URL(string: "http://localhost:9100")!)
                        .frame(minHeight: 350)
                        .cornerRadius(8)
                        .padding(.horizontal, 10)
                        .padding(.bottom, 8)
                }
                .background(Color.black.opacity(0.2))
                .cornerRadius(12)
                .padding(.horizontal, 8)
                .transition(.move(edge: .bottom).combined(with: .opacity))
            }

            if !privacyMode.isPrivate {
                HStack {
                    DownloadsWidget()
                    Spacer()
                    ContainerSwitcher(onContainerSelected: onContainerSelected)
                    Spacer()
                    
                    // Kronos Assistant Toggle
                    Button(action: {
                        withAnimation {
                            isAgentPresented.toggle()
                        }
                    }) {
                        Image("KronosLogo")
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 32, height: 32)
                            .opacity(isAgentPresented ? 1.0 : 0.6)
                            .background(
                                Circle()
                                    .fill(isAgentPresented ? Color.accentColor.opacity(0.2) : Color.clear)
                                    .frame(width: 40, height: 40)
                            )
                    }
                    .buttonStyle(.plain)
                    .help("Toggle Kronos Assistant")
                    .padding(.trailing, 8)

                    NewContainerButton()
                }
                .padding(.horizontal, 10)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .padding(
            EdgeInsets(
                top: toolbarManager.isToolbarHidden ? 10 : 0,
                leading: 0,
                bottom: 10,
                trailing: 0
            )
        )
        .onTapGesture(count: 2) {
            toggleMaximizeWindow()
        }
    }

    private func onContainerSelected(container: TabContainer) {
        withAnimation(.easeOut(duration: 0.1)) {
            tabManager.activateContainer(container)
        }
    }

    private func toggleMaximizeWindow() {
        window?.toggleMaximized()
    }
}

import WebKit

struct AgentView: NSViewRepresentable {
    let url: URL

    func makeNSView(context: Context) -> WKWebView {
        let webView = WKWebView()
        webView.load(URLRequest(url: url))
        return webView
    }

    func updateNSView(_ nsView: WKWebView, context: Context) {
        // No update logic needed for static URL
    }
}

struct AgentPopoverView: View {
    var body: some View {
        AgentView(url: URL(string: "http://localhost:9100")!)
            .frame(width: 450, height: 600)
    }
}
