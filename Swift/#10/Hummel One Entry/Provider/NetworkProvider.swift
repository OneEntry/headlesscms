import Foundation
import Alamofire

class NetworkProvider {
    
    static func request(_ convertible: URLConvertible,
                        method: HTTPMethod = .get,
                        parameters: Parameters? = nil,
                        encoding: ParameterEncoding = URLEncoding.default,
                        headers: HTTPHeaders? = nil
    ) async throws -> (data: Data, response: AFDataResponse<Data>) {
        
        try await withCheckedThrowingContinuation { continuation in
            
            AF.request(convertible, method: method, parameters: parameters, encoding: encoding, headers: headers)
                .validate()
                .responseData { response in
                    
                    switch response.result {
                        case .success(let success): continuation.resume(returning: (success, response))
                        case .failure(let failure): continuation.resume(throwing: failure)
                    }
                }
        }
    }
    
    static func request<Parameters: Encodable>(_ convertible: URLConvertible,
                        method: HTTPMethod = .get,
                        parameters: Parameters? = nil
    ) async throws -> (data: Data, response: AFDataResponse<Data>) {
        
        let data = try JSONEncoder().encode(parameters)
        
        var request = URLRequest(url: try convertible.asURL())
        request.httpMethod = method.rawValue
        request.setValue("application/json; charset=UTF-8", forHTTPHeaderField: "Content-Type")
        request.httpBody = data
        
        return try await withCheckedThrowingContinuation { continuation in
            
            AF.request(request)
                .validate()
                .responseData { response in
                    
                    switch response.result {
                        case .success(let success): continuation.resume(returning: (success, response))
                        case .failure(let failure): continuation.resume(throwing: failure)
                    }
                }
        }
    }
}
