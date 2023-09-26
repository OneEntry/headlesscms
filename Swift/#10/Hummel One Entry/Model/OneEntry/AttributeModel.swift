import Foundation

struct AttributeModel: Decodable {
    
    let value: Any?
    let type: AttributeType
    
    enum CodingKeys: CodingKey {
        
        case value
        case type
    }
    
    init(from decoder: Decoder) throws {
        
        let container = try decoder.container(keyedBy: CodingKeys.self)
        
        self.type = try container.decode(AttributeType.self, forKey: .type)
        
        switch type {
            case .image:
                self.value = try? container.decode([ImageModel].self, forKey: .value)
            case .real:
                let value = try? container.decode(String.self, forKey: .value)
                self.value = Double(value ?? "")
            case .float:
                let value = try? container.decode(String.self, forKey: .value)
                self.value = Double(value ?? "")
            case .string:
                self.value = try? container.decode(String.self, forKey: .value)
        }
    }
}

extension AttributeModel {
    
    enum AttributeType: String, Decodable {
        
        case image
        case real
        case float
        case string
    }
}
