import SwiftUI

struct ContentView: View {
    
    @ObservedObject private var sideMenuViewModel: SideMenuViewModel = .shared
    @ObservedObject private var appLoadingViewModel: AppLoadingViewModel = .init()
    
    var body: some View {
        
        if !appLoadingViewModel.loading {
            
            let width = UIScreen.main.bounds.width
            let sideMenuActive = sideMenuViewModel.menuActive
            
            ZStack {
                
                SideMenu()
                    .environmentObject(sideMenuViewModel)
                
                ZStack {
                    
                    switch sideMenuViewModel.currentScreen {
                            
                        case .home:
                            HomeView()
                                .environmentObject(appLoadingViewModel.pages.getViewModel(for: .home))
                            
                        case .blog:
                            BlogsView()
                                .environmentObject(appLoadingViewModel.pages.getViewModel(for: .blog))
                    }
                }
                .overlay(.white.opacity(sideMenuActive ? 1 : 0))
                .overlay(alignment: .topLeading) {
                    
                    Button(action: { sideMenuViewModel.menuActive.toggle() }) {
                        
                        Image(systemName: "xmark")
                            .font(.footnote.bold())
                    }
                    .padding()
                    .opacity(sideMenuActive ? 1 : 0)
                }
                .cornerRadius(sideMenuActive ? 20 : 0)
                .shadow(radius: sideMenuActive ? 20 : 0)
                .offset(x: sideMenuActive ? width - 100 : 0)
                .ignoresSafeArea(.all, edges: sideMenuActive ? [] : .vertical)
                .animation(.spring, value: sideMenuActive)
            }
        } else {
            
            ProgressView()
                .task(appLoadingViewModel.loadPages)
        }
    }
}

#Preview {
    ContentView()
}

