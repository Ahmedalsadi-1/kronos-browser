import SwiftUI

struct HomeView: View {
    @Environment(\.theme) var theme
    @EnvironmentObject private var tabManager: TabManager
    @EnvironmentObject private var historyManager: HistoryManager
    @EnvironmentObject private var downloadManager: DownloadManager
    @EnvironmentObject private var privacyMode: PrivacyMode
    @EnvironmentObject private var sidebarManager: SidebarManager


    @State private var searchText: String = ""
    @FocusState private var isSearchFieldFocused: Bool

    private func performSearch() {
        guard !searchText.isEmpty else { return }
        
        // Simple URL validation (can be improved)
        if let url = URL(string: searchText), (url.scheme == "http" || url.scheme == "https") {
            tabManager.openTab(url: url, historyManager: historyManager, downloadManager: downloadManager, isPrivate: privacyMode.isPrivate)
        } else {
            // Default to Google search if not a valid URL
            let searchUrlString = "https://www.google.com/search?q=\(searchText.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? "")"
            if let searchUrl = URL(string: searchUrlString) {
                tabManager.openTab(url: searchUrl, historyManager: historyManager, downloadManager: downloadManager, isPrivate: privacyMode.isPrivate)
            }
        }
    }

    var body: some View {
        VStack(spacing: 24) {
            Spacer()

            VStack(spacing: 16) {
                Image("KronosLogo") // Assuming "KronosLogo" is already in Assets.xcassets
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 128, height: 128)
                    .shadow(color: .black.opacity(0.5), radius: 20, x: 0, y: 10)
                
                Text("Less noise, more browsing.")
                    .font(.system(size: 16, weight: .medium, design: .rounded))
                    .foregroundColor(.white.opacity(0.7))
            }
            .padding(.bottom, 16)

            HStack {
                Image(systemName: "magnifyingglass")
                    .foregroundColor(.gray)
                    .padding(.leading, 8)
                
                TextField("Search the web or enter url...", text: $searchText, onCommit: performSearch)
                    .textFieldStyle(PlainTextFieldStyle())
                    .focused($isSearchFieldFocused)
                    .font(.system(size: 18))
                    .foregroundColor(.white.opacity(0.9))
                
                if !searchText.isEmpty {
                    Button(action: { searchText = "" }) {
                        Image(systemName: "xmark.circle.fill")
                            .foregroundColor(.gray)
                    }
                    .buttonStyle(PlainButtonStyle())
                }
            }
            .frame(width: 500)
            .padding(10)
            .background(Color.white.opacity(0.1))
            .cornerRadius(10)
            .shadow(color: .black.opacity(0.3), radius: 10, x: 0, y: 5)
            .overlay(
                RoundedRectangle(cornerRadius: 10)
                    .stroke(Color.white.opacity(0.2), lineWidth: 1)
            )

            Spacer()
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(hex: "#1E1E1E")) // Deep dark background
        .onAppear {
            isSearchFieldFocused = true
        }
    }
}