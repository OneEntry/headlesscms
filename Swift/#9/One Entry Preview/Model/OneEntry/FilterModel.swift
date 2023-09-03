//
//  FilterModel.swift
//  One Entry Preview
//
//  Created by Артур Данилов on 31.08.2023.
//

import Foundation

/*
 {
     "attributeMarker": "price",
     "conditionMarker": "mth",
     "conditionValue": 1,
     "pageId": 0
   }
 */

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
