import Foundation

struct ProductResultModel: OneEntryModel, Decodable {
    
    static var endpoint: String = "/products"
        
    var items: [ProductModel]
    var total: Int
}

struct ProductModel: Identifiable, Decodable, ContentLanguage {
    
    var id: Int
    var price: Double?
    var localizeInfos: [String : InfoModel]?
    var attributeValues: [String : [String : AttributeModel]]?
}

struct ImageModel: Decodable {
    
    var size: Int
    var downloadLink: String
}
