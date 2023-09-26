import Foundation
import OSLog
import SwiftUI

class PaginationViewModel: ObservableObject {
    
    let limit: Int
    
    @Published private(set) var products: [ProductModel]?
    @Published private(set) var hasMoreItems = true
    @Published private(set) var paginationPage = 0
    @Published private(set) var total: Int? = nil
    
    enum PaginationError: LocalizedError {
        
        case end_pagination
    }
    
    init(limit: Int = 30) {
        self.limit = limit
    }
    
    func getResult(marker: Any? = nil, endpoint: OneEntryProvider.Endpoint? = nil) async throws -> ProductResultModel {
        
        if let total = total, paginationPage * limit >= total {
            
            throw PaginationError.end_pagination
        }
        
        return try await OneEntryProvider.getPaginationItems(marker, endpoint: endpoint, offset: paginationPage, limit: limit)
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
    
    func reset() {
        
        products = nil
        hasMoreItems = true
        paginationPage = 0
        total = nil
    }
}
