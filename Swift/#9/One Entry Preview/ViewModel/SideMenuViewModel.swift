//
//  SideMenuViewModel.swift
//  One Entry Preview
//
//  Created by Артур Данилов on 24.07.2023.
//

import Foundation
import SwiftUI

class SideMenuViewModel: ObservableObject {
    
    @Published var currentScreen: MenuItem = .home
    @Published var isSideMenuActive: Bool = false
    
    enum MenuItem: String, CaseIterable {
        
        case home = "Home"
        case order = "My Order"
        case blog = "Blog"
        
        var icon: String {
            
            switch self {
                case .home: return "house"
                case .order: return "cart"
                case .blog: return "list"
            }
        }
    }
    
    private init() {  }
    
    static let shared: SideMenuViewModel = .init()
    
    func toggleMenu() {
        
        isSideMenuActive.toggle()
    }
}
