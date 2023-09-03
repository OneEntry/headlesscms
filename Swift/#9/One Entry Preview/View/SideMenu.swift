//
//  SideMenu.swift
//  One Entry Preview
//
//  Created by Артур Данилов on 24.07.2023.
//

import SwiftUI

struct SideMenu: View {
    
    @ObservedObject  var sideMenuViewModel: SideMenuViewModel = .shared
    
    var body: some View {
        
        VStack(alignment: .leading, spacing: 30) {
            
            LogoView()
                .padding(.bottom, 40)
            
            ForEach(SideMenuViewModel.MenuItem.allCases, id: \.self) { item in
                
                ItemView(item)
            }
            
            Spacer()
        }
        .padding(30)
    }
    
    @ViewBuilder
    private func LogoView() -> some View {
        
        Image("logo.large")
            .resizable()
            .aspectRatio(contentMode: .fit)
            .frame(height: 40)
            .frame(maxWidth: .infinity, alignment: .leading)
    }
    
    @ViewBuilder
    private func ItemView(_ item: SideMenuViewModel.MenuItem) -> some View {
        
        let condition = sideMenuViewModel.currentScreen == item
        
        HStack(spacing: 20) {
            
            Image(item.icon)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 20)
            
            Text(item.rawValue)
        }
        .foregroundStyle(condition ? AppColorPalette.primary : .black)
        .onTapGesture {
            
            sideMenuViewModel.currentScreen = item
            sideMenuViewModel.toggleMenu()
        }
    }
}

#Preview {
    SideMenu()
}
