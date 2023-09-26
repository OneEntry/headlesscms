import Foundation
import SwiftUI

struct ContentLanguageKey: EnvironmentKey {
    
    static var defaultValue: AppViewModel.ContentLanguage = .en_US
}

extension EnvironmentValues {
    
    var contentLanguage: AppViewModel.ContentLanguage {
        get { self[ContentLanguageKey.self] }
        set { self[ContentLanguageKey.self] = newValue }        
    }
}

class AppViewModel: ObservableObject {
    
    @Published var contentLanguage: ContentLanguage = .en_US
    
    private init() { }
    
    static let shared: AppViewModel = .init()
}

extension AppViewModel {
    
    enum ContentLanguage: String, CaseIterable {
        
        case en_US
        case es_ES
        
        var description: String {
            
            switch self {
                case .en_US: return "English"
                case .es_ES: return "Spanish"
            }
        }
    }
}
