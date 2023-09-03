//
//  ApplicationView.swift
//  One Entry Preview
//
//  Created by Артур Данилов on 21.07.2023.
//

import SwiftUI

struct ApplicationView: View {
        
    @ObservedObject private var sideMenuViewModel: SideMenuViewModel = .shared
    @ObservedObject private var appLoadingViewModel: ApplicationLoadingViewModel = .init()
    
    var body: some View {
        
        if !appLoadingViewModel.loading {
            
            let width = UIScreen.main.bounds.width
            let isSideMenuActive = sideMenuViewModel.isSideMenuActive
            
            ZStack {
                
                SideMenu()
                
                ZStack {
                    
                    switch sideMenuViewModel.currentScreen {
                            
                        case .home:
                            HomeView()
                                .environmentObject(appLoadingViewModel.pages.getViewModel(for: .home))
                            
                        case .order:
                            HomeView()
                                .environmentObject(appLoadingViewModel.pages.getViewModel(for: .home))
                            
                        case .blog:
                            BlogsView()
                                .environmentObject(appLoadingViewModel.pages.getViewModel(for: .blog))
                            
                            
                    }
                }
                .overlay(.white.opacity(isSideMenuActive ? 1 : 0))
                .overlay(alignment: .topLeading) {
                    
                    Button(action: sideMenuViewModel.toggleMenu) {
                        
                        Image(systemName: "xmark")
                            .font(.footnote.bold())
                    }
                    .padding()
                    .opacity(isSideMenuActive ? 1 : 0)
                }
                .cornerRadius(isSideMenuActive ? 20 : 0)
                .shadow(radius: isSideMenuActive ? 20 : 0)
                .offset(x: isSideMenuActive ? width - 100 : 0)
                .ignoresSafeArea(.all, edges: isSideMenuActive ? [] : .vertical)
                .animation(.spring, value: isSideMenuActive)
            }
            
        } else {
            
            LoadingView()
                .task(appLoadingViewModel.loadPages)
        }
    }
}

#Preview {
    ApplicationView()
}
