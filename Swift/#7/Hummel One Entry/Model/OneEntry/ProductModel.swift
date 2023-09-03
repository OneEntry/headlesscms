import Foundation

struct ProductResultModel: OneEntryModel, Decodable {
    
    static var endpoint: String = "/products"
        
    var items: [ProductModel]
    var total: Int
}

struct ProductModel: Identifiable, Decodable {
    
    var id: Int
    var price: Double?
    var localizeInfos: [String : InfoModel]
    var attributeValues: [AttributeModel]
}

struct AttributeModel: Decodable {
    
    var image: [ImageModel]?
    var rate: String?
}

struct ImageModel: Decodable {
    
    var size: Int
    var downloadLink: String
}

extension ProductModel {
    
    var englishInfo: InfoModel? { self.localizeInfos["en_US"] }    
    
    var image: ImageModel? {
        
        let first = attributeValues.first(where: { $0.image != nil })
        
        return first?.image?.first
    }
    
    var rate: Double? {
        
        guard let rate = attributeValues.first(where: { $0.rate != nil })?.rate else { return nil }
        
        return Double(rate)
    }
}
