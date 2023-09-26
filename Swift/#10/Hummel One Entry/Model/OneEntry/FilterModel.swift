import Foundation

struct FilterModel<Value: Encodable>: Encodable {
    
    let attributeMarker: String
    let conditionMarker: ConditionMarker
    let conditionValue: Value
    let pageId: Int
}

enum ConditionMarker: String, Encodable {
    
    case `in`
    case nin
    case eq
    case neq
    case mth
    case lth
    case exs
    case nexs
}
