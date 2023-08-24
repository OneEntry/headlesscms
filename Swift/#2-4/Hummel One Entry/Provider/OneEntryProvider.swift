import Foundation

protocol OneEntryModel {
    
    static var endpoint: String { get set }
}

class OneEntryProvider {
    
    static private let domain = "https://hummel-mobile.oneentry.cloud/api/content"
    
    enum Endpoint: String {
        
        case marker = "/marker"
    }
    
    enum OneEntryProviderError: LocalizedError {
        
        case errorWithDescription(String)
        
        var errorDescription: String? {
            
            switch self {
                case .errorWithDescription(let description): return description
            }
        }
    }
    
    static func getItems<Result: OneEntryModel & Decodable>(_ marker: Any? = nil,
                                                            endpoint: Endpoint? = nil
    ) async throws -> Result {
        
        let url = domain + Result.endpoint + (endpoint?.rawValue ?? "") + "/" + String(describing: marker ?? "")
        let response = try await NetworkProvider.request(url)
        
        return try handleError(response.data)
    }
    
    static private func handleError<Result: Decodable>(_ data: Data) throws -> Result {
        
        let decoder: JSONDecoder = .init()
        let error = try? decoder.decode(OneEntryError.self, from: data)
        
        if let message = error?.message {
            
            throw OneEntryProviderError.errorWithDescription(message)
        }
        
        return try decoder.decode(Result.self, from: data)
    }
}
