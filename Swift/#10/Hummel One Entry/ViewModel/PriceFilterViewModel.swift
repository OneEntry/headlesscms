import Foundation

final class PriceFilterViewModel: PaginationViewModel {
    
    @Published var lowLimit: Double = 0
    @Published var hightLimit: Double = 1000
    
    override func getResult(marker: Any? = nil, endpoint: OneEntryProvider.Endpoint? = nil) async throws -> ProductResultModel {
        
        if let total = total, paginationPage * limit >= total {
            
            throw PaginationError.end_pagination
        }
        
        let lowFilter: FilterModel = .init(attributeMarker: "price", conditionMarker: .mth, conditionValue: lowLimit, pageId: 0)
        let hightFilter: FilterModel = .init(attributeMarker: "price", conditionMarker: .lth, conditionValue: hightLimit, pageId: 0)
        
        return try await OneEntryProvider.filter([lowFilter, hightFilter], offset: paginationPage, limit: limit)
    }
}
