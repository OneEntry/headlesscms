import SwiftUI

struct HomeView: View {
    
    @EnvironmentObject var pageViewModel: MenuViewModel
    
    var body: some View {
        
        NavigationView {
            
            Group {
                
                if let pages = pageViewModel.pages {
                    
                    List(pages) { page in
                        
                        Text(page.pageUrl)
                    }
                }
            }
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
    HomeView()
        .environmentObject(MenuViewModel.init(.categories))
}
