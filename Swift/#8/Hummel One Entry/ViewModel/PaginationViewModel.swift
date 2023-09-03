import Foundation
import OSLog
import SwiftUI

class PaginationViewModel: ObservableObject {
    
    private let limit: Int
    
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
    
    func loadMore(marker: Any? = nil, endpoint: OneEntryProvider.Endpoint? = nil) async {
        
        do {
            
            if let total = total, paginationPage * limit >= total {
                
                throw PaginationError.end_pagination
            }
            
            let result: ProductResultModel = try await OneEntryProvider.getPaginationItems(marker, endpoint: endpoint, offset: paginationPage, limit: limit)
            
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
