//
//  ApplicationViewModel.swift
//  One Entry Preview
//
//  Created by Артур Данилов on 23.07.2023.
//

import Foundation
import Combine

struct PagesModel {
    
    fileprivate let items: [Page : MenuViewModel]
    
    enum Page: CaseIterable {
        
        case home
        case blog
        
        fileprivate var viewModel: MenuViewModel {
            
            switch self {
                case .home: return .init(marker: .categories)
                case .blog: return .init(marker: .blog)
            }
        }
    }
    
    fileprivate init() {
        
        items = Dictionary(uniqueKeysWithValues: Page.allCases.map { ($0, $0.viewModel) })
    }
    
    func getViewModel(for page: Page) -> MenuViewModel {
        
        items[page]!
    }
}

final class ApplicationLoadingViewModel: ObservableObject {
    
    @Published private(set) var loading = true
    
    let pages: PagesModel = .init()
    
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
            
            for page in PagesModel.Page.allCases {
                
                group.addTask {
                    
                    await self.pages.getViewModel(for: page).loadPages()
                }
            }
        }
    }
}
