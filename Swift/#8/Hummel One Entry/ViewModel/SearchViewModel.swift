import Foundation
import Combine
import OSLog
import SwiftUI

class SearchViewModel<Result: OneEntryModel>: ObservableObject {
    
    @Published var text = ""
    
    @Published private(set) var results: [SearchResult] = []
    
    private var cancellable: Set<AnyCancellable> = .init()
    
    init() {
        
        $text
            .debounce(for: 0.4, scheduler: RunLoop.main)
            .removeDuplicates()
            .eraseToAnyPublisher()
            .receive(on: RunLoop.main)
            .sink { text in
                
                Task {
                    
                    do {
                        
                        let results = try await OneEntryProvider.quickSearch(text, for: Result.self)
                        
                        DispatchQueue.main.async {
                            
                            withAnimation {
                                
                                self.results = results
                            }
                        }
                        
                    } catch {
                        
                        Logger().error("\(error)")
                    }
                }
            }
            .store(in: &cancellable)
    }
}
