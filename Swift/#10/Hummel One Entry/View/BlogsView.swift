import SwiftUI

struct BlogsView: View {
    
    @ObservedObject private var searchViewModel: SearchViewModel<PageModel> = .init()
    
    var body: some View {
        
        NavigationView {
            
            BlogsViewContent()
                .environmentObject(searchViewModel)
                .searchable(text: $searchViewModel.text)
                .navigationTitle("Blog")
                .navigationBarTitleDisplayMode(.inline)
                .toolbar {
                    
                    ToolbarItem(placement: .topBarLeading) {
                        
                        Button(action: { SideMenuViewModel.shared.menuActive.toggle() }) {
                            
                            Image(systemName: "line.3.horizontal")
                        }
                    }
                }
        }
    }
}

struct BlogsViewContent: View {
    
    @EnvironmentObject var menuViewModel: MenuViewModel
    @EnvironmentObject var searchViewModel: SearchViewModel<PageModel>
    
    @Environment(\.isSearching) var isSearching
    
    var body: some View {
        
        ScrollView {
            
            VStack {
                
                if isSearching {
                    
                    ForEach(searchViewModel.results) { result in
                        
                        BlogView(id: result.id)
                    }
                    
                } else {
                    
                    if let pages = menuViewModel.pages {
                        
                        ForEach(pages) { page in
                            
                            BlogView(id: page.id)
                        }
                    }
                }
            }
            .padding()
        }
    }
}

#Preview {
    ContentView()
}
