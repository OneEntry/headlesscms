import Foundation

class SideMenuViewModel: ObservableObject {
    
    @Published var currentScreen: MenuItem = .home
    @Published var menuActive: Bool = false
    
    enum MenuItem: String, CaseIterable {
        
        case home = "Home"
        case blog = "Blog"
        case settings = "Settings"
        
        var icon: String {
            
            switch self {
                case .home: return "house"
                case .blog: return "list"
                case .settings: return "gear"
            }
        }
    }
    
    static let shared: SideMenuViewModel = .init()
    
    private init() {  }
}
