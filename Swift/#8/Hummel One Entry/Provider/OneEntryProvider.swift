import Foundation

protocol OneEntryModel {
    
    static var endpoint: String { get set }
}

class OneEntryProvider {
    
    static private let domain = "https://hummel-mobile.oneentry.cloud/api/content"
    
    enum Endpoint {
        
        case marker
        case page_by_url
        case related
        case url
        case id
        
        func getEndpoint(_ marker: String) -> String {
            
            switch self {
                case .marker: return "/marker/\(marker)"
                case .page_by_url: return "/page/url/\(marker)"
                case .related: return "/\(marker)/related"
                case .url: return "/url/\(marker)"
                case .id: return "/\(marker)"
            }
        }
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
        
        let marker = String(describing: marker ?? "")
        let url = domain + Result.endpoint + (endpoint?.getEndpoint(marker) ?? "")
        let response = try await NetworkProvider.request(url)
        
        return try handleError(response.data)
    }
    
    static func getPaginationItems<Result: OneEntryModel & Decodable>(_ marker: Any? = nil,
                                                                      endpoint: Endpoint? = nil,
                                                                      offset: Int = 0,
                                                                      limit: Int = 30
    ) async throws -> Result {
        
        let marker = String(describing: marker ?? "")
        let url = domain + Result.endpoint + (endpoint?.getEndpoint(marker) ?? "")
        let pagination = "?offset=\(offset)&limit=\(limit)"
        let resultURL = url + pagination
        
        let response = try await NetworkProvider.request(resultURL)
        
        return try handleError(response.data)
    }
    
    static func quickSearch(_ name: String,
                            for object: OneEntryModel.Type,
                            lang: String = "en_US"
    ) async throws -> [SearchResult] {
        
        let name = "name=\(name)"
        let lang = "lang=\(lang)"
        let url = domain + object.endpoint + "/quick/search?" + "\(name)&\(lang)"
        
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
