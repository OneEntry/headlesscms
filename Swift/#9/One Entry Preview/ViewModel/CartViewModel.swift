//
//  CartViewModel.swift
//  One Entry Preview
//
//  Created by Артур Данилов on 25.07.2023.
//

import Foundation

class CartViewModel: ObservableObject {
    
    static let shared: CartViewModel = .init()
    
    @Published private var productsID: [Int : [ProductSize : Int]] = [:]
    
    enum ProductSize: Int, CaseIterable {
        
        case small = 1
        case medium = 2
        case large = 3
        case extra_large = 4
        
        var description: String {
            
            switch self {
                case .small: return "Small"
                case .medium: return "Medium"
                case .large: return "Large"
                case .extra_large: return "Extra Large"
            }
        }
    }
    
    func addProduct(with id: Int, with size: ProductSize) {
        
        productsID[id, default: [size : 0]][size, default: 0] += 1
    }
    
    func removeProduct(with id: Int, with size: ProductSize) {
        
        if let count = productsID[id]?[size], count > 0 {
            
            productsID[id]![size]! -= 1
            
            if productsID[id]?[size] == 0 {
                
                productsID[id]?.removeValue(forKey: size)
            }
        }
    }
    
    func getProductCount(with id: Int, with size: ProductSize) -> Int {
        
        return productsID[id]?[size] ?? 0
    }
    
    private init() {}
}
