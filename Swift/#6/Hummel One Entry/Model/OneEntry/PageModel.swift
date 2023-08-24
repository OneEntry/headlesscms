import Foundation

struct PageModel: Identifiable, Decodable {
    
    var id: Int
    var pageUrl: String
    var localizeInfos: [String: InfoModel]
    
    var viewModel: PaginationViewModel = .init()
    
    enum CodingKeys: CodingKey {
        case id
        case pageUrl
        case localizeInfos
    }
}

extension PageModel {
    
    var englishInfo: InfoModel? { self.localizeInfos["en_US"] }
}
