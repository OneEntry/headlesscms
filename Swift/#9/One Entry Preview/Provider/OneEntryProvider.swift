//
//  OneEntryProvider.swift
//  One Entry Preview
//
//  Created by Артур Данилов on 21.07.2023.
//

import Foundation

protocol OneEntryModel {
    
    static var endpoint: String { get set }
}

class OneEntryProvider {
    
    static private let domain = "https://hummel-mobile.oneentry.cloud/api/content"
    
    enum Endpoint {
                
        case page_by_id
        case page_by_url
        case marker
        case related
        case url
        case id
        
        func endpoint(_ marker: String) -> String {
            
            switch self {
                case .page_by_id: return "/page/\(marker)"
                case .page_by_url: return "/page/url/\(marker)"
                case .marker: return "/marker/\(marker)"
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
        let url = domain + Result.endpoint + (endpoint?.endpoint(marker) ?? "")
        let response = try await NetworkProvider.request(url)
        
        return try handleError(response.data)
    }
    
    static func getPaginationItems<Result: OneEntryModel & Decodable>(_ marker: Any? = nil,
                                                            endpoint: Endpoint? = nil,
                                                            offset: Int = 0,
                                                            limit: Int = 30
    ) async throws -> Result {
        
        let marker = String(describing: marker ?? "")
        let url = domain + Result.endpoint + (endpoint?.endpoint(marker) ?? "")
        let pagination = "?offset=\(offset)&limit=\(limit)"
        let resultUrl = url + "/" + pagination
        
        let response = try await NetworkProvider.request(resultUrl)
        
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
    
    static func filter<FilterType: Encodable, Result: OneEntryModel & Decodable>(_ filters: [FilterModel<FilterType>],
                                                                                 offset: Int = 0,
                                                                                 limit: Int = 30
    ) async throws -> Result {
        
        let offset = "offset=\(offset)"
        let limit = "limit=\(limit)"
        let url = domain + Result.endpoint + "/conditions-filter?" + "\(offset)&\(limit)"
        
        let response = try await NetworkProvider.request(url, method: .post, parameters: filters)
        
        return try handleError(response.data)
    }
    
    static private func handleError<Result: Decodable>(_ data: Data) throws -> Result {
        
        let decoder = JSONDecoder()
        let error = try? decoder.decode(OneEntryError.self, from: data)
        
        if let error = error {
            throw OneEntryProviderError.errorWithDescription(error.message)
        }
        
        return try decoder.decode(Result.self, from: data)
    }
}
