import Foundation
import Combine
import OSLog

final class MenuViewModel: ObservableObject {
    
    private let marker: MenuMarker
    
    @Published private(set) var pages: [PageModel]?
    
    enum MenuMarker: String {
        
        case categories
    }
    
    var loadingPublisher: AnyPublisher<Bool, Never> {
        
        $pages
            .map { $0 == nil }
            .removeDuplicates()
            .eraseToAnyPublisher()
    }
    
    init(_ marker: MenuMarker, pages: [PageModel]? = nil) {
        self.marker = marker
        self.pages = pages
    }
    
    @Sendable
    func loadPages() async {
        
        do {
            
            let menu: MenuModel = try await OneEntryProvider.getItems(marker.rawValue, endpoint: .marker)
            
            DispatchQueue.main.async {
                
                self.pages = menu.pages
            }
            
        } catch {
            
            Logger().error("\(error)")
        }
    }
}
