//
//  PaginationViewModel.swift
//  One Entry Preview
//
//  Created by Артур Данилов on 21.07.2023.
//

import Foundation
import SwiftUI
import OSLog

class PaginationViewModel: ObservableObject {
    
    let limit: Int
    
    @Published private(set) var products: [ProductModel]?
    @Published private(set) var hasMoreItems: Bool = true
    @Published private(set) var paginationPage: Int = 0
    @Published private(set) var total: Int?
    
    enum PaginationError: LocalizedError {
        
        case end_pagination
    }
    
    init(limit: Int = 30) {
        self.limit = limit
    }
    
    func getResult(marker: Any? = nil, endpoint: OneEntryProvider.Endpoint? = nil) async throws -> ProductsResultModel {
        
        if let total = total, paginationPage * limit >= total {
            
            throw PaginationError.end_pagination
        }
        
        return try await OneEntryProvider.getPaginationItems(marker, endpoint: endpoint, offset: paginationPage, limit: limit)
    }
    
    func reset() {
        
        products = nil
        hasMoreItems = true
        paginationPage = 0
        total = nil
    }
    
    func loadMore(marker: Any? = nil, endpoint: OneEntryProvider.Endpoint? = nil) async {
        
        do {
            
            let result = try await getResult(marker: marker, endpoint: endpoint)
            
            DispatchQueue.main.async {
                
                withAnimation {
                    
                    self.products = result.items
                    self.total = result.total
                }
            }
            
        } catch PaginationError.end_pagination {
            
            Logger().info("Pagination End")
            
        } catch {
            
            Logger().error("\(error)")
        }
    }
}
