//
//  PageModel.swift
//  One Entry Preview
//
//  Created by Артур Данилов on 21.07.2023.
//

import Foundation

struct PageModel: Identifiable, Decodable {
    
    var id: Int
    var pageUrl: String
    var localizeInfos: [String : InfoModel]
    var attributeValues: [AttributeModel]?
    
    var viewModel: PaginationViewModel = .init()
    
    enum CodingKeys: CodingKey {
        case id
        case pageUrl
        case localizeInfos
        case attributeValues
    }
}

extension PageModel: OneEntryModel {
    
    static var endpoint: String = "/pages"
    
    var englishInfo: InfoModel? { self.localizeInfos["en_US"] }
    
    var image: ImageModel? {
        
        let first = attributeValues?.first(where: { $0.image != nil })
        
        return first?.image?.first
    }
}
