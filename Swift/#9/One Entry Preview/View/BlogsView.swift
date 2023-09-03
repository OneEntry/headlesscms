//
//  BlogsView.swift
//  One Entry Preview
//
//  Created by Артур Данилов on 28.08.2023.
//

import SwiftUI

struct BlogsView: View {
    
    @ObservedObject private var searchViewModel: SearchViewModel<PageModel> = .init()
    
    var body: some View {
        
        NavigationView {
            
            BlogViewContent()
                .environmentObject(searchViewModel)
                .navigationTitle("Blog")
                .navigationBarTitleDisplayMode(.inline)
                .searchable(text: $searchViewModel.text)
                .toolbar {
                    
                    ToolbarItem(placement: .topBarLeading) {
                        
                        Button(action: SideMenuViewModel.shared.toggleMenu) {
                            
                            Image(systemName: "line.3.horizontal")
                        }
                    }
                }
        }
    }
}

struct BlogViewContent: View {
    
    @EnvironmentObject var searchViewModel: SearchViewModel<PageModel>
    @EnvironmentObject var menuViewModel: MenuViewModel
    
    @Environment(\.isSearching) var isSearching
    
    var body: some View {
        
        ScrollView {
            
            VStack {
                
                if isSearching {
                    
                    ForEach(searchViewModel.results) { result in
                        
                        BlogView(id: result.id)
                    }
                    
                } else {
                    
                    if let pages = menuViewModel.pages {
                        
                        ForEach(pages) { page in
                            
                            BlogView(id: page.id)
                        }
                    }
                }
            }
            .padding()
        }
    }
}

#Preview {
    ContentView()
}
