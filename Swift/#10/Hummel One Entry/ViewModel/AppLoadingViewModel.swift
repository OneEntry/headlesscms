import Foundation
import Combine

struct PagesProviderModel {
    
    fileprivate let items: [Page : MenuViewModel]
    
    enum Page: CaseIterable {
        
        case home
        case blog
        
        fileprivate var viewModel: MenuViewModel {
            
            switch self {
                case .home: return .init(.categories)
                case .blog: return .init(.blog)
            }
        }
    }
    
    fileprivate init() {
        
        self.items = Dictionary(uniqueKeysWithValues: Page.allCases.map { ($0, $0.viewModel) })
    }
    
    func getViewModel(for page: Page) -> MenuViewModel {
        
        items[page]!
    }
}

final class AppLoadingViewModel: ObservableObject {
    
    @Published private(set) var loading = true
    
    let pages: PagesProviderModel = .init()
    
    private var cancellable: Set<AnyCancellable> = .init()
    private var menusLoadingPublisher: AnyPublisher<Bool, Never> {
        
        let publishers = pages.items.values.map { $0.loadingPublisher }
        
        let publisher = publishers.dropFirst().reduce(into: AnyPublisher(publishers[0])) { partialResult, next in
            
            partialResult = partialResult
                .combineLatest(next) { next, result in
                    
                    result && next
                }
                .eraseToAnyPublisher()
        }
        
        return publisher
    }
    
    init() {
        
        menusLoadingPublisher
            .removeDuplicates()
            .receive(on: RunLoop.main)
            .assign(to: \.loading, on: self)
            .store(in: &cancellable)
    }
    
    @Sendable
    func loadPages() async {
        
        await withTaskGroup(of: Void.self) { group in
            
            for page in PagesProviderModel.Page.allCases {
                
                group.addTask {
                    
                    await self.pages.getViewModel(for: page).loadPages()
                }
            }
        }
    }
}
