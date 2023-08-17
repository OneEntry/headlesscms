import Foundation

struct PageModel: Identifiable, Decodable {
    
    var id: Int
    var pageUrl: String
    var localizeInfos: [String: InfoModel]
}
