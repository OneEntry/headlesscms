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
}
