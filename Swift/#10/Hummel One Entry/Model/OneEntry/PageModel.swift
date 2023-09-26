import Foundation

struct PageModel: Identifiable, Decodable {
    
    var id: Int
    var pageUrl: String
    var localizeInfos: [String: InfoModel]?
    var attributeValues: [String : [String : AttributeModel]]?
    
    var viewModel: PaginationViewModel = .init()
    
    enum CodingKeys: CodingKey {
        case id
        case pageUrl
        case localizeInfos
        case attributeValues
    }
}

extension PageModel: OneEntryModel, ContentLanguage {
    
    static var endpoint: String = "/pages"
}
