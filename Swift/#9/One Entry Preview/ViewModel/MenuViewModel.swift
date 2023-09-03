//
//  PagesViewModel.swift
//  One Entry Preview
//
//  Created by Артур Данилов on 21.07.2023.
//

import Foundation
import Combine
import OSLog

final class MenuViewModel: ObservableObject {
    
    private let marker: MenuMarker
    
    @Published private(set) var pages: [PageModel]?
    
    enum MenuMarker: String {
        
        case categories
        case blog
    }
    
    var loadingPublisher: AnyPublisher<Bool, Never> {
        
        $pages
            .map { $0 == nil }
            .removeDuplicates()
            .eraseToAnyPublisher()
    }
    
    init(marker: MenuMarker, pages: [PageModel]? = nil) {
        
        self.marker = marker
        self.pages = pages
    }
    
    @Sendable
    func loadPages() async {
        
        do {
            
            let menu: MenuModel = try await OneEntryProvider.getItems(marker.rawValue, endpoint: .marker)
            
            // Данный кусок отвечает за получение первых продуктов у каждой категории
            await withTaskGroup(of: Void.self) { group in
                
                for page in menu.pages {
                    
                    group.addTask { await page.viewModel.loadMore(marker: page.pageUrl, endpoint: .page_by_url) }
                }
            }
            
            DispatchQueue.main.async {
                                
                self.pages = menu.pages
            }
            
        } catch {
            
            Logger().error("\(error)")
        }
    }
}
