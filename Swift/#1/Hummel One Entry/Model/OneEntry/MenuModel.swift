import Foundation

struct MenuModel: Decodable, Identifiable {
    
    var id: Int
    var identifier: String
    var pages: [PageModel]
}

extension MenuModel: OneEntryModel {
    
    static var endpoint: String = "/menus"
}
