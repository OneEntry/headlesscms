import SwiftUI

struct BlogsView: View {
    
    @EnvironmentObject var menuViewModel: MenuViewModel
    
    var body: some View {
        
        NavigationView {
            
            ScrollView {
                
                if let pages = menuViewModel.pages {
                    
                    VStack {
                        
                        ForEach(pages) { page in
                            
                            BlogView(marker: page.pageUrl)
                        }
                    }
                    .padding()
                }
            }
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

#Preview {
    ContentView()
}
