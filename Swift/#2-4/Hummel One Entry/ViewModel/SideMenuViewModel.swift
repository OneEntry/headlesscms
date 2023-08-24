import Foundation

class SideMenuViewModel: ObservableObject {
    
    @Published var currentScreen: MenuItem = .home
    @Published var menuActive: Bool = false
    
    enum MenuItem: String, CaseIterable {
        
        case home = "Home"
        
        var icon: String {
            
            switch self {
                case .home: return "house"
            }
        }
    }
    
    static let shared: SideMenuViewModel = .init()
    
    private init() {  }
}
